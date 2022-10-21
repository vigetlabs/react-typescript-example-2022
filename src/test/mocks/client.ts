import { vi } from 'vitest';

vi.mock('features/http/client', async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const module = (await vi.importActual('features/http/client')) as any;

  return {
    http: module.createClient('/', 1),
  };
});
