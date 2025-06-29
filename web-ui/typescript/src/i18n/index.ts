import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Configuration i18n avec destructuration atomique
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
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
      loadPath: '/locales/{{lng}}/translation.json'
    }
  });

export default i18n; 