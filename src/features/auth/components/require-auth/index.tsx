import { useAuthStore } from '../../store';
import { urls } from 'features/routing/urls';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export function RequireAuth({
  children = <Outlet />,
  redirectTo = urls.login,
}: {
  children?: JSX.Element;
  redirectTo?: string;
}) {
  const auth = useAuthStore();
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children;
}
