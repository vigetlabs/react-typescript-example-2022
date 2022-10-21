import { devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import type { PlaywrightTestConfig } from '@playwright/test';

dotenv.config({ path: '.env.e2e' });

const playwrightDir = (partialPath: string) =>
  path.resolve(__dirname, './e2e', partialPath);

const config: PlaywrightTestConfig = {
  testDir: playwrightDir('./specs'),
  outputDir: playwrightDir('./results'),
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
        [
          'html',
          {
            outputFolder: playwrightDir('./reports'),
            open: process.env.CI ? 'never' : 'on-failure',
          },
        ],
        ['json', { outputFile: playwrightDir('./reports/results.json') }],
      ],
  use: {
    actionTimeout: 0,
    baseURL: `http://localhost:${process.env.PORT}`,
    trace: 'retain-on-failure',
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
  webServer: {
    command: 'npm run dev',
    port: Number(process.env.PORT),
    reuseExistingServer: !process.env.CI,
  },
};

export default config;
