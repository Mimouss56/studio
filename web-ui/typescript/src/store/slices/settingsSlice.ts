import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { SettingsState } from '@/types/state';

// État initial avec destructuration atomique
const initialState: SettingsState = {
  announceOptOut: false,
  allowEnriched: true,
  language: 'fr',
  theme: 'light',
  autoSave: true,
  autoSaveInterval: 60
};

// Slice avec destructuration atomique
export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // Action atomique pour mettre à jour les paramètres avec destructuration
    updateSettings: (state, action: PayloadAction<Partial<SettingsState>>) => {
      const { announceOptOut, allowEnriched, language, theme, autoSave, autoSaveInterval } = action.payload;
      
      if (announceOptOut !== undefined) state.announceOptOut = announceOptOut;
      if (allowEnriched !== undefined) state.allowEnriched = allowEnriched;
      if (language !== undefined) state.language = language;
      if (theme !== undefined && (theme === 'light' || theme === 'dark')) state.theme = theme;
      if (autoSave !== undefined) state.autoSave = autoSave;
      if (autoSaveInterval !== undefined) state.autoSaveInterval = autoSaveInterval;
    },

    // Action atomique pour définir l'opt-out des annonces avec destructuration
    setAnnounceOptOut: (state, action: PayloadAction<boolean>) => {
      state.announceOptOut = action.payload;
    },

    // Action atomique pour définir l'autorisation enrichie avec destructuration
    setAllowEnriched: (state, action: PayloadAction<boolean>) => {
      state.allowEnriched = action.payload;
    },

    // Action atomique pour définir la langue avec destructuration
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },

    // Action atomique pour définir le thème avec destructuration
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },

    // Action atomique pour définir la sauvegarde automatique avec destructuration
    setAutoSave: (state, action: PayloadAction<boolean>) => {
      state.autoSave = action.payload;
    },

    // Action atomique pour définir l'intervalle de sauvegarde automatique avec destructuration
    setAutoSaveInterval: (state, action: PayloadAction<number>) => {
      state.autoSaveInterval = action.payload;
    },

    // Action atomique pour réinitialiser les paramètres avec destructuration
    resetSettings: (state) => {
      const { announceOptOut, allowEnriched, language, theme, autoSave, autoSaveInterval } = initialState;
      state.announceOptOut = announceOptOut;
      state.allowEnriched = allowEnriched;
      state.language = language;
      state.theme = theme;
      state.autoSave = autoSave;
      state.autoSaveInterval = autoSaveInterval;
    }
  }
});

// Export des actions avec destructuration atomique
export const {
  updateSettings,
  setAnnounceOptOut,
  setAllowEnriched,
  setLanguage,
  setTheme,
  setAutoSave,
  setAutoSaveInterval,
  resetSettings
} = settingsSlice.actions;

// Export du reducer avec destructuration atomique
export const settingsReducer = settingsSlice.reducer;

// Sélecteurs atomiques avec destructuration
export const selectSettingsState = (state: { settings: SettingsState }) => state.settings;
export const selectAnnounceOptOut = (state: { settings: SettingsState }) => state.settings.announceOptOut;
export const selectAllowEnriched = (state: { settings: SettingsState }) => state.settings.allowEnriched;
export const selectLanguage = (state: { settings: SettingsState }) => state.settings.language;
export const selectTheme = (state: { settings: SettingsState }) => state.settings.theme;
export const selectAutoSave = (state: { settings: SettingsState }) => state.settings.autoSave;
export const selectAutoSaveInterval = (state: { settings: SettingsState }) => state.settings.autoSaveInterval; 