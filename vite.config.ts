/// <reference types="vitest" />
import 'dotenv/config';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

import tsconfigPaths from 'vite-tsconfig-paths';
import GithubActionsReporter from 'vitest-github-actions-reporter';

export default defineConfig({
  server: {
    port: Number(process.env.PORT),
  },
  plugins: [
    svgr(),
    tsconfigPaths(),
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        babelrc: true,
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setupTests.ts',
    clearMocks: true,
    restoreMocks: true,
    include: ['./src/**/*.{spec,test}.{ts,tsx}'],
    reporters: process.env.GITHUB_ACTIONS
      ? ['default', new GithubActionsReporter()]
      : 'dot',
    coverage: {
      provider: 'istanbul',
      reporter: ['html-spa', 'json', 'text', 'clover'],
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        // ignore type declaration files
        'src/**/*.d.ts',

        // ignore styled component files, erroneous branch coverage reporting
        'src/**/styled.{ts,tsx}',

        // ignore test files
        'src/test/*',
        'src/**/*.spec.{ts,tsx}',

        // ignore lazy loading files, they don't contain any logic that's
        // worth testing
        'src/**/lazy.tsx',

        // ignore specific source files (workaround due to issues with
        // magic comments used to skip coverage of certain lines)
        'src/main.tsx',
        'src/global-styles.tsx',
      ],
    },
  },
});
