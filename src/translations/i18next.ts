import i18n, { Resource } from 'i18next';
import translations from './translations.json';

const translationResource: Resource = translations as Resource;

i18n.init({
    resources: translationResource,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;