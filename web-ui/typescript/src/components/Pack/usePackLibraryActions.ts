import { useCallback } from 'react';
import { useAppDispatch } from '../../hooks';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';


import { addToLibrary, removeFromDevice } from '../../services/device';
import { addPackFromLibrary } from '../../store/device.store';
import { uploadPack } from '../../store/library.store';
import { PackLibraryState } from '../../../@types/pack';

export const usePackLibraryActions = (state: PackLibraryState, setState: unknown) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleDropIntoDevice = useCallback(async (event: { preventDefault: () => void; dataTransfer: { getData: (arg0: string) => string; }; }) => {
    event.preventDefault();
    const packData = JSON.parse(event.dataTransfer.getData('local-library-pack'));
    if (!packData) return;

    const latestPack = packData.packs[0];
    try {
      await dispatch(addPackFromLibrary({
        uuid: latestPack.uuid,
        path: latestPack.path,
        format: latestPack.format,
        driver: latestPack.driver,
        context: latestPack.context
      })).unwrap();

      toast.success(t('toasts.device.packAdded'));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(t('toasts.device.addingFailed'));
    }
  }, [dispatch, t]);

  const handleUploadPack = useCallback(async (file: File) => {
    if (!file) return;
    
    if (!['application/zip', 'application/x-zip-compressed'].includes(file.type) 
        && !file.name.endsWith('.pack')) {
      toast.error(t('toasts.library.packFileWrongType'));
      return;
    }

    try {
      await dispatch(uploadPack({
        name: file.name,
        file
      })).unwrap();
      toast.success(t('toasts.library.uploaded'));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(t('toasts.library.uploadingFailed'));
    }
  }, [dispatch, t]);

  const handleRemoveFromDevice = useCallback(async (uuid: string) => {
    try {
      await dispatch(removeFromDevice(uuid)).unwrap();
      setState((prev: any) => ({ 
        ...prev, 
        showRemoveFromDeviceConfirmDialog: false,
        removingFromDevice: null
      }));
      toast.success(t('toasts.device.packRemoved'));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      toast.error(t('toasts.device.removingFailed'));
    }
  }, [dispatch, setState, t]);

  const handleReorderDevice = useCallback(async (uuids: string[]) => {
    try {
      await dispatch(reorderPacksOnDevice(uuids)).unwrap();
      toast.success(t('toasts.device.reorderSuccess'));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      toast.error(t('toasts.device.reorderFailed'));
    }
  }, [dispatch, t]);

  const handleDropIntoLibrary = useCallback(async (event: { preventDefault: () => void; dataTransfer: { getData: (arg0: string) => any; files: any[]; }; }) => {
    event.preventDefault();
    const packData = event.dataTransfer.getData('device-pack');
    if (!packData) {
      // Gérer le fichier déposé
      const file = event.dataTransfer.files[0];
      if (file) {
        await handleUploadPack(file);
      }
      return;
    }

    const data = JSON.parse(packData);
    try {
      await dispatch(await addToLibrary(data.uuid, data.driver)).unwrap();
      toast.success(t('toasts.library.packAdded'));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(t('toasts.library.addingFailed'));
    }
  }, [dispatch, handleUploadPack, t]);

  return {
    handleDropIntoDevice,
    handleRemoveFromDevice,
    handleReorderDevice,
    handleDropIntoLibrary,
    handleUploadPack
  };
};