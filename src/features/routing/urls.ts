import * as auth from 'features/auth';
import * as genres from 'features/genres';
import * as home from 'features/home';
import * as movies from 'features/movies';

export const urls = {
  root: '/',
  ...home.urls,
  ...auth.urls,
  ...movies.urls,
  ...genres.urls,
} as const;
