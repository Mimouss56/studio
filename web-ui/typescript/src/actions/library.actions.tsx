import { toast } from 'react-toastify';
import { fetchLibraryInfos, fetchLibraryPacks, downloadFromLibrary, uploadToLibrary, convertInLibrary, removeFromLibrary } from '../services/library';
import IssueReportToast from "../components/IssueReportToast";
import { useTranslation } from 'react-i18next';
import { LibraryPack } from '../../@types/pack';
import { withTimeout, Mutex } from 'async-mutex';
import { addToLibrary } from '../services/device';
import { sortPacks } from '../utils/packs';

const mutex = withTimeout(new Mutex(), 100);


export const actionLoadLibrary = () => {
    return dispatch => {
        const { t } = useTranslation();
        const toastId = toast(t('toasts.library.loading'), { autoClose: false });
        return fetchLibraryInfos()
            .then(metadata => {
                toast.update(toastId, { render: t('toasts.library.fetching') });
                return fetchLibraryPacks()
                    .then(packs => {
                        toast.update(toastId, { type: "info", render: t('toasts.library.fetched', { count: packs.length }), autoClose: 5000 });
                        dispatch(setLibrary(metadata, packs));
                    })
                    .catch(e => {
                        console.error('failed to fetch library packs', e);
                        toast.update(toastId, { type: "error", render: <IssueReportToast content={t('toasts.library.fetchingFailed')} />, autoClose: false });
                    });
            })
            .catch(e => {
                console.error('failed to fetch library infos', e);
                toast.update(toastId, { type: "error", render: <IssueReportToast content={t('toasts.library.loadingFailed')} error={e} />, autoClose: false });
            });
    }
};

export const actionRefreshLibrary = () => {
    return dispatch => {
        return fetchLibraryInfos()
            .then(metadata => {

                return fetchLibraryPacks()
                    .then(packs => {
                        dispatch(setLibrary(metadata, packs));
                    });
            })
            .catch(e => {
                const { t } = useTranslation();
                console.error('failed to refresh library', e);
                toast(<IssueReportToast content={t('toasts.library.refreshingFailed')} error={e} />, { type: "error", autoClose: false });
            });
    }
};

export const actionDownloadFromLibrary = (uuid: string, path: string) => {
    return dispatch => {
        const { t } = useTranslation();
        const toastId = toast(t('toasts.library.downloading'), { autoClose: false });
        return downloadFromLibrary(uuid, path)
            .then(async resp => {
                const reader = resp.body?.getReader();
                if (!reader) {
                    throw new Error('Response body is undefined');
                }
                const contentLength = +(resp.headers.get('Content-Length') ?? '0');
                let receivedLength = 0;
                const chunks = [];
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    chunks.push(value);
                    receivedLength += value.length;
                    const progress = (receivedLength / contentLength);
                    toast.update(toastId, { progress: progress, autoClose: false });
                }
                const blob = new Blob(chunks);
                toast.update(toastId, { progress: null, type: "success", render: t('toasts.library.downloaded'), autoClose: 5000 });
                return blob;
            })
            .catch(e => {
                console.error('failed to download pack from library', e);
                toast.update(toastId, { type: "error", render: <IssueReportToast content={t('toasts.library.downloadingFailed')} error={e} />, autoClose: false });
            });
    }
};

interface LibraryResponse {
    success: boolean;
}


export const actionUploadToLibrary = (uuid: string, path: string, packData: LibraryPack) => {
    return dispatch => {
        const { t } = useTranslation();
        const toastId = toast(t('toasts.library.uploading'), { autoClose: false });
        return uploadToLibrary(uuid, path, packData,
            (progressEvent: { lengthComputable: number; loaded: number; total: number; }) => {
                if (progressEvent.lengthComputable) {
                    const progress = (progressEvent.loaded / progressEvent.total);
                    toast.update(toastId, { progress: progress, autoClose: false });
                }
            })
            .then((resp) => {
                const response = resp as LibraryResponse;

                if (response.success) {
                    toast.update(toastId, { progress: null, type: "success", render: t('toasts.library.uploaded'), autoClose: 5000 });
                    dispatch(actionRefreshLibrary());
                } else {
                    toast.update(toastId, { type: "error", render: <IssueReportToast content={t('toasts.library.uploadingFailed')} />, autoClose: false });
                }
            })
            .catch(e => {
                console.error('failed to upload pack to library', e);
                toast.update(toastId, { type: "error", render: <IssueReportToast content={t('toasts.library.uploadingFailed')} error={e} />, autoClose: false });
            });
    }
};


