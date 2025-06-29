import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { LibraryState, PackInfo, LibraryFilter } from '@/types/state';

// Type mutable pour Redux Toolkit
type MutablePackInfo = Omit<PackInfo, 'tags'> & {
  tags: string[];
};

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

// Cache pour éviter les doubles appels
let loadLibraryPromise: Promise<any> | null = null;
let searchLibraryPromise: Promise<any> | null = null;
let filterLibraryPromise: Promise<any> | null = null;

// Actions asynchrones avec destructuration atomique
export const loadLibrary = createAsyncThunk(
  'library/loadLibrary',
  async (_, { rejectWithValue, signal }) => {
    try {
      // Éviter les doubles appels
      if (loadLibraryPromise) {
        return await loadLibraryPromise;
      }

      // Créer une nouvelle promesse avec timeout
      loadLibraryPromise = new Promise(async (resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error('Timeout lors du chargement de la bibliothèque'));
        }, 10000); // 10 secondes de timeout

        try {
          const response = await fetch('http://localhost:8080/api/library/packs', {
            signal // Permet l'annulation
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          clearTimeout(timeoutId);
          resolve(data);
        } catch (error) {
          clearTimeout(timeoutId);
          reject(error);
        }
      });

      const result = await loadLibraryPromise;
      loadLibraryPromise = null; // Réinitialiser après succès
      return result;
    } catch (error) {
      loadLibraryPromise = null; // Réinitialiser en cas d'erreur
      return rejectWithValue('Erreur lors du chargement de la bibliothèque');
    }
  },
  {
    // Condition pour éviter les appels inutiles
    condition: (_, { getState }) => {
      const state = getState() as { library: LibraryState };
      return !state.library.isLoading && state.library.packs.length === 0;
    }
  }
);

export const searchLibrary = createAsyncThunk(
  'library/searchLibrary',
  async (searchTerm: string, { rejectWithValue, signal }) => {
    try {
      // Éviter les doubles appels pour le même terme
      if (searchLibraryPromise) {
        return await searchLibraryPromise;
      }

      searchLibraryPromise = new Promise(async (resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error('Timeout lors de la recherche'));
        }, 5000); // 5 secondes de timeout

        try {
          const response = await fetch(`http://localhost:8080/api/library/packs?search=${encodeURIComponent(searchTerm)}`, {
            signal
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          clearTimeout(timeoutId);
          resolve(data);
        } catch (error) {
          clearTimeout(timeoutId);
          reject(error);
        }
      });

      const result = await searchLibraryPromise;
      searchLibraryPromise = null;
      return result;
    } catch (error) {
      searchLibraryPromise = null;
      return rejectWithValue('Erreur lors de la recherche');
    }
  },
  {
    // Condition pour éviter les appels avec un terme vide
    condition: (searchTerm) => {
      return searchTerm.trim().length > 0;
    }
  }
);

export const filterLibrary = createAsyncThunk(
  'library/filterLibrary',
  async (filter: Partial<LibraryFilter>, { rejectWithValue, signal }) => {
    try {
      // Éviter les doubles appels
      if (filterLibraryPromise) {
        return await filterLibraryPromise;
      }

      filterLibraryPromise = new Promise(async (resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error('Timeout lors du filtrage'));
        }, 5000);

        try {
          const response = await fetch('http://localhost:8080/api/library/packs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(filter),
            signal
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          clearTimeout(timeoutId);
          resolve(data);
        } catch (error) {
          clearTimeout(timeoutId);
          reject(error);
        }
      });

      const result = await filterLibraryPromise;
      filterLibraryPromise = null;
      return result;
    } catch (error) {
      filterLibraryPromise = null;
      return rejectWithValue('Erreur lors du filtrage');
    }
  }
);

// Fonction utilitaire pour convertir PackInfo en MutablePackInfo
const toMutablePackInfo = (pack: PackInfo): MutablePackInfo => ({
  ...pack,
  tags: [...pack.tags]
});

// Slice avec destructuration atomique
export const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    // Action atomique pour définir les packs avec destructuration
    setPacks: (state, action: PayloadAction<PackInfo[]>) => {
      state.packs = action.payload.map(toMutablePackInfo);
    },

    // Action atomique pour ajouter un pack avec destructuration
    addPack: (state, action: PayloadAction<PackInfo>) => {
      const { id, name, description, version, author, tags, thumbnail, createdAt, updatedAt } = action.payload;
      state.packs.push({ 
        id, 
        name, 
        description, 
        version, 
        author, 
        tags: [...tags], 
        thumbnail, 
        createdAt, 
        updatedAt 
      });
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
        if (tags) state.packs[packIndex].tags = [...tags];
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
      if (tags !== undefined) state.filter.tags = [...tags];
      if (author !== undefined) state.filter.author = author;
      if (sortBy !== undefined) state.filter.sortBy = sortBy;
      if (sortOrder !== undefined) state.filter.sortOrder = sortOrder;
    },

    // Action atomique pour effacer l'erreur avec destructuration
    clearError: (state) => {
      state.error = undefined;
    },

    // Action atomique pour réinitialiser l'état de chargement
    resetLoadingState: (state) => {
      state.isLoading = false;
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
        state.isLoading = false;
        const packs = action.payload.packs || action.payload || [];
        state.packs = packs.map(toMutablePackInfo);
      })
      .addCase(loadLibrary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(searchLibrary.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(searchLibrary.fulfilled, (state, action) => {
        state.isLoading = false;
        const packs = action.payload.packs || action.payload || [];
        state.packs = packs.map(toMutablePackInfo);
      })
      .addCase(searchLibrary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(filterLibrary.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(filterLibrary.fulfilled, (state, action) => {
        state.isLoading = false;
        const packs = action.payload.packs || action.payload || [];
        state.packs = packs.map(toMutablePackInfo);
      })
      .addCase(filterLibrary.rejected, (state, action) => {
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
  clearError,
  resetLoadingState
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