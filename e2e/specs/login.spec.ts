import { barry } from '../../src/test/fixtures/user/default';
import { expect, test } from '../helpers/test';
import { rest } from 'msw';

test('user can log in', async ({ page, worker }) => {
  await worker.use(
    rest.post('/auth/login', (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          data: barry,
        }),
      );
    }),
  );

  await page.goto('/');

  const getStarted = page.getByText('Log in');

  await expect(getStarted).toHaveAttribute('href', '/login');

  await getStarted.click();

  await page.getByLabel('Email').fill('bb@taz.com');
  await page.getByLabel('Password').fill('abc');

  await page.getByRole('button', { name: 'Log In' }).click();

  await expect(page.getByText('Welcome Barry Bluejeans!')).toBeVisible();
});
