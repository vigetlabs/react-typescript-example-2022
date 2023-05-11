export const urls = {
  home: '/',
} as const;

export const routes = [
  {
    path: urls.home,
    lazy: () => import('./routes/home'),
  },
];
