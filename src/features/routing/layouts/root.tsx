import { Header } from './styled';
import { urls } from '../urls';
import { useAuthStore } from 'features/auth';
import { ThemeToggleButton, useThemeStore } from 'features/theming';
import { Box, Button, Link, Paragraph } from 'features/ui';
import { WithChildren } from 'helpers/types';
import { Outlet, useNavigate } from 'react-router-dom';

export function RootLayout({ children }: WithChildren<unknown>) {
  const authStore = useAuthStore();
  const themeStore = useThemeStore();

  return (
    <Box vertical>
      <Header>
        <Box as="ul" gap={4}>
          <li>
            <Link to={urls.home}>Home</Link>
          </li>

          {authStore.isAuthenticated ? null : (
            <li>
              <Link to={urls.login}>Log In</Link>
            </li>
          )}
        </Box>

        <Box gap={4} align="center">
          <AuthStatus />

          <ThemeToggleButton>
            {themeStore.mode === 'dark' ? '🌞' : '🌙'}
          </ThemeToggleButton>
        </Box>
      </Header>

      {children || <Outlet />}
    </Box>
  );
}

function AuthStatus() {
  const authStore = useAuthStore();
  const navigate = useNavigate();

  if (!authStore.isAuthenticated) {
    return <Paragraph>You are not logged in.</Paragraph>;
  }

  return (
    <Box align="center" gap={3}>
      <Paragraph>Welcome {authStore.computed.fullName}!</Paragraph>

      <Button
        onClick={async () => {
          await authStore.signOut();
          navigate('/login');
        }}
      >
        Sign out
      </Button>
    </Box>
  );
}
