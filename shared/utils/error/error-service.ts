import { createError } from 'h3';
import i18next from './i18n-config';
import { ErrorCategory, ErrorKeys, ErrorMessages } from './error-definitions';

console.log('Imported ErrorMessages:', ErrorMessages);
console.log('Imported ErrorCategory:', ErrorCategory);

export const throwApiError = (
  category: ErrorCategory,
  errorKey: ErrorKeys,
  params?: Record<string, string>,
) => {
  console.log('ErrorMessages in throwApiError:', ErrorMessages);
  console.log('Category in throwApiError:', category);
  const error = ErrorMessages[category]?.[errorKey];
  if (!error) {
    console.log('Error not found for category:', category, 'and key:', errorKey);
    throw createError({
      statusCode: 400,
      statusMessage: 'Unknown error',
      data: { errorKey: 'Unknown' },
    });
  }
  const message = i18next.t(error.message, params || {});
  throw createError({
    statusCode: error.code,
    statusMessage: message,
    data: { errorKey },
  });
};