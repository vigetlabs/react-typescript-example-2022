import {
  ApiError,
  ForbiddenError,
  handleUnauthorizedError,
  NotFoundError,
  UnauthorizedError,
  UnexpectedError,
  ValidationError,
} from './api-error';
import { ApiFailure } from 'helpers/types';
import { AxiosError } from 'axios';

function getAxiosError(status: number, includeData = true) {
  return new AxiosError<ApiFailure | undefined>(
    'Not Found',
    'NOT_FOUND',
    undefined,
    undefined,
    {
      status,
      statusText: 'Not Found',
      headers: {},
      config: {},
      data: includeData
        ? {
            success: false,
            errors: [
              {
                status,
                code: 'NOT_FOUND',
                title: 'Not Found',
              },
            ],
          }
        : undefined,
    },
  );
}

describe('ApiError', () => {
  describe('.wrap', () => {
    it('wraps 400 and 422 responses in `ValidationError`s', async () => {
      expect(ApiError.wrap(getAxiosError(400))).toBeInstanceOf(ValidationError);
      expect(ApiError.wrap(getAxiosError(422))).toBeInstanceOf(ValidationError);
    });

    it('wraps 401 responses in `UnauthorizedError`s', async () => {
      expect(ApiError.wrap(getAxiosError(401))).toBeInstanceOf(
        UnauthorizedError,
      );
    });

    it('wraps 403 responses in `ForbiddenError`s', async () => {
      expect(ApiError.wrap(getAxiosError(403))).toBeInstanceOf(ForbiddenError);
    });

    it('wraps 404 responses in `NotFoundError`s', async () => {
      expect(ApiError.wrap(getAxiosError(404))).toBeInstanceOf(NotFoundError);
    });

    it('wraps other responses in `UnexpectedError`s', async () => {
      expect(ApiError.wrap(getAxiosError(500))).toBeInstanceOf(UnexpectedError);
    });
  });

  describe('.toJSON', () => {
    describe('with an error that has `data` attached', () => {
      it('returns the response data as JSON', () => {
        const error = ApiError.wrap(getAxiosError(404));

        expect(error.toJSON()).toEqual(
          JSON.stringify({
            success: false,
            errors: [
              {
                status: 404,
                code: 'NOT_FOUND',
                title: 'Not Found',
              },
            ],
          }),
        );
      });
    });

    describe('with an error that does not have `data` attached', () => {
      it('returns `null`', () => {
        const error = ApiError.wrap(getAxiosError(404, false));

        expect(error.toJSON()).toBeNull();
      });
    });
  });
});

describe('handleUnauthorizedError', () => {
  describe('with an UnauthorizedError', () => {
    it('returns a 401 JSON Response with error data', async () => {
      const error = ApiError.wrap(getAxiosError(401));
      const response = handleUnauthorizedError(error);

      expect(response).toBeInstanceOf(Response);

      expect(await response.json()).toEqual({
        success: false,
        errors: [
          {
            status: 401,
            code: 'NOT_FOUND',
            title: 'Not Found',
          },
        ],
      });
    });
  });

  describe('with any other error', () => {
    it('throws the error', () => {
      const error = ApiError.wrap(getAxiosError(404));

      expect(() => handleUnauthorizedError(error)).toThrow(error);
    });
  });
});
