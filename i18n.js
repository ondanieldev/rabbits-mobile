import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

import enAuth from './public/locales/en/auth.json';
import enCommon from './public/locales/en/common.json';
import enRoutine from './public/locales/en/routine.json';

// TODO: improve locales loading
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: {
      common: enCommon,
      auth: enAuth,
      routine: enRoutine,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});
