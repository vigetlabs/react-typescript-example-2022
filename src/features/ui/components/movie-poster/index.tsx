import {
  LoadingIcon,
  LoadingWrapper,
  Placeholder,
  PlaceholderIcon,
  Poster,
  Wrapper,
} from './styled';
import { useResourceCache } from 'features/resource-cache';
import { ColorKey } from 'features/theming/palette';
import { useTheme } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';

import type { AppTheme } from 'features/theming';

type Props = {
  src: string;
  fallbackSrc?: string;
  alt?: string;
};

type Status = 'initial' | 'loading' | 'loaded' | 'error';

export function MoviePoster({ src, alt = '' }: Props) {
  const theme = useTheme();
  const resourceCache = useResourceCache();
  const [cached] = useState(() => resourceCache.load(src).settled);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [inViewport, setInViewport] = useState(cached);
  const [cardColor] = useState(() => randomColor(theme));
  const [status, setStatus] = useState<Status>(() =>
    cached ? 'loaded' : 'initial',
  );

  const error = status === 'error';
  const loaded = status === 'loaded';

  useEffect(() => {
    if (status === 'initial') {
      setStatus('loading');
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInViewport(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.01,
        root: document.getElementById('root'),
        rootMargin: '50% 50% 50% 50%',
      },
    );

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    observer.observe(imageRef.current!);

    return () => {
      observer.disconnect();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Wrapper loaded={loaded || error}>
      <Poster
        ref={imageRef}
        src={src}
        alt={alt}
        loading={loaded || inViewport ? 'eager' : 'lazy'}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        visible={loaded && !error}
      />

      <LoadingWrapper visible={status === 'loading'}>
        <LoadingIcon />
      </LoadingWrapper>

      <Placeholder visible={error} style={{ '--bg': cardColor }}>
        <PlaceholderIcon visible={error} />
      </Placeholder>
    </Wrapper>
  );
}

function randomColor(theme: AppTheme) {
  const colors = Object.keys(theme.colors.palette) as ColorKey[];
  const colorKey = colors[Math.floor(Math.random() * colors.length)];

  return theme.colors.palette[colorKey][500];
}
