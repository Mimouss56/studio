import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { LibraryState, PackInfo, LibraryFilter } from '@/types/state';

// État initial avec destructuration atomique
const initialState: LibraryState = {
  packs: [],
  isLoading: false,
  error: undefined,
  searchTerm: '',
  filter: {
    category: undefined,
    tags: [],
    author: undefined,
    sortBy: 'name',
    sortOrder: 'asc'
  }
};

// Actions asynchrones avec destructuration atomique
export const loadLibrary = createAsyncThunk(
  'library/loadLibrary',
  async (_, { rejectWithValue }) => {
    try {
      // Simulation d'un chargement de la bibliothèque
      const response = await fetch('/api/library');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Erreur lors du chargement de la bibliothèque');
    }
  }
);

// Slice avec destructuration atomique
export const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    // Action atomique pour définir les packs avec destructuration
    setPacks: (state, action: PayloadAction<PackInfo[]>) => {
      state.packs = action.payload;
    },

    // Action atomique pour ajouter un pack avec destructuration
    addPack: (state, action: PayloadAction<PackInfo>) => {
      const { id, name, description, version, author, tags, thumbnail, createdAt, updatedAt } = action.payload;
      state.packs.push({ id, name, description, version, author, tags, thumbnail, createdAt, updatedAt });
    },

    // Action atomique pour mettre à jour un pack avec destructuration
    updatePack: (state, action: PayloadAction<{ id: string; updates: Partial<PackInfo> }>) => {
      const { id, updates } = action.payload;
      const packIndex = state.packs.findIndex(pack => pack.id === id);
      
      if (packIndex !== -1) {
        const { name, description, version, author, tags, thumbnail, createdAt, updatedAt } = updates;
        if (name) state.packs[packIndex].name = name;
        if (description) state.packs[packIndex].description = description;
        if (version) state.packs[packIndex].version = version;
        if (author) state.packs[packIndex].author = author;
        if (tags) state.packs[packIndex].tags = tags;
        if (thumbnail) state.packs[packIndex].thumbnail = thumbnail;
        if (createdAt) state.packs[packIndex].createdAt = createdAt;
        if (updatedAt) state.packs[packIndex].updatedAt = updatedAt;
      }
    },

    // Action atomique pour supprimer un pack avec destructuration
    removePack: (state, action: PayloadAction<string>) => {
      const packId = action.payload;
      state.packs = state.packs.filter(pack => pack.id !== packId);
    },

    // Action atomique pour définir le terme de recherche avec destructuration
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },

    // Action atomique pour définir le filtre avec destructuration
    setFilter: (state, action: PayloadAction<Partial<LibraryFilter>>) => {
      const { category, tags, author, sortBy, sortOrder } = action.payload;
      if (category !== undefined) state.filter.category = category;
      if (tags !== undefined) state.filter.tags = tags;
      if (author !== undefined) state.filter.author = author;
      if (sortBy !== undefined) state.filter.sortBy = sortBy;
      if (sortOrder !== undefined) state.filter.sortOrder = sortOrder;
    },

    // Action atomique pour effacer l'erreur avec destructuration
    clearError: (state) => {
      state.error = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
      // Gestion atomique des actions asynchrones avec destructuration
      .addCase(loadLibrary.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(loadLibrary.fulfilled, (state, action) => {
        const { packs } = action.payload;
        state.packs = packs;
        state.isLoading = false;
      })
      .addCase(loadLibrary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

// Export des actions avec destructuration atomique
export const {
  setPacks,
  addPack,
  updatePack,
  removePack,
  setSearchTerm,
  setFilter,
  clearError
} = librarySlice.actions;

// Export du reducer avec destructuration atomique
export const libraryReducer = librarySlice.reducer;

// Sélecteurs atomiques avec destructuration
export const selectLibraryState = (state: { library: LibraryState }) => state.library;
export const selectPacks = (state: { library: LibraryState }) => state.library.packs;
export const selectIsLoading = (state: { library: LibraryState }) => state.library.isLoading;
export const selectError = (state: { library: LibraryState }) => state.library.error;
export const selectSearchTerm = (state: { library: LibraryState }) => state.library.searchTerm;
export const selectFilter = (state: { library: LibraryState }) => state.library.filter; 