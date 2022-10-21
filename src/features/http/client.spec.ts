import { ApiError, NetworkError } from './api-error';
import { http } from './client';
import { server } from 'test/mocks/server';
import axios, { AxiosResponse } from 'axios';
import { rest } from 'msw';

describe('features/http/client', () => {
  describe('with a successful ApiSuccess response', () => {
    beforeEach(() => {
      server.use(
        rest.get('/success', (_req, res, ctx) => {
          return res(ctx.json({ success: true, data: { winning: true } }));
        }),
      );
    });

    it('returns the response’s `response.data`', async () => {
      const response = await http.get('/success');

      expect(response).toEqual({ winning: true });
    });
  });

  describe('with a successful response with data', () => {
    beforeEach(() => {
      server.use(
        rest.get('/success', (_req, res, ctx) => {
          return res(ctx.json({ winning: true }));
        }),
      );
    });

    it('returns the response data', async () => {
      const response = await http.get('/success');

      expect(response).toEqual({ winning: true });
    });
  });

  describe('with a successful response', () => {
    beforeEach(() => {
      server.use(
        rest.get('/success', (_req, res, ctx) => {
          return res(ctx.status(200));
        }),
      );
    });

    it('returns the response data', async () => {
      const response: AxiosResponse = await http.get('/success');

      expect(response.status).toEqual(200);
    });
  });

  describe('without a successful response', () => {
    beforeEach(() => {
      http.interceptors.request.use(() => {
        throw new Error('there be gremlins afoot');
      });
    });

    it('returns a `NetworkError`', async () => {
      try {
        await http.get('/network-error');
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(NetworkError);
      }
    });
  });

  describe('with an error response', () => {
    beforeEach(() => {
      server.use(
        rest.post('/error', async (req, res, ctx) => {
          const { status } = await req.json();

          return res(
            ctx.status(status),
            ctx.json({
              success: false,
              errors: [
                {
                  status,
                  code: 'SHAME',
                  title: 'How dare you',
                },
              ],
            }),
          );
        }),
      );
    });

    it('wraps the error in ApiError', async () => {
      try {
        await http.post('/error', { status: 404 });
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(ApiError);
      }
    });
  });
});
