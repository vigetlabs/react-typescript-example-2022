import loader from './loader';
import { PaginationLink } from './styled';
import { urls } from 'features/routing/urls';
import { popularMoviesQuery } from 'features/tmdb/service';
import {
  Box,
  MovieLink,
  Paragraph,
  ScreenReaderText,
  GridItem,
  MoviesGrid,
} from 'features/ui';
import { asNumber } from 'helpers/number';
import { useQuery } from '@tanstack/react-query';
import { reverse } from 'named-urls';
import { memo } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useLoaderData, useParams } from 'react-router-dom';

export default function PopularMoviesPage() {
  const { page } = useParams();
  const initialData = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <PopularMoviesPageContent
      page={asNumber(page, 1)}
      initialData={initialData}
    />
  );
}

const PopularMoviesPageContent = memo(function PopularMoviesPageImpl({
  page,
  initialData,
}: {
  page: number;
  initialData: Awaited<ReturnType<typeof loader>>;
}) {
  const { data: movies } = useQuery({
    ...popularMoviesQuery(asNumber(page, 1)),
    initialData,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <Box p={8} vertical>
      <MoviesGrid as="ol" gap={4}>
        {movies.results.map((movie) => (
          <GridItem key={movie.id}>
            <MovieLink
              id={movie.id}
              title={movie.title}
              posterPath={movie.poster_path || ''}
              voteAverage={movie.vote_average}
            />
          </GridItem>
        ))}
      </MoviesGrid>

      {movies.total_pages > 1 ? (
        <Box mt={8} justify="center" align="center" gap={3}>
          <PaginationLink
            preload
            preloadDelay={20}
            disabled={movies.page === 1}
            to={reverse(urls.movies.popular, {
              page: String(asNumber(page, 1) - 1),
            })}
          >
            <MdKeyboardArrowLeft />
            <ScreenReaderText>Previous Page</ScreenReaderText>
          </PaginationLink>

          <Paragraph>
            {movies.page} / {movies.total_pages}
          </Paragraph>

          <PaginationLink
            preload
            preloadDelay={20}
            disabled={movies.page === movies.total_pages}
            to={reverse(urls.movies.popular, {
              page: String(asNumber(page, 1) + 1),
            })}
          >
            <MdKeyboardArrowRight />
            <ScreenReaderText>Previous Page</ScreenReaderText>
          </PaginationLink>
        </Box>
      ) : null}
    </Box>
  );
});
