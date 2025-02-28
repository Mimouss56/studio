import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Pack, LibraryPack } from '../../@types/pack';
import {
  fetchLibraryInfos,
  fetchLibraryPacks,
  downloadFromLibrary,
  uploadToLibrary,
  convertInLibrary,
  removeFromLibrary
} from '../services/library';
import { LibraryMetadata } from '../../@types/library';

interface LibraryState {
  metadata: LibraryMetadata | null;
  packs: Pack[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LibraryState = {
  metadata: null,
  packs: [],
  status: 'idle',
  error: null
};

// Thunks
export const fetchLibrary = createAsyncThunk(
  'library/fetch',
  async () => {
    const [metadata, packs] = await Promise.all([
      fetchLibraryInfos(),
      fetchLibraryPacks()
    ]);
    return { metadata, packs };
  }
);

export const uploadPack = createAsyncThunk(
  'library/upload',
  async ({ uuid, path, packData, onProgress }: {
    uuid: string;
    path: string;
    packData: LibraryPack;
    onProgress?: (progress: number) => void;
  }) => {
    const response = await uploadToLibrary(uuid, path, packData, 
      onProgress ? (event: ProgressEvent) => {
        if (event.lengthComputable) {
          onProgress(event.loaded / event.total);
        }
      } : null
    );
    return response;
  }
);

export const downloadPack = createAsyncThunk(
  'library/download',
  async ({ uuid, path }: { uuid: string; path: string }) => {
    const response = await downloadFromLibrary(uuid, path);
    return response;
  }
);

export const convertPack = createAsyncThunk(
  'library/convert',
  async ({ uuid, path, format, allowEnriched }: {
    uuid: string;
    path: string;
    format: string;
    allowEnriched: boolean;
  }) => {
    const response = await convertInLibrary(uuid, path, format, allowEnriched);
    return response;
  }
);

export const removePack = createAsyncThunk(
  'library/remove',
  async (path: string) => {
    await removeFromLibrary(path);
    return path;
  }
);

// Slice
const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    resetLibrary: () => initialState
  },
  extraReducers: (builder) => {
    builder
      // Fetch Library
      .addCase(fetchLibrary.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLibrary.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.metadata = action.payload.metadata;
        state.packs = action.payload.packs;
      })
      .addCase(fetchLibrary.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Une erreur est survenue';
      })
      // Upload Pack
      .addCase(uploadPack.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      // Remove Pack
      .addCase(removePack.fulfilled, (state, action) => {
        state.packs = state.packs.filter(pack => pack.path !== action.payload);
      })
      // Convert Pack
      .addCase(convertPack.fulfilled, (state) => {
        state.status = 'succeeded';
      });
  }
});

export const { resetLibrary } = librarySlice.actions;
export default librarySlice.reducer;