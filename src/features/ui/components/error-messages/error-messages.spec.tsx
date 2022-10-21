import { ErrorMessages } from '.';
import { ConnectedThemeProvider } from 'features/theming';
import { ApiFailure } from 'helpers/types';
import { render } from '@testing-library/react';

function setup(errors: ApiFailure['errors']) {
  return render(
    <ConnectedThemeProvider>
      <ErrorMessages errors={errors} />
    </ConnectedThemeProvider>,
  );
}

describe('<ErrorMessages />', () => {
  describe('with an error that has a `detail`', () => {
    it('renders the `detail` text', async () => {
      const { findByText } = setup([
        {
          status: 403,
          code: 'FORBIDDEN',
          title: 'You’re not allowed to do that.',
          detail: 'Please accept this cookie as compensation.',
        },
      ]);

      expect(
        await findByText('Please accept this cookie as compensation.'),
      ).toBeInTheDocument();
    });
  });

  describe('with an error that does not have a `detail`', () => {
    it('renders the `title` text', async () => {
      const { findByText } = setup([
        {
          status: 403,
          code: 'FORBIDDEN',
          title: 'You’re not allowed to do that.',
        },
      ]);

      expect(
        await findByText('You’re not allowed to do that.'),
      ).toBeInTheDocument();
    });
  });

  describe('with multiple errors', () => {
    it('renders each error', async () => {
      const { findByText } = setup([
        {
          status: 403,
          code: 'FORBIDDEN',
          title: 'You’re not allowed to do that.',
        },
        {
          status: 401,
          code: 'UNAUTHORIZED',
          title: 'Invalid credentials.',
        },
      ]);

      expect(
        await findByText('You’re not allowed to do that.'),
      ).toBeInTheDocument();
      expect(await findByText('Invalid credentials.')).toBeInTheDocument();
    });
  });
});
