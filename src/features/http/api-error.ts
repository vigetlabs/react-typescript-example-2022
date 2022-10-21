import { ApiFailure } from 'helpers/types';
import { AxiosError } from 'axios';

export class ApiError extends Error {
  originalError: AxiosError | undefined;
  data: ApiFailure | undefined;

  constructor(
    message: string,
    options: { cause?: AxiosError | undefined; data?: ApiFailure } = {},
  ) {
    super(message);

    this.originalError = options?.cause;
    this.data = options?.data;

    Error.captureStackTrace(this, this.constructor);
  }

  static wrap(error: AxiosError<ApiFailure | undefined>): ApiError {
    if (!error.response || error.response.status < 200) {
      return new NetworkError(error.message, { cause: error });
    }

    const opts = {
      cause: error,
      data: error.response.data,
    };

    switch (error.response.status) {
      case 401:
        return new UnauthorizedError(error.message, opts);

      case 403:
        return new ForbiddenError(error.message, opts);

      case 404:
        return new NotFoundError(error.message, opts);

      case 400:
      case 422:
        return new ValidationError(error.message, opts);

      default:
        return new UnexpectedError(error.message, opts);
    }
  }

  toJSON() {
    return JSON.stringify(this.data) || null;
  }
}

export class NetworkError extends ApiError {}
export class UnexpectedError extends ApiError {}
export class NotFoundError extends ApiError {}
export class UnauthorizedError extends ApiError {}
export class ForbiddenError extends ApiError {}
export class ValidationError extends ApiError {}

export function handleUnauthorizedError(error: unknown) {
  if (error instanceof UnauthorizedError) {
    return new Response(error.toJSON(), {
      status: 401,
      headers: {
        'Content-Type': 'application/json; utf-8',
      },
    });
  }

  throw error;
}
