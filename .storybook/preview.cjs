import { withThemeProvider } from './theming';

export const globalTypes = {
  theme: {
    title: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'switchalt',
      items: ['light', 'dark'],
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [withThemeProvider];
