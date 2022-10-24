import { Anchor } from './styled';
import { ScreenReaderText } from '../screen-reader-text';
import { forwardRef, useRef } from 'react';
import {
  LinkProps,
  useFetcher,
  useLinkClickHandler,
  useNavigation,
  useResolvedPath,
} from 'react-router-dom';

export type Props = LinkProps &
  React.ComponentPropsWithoutRef<'a'> & {
    disabled?: boolean;
    preload?: boolean;
    preloadDelay?: number;
  };

export { Anchor };

export const Link = forwardRef<HTMLAnchorElement, Props>(function LinkImpl(
  {
    children,
    to,
    disabled = false,
    preload = false,
    preloadDelay = 200,
    target,
    replace,
    state,
    preventScrollReset,
    onClick,
    ...props
  },
  ref,
) {
  const fetcher = useFetcher();
  const navigation = useNavigation();
  const timerRef = useRef<NodeJS.Timeout>();
  const loadedRef = useRef(false);
  const pendingNavigation =
    navigation.location?.pathname === to && navigation.state === 'loading';
  const path = useResolvedPath(to);

  const handleClick = useLinkClickHandler(to, {
    target,
    replace,
    state,
    preventScrollReset,
  });

  const handleMouseOver = () => {
    if (loadedRef.current) {
      return;
    }

    timerRef.current = setTimeout(() => {
      try {
        loadedRef.current = true;
        fetcher.load(path.pathname);
      } catch (e: unknown) {
        loadedRef.current = false;
        console.error(e);
      }
    }, preloadDelay);
  };

  const handleMouseOut = () => {
    clearTimeout(timerRef.current);
  };

  return (
    <Anchor
      ref={ref}
      to={to}
      onMouseOver={preload && !disabled ? handleMouseOver : undefined}
      onMouseOut={preload && !disabled ? handleMouseOut : undefined}
      disabled={disabled}
      {...props}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
          return;
        }

        onClick?.(event);

        if (!event.defaultPrevented) {
          handleClick(event);
        }
      }}
    >
      {children}

      {pendingNavigation && (
        <ScreenReaderText role="alert">Loading page...</ScreenReaderText>
      )}
    </Anchor>
  );
});
