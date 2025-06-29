import { DeviceState, EditorState, EvergreenState, LibraryState, SettingsState, UIState, ViewerState } from "./state";

// Types de base pour l'application avec destructuration atomique
export interface AppState {
  readonly device: DeviceState;
  readonly editor: EditorState;
  readonly evergreen: EvergreenState;
  readonly library: LibraryState;
  readonly settings: SettingsState;
  readonly ui: UIState;
  readonly viewer: ViewerState;
}

// Types pour les événements avec destructuration atomique
export interface EventBusMessage {
  readonly body: unknown;
  readonly headers?: Readonly<Record<string, unknown>>;
}

export interface EventBusError {
  readonly message: string;
  readonly code?: number;
}

// Types pour les composants avec destructuration atomique
export interface BaseComponentProps {
  readonly className?: string;
  readonly id?: string;
  readonly children?: React.ReactNode;
}

export interface ModalProps extends BaseComponentProps {
  readonly title: string;
  readonly content: React.ReactNode;
  readonly buttons?: readonly ModalButton[];
  readonly onClose: () => void;
}

export interface ModalButton {
  readonly label: string;
  readonly onClick: () => void;
  readonly disabled?: boolean;
  readonly variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'info';
}

// Types pour les actions Redux avec destructuration atomique
export interface Action<T = unknown> {
  readonly type: string;
  readonly payload?: T;
  readonly error?: boolean;
  readonly meta?: unknown;
}

// Types pour les hooks personnalisés avec destructuration atomique
export interface UseEventBusReturn {
  readonly eventBus: unknown;
  readonly isConnected: boolean;
  readonly connect: () => void;
  readonly disconnect: () => void;
  readonly registerHandler: (
    address: string,
    handler: (error: EventBusError, message: EventBusMessage) => void
  ) => void;
}

export interface UseLocalStorageReturn<T> {
  readonly value: T;
  readonly setValue: (value: T | ((prevValue: T) => T)) => void;
  readonly removeValue: () => void;
}

// Types utilitaires avec destructuration atomique
export type DeepPartial<T> = {
  readonly [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type ReadonlyRecord<K extends string, V> = Readonly<Record<K, V>>;

export type ImmutableArray<T> = readonly T[];

// Types pour les fonctions avec destructuration atomique
export type EventHandler<T = Event> = (event: T) => void;

export type AsyncFunction<TArgs extends readonly unknown[] = readonly unknown[], TReturn = unknown> = 
  (...args: TArgs) => Promise<TReturn>;

export type CallbackFunction<TArgs extends readonly unknown[] = readonly unknown[], TReturn = void> = 
  (...args: TArgs) => TReturn; 