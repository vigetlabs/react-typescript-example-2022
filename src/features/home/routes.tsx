import { HomePage, loadHomePage } from './routes/home/lazy';

export const urls = {
  home: '/',
} as const;

export const routes = [
  {
    path: urls.home,
    element: <HomePage />,
    loader: loadHomePage,
  },
];
