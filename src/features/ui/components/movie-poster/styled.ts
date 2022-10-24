import { Anchor } from '../link';
import { absoluteFill, flexCenter } from 'helpers/styles';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { RiLoader3Fill } from 'react-icons/ri';
import { SiThemoviedatabase } from 'react-icons/si';

type Props = {
  visible: boolean;
};

const spin = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },

  to: {
    transform: 'rotate(360deg)',
  },
});

export const Wrapper = styled('div')<{ loaded: boolean }>(
  ({ theme, loaded }) => ({
    position: 'relative',
    overflow: 'hidden',
    borderRadius: theme.spacing(1),
    aspectRatio: '2 / 3',
    opacity: loaded ? 1 : 0.3,
    background:
      theme.name === 'dark'
        ? `linear-gradient(to bottom, ${theme.colors.palette.emerald[700]} 0%, ${theme.colors.palette.emerald[900]} 100%)`
        : `linear-gradient(to bottom, ${theme.colors.palette.blue[200]} 0%, ${theme.colors.palette.blue[400]} 100%)`,
    transition: 'opacity 0.3s ease-in-out',
    width: '100%',
  }),
);

export const Poster = styled('img')<Props>(({ theme, visible }) => ({
  objectFit: 'cover',
  height: '100%',
  width: '100%',
  transition: `opacity 0.3s ease-in-out, transform 0.5s ${theme.easings.easeOutQuart}`,
  opacity: visible ? 1 : 0,
  transform: visible ? 'scale(1)' : 'scale(1.05)',

  [`${Anchor}:hover &, ${Anchor}:focus &`]: {
    transform: 'scale(1.1)',
    transitionDuration: '2s, 5s',
  },
}));

export const Placeholder = styled('div')<Props>(({ visible }) => ({
  ...absoluteFill,
  ...flexCenter,
  transition: `opacity 0.3s ease-in-out`,
  opacity: visible ? 1 : 0,
  backgroundColor: 'var(--bg)',
}));

export const LoadingWrapper = styled('div')<Props>(({ visible }) => ({
  ...absoluteFill,
  ...flexCenter,
  opacity: visible ? 1 : 0,
  transition: 'opacity 0.1s ease-in-out',
}));

export const LoadingIcon = styled(RiLoader3Fill)(({ theme }) => ({
  fill:
    theme.name === 'dark'
      ? theme.colors.palette.emerald[500]
      : theme.colors.palette.blue[500],
  fontSize: '2rem',
  animation: `${spin} 1s linear infinite`,
  opacity: 1,
}));

export const PlaceholderIcon = styled(SiThemoviedatabase, {
  shouldForwardProp: isPropValid,
})<Props>(({ theme, visible }) => ({
  fill: theme.colors.text,
  fontSize: '2rem',
  opacity: visible ? 0.5 : 0,
  transition: `0.3s opacity 0.1s, transform 0.3s ${theme.easings.easeInBounce} 0.1s`,
  transform: visible ? 'scale(1)' : 'scale(1.5)',
}));

function isPropValid(prop: string) {
  return prop !== 'visible';
}
