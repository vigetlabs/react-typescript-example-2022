import { palette } from './palette';

export type AppTheme = {
  name: string;
  unit: number;
  spacing: (n: number) => string;
  remPx: (n: number) => string;
  mqMin: (bp: BreakPoint) => string;
  mqMax: (bp: BreakPoint) => string;
  colors: {
    white: string;
    shadow: string;
    black: string;
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
  easings: {
    easeInBounce: string;
    easeInQuart: string;
    easeOutQuart: string;
  };
};

const breakPoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

type BreakPoint = keyof typeof breakPoints;

const baseTheme = {
  unit: 4,
  spacing: (n: number) => `${baseTheme.unit * n}px`,
  remPx: (pixels: number) => `${pixels / 16}rem`,
  mqMin: (bp: BreakPoint) => `@media (min-width: ${breakPoints[bp] / 16}rem)`,
  mqMax: (bp: BreakPoint) => `@media (max-width: ${breakPoints[bp] / 16}rem)`,
  colors: {
    white: '#fff',
    shadow: '#18181b',
    black: '#000',
    palette,
  },
  easings: {
    easeInBounce: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    easeInQuart: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
    easeOutQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  },
} as const;

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
