import { test, expect } from '@playwright/test';

test('user can log in', async ({ page }) => {
  await page.goto('/');

  // create a locator
  const getStarted = page.getByText('Log in');

  // Expect an attribute "to be strictly equal" to the value.
  await expect(getStarted).toHaveAttribute('href', '/login');

  // Click the get started link.
  await getStarted.click();

  await page.getByLabel('Email').fill('bb@taz.com');
  await page.getByLabel('Password').fill('abc');

  await page.getByRole('button', { name: 'Log In' }).click();

  await expect(page.getByText('Welcome Barry Bluejeans!')).toBeVisible();
});
