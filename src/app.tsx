import { Router } from 'features/routing';
import { ConnectedThemeProvider } from 'features/theming';
import { GlobalStyles } from 'global-styles';

function App() {
  return (
    <>
      <GlobalStyles />

      <ConnectedThemeProvider>
        <Router />
      </ConnectedThemeProvider>
    </>
  );
}

export default App;
