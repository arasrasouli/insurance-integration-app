import { AppError } from './app-error';
import { ErrorCategory, ErrorKeys } from './error-definitions';
import { resolveErrorMessage } from './error-resolver';

export function throwApiError(category: ErrorCategory, errorKey: ErrorKeys, params?: Record<string, string>) {
  const appErr = new AppError(category, errorKey, params);
  const message = resolveErrorMessage(appErr);

  throw appErr.toH3Error(message);
}
