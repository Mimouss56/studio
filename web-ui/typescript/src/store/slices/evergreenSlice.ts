import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { EvergreenState, AnnounceInfo } from '@/types/state';

// État initial avec destructuration atomique
const initialState: EvergreenState = {
  version: undefined,
  announce: undefined,
  isLoading: false
};

// Actions asynchrones avec destructuration atomique
export const loadEvergreen = createAsyncThunk(
  'evergreen/loadEvergreen',
  async (announceOptOut: boolean, { rejectWithValue }) => {
    try {
      // Simulation d'un chargement d'informations evergreen
      const response = await fetch('/api/evergreen');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Erreur lors du chargement des informations evergreen');
    }
  }
);

// Slice avec destructuration atomique
export const evergreenSlice = createSlice({
  name: 'evergreen',
  initialState,
  reducers: {
    // Action atomique pour définir la version avec destructuration
    setVersion: (state, action: PayloadAction<string>) => {
      state.version = action.payload;
    },

    // Action atomique pour définir l'annonce avec destructuration
    setAnnounce: (state, action: PayloadAction<AnnounceInfo>) => {
      const { id, title, content, date, priority } = action.payload;
      state.announce = { id, title, content, date, priority };
    },

    // Action atomique pour effacer l'annonce avec destructuration
    clearAnnounce: (state) => {
      state.announce = undefined;
    },

    // Action atomique pour mettre à jour l'annonce avec destructuration
    updateAnnounce: (state, action: PayloadAction<Partial<AnnounceInfo>>) => {
      if (state.announce) {
        const { id, title, content, date, priority } = action.payload;
        if (id) state.announce.id = id;
        if (title) state.announce.title = title;
        if (content) state.announce.content = content;
        if (date) state.announce.date = date;
        if (priority) state.announce.priority = priority;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Gestion atomique des actions asynchrones avec destructuration
      .addCase(loadEvergreen.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadEvergreen.fulfilled, (state, action) => {
        const { version, announce } = action.payload;
        state.version = version;
        state.announce = announce;
        state.isLoading = false;
      })
      .addCase(loadEvergreen.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

// Export des actions avec destructuration atomique
export const {
  setVersion,
  setAnnounce,
  clearAnnounce,
  updateAnnounce
} = evergreenSlice.actions;

// Export du reducer avec destructuration atomique
export const evergreenReducer = evergreenSlice.reducer;

// Sélecteurs atomiques avec destructuration
export const selectEvergreenState = (state: { evergreen: EvergreenState }) => state.evergreen;
export const selectVersion = (state: { evergreen: EvergreenState }) => state.evergreen.version;
export const selectAnnounce = (state: { evergreen: EvergreenState }) => state.evergreen.announce;
export const selectIsLoading = (state: { evergreen: EvergreenState }) => state.evergreen.isLoading; 