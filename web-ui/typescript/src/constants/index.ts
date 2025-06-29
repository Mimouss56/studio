// Constantes pour les actions Redux avec destructuration atomique
export const ACTION_TYPES = {
  // Device actions
  DEVICE_PLUGGED: 'DEVICE_PLUGGED',
  DEVICE_UNPLUGGED: 'DEVICE_UNPLUGGED',
  DEVICE_MONITORING_START: 'DEVICE_MONITORING_START',
  DEVICE_MONITORING_STOP: 'DEVICE_MONITORING_STOP',
  
  // Editor actions
  SET_EDITOR_DIAGRAM: 'SET_EDITOR_DIAGRAM',
  UPDATE_DIAGRAM: 'UPDATE_DIAGRAM',
  SAVE_DIAGRAM: 'SAVE_DIAGRAM',
  SAVE_DIAGRAM_SUCCESS: 'SAVE_DIAGRAM_SUCCESS',
  SAVE_DIAGRAM_ERROR: 'SAVE_DIAGRAM_ERROR',
  
  // UI actions
  SHOW_LIBRARY: 'SHOW_LIBRARY',
  SHOW_EDITOR: 'SHOW_EDITOR',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  
  // Settings actions
  SET_ANNOUNCE_OPT_OUT: 'SET_ANNOUNCE_OPT_OUT',
  SET_ALLOW_ENRICHED: 'SET_ALLOW_ENRICHED',
  SET_LANGUAGE: 'SET_LANGUAGE',
  SET_THEME: 'SET_THEME',
  
  // Library actions
  LOAD_LIBRARY: 'LOAD_LIBRARY',
  LOAD_LIBRARY_SUCCESS: 'LOAD_LIBRARY_SUCCESS',
  LOAD_LIBRARY_ERROR: 'LOAD_LIBRARY_ERROR',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_FILTER: 'SET_FILTER',
  
  // Evergreen actions
  LOAD_EVERGREEN: 'LOAD_EVERGREEN',
  LOAD_EVERGREEN_SUCCESS: 'LOAD_EVERGREEN_SUCCESS',
  LOAD_EVERGREEN_ERROR: 'LOAD_EVERGREEN_ERROR',
  
  // Viewer actions
  SHOW_VIEWER: 'SHOW_VIEWER',
  HIDE_VIEWER: 'HIDE_VIEWER',
  SET_FULLSCREEN: 'SET_FULLSCREEN'
} as const;

// Constantes pour le stockage local avec destructuration atomique
export const STORAGE_KEYS = {
  ANNOUNCE_LAST_SHOWN: 'announce_last_shown',
  SETTINGS: 'app_settings',
  THEME: 'app_theme',
  LANGUAGE: 'app_language',
  AUTO_SAVE_INTERVAL: 'auto_save_interval'
} as const;

// Constantes pour les événements EventBus avec destructuration atomique
export const EVENT_BUS_ADDRESSES = {
  DEVICE_PLUGGED: 'storyteller.plugged',
  DEVICE_UNPLUGGED: 'storyteller.unplugged',
  DEVICE_FAILURE: 'storyteller.failure',
  DIAGRAM_UPDATE: 'diagram.update',
  DIAGRAM_SAVE: 'diagram.save'
} as const;

// Constantes pour les notifications avec destructuration atomique
export const NOTIFICATION_DURATIONS = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 10000,
  PERSISTENT: -1
} as const;

// Constantes pour les thèmes avec destructuration atomique
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
} as const;

// Constantes pour les langues avec destructuration atomique
export const LANGUAGES = {
  FR: 'fr',
  EN: 'en'
} as const;

// Constantes pour les types de nœuds de diagramme avec destructuration atomique
export const NODE_TYPES = {
  START: 'start',
  END: 'end',
  DECISION: 'decision',
  PROCESS: 'process',
  INPUT: 'input',
  OUTPUT: 'output'
} as const;

// Constantes pour les priorités d'annonce avec destructuration atomique
export const ANNOUNCE_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
} as const;

