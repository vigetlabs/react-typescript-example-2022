/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      all: true,
      reporter: ['html-spa', 'text', 'clover'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        // ignore type declaration files
        'src/**/*.d.ts',

        // ignore test files
        'src/test/setup.ts',
        'src/**/*.spec.{ts,tsx}',

        // ignore specific source files (workaround)
        // Note: c8 currently doesn't support `all: true` AND coverage ignore
        //       comments (https://github.com/bcoe/c8/issues/318)
        'src/main.tsx',
      ],
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
});
