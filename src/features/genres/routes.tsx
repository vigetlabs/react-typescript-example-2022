import { loadGenreDetailPage, GenreDetailPage } from './routes/detail/lazy';
import { include } from 'named-urls';

export const urls = {
  genres: include('/genres', {
    detail: ':id',
  }),
} as const;

export const routes = [
  {
    path: urls.genres.detail,
    element: <GenreDetailPage />,
    loader: loadGenreDetailPage,
  },
];
