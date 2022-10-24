import { CacheProvider } from 'features/http';
import { ResourceCacheProvider } from 'features/resource-cache';
import { Router } from 'features/routing';
import { ConnectedThemeProvider } from 'features/theming';
import { GlobalStyles } from 'global-styles';

export function App() {
  return (
    <>
      <GlobalStyles />

      <ConnectedThemeProvider>
        <ResourceCacheProvider>
          <CacheProvider>
            <Router />
          </CacheProvider>
        </ResourceCacheProvider>
      </ConnectedThemeProvider>
    </>
  );
}
