import { ReactComponent as DefaultAvatar } from 'assets/images/avatar.svg';
import { Box } from 'features/ui';
import styled from '@emotion/styled';

export const MovieHeader = styled(Box)(({ theme }) => ({
  [theme.mqMin('md')]: {
    flexDirection: 'row',
  },
}));

export const CoverImage = styled('div')(({ theme }) => ({
  minWidth: 200,
  maxWidth: 318,
  flexShrink: 0,
  marginLeft: 'auto',
  marginRight: 'auto',

  [theme.mqMin('md')]: {
    width: '20%',
    margin: 0,
  },
}));

export const FallbackAvatar = styled(DefaultAvatar)(({ theme }) => ({
  '--bg': theme.colors.surface,
  '--fg': theme.colors.background,
  height: '100%',
  width: '100%',
}));
