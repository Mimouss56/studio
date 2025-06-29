import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ViewerState } from '@/types/state';

// État initial avec destructuration atomique
const initialState: ViewerState = {
  show: false,
  packId: undefined,
  diagramId: undefined,
  isFullscreen: false
};

// Slice avec destructuration atomique
export const viewerSlice = createSlice({
  name: 'viewer',
  initialState,
  reducers: {
    // Action atomique pour ouvrir le viewer avec destructuration
    openViewer: (state, action: PayloadAction<{ packId?: string; diagramId?: string }>) => {
      const { packId, diagramId } = action.payload;
      state.show = true;
      state.packId = packId;
      state.diagramId = diagramId;
    },

    // Action atomique pour fermer le viewer avec destructuration
    closeViewer: (state) => {
      state.show = false;
      state.packId = undefined;
      state.diagramId = undefined;
      state.isFullscreen = false;
    },

    // Action atomique pour basculer le mode plein écran avec destructuration
    toggleFullscreen: (state) => {
      state.isFullscreen = !state.isFullscreen;
    },

    // Action atomique pour définir le mode plein écran avec destructuration
    setFullscreen: (state, action: PayloadAction<boolean>) => {
      state.isFullscreen = action.payload;
    },

    // Action atomique pour mettre à jour le pack ID avec destructuration
    setPackId: (state, action: PayloadAction<string | undefined>) => {
      state.packId = action.payload;
    },

    // Action atomique pour mettre à jour le diagram ID avec destructuration
    setDiagramId: (state, action: PayloadAction<string | undefined>) => {
      state.diagramId = action.payload;
    }
  }
});

// Export des actions avec destructuration atomique
export const {
  openViewer,
  closeViewer,
  toggleFullscreen,
  setFullscreen,
  setPackId,
  setDiagramId
} = viewerSlice.actions;

// Export du reducer avec destructuration atomique
export const viewerReducer = viewerSlice.reducer;

// Sélecteurs atomiques avec destructuration
export const selectViewerState = (state: { viewer: ViewerState }) => state.viewer;
export const selectShow = (state: { viewer: ViewerState }) => state.viewer.show;
export const selectPackId = (state: { viewer: ViewerState }) => state.viewer.packId;
export const selectDiagramId = (state: { viewer: ViewerState }) => state.viewer.diagramId;
export const selectIsFullscreen = (state: { viewer: ViewerState }) => state.viewer.isFullscreen; 