import { loadMovieDetailPage, MovieDetailPage } from './routes/detail/lazy';
import {
  loadPopularMoviesPage,
  PopularMoviesPage,
} from './routes/popular/lazy';
import { include } from 'named-urls';

export const urls = {
  movies: include('/movies', {
    detail: ':id',
    popular: 'popular/:page',
  }),
} as const;

export const routes = [
  {
    path: urls.movies.detail,
    element: <MovieDetailPage />,
    loader: loadMovieDetailPage,
  },
  {
    path: urls.movies.popular,
    element: <PopularMoviesPage />,
    loader: loadPopularMoviesPage,
  },
];
