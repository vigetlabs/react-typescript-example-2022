import { RootLayout } from './root';
import { ConnectedThemeProvider } from 'features/theming';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

const router = createMemoryRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
    },
  ],
  {
    initialEntries: ['/'],
    initialIndex: 0,
  },
);

function setup() {
  return {
    user: userEvent.setup(),
    ...render(
      <ConnectedThemeProvider>
        <RouterProvider router={router} />
      </ConnectedThemeProvider>,
    ),
  };
}

describe('<RootLayout />', () => {
  it('renders a toggle theme button with a sun or moon depending on the mode', async () => {
    const { user, findByRole } = setup();
    const btn = await findByRole('button');

    expect(btn).toHaveTextContent('🌙');

    await user.click(btn);

    expect(btn).toHaveTextContent('🌞');
  });
});
