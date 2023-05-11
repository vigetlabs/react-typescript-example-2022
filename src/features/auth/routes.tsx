export const urls = {
  login: '/login',
} as const;

export const routes = [
  {
    path: urls.login,
    lazy: () => import('./routes/login'),
  },
];
