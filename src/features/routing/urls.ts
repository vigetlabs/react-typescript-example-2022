import * as auth from 'features/auth';
import * as home from 'features/home';

export const urls = {
  root: '/',
  ...home.urls,
  ...auth.urls,
} as const;
