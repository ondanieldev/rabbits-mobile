import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

import enAuth from './public/locales/en/auth.json';
import enCommon from './public/locales/en/common.json';
import enError from './public/locales/en/error.json';
import enNotification from './public/locales/en/notification.json';
import enRoutine from './public/locales/en/routine.json';

// TODO: improve locales loading
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: {
      auth: enAuth,
      common: enCommon,
      error: enError,
      notification: enNotification,
      routine: enRoutine,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});
