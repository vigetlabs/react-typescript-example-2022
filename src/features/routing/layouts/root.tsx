import { Header } from './styled';
import { urls } from '../urls';
import { ThemeToggleButton, useThemeStore } from 'features/theming';
import { Box, Link, Paragraph } from 'features/ui';
import { WithChildren } from 'helpers/types';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export function RootLayout({ children }: WithChildren<unknown>) {
  const themeStore = useThemeStore();

  return (
    <Box vertical>
      <Header>
        <Box as="ul" gap={4}>
          <li>
            <Link to={urls.home}>Home</Link>
          </li>
        </Box>

        <Box gap={4} align="center">
          <ThemeToggleButton>
            {themeStore.mode === 'dark' ? '🌞' : '🌙'}
          </ThemeToggleButton>
        </Box>
      </Header>

      {/* async route loading boundary */}
      <Suspense fallback={<Paragraph>Loading...</Paragraph>}>
        {children || <Outlet />}
      </Suspense>
    </Box>
  );
}
