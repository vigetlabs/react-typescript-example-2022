import '@emotion/react';
import type { AppTheme } from 'features/theming/theme';

declare module '@emotion/react' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface Theme extends AppTheme {}
}
