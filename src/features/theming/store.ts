import { createTrackedSelector } from 'react-tracked';
import create from 'zustand';
import { combine, persist, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type ThemeMode = 'light' | 'dark';

const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
const preferredMode: ThemeMode = colorSchemeQuery.matches ? 'dark' : 'light';

// @TODO(shawk): is it worth building an abstraction around this?
// https://github.com/colorfy-software/zfy has a decent API for this.
// There's some relevant discussion in this issue:
// https://github.com/pmndrs/zustand/discussions/224#discussioncomment-118208
export const useThemeStoreImpl = create(
  persist(
    immer(
      devtools(
        combine({ mode: preferredMode }, (set) => ({
          setMode: (mode: ThemeMode) => {
            set((state) => {
              state.mode = mode;
            });
          },
          toggleMode: () => {
            set((state) => {
              state.mode = state.mode === 'light' ? 'dark' : 'light';
            });
          },
        })),
        {
          enabled: import.meta.env.DEV,
        },
      ),
    ),
    {
      name: 'theme-store',
    },
  ),
);

export const useThemeStore = createTrackedSelector(useThemeStoreImpl);
export type State = ReturnType<typeof useThemeStore>;
