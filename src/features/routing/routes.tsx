import { ErrorPage } from './components/error-page';
import { NotFoundPage } from './components/not-found-page';
import { RootLayout } from './layouts/root';
import * as auth from 'features/auth';
import * as home from 'features/home';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage layout={RootLayout} />,
    children: [
      ...auth.routes,
      ...home.routes,
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

/* istanbul ignore if -- @preserve */
if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