// Constantes pour les routes avec destructuration atomique
export const ROUTES = {
  HOME: '/',
  LIBRARY: '/library',
  EDITOR: '/editor',
  VIEWER: '/viewer',
  SETTINGS: '/settings'
} as const;

// Constantes pour les classes CSS Bootstrap avec destructuration atomique
export const BOOTSTRAP_CLASSES = {
  // Layout
  CONTAINER: 'container',
  CONTAINER_FLUID: 'container-fluid',
  ROW: 'row',
  COL: 'col',
  
  // Components
  BUTTON: 'btn',
  BUTTON_PRIMARY: 'btn-primary',
  BUTTON_SECONDARY: 'btn-secondary',
  BUTTON_SUCCESS: 'btn-success',
  BUTTON_DANGER: 'btn-danger',
  BUTTON_WARNING: 'btn-warning',
  BUTTON_INFO: 'btn-info',
  BUTTON_OUTLINE_PRIMARY: 'btn-outline-primary',
  BUTTON_OUTLINE_SECONDARY: 'btn-outline-secondary',
  BUTTON_OUTLINE_SUCCESS: 'btn-outline-success',
  BUTTON_OUTLINE_DANGER: 'btn-outline-danger',
  BUTTON_OUTLINE_WARNING: 'btn-outline-warning',
  BUTTON_OUTLINE_INFO: 'btn-outline-info',
  BUTTON_CLOSE: 'btn-close',
  
  // Modal
  MODAL: 'modal',
  MODAL_DIALOG: 'modal-dialog',
  MODAL_CONTENT: 'modal-content',
  MODAL_HEADER: 'modal-header',
  MODAL_BODY: 'modal-body',
  MODAL_FOOTER: 'modal-footer',
  MODAL_TITLE: 'modal-title',
  
  // Alert
  ALERT: 'alert',
  ALERT_SUCCESS: 'alert-success',
  ALERT_DANGER: 'alert-danger',
  ALERT_WARNING: 'alert-warning',
  ALERT_INFO: 'alert-info',
  
  // Form
  FORM_CONTROL: 'form-control',
  FORM_LABEL: 'form-label',
  FORM_CHECK: 'form-check',
  FORM_CHECK_INPUT: 'form-check-input',
  FORM_CHECK_LABEL: 'form-check-label',
  
  // Navigation
  NAV: 'nav',
  NAV_TABS: 'nav-tabs',
  NAV_ITEM: 'nav-item',
  NAV_LINK: 'nav-link',
  TAB_CONTENT: 'tab-content',
  TAB_PANE: 'tab-pane',
  
  // Navbar
  NAVBAR: 'navbar',
  NAVBAR_BRAND: 'navbar-brand',
  NAVBAR_NAV: 'navbar-nav',
  
  // Dropdown
  DROPDOWN: 'dropdown',
  DROPDOWN_TOGGLE: 'dropdown-toggle',
  DROPDOWN_MENU: 'dropdown-menu',
  DROPDOWN_ITEM: 'dropdown-item',
  
  // Card
  CARD: 'card',
  CARD_HEADER: 'card-header',
  CARD_BODY: 'card-body',
  CARD_TITLE: 'card-title',
  CARD_TEXT: 'card-text',
  
  // Badge
  BADGE: 'badge',
  BADGE_PRIMARY: 'badge-primary',
  BADGE_SECONDARY: 'badge-secondary',
  BADGE_SUCCESS: 'badge-success',
  BADGE_DANGER: 'badge-danger',
  BADGE_WARNING: 'badge-warning',
  BADGE_INFO: 'badge-info',
  
  // Progress
  PROGRESS: 'progress',
  PROGRESS_BAR: 'progress-bar'
} as const;

// Constantes pour les messages d'erreur avec destructuration atomique
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erreur de connexion réseau',
  VALIDATION_ERROR: 'Erreur de validation',
  UNAUTHORIZED: 'Non autorisé',
  NOT_FOUND: 'Ressource non trouvée',
  SERVER_ERROR: 'Erreur serveur',
  UNKNOWN_ERROR: 'Erreur inconnue'
} as const; 