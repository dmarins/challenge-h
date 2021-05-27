import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import pt from './languages/pt.json';
import en from './languages/en.json';

export enum Language {
  pt = 'pt',
  en = 'en',
}

const defaultLanguage = Language.pt;

export const changeLanguage = (language?: Language): void => {
  let lang = language;

  if (!lang || !Language.hasOwnProperty(lang)) {
    lang = defaultLanguage;
  }

  i18n.changeLanguage(lang);
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: Language.en,
    lng: defaultLanguage,
    resources: {
      pt: {
        translation: pt,
      },
      en: {
        translation: en,
      },
    },
  });

export { i18n };
