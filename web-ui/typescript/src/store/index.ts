import { configureStore } from '@reduxjs/toolkit';
import type { AppState } from '@/types';

// Import des reducers avec destructuration atomique
import { deviceReducer } from './slices/deviceSlice';
import { editorReducer } from './slices/editorSlice';
import { evergreenReducer } from './slices/evergreenSlice';
import { libraryReducer } from './slices/librarySlice';
import { settingsReducer } from './slices/settingsSlice';
import { uiReducer } from './slices/uiSlice';
import { viewerReducer } from './slices/viewerSlice';


// Configuration du store avec destructuration atomique
export const store = configureStore({
  reducer: {
    device: deviceReducer,
    editor: editorReducer,
    evergreen: evergreenReducer,
    library: libraryReducer,
    settings: settingsReducer,
    ui: uiReducer,
    viewer: viewerReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorer les actions non-sérialisables pour les événements
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['ui.notifications', 'ui.modals']
      }
    })
});

// Types avec destructuration atomique
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Sélecteurs atomiques avec destructuration
export const selectDevice = (state: RootState) => state.device;
export const selectEditor = (state: RootState) => state.editor;
export const selectEvergreen = (state: RootState) => state.evergreen;
export const selectLibrary = (state: RootState) => state.library;
export const selectSettings = (state: RootState) => state.settings;
export const selectUI = (state: RootState) => state.ui;
export const selectViewer = (state: RootState) => state.viewer;

// Sélecteurs composés avec destructuration atomique
export const selectAppState = (state: RootState): AppState => ({
  device: state.device,
  editor: state.editor,
  evergreen: state.evergreen,
  library: state.library,
  settings: state.settings,
  ui: state.ui,
  viewer: state.viewer
});

// Sélecteurs utilitaires avec destructuration atomique
export const selectIsLoading = (state: RootState) => {
  const { device, editor, evergreen, library } = state;
  return device.isLoading || editor.isSaving || evergreen.isLoading || library.isLoading;
};

export const selectHasErrors = (state: RootState) => {
  const { library, ui } = state;
  return !!library.error || Object.keys(ui.errors).length > 0;
};

export const selectNotifications = (state: RootState) => state.ui.notifications;
export const selectModals = (state: RootState) => state.ui.modals;
export const selectSidebarCollapsed = (state: RootState) => state.ui.sidebarCollapsed; 