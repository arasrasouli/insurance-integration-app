import { createError, H3Error } from 'h3';
import type { ErrorCategory, ErrorKeys } from './error-definitions';

export interface AppH3Error extends H3Error {
  data: {
    errorKey: ErrorKeys | 'Unknown';
    params?: Record<string, string>;
  };
}

function createAppH3Error(
  statusCode: number,
  statusMessage: string,
  data: { errorKey: ErrorKeys | 'Unknown'; params?: Record<string, string> }
): AppH3Error {
  return createError({ statusCode, statusMessage, data }) as AppH3Error;
}

export class AppError extends Error {
  public readonly category: ErrorCategory;
  public readonly key: ErrorKeys | 'Unknown';
  public readonly params?: Record<string, string>;

  constructor(category: ErrorCategory, key: ErrorKeys | 'Unknown', params?: Record<string, string>) {
    super(key);
    this.category = category;
    this.key = key;
    this.params = params;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  public toH3Error(message: string): AppH3Error {
    return createAppH3Error(this.category, message, {
      errorKey: this.key,
      params: this.params,
    });
  }
}
