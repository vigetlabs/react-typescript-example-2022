import App from './app';
import { render } from '@testing-library/react';

describe('<App />', () => {
  it('renders', async () => {
    const container = render(<App />);
    expect(container).toBeTruthy();
  });
});
