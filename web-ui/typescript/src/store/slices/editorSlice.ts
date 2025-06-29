import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { EditorState, DiagramModel, DiagramNode, DiagramLink } from '@/types/state';

// Fonctions utilitaires pour convertir les tableaux readonly en mutables
const toMutableArray = <T>(array: readonly T[]): T[] => [...array];
const toMutableDiagram = (diagram: DiagramModel) => ({
  ...diagram,
  nodes: toMutableArray(diagram.nodes),
  links: toMutableArray(diagram.links),
  metadata: diagram.metadata ? { ...diagram.metadata } : undefined
});

// État initial avec destructuration atomique
const initialState: EditorState = {
  diagram: {
    id: 'default',
    name: 'Nouveau diagramme',
    nodes: [],
    links: [],
    metadata: {}
  },
  filename: '',
  isModified: false,
  isSaving: false
};

// Actions asynchrones avec destructuration atomique
export const saveDiagram = createAsyncThunk(
  'editor/saveDiagram',
  async (filename: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { editor: EditorState };
      const { diagram } = state.editor;
      
      // Simulation d'une sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { filename, diagram };
    } catch (error) {
      return rejectWithValue('Erreur lors de la sauvegarde');
    }
  }
);

// Slice avec destructuration atomique
export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    // Action atomique pour définir le diagramme avec destructuration
    setEditorDiagram: (state, action: PayloadAction<{ diagram: DiagramModel; filename: string }>) => {
      const { diagram, filename } = action.payload;
      state.diagram = toMutableDiagram(diagram);
      state.filename = filename;
      state.isModified = false;
    },

    // Action atomique pour mettre à jour le diagramme avec destructuration
    updateDiagram: (state, action: PayloadAction<Partial<DiagramModel>>) => {
      const { id, name, nodes, links, metadata } = action.payload;
      
      if (id) state.diagram.id = id;
      if (name) state.diagram.name = name;
      if (nodes) state.diagram.nodes = toMutableArray(nodes);
      if (links) state.diagram.links = toMutableArray(links);
      if (metadata) state.diagram.metadata = { ...metadata };
      
      state.isModified = true;
    },

    // Action atomique pour ajouter un nœud avec destructuration
    addNode: (state, action: PayloadAction<DiagramNode>) => {
      const { id, type, position, data } = action.payload;
      state.diagram.nodes.push({ id, type, position, data });
      state.isModified = true;
    },

    // Action atomique pour mettre à jour un nœud avec destructuration
    updateNode: (state, action: PayloadAction<{ id: string; updates: Partial<DiagramNode> }>) => {
      const { id, updates } = action.payload;
      const nodeIndex = state.diagram.nodes.findIndex(node => node.id === id);
      
      if (nodeIndex !== -1) {
        const { type, position, data } = updates;
        if (type) state.diagram.nodes[nodeIndex].type = type;
        if (position) state.diagram.nodes[nodeIndex].position = position;
        if (data) state.diagram.nodes[nodeIndex].data = data;
        state.isModified = true;
      }
    },

    // Action atomique pour supprimer un nœud avec destructuration
    removeNode: (state, action: PayloadAction<string>) => {
      const nodeId = action.payload;
      state.diagram.nodes = state.diagram.nodes.filter(node => node.id !== nodeId);
      state.diagram.links = state.diagram.links.filter(
        link => link.source !== nodeId && link.target !== nodeId
      );
      state.isModified = true;
    },

    // Action atomique pour ajouter un lien avec destructuration
    addLink: (state, action: PayloadAction<DiagramLink>) => {
      const { id, source, target, data } = action.payload;
      state.diagram.links.push({ id, source, target, data });
      state.isModified = true;
    },

    // Action atomique pour supprimer un lien avec destructuration
    removeLink: (state, action: PayloadAction<string>) => {
      const linkId = action.payload;
      state.diagram.links = state.diagram.links.filter(link => link.id !== linkId);
      state.isModified = true;
    },

    // Action atomique pour mettre à jour le nom du fichier avec destructuration
    setFilename: (state, action: PayloadAction<string>) => {
      state.filename = action.payload;
    },

    // Action atomique pour réinitialiser les modifications avec destructuration
    resetModified: (state) => {
      state.isModified = false;
    },

    // Action atomique pour effacer le diagramme avec destructuration
    clearDiagram: (state) => {
      state.diagram = {
        id: 'default',
        name: 'Nouveau diagramme',
        nodes: [],
        links: [],
        metadata: {}
      };
      state.filename = '';
      state.isModified = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Gestion atomique des actions asynchrones avec destructuration
      .addCase(saveDiagram.pending, (state) => {
        state.isSaving = true;
      })
      .addCase(saveDiagram.fulfilled, (state, action) => {
        const { filename } = action.payload;
        state.filename = filename;
        state.isModified = false;
        state.isSaving = false;
      })
      .addCase(saveDiagram.rejected, (state) => {
        state.isSaving = false;
      });
  }
});

// Export des actions avec destructuration atomique
export const {
  setEditorDiagram,
  updateDiagram,
  addNode,
  updateNode,
  removeNode,
  addLink,
  removeLink,
  setFilename,
  resetModified,
  clearDiagram
} = editorSlice.actions;

// Export du reducer avec destructuration atomique
export const editorReducer = editorSlice.reducer;

// Sélecteurs atomiques avec destructuration
export const selectEditorState = (state: { editor: EditorState }) => state.editor;
export const selectDiagram = (state: { editor: EditorState }) => state.editor.diagram;
export const selectFilename = (state: { editor: EditorState }) => state.editor.filename;
export const selectIsModified = (state: { editor: EditorState }) => state.editor.isModified;
export const selectIsSaving = (state: { editor: EditorState }) => state.editor.isSaving; 