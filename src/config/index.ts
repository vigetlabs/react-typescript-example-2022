export const config = {
  apiBaseUrl: window.location.origin,
  apiRequestTimeout: 10000,
  defaultUserEmail: import.meta.env.VITE_DEFAULT_USER_EMAIL,
  defaultUserPassword: import.meta.env.VITE_DEFAULT_USER_PASSWORD,
  enableMockServer: import.meta.env.VITE_ENABLE_MOCK_SERVER === 'true',
  enableDevtools:
    !import.meta.env.PROD &&
    import.meta.env.VITE_ENABLE_REDUX_DEVTOOLS === 'true',
} as const;
