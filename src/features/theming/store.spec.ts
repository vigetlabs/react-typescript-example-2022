import { getInitialMode, useThemeStoreImpl } from './store';
import { beforeEach, vi } from 'vitest';

describe('features/theming/store', () => {
  describe('setMode', () => {
    it('sets the mode to the value that was passed', () => {
      const store = useThemeStoreImpl.getState();

      expect(store.mode).toBe('light');

      store.setMode('dark');

      expect(useThemeStoreImpl.getState().mode).toBe('dark');
    });
  });

  describe('toggleMode', () => {
    it('toggles the mode from light to dark', () => {
      const store = useThemeStoreImpl.getState();

      store.setMode('light');
      store.toggleMode();

      expect(useThemeStoreImpl.getState().mode).toBe('dark');
    });

    it('toggles the mode from dark to light', () => {
      const store = useThemeStoreImpl.getState();

      store.setMode('dark');
      store.toggleMode();

      expect(useThemeStoreImpl.getState().mode).toBe('light');
    });
  });

  describe('with `prefers-color-scheme: dark`', () => {
    beforeEach(() => {
      vi.mocked(window.matchMedia, { partial: true }).mockReturnValue({
        matches: true,
      });
    });

    it('`getInitialMode` returns `dark` mode', async () => {
      expect(getInitialMode()).toBe('dark');
    });
  });

  describe('without `prefers-color-scheme: dark`', () => {
    beforeEach(() => {
      vi.mocked(window.matchMedia, { partial: true }).mockReturnValue({
        matches: false,
      });
    });

    it('`getInitialMode` returns `light` mode', async () => {
      expect(getInitialMode()).toBe('light');
    });
  });
});
