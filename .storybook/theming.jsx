import {
  darkTheme,
  lightTheme,
  useThemeStore,
  useThemeStoreImpl,
} from '../src/features/theming';
import { GlobalStyles } from '../src/global-styles';
import { ThemeProvider } from '@emotion/react';
import { addons } from '@storybook/addons';
import { UPDATE_GLOBALS } from '@storybook/core-events';
import { useEffect, useState } from 'react';

const getTheme = (themeName) => {
  switch (themeName) {
    case 'light':
      return lightTheme;
    case 'dark':
      return darkTheme;
    default:
      throw new Error(`unknown theme: ${themeName}`);
  }
};

export const withThemeProvider = (Story, context) => {
  const [channel] = useState(addons.getChannel());
  const themeStore = useThemeStore();
  const theme = getTheme(context.globals.theme);

  /**
   * Poor man's two-way binding to the storybook theme global.
   */
  useEffect(() => {
    const unsubscribe = useThemeStoreImpl.subscribe((theme) => {
      // set the theme in storybook (if it changed in the store)
      // ref: https://github.com/storybookjs/storybook/issues/12982#issuecomment-865304427
      channel.emit(UPDATE_GLOBALS, {
        globals: { theme: theme.mode },
      });
    });

    // set the theme in the store (if it changed via the storybook global UI)
    themeStore.setMode(context.globals.theme);

    return () => {
      unsubscribe();
    };
  }, [context.globals.theme]);

  return (
    <>
      <GlobalStyles />

      <ThemeProvider theme={theme}>
        <Story {...context} />
      </ThemeProvider>
    </>
  );
};
