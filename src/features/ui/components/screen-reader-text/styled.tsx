import styled from '@emotion/styled';

export const ScreenReaderText = styled('span')<{ focusable?: boolean }>(
  ({ focusable = false }) => ({
    border: 0,
    clip: 'rect(1px, 1px, 1px, 1px)',
    WebkitClipPath: 'inset(50%)',
    ClipPath: 'inset(50%)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    width: 1,
    whiteSpace: 'nowrap',
    ...(focusable
      ? {
          '&:focus, &:active': {
            clip: 'auto',
            WebkitClipPath: 'none',
            ClipPath: 'none',
            height: 'auto',
            margin: 'auto',
            overflow: 'visible',
            width: 'auto',
            whiteSpace: 'normal',
          },
        }
      : {}),
  }),
);
