import { config } from 'config';
import { createClient } from 'features/http';

type Page<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type PopularMovie = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieDetail = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: null;
  budget: number;
  genres?: GenresEntity[] | null;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: null;
  production_companies?: ProductionCompaniesEntity[] | null;
  production_countries?: ProductionCountriesEntity[] | null;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages?: SpokenLanguagesEntity[] | null;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: MovieCredits;
  recommendations: Page<MovieRecommendation>;
  videos: MovieVideos;
  images: MovieImages;
};

export type MovieImages = {
  backdrops: MovieImage[];
  posters: MovieImage[];
  logos: MovieImage[];
};

export type MovieImage = {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1?: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

export type MovieVideos = {
  results: {
    id: string;
    iso_639_1?: string;
    iso_3166_1?: string;
    key: string;
    name: string;
    official: boolean;
    published_at: string;
    site: string;
    size: number;
    type: string;
  }[];
};

export type GenresEntity = {
  id: number;
  name: string;
};

export type ProductionCompaniesEntity = {
  id: number;
  logo_path?: string | null;
  name: string;
  origin_country: string;
};

export type ProductionCountriesEntity = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguagesEntity = {
  iso_639_1: string;
  name: string;
};

export type MovieCredits = {
  id: number;
  cast?: CastEntity[] | null;
  crew?: CrewEntity[] | null;
};

export type CastEntity = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

export type CrewEntity = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string | null;
  credit_id: string;
  department: string;
  job: string;
};

export interface MovieRecommendation {
  adult: boolean;
  backdrop_path?: null;
  genre_ids?: number[] | null;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  release_date: string;
  poster_path?: string;
  popularity: number;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const http = createClient(config.apiBaseUrlTmdb, config.apiRequestTimeout, {
  Authorization: `Bearer ${config.apiTokenTmdb}`,
});

export const popularMoviesQuery = (page: number) => ({
  queryKey: ['movies', 'popular', page],
  queryFn: () => getPopularMovies(page),
});

export const movieDetailQuery = (id: number) => ({
  queryKey: ['movies', id],
  queryFn: () => getMovieById(id),
  // queryFn: async () => {
  //   const [movie, credits, recommendations] = await Promise.all([
  //     getMovieById(id),
  //     getMovieCreditsById(id),
  //     getMovieRecommendationsById(id),
  //   ]);

  //   return {
  //     movie,
  //     credits,
  //     recommendations,
  //   };
  // },
});

export async function getPopularMovies(page: number) {
  return http.get<Page<PopularMovie>>(`/movie/popular?page=${page}`);
}

export async function getMovieById(id: number) {
  return http.get<MovieDetail>(
    `/movie/${id}?append_to_response=videos,images,credits,recommendations`,
  );
}

// export async function getMovieCreditsById(id: number) {
//   return http.get<MovieCredits>(`/movie/${id}/credits`);
// }

// export async function getMovieRecommendationsById(id: number) {
//   return http.get<Page<MovieRecommendation>>(`/movie/${id}/recommendations`);
// }

export function posterUrl(path: string) {
  return `${config.imageBaseUrlTmdb}${path}`;
}
