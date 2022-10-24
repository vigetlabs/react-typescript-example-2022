import { Theme } from '@emotion/react';
import styled, { Interpolation } from '@emotion/styled';

type Props = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  // children?: React.ReactNode;
  // css?: Interpolation<Theme>;
};

export const Heading = styled('h1')<Props>(({ theme }) => ({
  color: theme.colors.text,
}));
