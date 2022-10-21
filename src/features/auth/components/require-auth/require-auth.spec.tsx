import { RequireAuth } from '.';
import { getAuthState } from 'features/auth/store';
import { act, render, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider, To } from 'react-router-dom';

function setup() {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <div>root</div>,
      },
      {
        path: '/referrer',
        element: <div>referrer</div>,
      },
      {
        path: '/login',
        element: <div>login</div>,
      },
      {
        path: '/protected',
        element: (
          <RequireAuth>
            <>protected</>
          </RequireAuth>
        ),
      },
      {
        path: '/protected-with-child-routes',
        element: <RequireAuth />,
        children: [
          {
            index: true,
            element: <div>protected child route</div>,
          },
        ],
      },
    ],
    {
      initialEntries: ['/'],
      initialIndex: 0,
    },
  );

  return {
    navigate: async (to: To, opts?: { state?: unknown }) => {
      await act(() => {
        router.navigate(to, opts);
      });
    },
    ...render(<RouterProvider router={router} />),
  };
}

describe('<RequireAuth />', () => {
  describe('with an unauthenticated user', () => {
    describe('when redirected from another page', () => {
      it('navigates to /login', async () => {
        const { navigate, findByText } = setup();

        await navigate('/protected');

        expect(await findByText('login')).toBeInTheDocument();
      });
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

    describe('with children', () => {
      it('renders the child component', async () => {
        const { navigate, findByText } = setup();

        await navigate('/protected');

        expect(await findByText('protected')).toBeInTheDocument();
      });
    });

    describe('with child routes', () => {
      it('renders the child route', async () => {
        const { navigate, findByText } = setup();

        await navigate('/protected-with-child-routes');

        expect(await findByText('protected child route')).toBeInTheDocument();
      });
    });

    describe('when redirected from another page', () => {
      it('navigates to the referring url', async () => {
        const { navigate, findByText } = setup();

        await navigate('/protected', { state: { from: '/referrer' } });

        waitFor(async () => {
          expect(await findByText('referrer')).toBeInTheDocument();
        });
      });
    });
  });
});
