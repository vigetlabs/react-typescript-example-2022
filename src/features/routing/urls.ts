import * as home from 'features/home';

export const urls = {
  root: '/',
  ...home.urls,
} as const;
