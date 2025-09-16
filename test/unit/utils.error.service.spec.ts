import { describe, it, expect } from 'vitest'
import { H3Error } from 'h3';
import { throwApiError } from '~/shared/utils/error/error-service';
import { ErrorCategory, ErrorKeys, ErrorMessages } from '~/shared/utils/error/error-definitions';

import '~/shared/utils/error/i18n-config';

describe('utils.error.service.throwApiError', () => {
  it('should return correct error for NotFound/FallIdNotFound', () => {
    console.log('Test ErrorMessages:', ErrorMessages);
    console.log('Test ErrorCategory:', ErrorCategory);
    try {
      throwApiError(ErrorCategory.NotFound, ErrorKeys.FallIdNotFound, { FallId: '123' });
    } catch (error) {
      const h3Error = error as H3Error;
      console.log('H3Error:', h3Error);
      expect(h3Error.statusCode ?? h3Error.statusCode).toBe(404);
      expect(h3Error.statusMessage).toBe('FallId 123 NOT found.');
      expect(h3Error.data).toEqual({ errorKey: 'FallIdNotFound' });
    }
  });

  it('should handle InternalServerError with unknown key', () => {
    try {
      throwApiError(ErrorCategory.InternalServerError, 'UnknownKey' as ErrorKeys);
    } catch (error) {
      const h3Error = error as H3Error;
      console.log('H3Error:', h3Error);
      expect(h3Error.statusCode ?? h3Error.statusCode).toBe(400);
      expect(h3Error.statusMessage).toBe('Unknown error');
      expect(h3Error.data).toEqual({ errorKey: 'Unknown' });
    }
  });
});