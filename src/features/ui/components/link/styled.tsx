import styled from '@emotion/styled';
import { forwardRef } from 'react';
import { LinkProps, Link as RouterLink } from 'react-router-dom';

type Props = LinkProps & React.ComponentPropsWithoutRef<'a'>;

const Anchor = styled(RouterLink)(({ theme }) => ({
  color: theme.colors.text,
  fontWeight: 'bold',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

export const Link = forwardRef<HTMLAnchorElement, Props>(function (
  { children, ...props },
  ref,
) {
  return (
    <Anchor ref={ref} {...props}>
      {children}
    </Anchor>
  );
});
