import { Card, Wrapper } from './styled';
import { ThemeToggleButton, useThemeStore } from 'features/theming';
import { Counter, Heading, Paragraph } from 'features/ui';

export function HomePage() {
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
