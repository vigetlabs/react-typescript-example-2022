import { useThemeStoreImpl, reinitialize } from './store';
import { beforeEach, vi } from 'vitest';

describe('features/theming/store', () => {
  describe('with `prefers-color-scheme: dark`', () => {
    beforeEach(async () => {
      vi.mocked(window.matchMedia, { partial: true }).mockReturnValue({
        matches: true,
      });
      reinitialize();
    });

    it('initializes the theme to `dark` mode', async () => {
      expect(useThemeStoreImpl.getState().mode).toEqual('dark');
    });
  });

  describe('without `prefers-color-scheme: dark`', () => {
    beforeEach(async () => {
      vi.mocked(window.matchMedia, { partial: true }).mockReturnValue({
        matches: false,
      });
      reinitialize();
    });

    it('initializes the theme to `light` mode', async () => {
      expect(useThemeStoreImpl.getState().mode).toEqual('light');
    });
  });
});
