import { Grid } from '../grid';
import styled from '@emotion/styled';

export const MoviesGrid = styled(Grid)(({ theme }) => ({
  gridTemplateColumns: 'repeat(2, 1fr)',
  width: '100%',

  [theme.mqMin('sm')]: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(12.5rem, 100%), 1fr))',
  },
}));

export const GridItem = styled('li')({
  position: 'relative',
});
