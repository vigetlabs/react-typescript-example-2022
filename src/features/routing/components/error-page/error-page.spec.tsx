import { ErrorPage } from '.';
import {
  ForbiddenError,
  UnauthorizedError,
  UnexpectedError,
} from 'features/http';
import { ConnectedThemeProvider } from 'features/theming';
import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { vi } from 'vitest';

function Thrower({ error }: { error: Error }): JSX.Element {
  throw error;
}

function setup(errorToThrow: Error) {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <Thrower error={errorToThrow} />,
        errorElement: <ErrorPage />,
      },
    ],
    {
      initialEntries: ['/'],
      initialIndex: 0,
    },
  );

  return render(
    <ConnectedThemeProvider>
      <RouterProvider router={router} />
    </ConnectedThemeProvider>,
  );
}

const originalConsoleError = console.error;

describe('<ErrorPage />', () => {
  beforeEach(() => {
    global.console.error = vi.fn();
  });

  afterEach(() => {
    global.console.error = originalConsoleError;
  });

  describe('when an UnauthorizedError is thrown', () => {
    it('it renders Unauthorized', async () => {
      const { findByText, findByRole } = setup(
        new UnauthorizedError('Invalid credentials'),
      );

      expect(await findByRole('heading', { level: 1 })).toHaveTextContent(
        'Unauthorized',
      );
      expect(
        await findByText('You need to be logged in to do that.'),
      ).toBeInTheDocument();
    });
  });

  describe('when a ForbiddenError is thrown', () => {
    it('it renders Forbidden', async () => {
      const { findByText, findByRole } = setup(new ForbiddenError('Forbidden'));

      expect(await findByRole('heading', { level: 1 })).toHaveTextContent(
        'Permission Denied',
      );
      expect(
        await findByText('You aren’t authorized to do that.'),
      ).toBeInTheDocument();
    });
  });

  describe('when an UnexpectedError is thrown', () => {
    it('it renders Unexpected', async () => {
      const { findByText, findByRole } = setup(new UnexpectedError('It broke'));

      expect(await findByRole('heading', { level: 1 })).toHaveTextContent(
        'Oops!',
      );
      expect(await findByText('Something went wrong.')).toBeInTheDocument();
    });
  });
});
