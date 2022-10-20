import { PolyComponent } from 'helpers/types';
import styled from '@emotion/styled';

export const Paragraph: PolyComponent<'p'> = styled('p')(({ theme }) => ({
  color: theme.colors.text,
}));
