import { RootLayout } from './layouts/root';
import { urls } from './urls';
import * as home from 'features/home';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: urls.root,
    element: <RootLayout />,
    children: [...home.routes],
  },
]);

/* istanbul ignore if -- @preserve */
if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
