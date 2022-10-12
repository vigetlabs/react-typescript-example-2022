import { ThemeMode, useThemeStore } from './store';
import { darkTheme, lightTheme } from './theme';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import React from 'react';

export const ThemeProvider = ({
  theme,
  children,
}: {
  theme: ThemeMode;
  children?: React.ReactNode;
}) => {
  return (
    <EmotionThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      {children}
    </EmotionThemeProvider>
  );
};

export const ConnectedThemeProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const themeStore = useThemeStore();
  return <ThemeProvider theme={themeStore.mode}>{children}</ThemeProvider>;
};
