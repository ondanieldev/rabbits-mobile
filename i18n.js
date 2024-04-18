import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

import enCommon from './public/locales/en/common.json';
import enRoutine from './public/locales/en/routine.json';

// TODO: improve locales loading
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: {
      routine: enRoutine,
      common: enCommon,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});
