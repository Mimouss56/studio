import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UIState, Notification, ModalProps } from '@/types/state';

// État initial avec destructuration atomique
const initialState: UIState = {
  sidebarCollapsed: false,
  notifications: [],
  modals: [],
  loadingStates: {},
  errors: {}
};

// Slice avec destructuration atomique
export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Action atomique pour basculer la sidebar avec destructuration
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },

    // Action atomique pour définir l'état de la sidebar avec destructuration
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },

    // Action atomique pour ajouter une notification avec destructuration
    addNotification: (state, action: PayloadAction<Notification>) => {
      const { id, type, title, message, duration, persistent } = action.payload;
      state.notifications.push({ id, type, title, message, duration, persistent });
    },

    // Action atomique pour supprimer une notification avec destructuration
    removeNotification: (state, action: PayloadAction<string>) => {
      const notificationId = action.payload;
      state.notifications = state.notifications.filter(notification => notification.id !== notificationId);
    },

    // Action atomique pour effacer toutes les notifications avec destructuration
    clearNotifications: (state) => {
      state.notifications = [];
    },

    // Action atomique pour ajouter un modal avec destructuration
    addModal: (state, action: PayloadAction<ModalProps>) => {
      const { id, title, content, buttons, onClose } = action.payload;
      state.modals.push({ id, title, content, buttons, onClose });
    },

    // Action atomique pour supprimer un modal avec destructuration
    removeModal: (state, action: PayloadAction<string>) => {
      const modalId = action.payload;
      state.modals = state.modals.filter(modal => modal.id !== modalId);
    },

    // Action atomique pour effacer tous les modals avec destructuration
    clearModals: (state) => {
      state.modals = [];
    },

    // Action atomique pour définir un état de chargement avec destructuration
    setLoadingState: (state, action: PayloadAction<{ key: string; isLoading: boolean }>) => {
      const { key, isLoading } = action.payload;
      state.loadingStates[key] = isLoading;
    },

    // Action atomique pour effacer un état de chargement avec destructuration
    clearLoadingState: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      delete state.loadingStates[key];
    },

    // Action atomique pour définir une erreur avec destructuration
    setError: (state, action: PayloadAction<{ key: string; error: string }>) => {
      const { key, error } = action.payload;
      state.errors[key] = error;
    },

    // Action atomique pour effacer une erreur avec destructuration
    clearError: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      delete state.errors[key];
    },

    // Action atomique pour effacer toutes les erreurs avec destructuration
    clearAllErrors: (state) => {
      state.errors = {};
    }
  }
});

// Export des actions avec destructuration atomique
export const {
  toggleSidebar,
  setSidebarCollapsed,
  addNotification,
  removeNotification,
  clearNotifications,
  addModal,
  removeModal,
  clearModals,
  setLoadingState,
  clearLoadingState,
  setError,
  clearError,
  clearAllErrors
} = uiSlice.actions;

// Export du reducer avec destructuration atomique
export const uiReducer = uiSlice.reducer;

// Sélecteurs atomiques avec destructuration
export const selectUIState = (state: { ui: UIState }) => state.ui;
export const selectSidebarCollapsed = (state: { ui: UIState }) => state.ui.sidebarCollapsed;
export const selectNotifications = (state: { ui: UIState }) => state.ui.notifications;
export const selectModals = (state: { ui: UIState }) => state.ui.modals;
export const selectLoadingStates = (state: { ui: UIState }) => state.ui.loadingStates;
export const selectErrors = (state: { ui: UIState }) => state.ui.errors; 