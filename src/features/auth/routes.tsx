import { action as loginAction } from './routes/login/action';
import { LoginPage, loadLoginPage } from './routes/login/lazy';

export const urls = {
  login: '/login',
} as const;

export const routes = [
  {
    path: urls.login,
    element: <LoginPage />,
    action: loginAction,
    loader: loadLoginPage,
  },
];
