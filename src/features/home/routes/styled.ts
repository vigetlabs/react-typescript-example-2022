import styled from '@emotion/styled';

export const Wrapper = styled('div')(({ theme }) => ({
  background: theme.colors.background,
  padding: theme.spacing(4),
  minHeight: '100%',
}));

export const Card = styled('div')(({ theme }) => ({
  background: theme.colors.surface,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(4),
}));
