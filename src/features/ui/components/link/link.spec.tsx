import { Link, Props as LinkProps } from '.';
import { ConnectedThemeProvider } from 'features/theming';
import { render } from '@testing-library/react';
import {
  createMemoryRouter,
  RouterProvider,
  useNavigation,
} from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('react-router-dom', async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reactRouter = (await vi.importActual('react-router-dom')) as any;

  return {
    ...reactRouter,
    useNavigation: vi.fn(),
  };
});

const useNavigationMock = vi.mocked(useNavigation);

const navigationState = {
  location: undefined,
  formMethod: undefined,
  formAction: undefined,
  formEncType: undefined,
  formData: undefined,
};

function setup(props: LinkProps) {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <Link {...props}>Example</Link>,
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

describe('<Link />', () => {
  describe('when navigation state is settled', () => {
    beforeEach(() => {
      useNavigationMock.mockImplementation(() => ({
        ...navigationState,
        state: 'idle',
      }));
    });

    it('renders an anchor with the correct href', async () => {
      const { findByRole } = setup({ to: '/destination' });

      expect(await findByRole('link')).toHaveAttribute('href', '/destination');
    });
  });

  describe('when navigation is pending for the link’s URL', () => {
    beforeEach(() => {
      useNavigationMock.mockImplementation(() => ({
        ...navigationState,
        state: 'loading',
        location: {
          pathname: '/destination',
          hash: '',
          search: '',
          state: undefined,
          key: 'abc',
        },
      }));
    });

    it('renders a loading indicator', async () => {
      const { findByRole } = setup({ to: '/destination' });

      expect(await findByRole('alert')).toHaveTextContent('Loading page...');
    });
  });

  describe('when navigation is pending for a different URL', () => {
    beforeEach(() => {
      useNavigationMock.mockImplementation(() => ({
        ...navigationState,
        state: 'loading',
        location: {
          pathname: '/not-destination',
          hash: '',
          search: '',
          state: undefined,
          key: 'abc',
        },
      }));
    });

    it('does not render a loading indicator', async () => {
      const { queryByRole } = setup({ to: '/destination' });

      expect(await queryByRole('alert')).not.toBeInTheDocument();
    });
  });
});
