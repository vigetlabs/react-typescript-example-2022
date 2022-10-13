import styled from '@emotion/styled';

export const Button = styled('button')(({ theme }) => ({
  background: theme.colors.primary,
  color: theme.colors.text,
  border: '1px solid transparent',
  padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
  borderRadius: theme.spacing(1),
  cursor: 'pointer',

  '&:hover, &:focus': {
    border: `1px solid ${theme.colors.secondary}`,
  },
}));
