const config = {
  apiBaseUrl: window.location.origin,
  apiRequestTimeout: 10000,
  enableMockServer: !!import.meta.env.DEV && import.meta.env.ENABLE_MOCK_SERVER,
  enableDevtools:
    !import.meta.env.PROD && import.meta.env.ENABLE_REDUX_DEVTOOLS,
} as const;

export default config;