export const actionAddToLibrary = (uuid: string, driver: string, context: any) => {
    return dispatch => mutex.acquire()
        .then(
            release => {
                const { t } = useTranslation();
                const toastId = toast(t('toasts.library.adding'), { autoClose: false });
                return addToLibrary(uuid, driver)
                    .then(resp => {
                        // Surveillance du progrès du transfert
                        const transferId = resp.transferId;
                        context.eventBus.registerHandler(`storyteller.transfer.${transferId}.progress`,
                            (error: Error, message: any) => {
                                console.log(`Received storyteller.transfer.${transferId}.progress event`);
                                if (message.body.progress < 1) {
                                    toast.update(toastId, {
                                        progress: message.body.progress,
                                        autoClose: false
                                    });
                                }
                            }
                        );

                        context.eventBus.registerHandler(`storyteller.transfer.${transferId}.done`,
                            (error: Error, message: any) => {
                                console.log(`Received storyteller.transfer.${transferId}.done event`);
                                if (message.body.success) {
                                    toast.update(toastId, {
                                        progress: null,
                                        type: "success",
                                        render: t('toasts.library.added'),
                                        autoClose: 5000
                                    });
                                    dispatch(actionRefreshLibrary());
                                } else {
                                    toast.update(toastId, {
                                        type: "error",
                                        render: <IssueReportToast content={t('toasts.library.addingFailed')} />,
                                        autoClose: false
                                    });
                                }
                                release();
                            }
                        );
                    })
                    .catch(e => {
                        console.error('failed to add pack to library', e);
                        toast.update(toastId, {
                            type: "error",
                            render: <IssueReportToast content={t('toasts.library.addingFailed')} error={e} />,
                            autoClose: false
                        });
                        release();
                    });
            },
            () => {
                const { t } = useTranslation();
                toast.error(t('toasts.device.busy'));
            }
        );
};
export const actionConvertInLibrary = (uuid: string, path: string, format: string, allowEnriched: boolean) => {
    return dispatch => {
        const { t } = useTranslation();
        const toastId = toast(t('toasts.library.converting'), { autoClose: false });
        return convertInLibrary(uuid, path, format, allowEnriched)
            .then(resp => {
                if (resp.success) {
                    toast.update(toastId, { progress: null, type: "success", render: t('toasts.library.converted'), autoClose: 5000 });
                    dispatch(actionRefreshLibrary());
                    return resp.path;
                } else {
                    toast.update(toastId, { type: "error", render: <IssueReportToast content={t('toasts.library.convertingFailed')} />, autoClose: false });
                }
            })
            .catch(e => {
                console.error('failed to convert pack in library', e);
                toast.update(toastId, { type: "error", render: <IssueReportToast content={t('toasts.library.convertingFailed')} error={e} />, autoClose: false });
            });
    }
};

export const actionRemoveFromLibrary = (path: string) => {
    return dispatch => {
        const { t } = useTranslation();
        const toastId = toast(t('toasts.library.removing'), { autoClose: false });
        return removeFromLibrary(path)
            .then(resp => {
                if (resp.success) {
                    toast.update(toastId, { type: "success", render: t('toasts.library.removed'), autoClose: 5000 });
                    dispatch(actionRefreshLibrary());
                } else {
                    toast.update(toastId, { type: "error", render: <IssueReportToast content={t('toasts.library.removingFailed')} />, autoClose: false });
                }
            })
            .catch(e => {
                console.error('failed to remove pack from library', e);
                toast.update(toastId, { type: "error", render: <IssueReportToast content={t('toasts.library.removingFailed')} error={e} />, autoClose: false });
            });
    }
};

export const setLibrary = (metadata, packs: LibraryPack[]) => ({
    type: 'SET_LIBRARY',
    metadata,
    packs: sortPacks(packs)
});

export const showLibrary = () => ({
    type: 'SHOW_LIBRARY'
});