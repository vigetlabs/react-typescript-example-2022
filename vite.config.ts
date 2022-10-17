/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
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
    reporters: ['dot'],
    coverage: {
      provider: 'istanbul',
      reporter: ['html-spa', 'text', 'clover'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        // ignore type declaration files
        'src/**/*.d.ts',
        // ignore styled component files, erroneous branch coverage reporting
        'src/**/styled.{ts,tsx}',
        // ignore test files
        'src/test/*',
        'src/**/*.spec.{ts,tsx}',
        // ignore specific source files (workaround due to issues with
        // magic comments used to skip coverage of certain lines)
        'src/main.tsx',
        'src/global-styles.tsx',
      ],
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
});
