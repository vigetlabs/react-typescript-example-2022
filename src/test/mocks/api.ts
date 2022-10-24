import { LoginParams, LoginResponse } from 'features/auth/service';
import { wait } from 'helpers/async';
import { ApiResponse } from 'helpers/types';
import { barry } from 'test/fixtures/user/default';
import { rest } from 'msw';

export const handlers = [
  rest.post<LoginParams, Record<string, never>, ApiResponse<LoginResponse>>(
    '/auth/login',
    async (req, res, ctx) => {
      const { email } = await req.json<LoginParams>();

      await wait(500);

      if (email === '500@taz.com') {
        return res(ctx.status(500));
      }

      if (email === '401@taz.com') {
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
      }

      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          data: barry,
        }),
      );
    },
  ),

  // rest.get(/image\.tmdb\.org/, async (req, res, ctx) => {
  //   // await wait(Math.random() * 300 + 100);

  //   // // fail 10% of image requests and wait an additional 500ms
  //   // if (Math.random() > 0.9) {
  //   //   await wait(500);
  //   //   return res(ctx.status(500));
  //   // }

  //   return req.passthrough();
  // }),
];
