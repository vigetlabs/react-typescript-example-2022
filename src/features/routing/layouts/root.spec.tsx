import { RootLayout } from './root';
import { getAuthState } from 'features/auth';
import { ConnectedThemeProvider } from 'features/theming';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

const router = createMemoryRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
    },
    {
      path: '/login',
      element: <div>login</div>,
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

  describe('with an unauthenticated user', () => {
    it('renders link to the login page', async () => {
      const { findByRole } = setup();

      expect(await findByRole('link', { name: /log in/i })).toBeInTheDocument();
    });

    it('renders a "not logged in" notice', async () => {
      const { findByText } = setup();

      expect(await findByText('You are not logged in.')).toBeInTheDocument();
    });
  });

  describe('with an authenticated user', () => {
    beforeEach(() => {
      getAuthState().signIn({
        id: '1',
        email: 'bb@taz.com',
        firstName: 'Barry',
        lastName: 'Bluejeans',
      });
    });

    it('does not render a link to the login page', async () => {
      const { queryByRole } = setup();

      expect(
        await queryByRole('link', { name: /log in/i }),
      ).not.toBeInTheDocument();
    });

    it('renders a greeting to the logged-in user', async () => {
      const { findByText } = setup();

      expect(await findByText('Welcome Barry Bluejeans!')).toBeInTheDocument();
    });

    it('clicking "Sign Out" logs the user out and redirects to /login', async () => {
      const { user, findByText, findByRole } = setup();
      const btn = await findByRole('button', { name: /sign out/i });

      await user.click(btn);

      await waitFor(() => {
        expect(getAuthState().isAuthenticated).toBe(false);
      });

      expect(await findByText('login')).toBeInTheDocument();
    });
  });
});
