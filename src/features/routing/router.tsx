import { router } from './routes';
import { RouterProvider } from 'react-router-dom';

export function Router() {
  return <RouterProvider router={router} />;
}
