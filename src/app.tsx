import { Counter } from 'components/counter';
import { ThemeToggleButton } from 'components/theme-toggle-button';
import { useThemeStore, ConnectedThemeProvider } from 'features/theming';
import { GlobalStyles } from 'global-styles';
import { Card, Heading, Paragraph, Wrapper } from 'styled';

// @TODO(shawk): move this and actually do some routing
function Router() {
  const themeStore = useThemeStore();

  return (
    <Wrapper>
      <Heading>Vite + React + TypeScript Reference</Heading>

      <Card>
        <Counter />

        <Paragraph>
          Theme: <strong>{themeStore.mode}</strong>
        </Paragraph>

        <ThemeToggleButton>Toggle theme</ThemeToggleButton>
      </Card>
    </Wrapper>
  );
}

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
