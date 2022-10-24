import { Wrapper } from './styled';
import { WithChildren } from 'helpers/types';
import React, { forwardRef } from 'react';

export const Button = forwardRef<
  HTMLButtonElement,
  WithChildren<React.ComponentPropsWithoutRef<'button'>>
>(function ButtonImpl({ children, ...props }, ref) {
  return (
    <Wrapper ref={ref} {...props}>
      {children}
    </Wrapper>
  );
});
