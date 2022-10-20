import { ThemeToggleButton } from '.';
import { useThemeStoreImpl, ConnectedThemeProvider } from 'features/theming';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

function setup() {
  return {
    user: userEvent.setup(),
    ...render(
      <ConnectedThemeProvider>
        <ThemeToggleButton>Toggle theme</ThemeToggleButton>
      </ConnectedThemeProvider>,
    ),
  };
}

describe('<ThemeToggleButton />', () => {
  it('toggles the theme when clicked', async () => {
    const { user, findByRole } = setup();
    const button = await findByRole('button');

    expect(useThemeStoreImpl.getState().mode).toBe('light');

    await user.click(button);

    expect(useThemeStoreImpl.getState().mode).toBe('dark');

    await user.click(button);

    expect(useThemeStoreImpl.getState().mode).toBe('light');
  });
});
