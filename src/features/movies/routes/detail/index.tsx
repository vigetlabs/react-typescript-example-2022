import loader from './loader';
import { urls } from 'features/routing/urls';
import { tmdbService } from 'features/tmdb';
import { movieDetailQuery } from 'features/tmdb/service';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Link,
  MovieLink,
  MoviePoster,
  MovieRating,
  MoviesGrid,
  Paragraph,
  ScreenReaderText,
} from 'features/ui';
import { asNumber } from 'helpers/number';
import { useQuery } from '@tanstack/react-query';
import { reverse } from 'named-urls';
import { useLoaderData, useParams } from 'react-router-dom';

export default function MovieDetailPage() {
  const { id } = useParams();
  const initialData = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  const { data: movie } = useQuery({
    ...movieDetailQuery(asNumber(id, 1)),
    initialData,
    staleTime: 1000 * 60 * 5,
  });

  console.log(movie);

  return (
    <Box p={8} gap={4} vertical>
      <Box gap={4}>
        <div
          css={{
            width: '20%',
            minWidth: 200,
            maxWidth: 318,
            flexShrink: 0,
          }}
        >
          <MoviePoster
            src={
              movie.poster_path ? tmdbService.posterUrl(movie.poster_path) : '#'
            }
            alt={`${movie.title} cover image`}
          />
        </div>

        <Box p={2} vertical>
          <Heading>{movie.title}</Heading>

          <Paragraph
            css={(theme) => ({
              marginBottom: theme.spacing(6),
              fontStyle: 'italic',
              fontSize: theme.remPx(20),
            })}
          >
            {movie.tagline}
          </Paragraph>

          <Paragraph>
            {movie.spoken_languages
              ? `${movie.spoken_languages
                  ?.map(({ name }) => name)
                  .join(', ')} / `
              : null}
            {movie.runtime} Min. / {new Date(movie.release_date).getFullYear()}
          </Paragraph>

          <Box align="center" mt={4} gap={2}>
            <MovieRating rating={movie.vote_average} />
            <Paragraph as="span" css={{ fontSize: '0.8rem' }}>
              <strong>{movie.vote_average}</strong> ({movie.vote_count})
            </Paragraph>
          </Box>

          <Heading as="h2" css={(theme) => ({ marginTop: theme.spacing(4) })}>
            Synopsis:
          </Heading>

          <Paragraph>{movie.overview}</Paragraph>

          {movie.genres ? (
            <>
              <Heading
                as="h2"
                css={(theme) => ({ marginTop: theme.spacing(4) })}
              >
                Genres:
              </Heading>

              <Box gap={2}>
                {movie.genres?.map((genre) => (
                  <Link
                    key={genre.id}
                    to={reverse(urls.genres.detail, { id: genre.id })}
                    preload
                  >
                    {genre.name}
                  </Link>
                ))}
              </Box>
            </>
          ) : null}
        </Box>
      </Box>

      <Box p={2} vertical>
        <Heading
          as="h2"
          css={(theme) => ({
            marginTop: theme.spacing(8),
            marginBottom: theme.spacing(4),
          })}
        >
          Cast:
        </Heading>

        <Grid
          gap={2}
          templateColumns="repeat(auto-fill, minmax(min(4rem, 100%), 1fr))"
        >
          {movie.credits.cast
            ? movie.credits.cast.map((cast) => (
                <Link key={cast.id} to={`/person/${cast.id}`}>
                  <div
                    css={(theme) => ({
                      borderRadius: '100%',
                      aspectRatio: '1 / 1',
                      overflow: 'hidden',
                      backgroundColor: theme.colors.surface,
                    })}
                  >
                    {cast.profile_path && (
                      <img
                        css={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                        src={tmdbService.posterUrl(cast.profile_path)}
                      />
                    )}
                  </div>

                  <ScreenReaderText>{cast.name}</ScreenReaderText>
                </Link>
              ))
            : null}
        </Grid>

        <Heading
          as="h2"
          css={(theme) => ({
            marginTop: theme.spacing(8),
            marginBottom: theme.spacing(4),
          })}
        >
          Recommended:
        </Heading>

        <MoviesGrid as="ol" gap={4}>
          {movie.recommendations.results.map((movie) => (
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
      </Box>
    </Box>
  );
}
