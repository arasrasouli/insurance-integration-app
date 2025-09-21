import { describe, it, expect } from 'vitest';
import { throwApiError } from '~/shared/utils/error/error-service';
import { ErrorCategory, ErrorKeys } from '~/shared/utils/error/error-definitions';
import { AppError } from '~/shared/utils/error/app-error';
import { resolveErrorMessage } from '~/shared/utils/error/error-resolver';
import i18next from '~/shared/utils/error/i18n-config';

describe('Error Handling System', () => {
  it('should return correct error for NotFound/FallIdNotFound', () => {
    try {
      throwApiError(ErrorCategory.NotFound, ErrorKeys.FallIdNotFound, { FallId: '123' });
    } catch (err: any) {
      expect(err).toBeDefined();
      expect(err.statusCode).toBe(404);
      expect(err.data.errorKey).toBe(ErrorKeys.FallIdNotFound);
      
      const expectedMessage = i18next.t('errors.FallIdNotFound', { FallId: '123' });
      expect(err.statusMessage).toBe(expectedMessage);
    }
  });
  
  it('should throw a BadRequest error with localized message', () => {
    try {
      throwApiError(ErrorCategory.BadRequest, ErrorKeys.InvalidJsonFormat);
    } catch (err: any) {
      expect(err).toBeDefined();
      expect(err.statusCode).toBe(400);
      expect(err.data.errorKey).toBe(ErrorKeys.InvalidJsonFormat);
      expect(err.statusMessage).toBe(i18next.t('errors.InvalidJsonFormat'));
    }
  });

  it('should throw a NotFound error with dynamic params', () => {
    const params = { FallId: '1234' };
    try {
      throwApiError(ErrorCategory.NotFound, ErrorKeys.FallIdNotFound, params);
    } catch (err: any) {
      expect(err.statusCode).toBe(404);
      expect(err.data.errorKey).toBe(ErrorKeys.FallIdNotFound);
      expect(err.statusMessage).toContain('1234');
    }
  });

  it('should resolve error messages via resolver', () => {
    const appErr = new AppError(ErrorCategory.BadRequest, ErrorKeys.NullOrEmptyBody);
    const msg = resolveErrorMessage(appErr);
    expect(msg).toBe('Request body cannot be null or empty.');
  });

  it('should fallback to "Unknown" for unmapped error key', () => {
    const appErr = new AppError(ErrorCategory.InternalServerError, 'Unknown');
    const msg = resolveErrorMessage(appErr);
    expect(msg).toBe('An unexpected error occurred.');
  });

  it('should produce consistent H3Error from AppError', () => {
    const appErr = new AppError(ErrorCategory.BadRequest, ErrorKeys.NullOrEmptyBody);
    const msg = resolveErrorMessage(appErr);
    const h3Error = appErr.toH3Error(msg);
  console.log(msg)

    expect(h3Error.statusCode).toBe(400);
    expect(h3Error.statusMessage).toBe(msg);
    expect(h3Error.data.errorKey).toBe(ErrorKeys.NullOrEmptyBody);
  });
});
