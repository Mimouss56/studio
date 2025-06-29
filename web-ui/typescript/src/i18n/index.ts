import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Ressources de traduction avec destructuration atomique
const resources = {
  fr: {
    translation: {
      // Navigation avec destructuration atomique
      nav: {
        home: 'Accueil',
        library: 'Bibliothèque',
        editor: 'Éditeur',
        settings: 'Paramètres'
      },

      // Header avec destructuration atomique
      header: {
        title: 'Studio',
        navigation: {
          library: 'Bibliothèque',
          editor: 'Éditeur',
          settings: 'Paramètres'
        },
        device: {
          connected: 'Connecté',
          disconnected: 'Déconnecté'
        },
        theme: {
          toggle: 'Basculer le thème'
        }
      },

      // Notifications avec destructuration atomique
      notifications: {
        eventbus: {
          title: 'EventBus',
          connected: 'EventBus connecté avec succès',
          disconnected: 'EventBus déconnecté',
          error: 'Erreur de connexion EventBus'
        },
        device: {
          title: 'Device',
          plugged: 'Device branché avec succès',
          unplugged: 'Device débranché',
          failure: 'Échec du device'
        }
      },

      // Pages communes avec destructuration atomique
      common: {
        loading: 'Chargement...',
        error: 'Erreur',
        success: 'Succès',
        cancel: 'Annuler',
        save: 'Sauvegarder',
        delete: 'Supprimer',
        edit: 'Modifier',
        close: 'Fermer',
        confirm: 'Confirmer',
        back: 'Retour',
        next: 'Suivant',
        previous: 'Précédent',
        search: 'Rechercher',
        filter: 'Filtrer',
        sort: 'Trier',
        actions: 'Actions'
      },

      // Page d'accueil avec destructuration atomique
      home: {
        title: 'Bienvenue dans Studio',
        subtitle: 'Créez et visualisez vos diagrammes',
        description: 'Une application moderne pour la création et la visualisation de diagrammes de flux.',
        features: {
          title: 'Fonctionnalités',
          editor: 'Éditeur de diagrammes avancé',
          library: 'Bibliothèque de modèles',
          viewer: 'Visualiseur interactif',
          export: 'Export multi-format'
        },
        gettingStarted: {
          title: 'Pour commencer',
          step1: 'Parcourez la bibliothèque',
          step2: 'Créez un nouveau diagramme',
          step3: 'Utilisez l\'éditeur',
          step4: 'Visualisez vos créations'
        }
      },

      // Page bibliothèque avec destructuration atomique
      library: {
        title: 'Bibliothèque',
        loading: 'Chargement de la bibliothèque...',
        error: {
          title: 'Erreur de chargement',
          message: 'Impossible de charger la bibliothèque'
        },
        empty: {
          title: 'Bibliothèque vide',
          message: 'Aucun pack trouvé dans la bibliothèque',
          hint: 'Commencez par créer votre premier diagramme'
        },
        search: {
          label: 'Rechercher',
          placeholder: 'Rechercher dans la bibliothèque...'
        },
        sort: {
          label: 'Trier par',
          name: 'Nom',
          date: 'Date',
          popularity: 'Popularité'
        },
        order: {
          label: 'Ordre',
          ascending: 'Croissant',
          descending: 'Décroissant'
        },
        actions: {
          create: 'Créer',
          import: 'Importer'
        },
        pack: {
          by: 'Par',
          created: 'Créé le',
          open: 'Ouvrir',
          details: 'Détails'
        }
      },

      // Page éditeur avec destructuration atomique
      editor: {
        title: 'Éditeur',
        untitled: 'Sans titre',
        modified: 'Modifié',
        saving: 'Sauvegarde en cours...',
        actions: {
          save: 'Sauvegarder',
          saveAs: 'Sauvegarder sous',
          export: 'Exporter',
          undo: 'Annuler',
          redo: 'Rétablir'
        },
        palette: {
          title: 'Palette',
          START: 'Début',
          END: 'Fin',
          DECISION: 'Décision',
          PROCESS: 'Processus',
          INPUT: 'Entrée',
          OUTPUT: 'Sortie'
        },
        properties: {
          title: 'Propriétés',
          type: 'Type',
          position: 'Position',
          label: 'Libellé'
        },
        empty: {
          message: 'Aucun nœud dans le diagramme',
          hint: 'Utilisez la palette pour ajouter des éléments'
        },
      },

      // Page viewer avec destructuration atomique
      viewer: {
        title: 'Visualiseur',
        controls: {
          play: 'Lecture',
          pause: 'Pause',
          stop: 'Arrêt'
        },
        progress: {
          step: 'Étape'
        },
        empty: {
          message: 'Aucun diagramme à visualiser',
          hint: 'Ouvrez un diagramme depuis la bibliothèque'
        },
        current: {
          step: 'Étape actuelle',
          type: 'Type'
        }
      },

      // Page paramètres avec destructuration atomique
      settings: {
        title: 'Paramètres',
        actions: {
          export: 'Exporter',
          import: 'Importer',
          reset: 'Réinitialiser'
        },
        tabs: {
          general: 'Général',
          appearance: 'Apparence',
          editor: 'Éditeur',
          notifications: 'Notifications',
          about: 'À propos'
        },
        general: {
          title: 'Paramètres généraux',
          language: 'Langue',
          theme: 'Thème'
        },
        theme: {
          light: 'Clair',
          dark: 'Sombre'
        },
        appearance: {
          title: 'Apparence',
          info: 'Personnalisez l\'apparence de l\'application',
          animations: 'Animations',
          'animations.description': 'Activer les animations et transitions'
        },
        editor: {
          title: 'Éditeur',
          autoSave: 'Sauvegarde automatique',
          'autoSave.description': 'Sauvegarder automatiquement les modifications',
          autoSaveInterval: 'Intervalle de sauvegarde',
          seconds: 'secondes',
          minute: 'minute',
          minutes: 'minutes'
        },
        notifications: {
          title: 'Notifications',
          announceOptOut: 'Désactiver les annonces',
          'announceOptOut.description': 'Ne pas afficher les annonces système',
          allowEnriched: 'Autoriser le contenu enrichi',
          'allowEnriched.description': 'Autoriser les notifications avec contenu enrichi'
        },
        about: {
          title: 'À propos',
          application: 'Studio',
          description: 'Application moderne pour la création et la visualisation de diagrammes de flux.',
          license: 'Licence',
          'license.description': 'Cette application est distribuée sous licence Mozilla Public License 2.0.',
          copyright: '© 2024 Studio. Tous droits réservés.'
        },
        reset: {
          title: 'Réinitialiser les paramètres',
          warning: 'Cette action est irréversible',
          confirmation: 'Êtes-vous sûr de vouloir réinitialiser tous les paramètres ?',
          confirm: 'Réinitialiser'
        }
      }
    }
  },
  en: {
    translation: {
      // Navigation with atomic destructuring
      nav: {
        home: 'Home',
        library: 'Library',
        editor: 'Editor',
        settings: 'Settings'
      },

      // Header with atomic destructuring
      header: {
        title: 'Studio',
        navigation: {
          library: 'Library',
          editor: 'Editor',
          settings: 'Settings'
        },
        device: {
          connected: 'Connected',
          disconnected: 'Disconnected'
        },
        theme: {
          toggle: 'Toggle theme'
        }
      },

      // Notifications with atomic destructuring
      notifications: {
        eventbus: {
          title: 'EventBus',
          connected: 'EventBus connected successfully',
          disconnected: 'EventBus disconnected',
          error: 'EventBus connection error'
        },
        device: {
          title: 'Device',
          plugged: 'Device plugged successfully',
          unplugged: 'Device unplugged',
          failure: 'Device failure'
        }
      },

      // Common pages with atomic destructuring
      common: {
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        cancel: 'Cancel',
        save: 'Save',
        delete: 'Delete',
        edit: 'Edit',
        close: 'Close',
        confirm: 'Confirm',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',
        search: 'Search',
        filter: 'Filter',
        sort: 'Sort',
        actions: 'Actions'
      },

      // Home page with atomic destructuring
      home: {
        title: 'Welcome to Studio',
        subtitle: 'Create and visualize your diagrams',
        description: 'A modern application for creating and visualizing flow diagrams.',
        features: {
          title: 'Features',
          editor: 'Advanced diagram editor',
          library: 'Template library',
          viewer: 'Interactive viewer',
          export: 'Multi-format export'
        },
        gettingStarted: {
          title: 'Getting Started',
          step1: 'Browse the library',
          step2: 'Create a new diagram',
          step3: 'Use the editor',
          step4: 'Visualize your creations'
        }
      },

      // Library page with atomic destructuring
      library: {
        title: 'Library',
        loading: 'Loading library...',
        error: {
          title: 'Loading Error',
          message: 'Unable to load library'
        },
        empty: {
          title: 'Empty Library',
          message: 'No packs found in library',
          hint: 'Start by creating your first diagram'
        },
        search: {
          label: 'Search',
          placeholder: 'Search in library...'
        },
        sort: {
          label: 'Sort by',
          name: 'Name',
          date: 'Date',
          popularity: 'Popularity'
        },
        order: {
          label: 'Order',
          ascending: 'Ascending',
          descending: 'Descending'
        },
        actions: {
          create: 'Create',
          import: 'Import'
        },
        pack: {
          by: 'By',
          created: 'Created on',
          open: 'Open',
          details: 'Details'
        }
      },

      // Editor page with atomic destructuring
      editor: {
        title: 'Editor',
        untitled: 'Untitled',
        modified: 'Modified',
        saving: 'Saving...',
        actions: {
          save: 'Save',
          saveAs: 'Save As',
          export: 'Export',
          undo: 'Undo',
          redo: 'Redo'
        },
        palette: {
          title: 'Palette',
          START: 'Start',
          END: 'End',
          DECISION: 'Decision',
          PROCESS: 'Process',
          INPUT: 'Input',
          OUTPUT: 'Output'
        },
        properties: {
          title: 'Properties',
          type: 'Type',
          position: 'Position',
          label: 'Label'
        },
        empty: {
          message: 'No nodes in diagram',
          hint: 'Use the palette to add elements'
        },
      },

      // Viewer page with atomic destructuring
      viewer: {
        title: 'Viewer',
        controls: {
          play: 'Play',
          pause: 'Pause',
          stop: 'Stop'
        },
        progress: {
          step: 'Step'
        },
        empty: {
          message: 'No diagram to view',
          hint: 'Open a diagram from the library'
        },
        current: {
          step: 'Current step',
          type: 'Type'
        }
      },

      // Settings page with atomic destructuring
      settings: {
        title: 'Settings',
        actions: {
          export: 'Export',
          import: 'Import',
          reset: 'Reset'
        },
        tabs: {
          general: 'General',
          appearance: 'Appearance',
          editor: 'Editor',
          notifications: 'Notifications',
          about: 'About'
        },
        general: {
          title: 'General Settings',
          language: 'Language',
          theme: 'Theme'
        },
        theme: {
          light: 'Light',
          dark: 'Dark'
        },
        appearance: {
          title: 'Appearance',
          info: 'Customize the application appearance',
          animations: 'Animations',
          'animations.description': 'Enable animations and transitions'
        },
        editor: {
          title: 'Editor',
          autoSave: 'Auto Save',
          'autoSave.description': 'Automatically save changes',
          autoSaveInterval: 'Save interval',
          seconds: 'seconds',
          minute: 'minute',
          minutes: 'minutes'
        },
        notifications: {
          title: 'Notifications',
          announceOptOut: 'Disable announcements',
          'announceOptOut.description': 'Do not show system announcements',
          allowEnriched: 'Allow enriched content',
          'allowEnriched.description': 'Allow notifications with enriched content'
        },
        about: {
          title: 'About',
          application: 'Studio',
          description: 'Modern application for creating and visualizing flow diagrams.',
          license: 'License',
          'license.description': 'This application is distributed under Mozilla Public License 2.0.',
          copyright: '© 2024 Studio. All rights reserved.'
        },
        reset: {
          title: 'Reset Settings',
          warning: 'This action is irreversible',
          confirmation: 'Are you sure you want to reset all settings?',
          confirm: 'Reset'
        }
      }
    }
  }
};

// Configuration i18n avec destructuration atomique
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    debug: process.env.NODE_ENV === 'development',
    
    // Configuration avec destructuration atomique
    interpolation: {
      escapeValue: false
    },
    
    // Détection de langue avec destructuration atomique
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    },
    
    // Configuration backend avec destructuration atomique
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  });

export default i18n; 