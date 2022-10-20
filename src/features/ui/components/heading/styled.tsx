import styled from '@emotion/styled';

type Props = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children?: React.ReactNode;
};

const Text = styled('h1')(({ theme }) => ({
  color: theme.colors.text,
}));

export function Heading({ children, as = 'h1' }: Props) {
  return <Text as={as}>{children}</Text>;
}
