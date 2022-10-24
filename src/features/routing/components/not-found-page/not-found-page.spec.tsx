import { NotFoundPage } from '.';
import { ConnectedThemeProvider } from 'features/theming';
import { render } from '@testing-library/react';

function setup() {
  return render(
    <ConnectedThemeProvider>
      <NotFoundPage />
    </ConnectedThemeProvider>,
  );
}

describe('<NotFoundPage />', () => {
  it('it renders', async () => {
    const { findByText, findByRole } = setup();

    expect(await findByRole('heading', { level: 1 })).toHaveTextContent(
      'Whoops!',
    );
    expect(
      await findByText('That page is in another theatre.'),
    ).toBeInTheDocument();
  });
});
