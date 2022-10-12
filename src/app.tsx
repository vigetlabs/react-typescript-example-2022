import { Counter } from 'components/counter';
import { useThemeStore } from 'features/theming/store';
import { ConnectedThemeProvider } from 'features/theming/theme-provider';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  background: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.spacing(4)};
  min-height: 100%;
`;

const Card = styled.div`
  background: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.spacing(1)};
  padding: ${(props) => props.theme.spacing(4)};
`;

const Heading = styled.h1`
  color: ${(props) => props.theme.colors.text};
`;

const Paragraph = styled.p`
  color: ${(props) => props.theme.colors.text};
`;

const ThemeToggleButton = styled.button`
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  border: 1px solid transparent;
  padding: ${(props) => `${props.theme.spacing(2)} ${props.theme.spacing(3)}`};
  border-radius: ${(props) => props.theme.spacing(1)};
  cursor: pointer;

  &:hover,
  &:focus {
    border: 1px solid ${(props) => props.theme.colors.secondary};
  }
`;

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

        <ThemeToggleButton onClick={() => themeStore.toggleMode()}>
          Toggle theme
        </ThemeToggleButton>
      </Card>
    </Wrapper>
  );
}

function App() {
  return (
    <ConnectedThemeProvider>
      <Router />
    </ConnectedThemeProvider>
  );
}

export default App;
