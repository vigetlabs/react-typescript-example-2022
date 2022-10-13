const config = {
  enableDevtools:
    !import.meta.env.PROD && import.meta.env.ENABLE_REDUX_DEVTOOLS,
} as const;

export default config;
