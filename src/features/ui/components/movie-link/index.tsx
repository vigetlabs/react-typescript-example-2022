import { MovieOverlay, MovieTitle } from './styled';
import { Link } from '../link';
import { MoviePoster } from '../movie-poster';
import { MovieRating } from '../movie-rating';
import { config } from 'config';
import { urls } from 'features/routing/urls';
import { reverse } from 'named-urls';

export function MovieLink({
  id,
  title,
  posterPath,
  voteAverage,
}: {
  id: number;
  title: string;
  posterPath: string;
  voteAverage: number;
}) {
  return (
    <Link to={reverse(urls.movies.detail, { id })} preload>
      <MoviePoster
        src={`${config.imageBaseUrlTmdb}${posterPath}`}
        alt={`${title} cover image`}
      />

      <MovieOverlay>
        <MovieTitle>{title}</MovieTitle>
        <MovieRating rating={voteAverage} />
      </MovieOverlay>
    </Link>
  );
}
