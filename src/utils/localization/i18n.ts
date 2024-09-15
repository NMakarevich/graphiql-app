import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import mainPageEn from '@/locales/main/en.json';
import mainPageRu from '@/locales/main/ru.json';
import signInPageEn from '@/locales/sign-in/en.json';
import signInPageRu from '@/locales/sign-in/ru.json';
import headerEn from '@/locales/header/en.json';
import headerRu from '@/locales/header/ru.json';
import signUpPageEn from '@/locales/sign-up/en.json';
import signUpPageRu from '@/locales/sign-up/ru.json';
import historyEn from '@/locales/history/en.json';
import historyRu from '@/locales/history/ru.json';

const resources = {
  en: {
    translation: {
      ...mainPageEn,
      ...signInPageEn,
      ...headerEn,
      ...signUpPageEn,
      ...historyEn,
    },
  },
  ru: {
    translation: {
      ...mainPageRu,
      ...signInPageRu,
      ...headerRu,
      ...signUpPageRu,
      ...historyRu,
    },
  },
};

i18next.use(initReactI18next).init({
  debug: true,
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
