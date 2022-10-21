import { Paragraph } from '../paragraph';
import { ApiFailure } from 'helpers/types';

type Props = {
  errors: ApiFailure['errors'];
};

export function ErrorMessages({ errors }: Props) {
  return (
    <ul>
      {errors.map((error, i) => (
        <li key={`${error.code}-${i}`}>
          <Paragraph
            css={(theme) => ({ color: theme.colors.feedback.error.text })}
          >
            {error.detail || error.title}
          </Paragraph>
        </li>
      ))}
    </ul>
  );
}
