export enum ErrorCategory {
  BadRequest = 400,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
}

export enum ErrorKeys {
  NullOrEmptyBody = 'NullOrEmptyBody',
  InvalidJsonFormat = 'InvalidJsonFormat',
  InvalidClaimData = 'InvalidClaimData',
  FallIdNotFound = 'FallIdNotFound',
}

type ErrorMessage = Record<
  ErrorCategory,
  Partial<Record<ErrorKeys, { code: number; message: string }>>
>;

export const ErrorMessages: ErrorMessage = {
  [ErrorCategory.BadRequest]: {
    [ErrorKeys.NullOrEmptyBody]: {
      code: ErrorCategory.BadRequest,
      message: 'errors.NullOrEmptyBody',
    },
    [ErrorKeys.InvalidJsonFormat]: {
      code: ErrorCategory.BadRequest,
      message: 'errors.InvalidJsonFormat',
    },
  },
  [ErrorCategory.Forbidden]: {
    [ErrorKeys.InvalidClaimData]: {
      code: ErrorCategory.Forbidden,
      message: 'errors.InvalidClaimData',
    },
  },
  [ErrorCategory.NotFound]: {
    [ErrorKeys.FallIdNotFound]: {
      code: ErrorCategory.NotFound,
      message: 'errors.FallIdNotFound',
    },
  },
  [ErrorCategory.InternalServerError]: {},
};