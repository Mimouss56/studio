/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */


export {
    devicePlugged,
    deviceUnplugged,
    setDevicePacks,
    actionCheckDevice,
    actionDevicePlugged,
    actionAddFromLibrary,
    actionRemoveFromDevice,
    actionReorderOnDevice
} from './device.actions';
export {
    actionLoadLibrary,
    actionRefreshLibrary,
    actionDownloadFromLibrary,
    actionUploadToLibrary,
    actionAddToLibrary,
    actionConvertInLibrary,
    actionRemoveFromLibrary,
    setLibrary,
    showLibrary
} from './library.actions';
export {
    showViewer,
    hideViewer,
    setViewerDiagram,
    setViewerStage,
    setViewerAction,
    setViewerOptions
} from './viewer.actions';


export {
    actionCreatePackInEditor,
    actionLoadPackInEditor,
    actionLoadSampleInEditor,
    setEditorDiagram,
    setEditorFilename,
    showEditor
} from './editor.actions';


export const setDiagramErrors = (errors: Error[]) => ({
    type: 'SET_DIAGRAM_ERRORS',
    errors
});


export const setApplicationVersion = (version: string) => ({
    type: 'SET_APPLICATION_VERSION',
    version
});

export const setAnnounce = (announce: string) => ({
    type: 'SET_ANNOUNCE',
    announce
});

export const setAnnounceOptOut = (announceOptOut: string) => ({
    type: 'SET_ANNOUNCE_OPTOUT',
    announceOptOut
});

export const setAllowEnriched = (allowEnriched: boolean) => ({
    type: 'SET_ALLOW_ENRICHED',
    allowEnriched
});






