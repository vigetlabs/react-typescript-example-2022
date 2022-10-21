import { vi } from 'vitest';

vi.mock('config', () => ({
  config: {
    apiBaseUrl: window.location.origin,
    apiRequestTimeout: 1,
    enableMockServer: false,
    enableDevtools: false,
  } as const,
}));
