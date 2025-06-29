import React, { Suspense, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';

// Import des hooks personnalisés avec destructuration atomique
import { useEventBus } from './hooks/useEventBus';
import { useNotification } from './hooks/useNotification';
import { useLocalStorage } from './hooks/useLocalStorage';

// Import du store avec destructuration atomique
import { store } from './store';

// Import des composants avec destructuration atomique
import { Header } from './components/layout/Header';
import { LoadingSpinner } from './components/common/LoadingSpinner';

// Import des pages avec destructuration atomique
import { LibraryPage } from './pages/LibraryPage';
import { EditorPage } from './pages/EditorPage';
import { ViewerPage } from './pages/ViewerPage';
import { SettingsPage } from './pages/SettingsPage';

// Import des constantes avec destructuration atomique
import { EVENT_BUS_ADDRESSES, STORAGE_KEYS, THEMES } from './constants';

// Import des types avec destructuration atomique

// Composant principal avec destructuration atomique
const AppContent: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { showNotification } = useNotification();

  // Hook EventBus avec destructuration atomique
  const { eventBus, isConnected, registerHandler } = useEventBus({
    onOpen: () => {
      console.log('EventBus connecté');
      showNotification({
        type: 'success',
        message: t('notifications.eventbus.connected'),
        title: t('notifications.eventbus.title')
      });
    },
    onClose: () => {
      console.log('EventBus déconnecté');
      showNotification({
        type: 'warning',
        message: t('notifications.eventbus.disconnected'),
        title: t('notifications.eventbus.title')
      });
    },
    onError: (error) => {
      console.error('Erreur EventBus:', error);
      showNotification({
        type: 'error',
        message: t('notifications.eventbus.error'),
        title: t('notifications.eventbus.title')
      });
    }
  });

  // Hook localStorage pour les paramètres avec destructuration atomique
  const { value: theme, setValue: setTheme } = useLocalStorage<string>(
    STORAGE_KEYS.THEME,
    THEMES.LIGHT
  );

  const { value: language, setValue: setLanguage } = useLocalStorage<string>(
    STORAGE_KEYS.LANGUAGE,
    'fr'
  );

  // Effet pour appliquer le thème avec destructuration atomique
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);

  // Effet pour appliquer la langue avec destructuration atomique
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  // Effet pour enregistrer les handlers EventBus avec destructuration atomique
  useEffect(() => {
    if (isConnected && eventBus) {
      const { DEVICE_PLUGGED, DEVICE_UNPLUGGED, DEVICE_FAILURE } = EVENT_BUS_ADDRESSES;

      // Handler pour device branché avec destructuration atomique
      registerHandler(DEVICE_PLUGGED, (error, message) => {
        if (error) {
          console.error('Erreur device branché:', error);
          return;
        }

        const { body } = message;
        console.log('Device branché:', body);

        showNotification({
          type: 'success',
          message: t('notifications.device.plugged'),
          title: t('notifications.device.title')
        });
      });

      // Handler pour device débranché avec destructuration atomique
      registerHandler(DEVICE_UNPLUGGED, (error) => {
        if (error) {
          console.error('Erreur device débranché:', error);
          return;
        }

        console.log('Device débranché');

        showNotification({
          type: 'warning',
          message: t('notifications.device.unplugged'),
          title: t('notifications.device.title')
        });
      });

      // Handler pour échec device avec destructuration atomique
      registerHandler(DEVICE_FAILURE, (error) => {
        if (error) {
          console.error('Échec device:', error);
          return;
        }

        console.log('Échec device');

        showNotification({
          type: 'error',
          message: t('notifications.device.failure'),
          title: t('notifications.device.title')
        });
      });
    }
  }, [isConnected, eventBus, registerHandler, showNotification, t]);

  return (
    <div className="App">
      {/* Container Bootstrap avec destructuration atomique */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {/* Header avec destructuration atomique */}
            <Header
              theme={theme}
              language={language}
              onThemeChange={setTheme}
              onLanguageChange={setLanguage}
            />

            {/* Contenu principal avec destructuration atomique */}
            <main className="main-content">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<LibraryPage />} />
                  <Route path="/library" element={<LibraryPage />} />
                  <Route path="/editor" element={<EditorPage />} />
                  <Route path="/viewer" element={<ViewerPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </div>
      </div>

      {/* ToastContainer avec destructuration atomique */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
    </div>
  );
};

// Composant App principal avec destructuration atomique
export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}; 