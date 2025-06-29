import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import type { BaseComponentProps } from '../../types';
import { BOOTSTRAP_CLASSES, ROUTES, THEMES, LANGUAGES } from '../../constants';
import { selectDevice, selectEvergreen } from '../../store';

// Interface pour les props du Header avec destructuration atomique
interface HeaderProps extends BaseComponentProps {
  readonly theme: string;
  readonly language: string;
  readonly onThemeChange: (theme: string) => void;
  readonly onLanguageChange: (language: string) => void;
}

// Composant Header avec destructuration atomique et Bootstrap 5.3.7
export const Header: React.FC<HeaderProps> = ({
  theme,
  language,
  onThemeChange,
  onLanguageChange,
  className = '',
  ...props
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Sélecteurs Redux avec destructuration atomique
  const { isPlugged, deviceInfo } = useSelector(selectDevice);
  const { version } = useSelector(selectEvergreen);

  // Fonctions de navigation avec destructuration atomique
  const handleNavigation = (route: string) => {
    navigate(route);
  };

  // Fonction de changement de thème avec destructuration atomique
  const handleThemeChange = () => {
    const newTheme = theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    onThemeChange(newTheme);
  };

  // Fonction de changement de langue avec destructuration atomique
  const handleLanguageChange = (newLanguage: string) => {
    onLanguageChange(newLanguage);
  };

  // Fonction pour obtenir la classe active avec destructuration atomique
  const getActiveClass = (route: string) => {
    const { pathname } = location;
    return pathname === route ? 'active' : '';
  };

  // Destructuration des classes Bootstrap
  const {
    CONTAINER_FLUID,
    ROW,
    COL,
    BUTTON,
    BUTTON_OUTLINE_PRIMARY,
    BUTTON_OUTLINE_SECONDARY,
    NAVBAR,
    NAVBAR_BRAND,
    DROPDOWN,
    DROPDOWN_MENU,
    DROPDOWN_ITEM,
    BADGE,
    BADGE_SUCCESS,
    BADGE_DANGER
  } = BOOTSTRAP_CLASSES;

  return (
    <header className={`${NAVBAR} navbar-expand-lg navbar-${theme} bg-${theme} border-bottom`}>
      <div className={CONTAINER_FLUID}>
        <div className={ROW}>
          <div className={`${COL} d-flex justify-content-between align-items-center`}>

            {/* Logo et titre avec destructuration atomique */}
            <div className="d-flex align-items-center">
              <span className={`${NAVBAR_BRAND} fw-bold`}>
                {t('header.title')}
                {version && (
                  <span className="text-muted ms-2">
                    ({version})
                  </span>
                )}
              </span>
            </div>

            {/* Navigation principale avec destructuration atomique */}
            <nav className="navbar-nav me-auto">
              <div className="nav-item">
                <button
                  className={`${BUTTON} ${BUTTON_OUTLINE_PRIMARY} me-2 ${getActiveClass(ROUTES.LIBRARY)}`}
                  onClick={() => handleNavigation(ROUTES.LIBRARY)}
                  title={t('header.navigation.library')}
                >
                  <i className="bi bi-collection me-1"></i>
                  {t('header.navigation.library')}
                </button>
              </div>

              <div className="nav-item">
                <button
                  className={`${BUTTON} ${BUTTON_OUTLINE_PRIMARY} me-2 ${getActiveClass(ROUTES.EDITOR)}`}
                  onClick={() => handleNavigation(ROUTES.EDITOR)}
                  title={t('header.navigation.editor')}
                >
                  <i className="bi bi-pencil-square me-1"></i>
                  {t('header.navigation.editor')}
                </button>
              </div>
            </nav>

            {/* Contrôles utilisateur avec destructuration atomique */}
            <div className="d-flex align-items-center">

              {/* Statut du device avec destructuration atomique */}
              <div className="me-3">
                <span className={`${BADGE} ${isPlugged ? BADGE_SUCCESS : BADGE_DANGER}`}>
                  <i className={`bi bi-${isPlugged ? 'check-circle' : 'x-circle'} me-1`}></i>
                  {isPlugged ? t('header.device.connected') : t('header.device.disconnected')}
                </span>
                {deviceInfo && (
                  <small className="text-muted d-block">
                    {deviceInfo.name} v{deviceInfo.version}
                  </small>
                )}
              </div>

              {/* Sélecteur de langue avec destructuration atomique */}
              <div className={`${DROPDOWN} me-2`}>
                <button
                  className={`${BUTTON} ${BUTTON_OUTLINE_SECONDARY} dropdown-toggle`}
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {language === LANGUAGES.FR ? '🇫🇷' : '🇬🇧'}
                </button>
                <ul className={DROPDOWN_MENU}>
                  <li>
                    <button
                      className={`${DROPDOWN_ITEM} ${language === LANGUAGES.FR ? 'active' : ''}`}
                      onClick={() => handleLanguageChange(LANGUAGES.FR)}
                    >
                      🇫🇷 Français
                    </button>
                  </li>
                  <li>
                    <button
                      className={`${DROPDOWN_ITEM} ${language === LANGUAGES.EN ? 'active' : ''}`}
                      onClick={() => handleLanguageChange(LANGUAGES.EN)}
                    >
                      🇬🇧 English
                    </button>
                  </li>
                </ul>
              </div>

              {/* Bouton de thème avec destructuration atomique */}
              <button
                className={`${BUTTON} ${BUTTON_OUTLINE_SECONDARY} me-2`}
                onClick={handleThemeChange}
                title={t('header.theme.toggle')}
              >
                <i className={`bi bi-${theme === THEMES.LIGHT ? 'moon' : 'sun'}`}></i>
              </button>

              {/* Bouton paramètres avec destructuration atomique */}
              <button
                className={`${BUTTON} ${BUTTON_OUTLINE_SECONDARY}`}
                onClick={() => handleNavigation(ROUTES.SETTINGS)}
                title={t('header.navigation.settings')}
              >
                <i className="bi bi-gear"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}; 