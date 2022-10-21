import { palette } from './palette';

export type AppTheme = {
  name: string;
  unit: number;
  spacing: (n: number) => string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    feedback: {
      success: {
        text: string;
        background: string;
      };
      error: {
        text: string;
        background: string;
      };
    };
    palette: typeof palette;
  };
};

const baseTheme = {
  unit: 4,
  spacing: (n: number) => `${baseTheme.unit * n}px`,
  colors: {
    palette,
  },
};

export const lightTheme: AppTheme = {
  name: 'light',
  ...baseTheme,
  colors: {
    primary: '#0ea5e9',
    secondary: '#7c3aed',
    background: '#fff',
    surface: '#eee',
    text: '#18181b',
    feedback: {
      success: {
        text: baseTheme.colors.palette.green[700],
        background: baseTheme.colors.palette.green[50],
      },
      error: {
        text: baseTheme.colors.palette.red[700],
        background: baseTheme.colors.palette.red[50],
      },
    },
    ...baseTheme.colors,
  },
} as const;

export const darkTheme: AppTheme = {
  name: 'dark',
  ...baseTheme,
  colors: {
    primary: '#22c55e',
    secondary: '#eab308',
    background: '#18181b',
    surface: '#222',
    text: '#fff',
    feedback: {
      success: {
        text: baseTheme.colors.palette.green[500],
        background: baseTheme.colors.palette.green[900],
      },
      error: {
        text: baseTheme.colors.palette.red[500],
        background: baseTheme.colors.palette.red[900],
      },
    },
    ...baseTheme.colors,
  },
} as const;
