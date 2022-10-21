import { devices } from '@playwright/test';
import dotenv from 'dotenv';
import type { PlaywrightTestConfig } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config({ path: '.env.e2e' });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './e2e',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? 'github'
    : [
        ['html', { outputFolder: 'e2e/report/' }],
        ['json', { outputFile: 'e2e/report/results.json' }],
      ],
  use: {
    actionTimeout: 0,
    trace: 'on-first-retry',
    baseURL: `http://localhost:${process.env.PORT}`,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
  outputDir: 'test-results/',
  webServer: {
    command: 'npm run dev',
    port: Number(process.env.PORT),
  },
};

export default config;
