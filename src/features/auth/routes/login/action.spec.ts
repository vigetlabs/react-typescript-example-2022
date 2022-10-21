import { action } from './action';
import { LoginParams, LoginResponse } from 'features/auth/service';
import { getAuthState } from 'features/auth/store';
import { UnexpectedError } from 'features/http';
import { ApiFailure, ApiSuccess } from 'helpers/types';
import { barry } from 'test/fixtures/user/default';
import { server } from 'test/mocks/server';
import { rest } from 'msw';

describe('features/auth/routes/login/action', () => {
  describe('with a successful response', () => {
    beforeEach(() => {
      server.use(
        rest.post<
          LoginParams,
          Record<string, never>,
          ApiSuccess<LoginResponse>
        >('/auth/login', async (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              success: true,
              data: barry,
            }),
          );
        }),
      );
    });

    it('returns a redirect Response to /destination and sets the user to authenticated', async () => {
      const formData = new FormData();

      formData.set('email', barry.email);
      formData.set('password', 'abc');
      formData.set('redirect', '/destination');

      const result = await action({
        params: {},
        request: createRequest('/login', formData),
      });

      expect(result.status).toBe(302);
      expect(result.headers.get('location')).toBe('/destination');

      expect(getAuthState().isAuthenticated).toBe(true);
    });
  });

  describe('with a 401 error response', () => {
    beforeEach(() => {
      server.use(
        rest.post<LoginParams, Record<string, never>, ApiFailure>(
          '/auth/login',
          (_req, res, ctx) => {
            return res(
              ctx.status(401),
              ctx.json({
                success: false,
                errors: [
                  {
                    status: 401,
                    code: 'UNAUTHORIZED',
                    title: 'Invalid credentials',
                    detail:
                      "Sorry, we couldn't find an account with those credentials.",
                  },
                ],
              }),
            );
          },
        ),
      );
    });

    it('catches the error and returns the response errors', async () => {
      const result = await action({
        params: {},
        request: createRequest('/login'),
      });

      expect(result.status).toBe(401);
      expect(await result.json()).toEqual({
        success: false,
        errors: [
          {
            status: 401,
            code: 'UNAUTHORIZED',
            title: 'Invalid credentials',
            detail:
              "Sorry, we couldn't find an account with those credentials.",
          },
        ],
      });
    });
  });

  describe('with a non-401 error response', () => {
    beforeEach(() => {
      server.use(
        rest.post<LoginParams, Record<string, never>, ApiFailure>(
          '/auth/login',
          (_req, res, ctx) => {
            return res(
              ctx.status(500),
              ctx.json({
                success: false,
                errors: [],
              }),
            );
          },
        ),
      );
    });

    it('throws the response error', async () => {
      await expect(
        async () =>
          await action({
            params: {},
            request: createRequest('/login'),
          }),
      ).rejects.toThrowError(UnexpectedError);
    });
  });
});

function createRequest(url: string, formData: FormData = new FormData()) {
  return new Request(new URL(url, window.location.origin).toString(), {
    method: 'POST',
    body: convertFormDataToSearchParams(formData),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

function convertFormDataToSearchParams(formData: FormData) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of formData) {
    searchParams.set(key, value as string);
  }

  return searchParams;
}
