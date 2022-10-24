import { cache } from 'features/http';
import { tmdbService } from 'features/tmdb';
import { preloadImages } from 'helpers/images';
import { asNumber } from 'helpers/number';
import { LoaderFunctionArgs } from 'react-router-dom';

export default async function loader({ params }: LoaderFunctionArgs) {
  const id = asNumber(params.id, 1);
  const query = tmdbService.movieDetailQuery(id);
  const cachedData = cache.getQueryData(query.queryKey);

  if (cachedData) {
    return cachedData as ReturnType<typeof query.queryFn>;
  }

  const data = await cache.fetchQuery(query);

  if (data.poster_path) {
    await preloadImages([tmdbService.posterUrl(data.poster_path)]);
  }

  return data;
}
