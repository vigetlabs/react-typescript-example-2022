import { Router } from 'features/routing';
import { ConnectedThemeProvider } from 'features/theming';
import { GlobalStyles } from 'global-styles';

export function App() {
  return (
    <>
      <GlobalStyles />

      <ConnectedThemeProvider>
        <Router />
      </ConnectedThemeProvider>
    </>
  );
}
