import i18next from './i18n-config';
import { ErrorMessages } from './error-definitions';
import { AppError } from './app-error';

export function resolveErrorMessage(err: AppError): string {
const categoryMap = ErrorMessages[err.category];
const def = categoryMap && (err.key in categoryMap ? categoryMap[err.key as keyof typeof categoryMap] : undefined);
  if (!def) {
    return i18next.t('errors.Unknown', { ...err.params });
  }
  return i18next.t(def.message, { ...err.params });
}
