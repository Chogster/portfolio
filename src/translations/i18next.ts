import i18n, { Resource } from 'i18next';
import translations from './translations.json';
import detector from "i18next-browser-languagedetector";

const translationResource: Resource = translations as Resource;

i18n.init({
    resources: translationResource,
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;