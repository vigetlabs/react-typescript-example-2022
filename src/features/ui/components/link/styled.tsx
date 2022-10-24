import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Link as RouterLink } from 'react-router-dom';

const fadeIn = keyframes({
  to: {
    opacity: 1,
  },
});

const fadeOut = keyframes({
  to: {
    opacity: 0,
  },
});

export const Anchor = styled(RouterLink)<{ disabled?: boolean }>(
  ({ theme, disabled = false }) => ({
    color: theme.colors.text,
    opacity: disabled ? 0.5 : 1,
    fontWeight: 'bold',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  }),
);

export const LoadingIndicator = styled('span')<{ isActive: boolean }>(
  ({ isActive }) => ({
    opacity: 0,
    animation: isActive ? fadeIn : fadeOut,
    animationDuration: isActive ? '0.3s' : '0.1s',
    animationDelay: isActive ? '0.3s' : '0s',
    animationFillMode: 'both',
    animationTimingFunction: 'ease-in-out',
    '&::before': {
      content: '"⏳"',
    },
  }),
);
