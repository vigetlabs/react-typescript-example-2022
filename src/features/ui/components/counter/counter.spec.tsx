import { Counter } from '.';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<Counter />', () => {
  it('increments when clicked', async () => {
    const user = userEvent.setup();
    const container = render(<Counter />);
    const btn = await container.findByRole('button');

    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('count is 0');

    await user.click(btn);
    await user.click(btn);
    await user.click(btn);

    expect(btn).toHaveTextContent('count is 3');
  });
});
