import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Switch from 'react-switch';
import { BOOTSTRAP_CLASSES, THEMES, LANGUAGES } from '../constants';
import { selectSettings } from '../store';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../constants';

// Interface pour les props de la page Settings avec destructuration atomique
interface SettingsPageProps {
  readonly className?: string;
}

// Composant SettingsPage avec destructuration atomique et Bootstrap 5.3.7
export const SettingsPage: React.FC<SettingsPageProps> = ({
  className = ''
}) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  // Sélecteurs Redux avec destructuration atomique
  const { announceOptOut, allowEnriched, language, theme, autoSave, autoSaveInterval } = useSelector(selectSettings);

  // États locaux avec destructuration atomique
  const [activeTab, setActiveTab] = useState('general');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Hooks localStorage avec destructuration atomique
  const { value: storedTheme, setValue: setStoredTheme } = useLocalStorage<string>(
    STORAGE_KEYS.THEME,
    THEMES.LIGHT
  );

  const { value: storedLanguage, setValue: setStoredLanguage } = useLocalStorage<string>(
    STORAGE_KEYS.LANGUAGE,
    LANGUAGES.FR
  );

  // Destructuration des classes Bootstrap
  const {
    CONTAINER,
    ROW,
    COL,
    CARD,
    CARD_HEADER,
    CARD_BODY,
    CARD_TITLE,
    BUTTON,
    BUTTON_PRIMARY,
    BUTTON_SECONDARY,
    BUTTON_OUTLINE_PRIMARY,
    BUTTON_OUTLINE_SECONDARY,
    BUTTON_DANGER,
    FORM_CONTROL,
    FORM_LABEL,
    FORM_CHECK,
    FORM_CHECK_INPUT,
    FORM_CHECK_LABEL,
    NAV,
    NAV_TABS,
    NAV_ITEM,
    NAV_LINK,
    TAB_CONTENT,
    TAB_PANE,
    ALERT,
    ALERT_INFO,
    ALERT_WARNING,
    BADGE,
    BADGE_PRIMARY,
    BADGE_SECONDARY
  } = BOOTSTRAP_CLASSES;

  // Fonctions de gestion avec destructuration atomique
  const handleAnnounceOptOutChange = (checked: boolean) => {
    // TODO: Dispatch action pour mettre à jour announceOptOut
    console.log('Announce opt-out:', checked);
  };

  const handleAllowEnrichedChange = (checked: boolean) => {
    // TODO: Dispatch action pour mettre à jour allowEnriched
    console.log('Allow enriched:', checked);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setStoredLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    // TODO: Dispatch action pour mettre à jour la langue
    console.log('Language changed:', newLanguage);
  };

  const handleThemeChange = (newTheme: string) => {
    setStoredTheme(newTheme);
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    // TODO: Dispatch action pour mettre à jour le thème
    console.log('Theme changed:', newTheme);
  };

  const handleAutoSaveChange = (checked: boolean) => {
    // TODO: Dispatch action pour mettre à jour autoSave
    console.log('Auto save:', checked);
  };

  const handleAutoSaveIntervalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    // TODO: Dispatch action pour mettre à jour autoSaveInterval
    console.log('Auto save interval:', value);
  };

  const handleResetSettings = () => {
    // TODO: Dispatch action pour réinitialiser les paramètres
    console.log('Reset settings');
    setShowResetConfirm(false);
  };

  const handleExportSettings = () => {
    const settings = {
      announceOptOut,
      allowEnriched,
      language,
      theme,
      autoSave,
      autoSaveInterval
    };

    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'studio-settings.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const settings = JSON.parse(e.target?.result as string);
          // TODO: Dispatch actions pour importer les paramètres
          console.log('Import settings:', settings);
        } catch (error) {
          console.error('Error importing settings:', error);
        }
      };
      reader.readAsText(files[0]);
    }
  };

  // Rendu de la page avec destructuration atomique
  return (
    <div className={`${CONTAINER} ${className}`}>
      <div className={ROW}>
        <div className={COL}>
          {/* Header avec destructuration atomique */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h2">{t('settings.title')}</h1>
            <div className="d-flex gap-2">
              <button
                className={`${BUTTON} ${BUTTON_OUTLINE_PRIMARY}`}
                onClick={handleExportSettings}
              >
                <i className="bi bi-download me-2"></i>
                {t('settings.actions.export')}
              </button>
              <label className={`${BUTTON} ${BUTTON_OUTLINE_SECONDARY} mb-0`}>
                <i className="bi bi-upload me-2"></i>
                {t('settings.actions.import')}
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportSettings}
                  style={{ display: 'none' }}
                />
              </label>
              <button
                className={`${BUTTON} ${BUTTON_DANGER}`}
                onClick={() => setShowResetConfirm(true)}
              >
                <i className="bi bi-arrow-clockwise me-2"></i>
                {t('settings.actions.reset')}
              </button>
            </div>
          </div>

          <div className={ROW}>
            {/* Navigation des onglets avec destructuration atomique */}
            <div className={`${COL} col-md-3`}>
              <div className={`${CARD}`}>
                <div className={CARD_BODY}>
                  <div className={`${NAV} ${NAV_TABS} flex-column`}>
                    <div className={NAV_ITEM}>
                      <button
                        className={`${NAV_LINK} ${activeTab === 'general' ? 'active' : ''}`}
                        onClick={() => setActiveTab('general')}
                      >
                        <i className="bi bi-gear me-2"></i>
                        {t('settings.tabs.general')}
                      </button>
                    </div>
                    <div className={NAV_ITEM}>
                      <button
                        className={`${NAV_LINK} ${activeTab === 'appearance' ? 'active' : ''}`}
                        onClick={() => setActiveTab('appearance')}
                      >
                        <i className="bi bi-palette me-2"></i>
                        {t('settings.tabs.appearance')}
                      </button>
                    </div>
                    <div className={NAV_ITEM}>
                      <button
                        className={`${NAV_LINK} ${activeTab === 'editor' ? 'active' : ''}`}
                        onClick={() => setActiveTab('editor')}
                      >
                        <i className="bi bi-pencil-square me-2"></i>
                        {t('settings.tabs.editor')}
                      </button>
                    </div>
                    <div className={NAV_ITEM}>
                      <button
                        className={`${NAV_LINK} ${activeTab === 'notifications' ? 'active' : ''}`}
                        onClick={() => setActiveTab('notifications')}
                      >
                        <i className="bi bi-bell me-2"></i>
                        {t('settings.tabs.notifications')}
                      </button>
                    </div>
                    <div className={NAV_ITEM}>
                      <button
                        className={`${NAV_LINK} ${activeTab === 'about' ? 'active' : ''}`}
                        onClick={() => setActiveTab('about')}
                      >
                        <i className="bi bi-info-circle me-2"></i>
                        {t('settings.tabs.about')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenu des onglets avec destructuration atomique */}
            <div className={`${COL} col-md-9`}>
              <div className={`${CARD}`}>
                <div className={CARD_BODY}>
                  <div className={TAB_CONTENT}>
                    {/* Onglet Général avec destructuration atomique */}
                    <div className={`${TAB_PANE} ${activeTab === 'general' ? 'show active' : ''}`}>
                      <h3 className="mb-4">{t('settings.general.title')}</h3>

                      <div className="mb-4">
                        <label className={FORM_LABEL}>{t('settings.general.language')}</label>
                        <select
                          className={FORM_CONTROL}
                          value={storedLanguage}
                          onChange={(e) => handleLanguageChange(e.target.value)}
                        >
                          <option value={LANGUAGES.FR}>Français</option>
                          <option value={LANGUAGES.EN}>English</option>
                        </select>
                      </div>

                      <div className="mb-4">
                        <label className={FORM_LABEL}>{t('settings.general.theme')}</label>
                        <select
                          className={FORM_CONTROL}
                          value={storedTheme}
                          onChange={(e) => handleThemeChange(e.target.value)}
                        >
                          <option value={THEMES.LIGHT}>{t('settings.theme.light')}</option>
                          <option value={THEMES.DARK}>{t('settings.theme.dark')}</option>
                        </select>
                      </div>
                    </div>

                    {/* Onglet Apparence avec destructuration atomique */}
                    <div className={`${TAB_PANE} ${activeTab === 'appearance' ? 'show active' : ''}`}>
                      <h3 className="mb-4">{t('settings.appearance.title')}</h3>

                      <div className={`${ALERT} ${ALERT_INFO}`} role="alert">
                        <i className="bi bi-info-circle me-2"></i>
                        {t('settings.appearance.info')}
                      </div>

                      <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <label className={FORM_LABEL}>{t('settings.appearance.animations')}</label>
                            <p className="text-muted small">{t('settings.appearance.animations.description')}</p>
                          </div>
                          <Switch
                            checked={true}
                            onChange={() => { }}
                            height={20}
                            width={40}
                            onColor="#007bff"
                            offColor="#6c757d"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Onglet Éditeur avec destructuration atomique */}
                    <div className={`${TAB_PANE} ${activeTab === 'editor' ? 'show active' : ''}`}>
                      <h3 className="mb-4">{t('settings.editor.title')}</h3>

                      <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <label className={FORM_LABEL}>{t('settings.editor.autoSave')}</label>
                            <p className="text-muted small">{t('settings.editor.autoSave.description')}</p>
                          </div>
                          <Switch
                            checked={autoSave}
                            onChange={handleAutoSaveChange}
                            height={20}
                            width={40}
                            onColor="#007bff"
                            offColor="#6c757d"
                          />
                        </div>
                      </div>

                      {autoSave && (
                        <div className="mb-4">
                          <label className={FORM_LABEL}>{t('settings.editor.autoSaveInterval')}</label>
                          <select
                            className={FORM_CONTROL}
                            value={autoSaveInterval}
                            onChange={handleAutoSaveIntervalChange}
                          >
                            <option value={30}>30 {t('settings.editor.seconds')}</option>
                            <option value={60}>1 {t('settings.editor.minute')}</option>
                            <option value={300}>5 {t('settings.editor.minutes')}</option>
                            <option value={600}>10 {t('settings.editor.minutes')}</option>
                          </select>
                        </div>
                      )}
                    </div>

                    {/* Onglet Notifications avec destructuration atomique */}
                    <div className={`${TAB_PANE} ${activeTab === 'notifications' ? 'show active' : ''}`}>
                      <h3 className="mb-4">{t('settings.notifications.title')}</h3>

                      <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <label className={FORM_LABEL}>{t('settings.notifications.announceOptOut')}</label>
                            <p className="text-muted small">{t('settings.notifications.announceOptOut.description')}</p>
                          </div>
                          <Switch
                            checked={announceOptOut}
                            onChange={handleAnnounceOptOutChange}
                            height={20}
                            width={40}
                            onColor="#007bff"
                            offColor="#6c757d"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <label className={FORM_LABEL}>{t('settings.notifications.allowEnriched')}</label>
                            <p className="text-muted small">{t('settings.notifications.allowEnriched.description')}</p>
                          </div>
                          <Switch
                            checked={allowEnriched}
                            onChange={handleAllowEnrichedChange}
                            height={20}
                            width={40}
                            onColor="#007bff"
                            offColor="#6c757d"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Onglet À propos avec destructuration atomique */}
                    <div className={`${TAB_PANE} ${activeTab === 'about' ? 'show active' : ''}`}>
                      <h3 className="mb-4">{t('settings.about.title')}</h3>

                      <div className={`${CARD} mb-4`}>
                        <div className={CARD_BODY}>
                          <h5 className={CARD_TITLE}>{t('settings.about.application')}</h5>
                          <p className="card-text">{t('settings.about.description')}</p>
                          <div className="d-flex gap-2">
                            <span className={`${BADGE} ${BADGE_PRIMARY}`}>
                              v0.0.2
                            </span>
                            <span className={`${BADGE} ${BADGE_SECONDARY}`}>
                              TypeScript
                            </span>
                            <span className={`${BADGE} ${BADGE_SECONDARY}`}>
                              React 19
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className={`${ALERT} ${ALERT_INFO}`} role="alert">
                        <h5 className="alert-heading">{t('settings.about.license')}</h5>
                        <p>{t('settings.about.license.description')}</p>
                        <hr />
                        <p className="mb-0">{t('settings.about.copyright')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmation de réinitialisation avec destructuration atomique */}
      {showResetConfirm && (
        <div className="modal fade show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{t('settings.reset.title')}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowResetConfirm(false)}
                />
              </div>
              <div className="modal-body">
                <div className={`${ALERT} ${ALERT_WARNING}`} role="alert">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {t('settings.reset.warning')}
                </div>
                <p>{t('settings.reset.confirmation')}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className={`${BUTTON} ${BUTTON_SECONDARY}`}
                  onClick={() => setShowResetConfirm(false)}
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="button"
                  className={`${BUTTON} ${BUTTON_DANGER}`}
                  onClick={handleResetSettings}
                >
                  {t('settings.reset.confirm')}
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </div>
      )}
    </div>
  );
}; 