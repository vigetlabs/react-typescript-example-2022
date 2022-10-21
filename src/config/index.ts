export const config = {
  apiBaseUrl: window.location.origin,
  apiRequestTimeout: 10000,
  enableMockServer:
    !!import.meta.env.DEV && import.meta.env.VITE_ENABLE_MOCK_SERVER === 'true',
  enableDevtools:
    !import.meta.env.PROD &&
    import.meta.env.VITE_ENABLE_REDUX_DEVTOOLS === 'true',
} as const;
