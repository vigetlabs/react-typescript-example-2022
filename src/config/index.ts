export const config = {
  apiTokenTmdb: import.meta.env.VITE_API_TOKEN_TMDB,
  imageBaseUrlTmdb: 'https://image.tmdb.org/t/p/w342',
  apiBaseUrlTmdb: 'https://api.themoviedb.org/3',
  apiBaseUrlAuth: window.location.origin,
  apiRequestTimeout: 10000,
  defaultUserEmail: import.meta.env.VITE_DEFAULT_USER_EMAIL,
  defaultUserPassword: import.meta.env.VITE_DEFAULT_USER_PASSWORD,
  enableMockServer:
    !!import.meta.env.DEV && import.meta.env.VITE_ENABLE_MOCK_SERVER === 'true',
  // enableMockServer: false,
  enableDevtools:
    !import.meta.env.PROD &&
    import.meta.env.VITE_ENABLE_REDUX_DEVTOOLS === 'true',
} as const;
