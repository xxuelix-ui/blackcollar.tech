import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import enTranslations from './locales/en.json';
import zhTranslations from './locales/zh.json';

const resources = {
  en: {
    translation: enTranslations
  },
  zh: {
    translation: zhTranslations
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })
  .then(() => {
    // Set document language attribute for CSS font styling
    const updateDocumentLang = () => {
      document.documentElement.lang = i18n.language;
    };
    
    updateDocumentLang();
    i18n.on('languageChanged', updateDocumentLang);
  });

export default i18n;