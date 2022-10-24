import { Anchor } from '../link';
import { Paragraph } from '../paragraph';
import { absoluteFill, flexCenter } from 'helpers/styles';
import styled from '@emotion/styled';

export const MovieOverlay = styled('div')(({ theme }) => ({
  ...absoluteFill,
  ...flexCenter,
  flexDirection: 'column',
  gap: theme.spacing(2),
  borderRadius: theme.spacing(1),
  background: 'rgba(0, 0, 0, 0.7)',
  transition: 'opacity 0.2s ease-in-out',
  padding: theme.spacing(4),
  opacity: 0,

  [`${Anchor}:hover &, ${Anchor}:focus &`]: {
    opacity: 1,
    textDecoration: 'none',
  },
}));

export const MovieTitle = styled(Paragraph)(({ theme }) => ({
  textAlign: 'center',
  marginBlock: theme.spacing(4),
  fontSize: theme.remPx(16),
  color: theme.colors.white,
  margin: 0,
  lineHeight: 1.2,
  textShadow: '0 0 5px rgba(0, 0, 0, 0.5)',

  [theme.mqMin('md')]: {
    fontSize: theme.remPx(20),
  },
}));
