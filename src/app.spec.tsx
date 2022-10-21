import { App } from './app';
import { render } from '@testing-library/react';

describe('<App />', () => {
  it('renders the correct heading', async () => {
    const { findByText } = render(<App />);

    expect(
      await findByText('Vite + React + TypeScript Reference'),
    ).toBeInTheDocument();
  });
});
