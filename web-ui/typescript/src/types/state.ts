import type { Action } from './index';

// Types pour les états Redux avec destructuration atomique
export interface DeviceState {
  readonly isPlugged: boolean;
  readonly isMonitoring: boolean;
  readonly deviceInfo?: DeviceInfo;
}

export interface DeviceInfo {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  readonly connectedAt: Date;
}

export interface EditorState {
  readonly diagram: DiagramModel;
  readonly filename: string;
  readonly isModified: boolean;
  readonly isSaving: boolean;
}

export interface DiagramModel {
  readonly id: string;
  readonly name: string;
  readonly nodes: readonly DiagramNode[];
  readonly links: readonly DiagramLink[];
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface DiagramNode {
  readonly id: string;
  readonly type: string;
  readonly position: Readonly<{ readonly x: number; readonly y: number }>;
  readonly data: Readonly<Record<string, unknown>>;
}

export interface DiagramLink {
  readonly id: string;
  readonly source: string;
  readonly target: string;
  readonly data?: Readonly<Record<string, unknown>>;
}

export interface EvergreenState {
  readonly version?: string;
  readonly announce?: AnnounceInfo;
  readonly isLoading: boolean;
}

export interface AnnounceInfo {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly date: string;
  readonly priority: 'low' | 'medium' | 'high';
}

export interface LibraryState {
  readonly packs: readonly PackInfo[];
  readonly isLoading: boolean;
  readonly error?: string;
  readonly searchTerm: string;
  readonly filter: LibraryFilter;
}

export interface PackInfo {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly version: string;
  readonly author: string;
  readonly tags: readonly string[];
  readonly thumbnail?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface LibraryFilter {
  readonly category?: string;
  readonly tags?: readonly string[];
  readonly author?: string;
  readonly sortBy: 'name' | 'date' | 'popularity';
  readonly sortOrder: 'asc' | 'desc';
}

export interface SettingsState {
  readonly announceOptOut: boolean;
  readonly allowEnriched: boolean;
  readonly language: string;
  readonly theme: 'light' | 'dark';
  readonly autoSave: boolean;
  readonly autoSaveInterval: number;
}

export interface UIState {
  readonly shown: 'library' | 'editor' | null;
  readonly isLoading: boolean;
  readonly error?: string;
  readonly notifications: readonly Notification[];
}

export interface Notification {
  readonly id: string;
  readonly type: 'info' | 'success' | 'warning' | 'error';
  readonly message: string;
  readonly title?: string;
  readonly duration?: number;
  readonly action?: {
    readonly label: string;
    readonly onClick: () => void;
  };
}

export interface ViewerState {
  readonly show: boolean;
  readonly packId?: string;
  readonly diagramId?: string;
  readonly isFullscreen: boolean;
}

// Types pour les actions avec destructuration atomique
export interface DeviceAction extends Action {
  readonly type: 'DEVICE_PLUGGED' | 'DEVICE_UNPLUGGED' | 'DEVICE_MONITORING_START' | 'DEVICE_MONITORING_STOP';
  readonly payload?: DeviceInfo;
}

export interface EditorAction extends Action {
  readonly type: 'SET_EDITOR_DIAGRAM' | 'UPDATE_DIAGRAM' | 'SAVE_DIAGRAM' | 'SAVE_DIAGRAM_SUCCESS' | 'SAVE_DIAGRAM_ERROR';
  readonly payload?: DiagramModel | string;
}

export interface UIAction extends Action {
  readonly type: 'SHOW_LIBRARY' | 'SHOW_EDITOR' | 'SET_LOADING' | 'SET_ERROR' | 'ADD_NOTIFICATION' | 'REMOVE_NOTIFICATION';
  readonly payload?: unknown;
}

// Types pour les sélecteurs avec destructuration atomique
export type RootState = {
  readonly device: DeviceState;
  readonly editor: EditorState;
  readonly evergreen: EvergreenState;
  readonly library: LibraryState;
  readonly settings: SettingsState;
  readonly ui: UIState;
  readonly viewer: ViewerState;
};

// Types pour les thunks avec destructuration atomique
export interface ThunkAction<TReturn = void> {
  (dispatch: Dispatch, getState: () => RootState): TReturn;
}

export interface Dispatch {
  <T extends Action>(action: T): T;
  <TReturn>(thunk: ThunkAction<TReturn>): TReturn;
} 