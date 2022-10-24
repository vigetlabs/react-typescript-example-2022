import { Anchor, LoadingIndicator } from './styled';
import { ScreenReaderText } from '../screen-reader-text';
import { forwardRef } from 'react';
import { LinkProps, useNavigation } from 'react-router-dom';

type Props = LinkProps & React.ComponentPropsWithoutRef<'a'>;

export const Link = forwardRef<HTMLAnchorElement, Props>(function LinkImpl(
  { children, to, ...props },
  ref,
) {
  const navigation = useNavigation();
  const pendingNavigation =
    navigation.location?.pathname === to && navigation.state === 'loading';

  return (
    <Anchor ref={ref} to={to} {...props}>
      {children}

      <LoadingIndicator isActive={pendingNavigation}>
        {pendingNavigation && (
          <ScreenReaderText role="alert">Loading page...</ScreenReaderText>
        )}
      </LoadingIndicator>
    </Anchor>
  );
});
