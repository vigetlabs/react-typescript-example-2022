import { cache } from 'features/http';
import { tmdbService } from 'features/tmdb';
import { preloadImages } from 'helpers/images';
import { asNumber } from 'helpers/number';
import { LoaderFunctionArgs } from 'react-router-dom';

export default async function loader({ params }: LoaderFunctionArgs) {
  const page = asNumber(params.page, 1);
  const query = tmdbService.popularMoviesQuery(page);
  const cachedData = cache.getQueryData(query.queryKey);

  if (cachedData) {
    return cachedData as ReturnType<typeof query.queryFn>;
  }

  const data = await cache.fetchQuery(query);

  await preloadImages(
    data.results
      .filter((movie) => !!movie.poster_path)
      .map((movie) => tmdbService.posterUrl(movie.poster_path!)),
  );

  return data;
}
