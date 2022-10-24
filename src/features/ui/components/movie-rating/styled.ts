import styled from '@emotion/styled';

export const Wrapper = styled('p')(({ theme }) => ({
  color: theme.colors.primary,
  display: 'flex',
  gap: theme.spacing(0.5),
}));
