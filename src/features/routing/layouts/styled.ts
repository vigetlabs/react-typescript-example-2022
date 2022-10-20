import styled from '@emotion/styled';

export const Header = styled('header')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: 16,
  justifyContent: 'space-between',
  background:
    theme.name === 'dark'
      ? theme.colors.palette.emerald[900]
      : theme.colors.palette.blue[300],
}));
