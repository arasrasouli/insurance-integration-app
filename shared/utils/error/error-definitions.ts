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

type MessageDef<C extends ErrorCategory> = {
  code: C;
  message: string;
};

type ErrorMessageMap = {
  [K in ErrorCategory]: Partial<Record<ErrorKeys, MessageDef<K>>>;
};

export const ErrorMessages: ErrorMessageMap = {
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
} as const;
