import { LoginParams, LoginResponse } from 'features/auth/service';
import { wait } from 'helpers/async';
import { ApiResponse } from 'helpers/types';
import { rest } from 'msw';

type AuthLoginBody = { email: string };

export const handlers = [
  rest.post<AuthLoginBody, LoginParams, ApiResponse<LoginResponse>>(
    '/auth/login',
    async (req, res, ctx) => {
      const { email } = await req.json();

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
          data: {
            id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
            email,
            firstName: 'Barry',
            lastName: 'Bluejeans',
          },
        }),
      );
    },
  ),
];
