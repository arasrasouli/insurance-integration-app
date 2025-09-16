import i18next from 'i18next';

i18next.init({
  lng: 'en',
  resources: {
    en: {
      translation: {
        errors: {
          NullOrEmptyBody: 'Request body cannot be null or empty.',
          InvalidJsonFormat: 'Invalid JSON format.',
          InvalidEventData: 'Forbidden request. Potential SQL injection detected.',
          FallIdNotFound: 'FallId {{FallId}} NOT found.',
        },
      },
    },
  },
});

export default i18next;