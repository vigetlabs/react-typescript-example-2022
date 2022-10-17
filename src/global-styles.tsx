import { darkTheme, lightTheme, useThemeStore } from 'features/theming';
import { css, Global } from '@emotion/react';

const globals = css`
  :root {
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;

    color-scheme: light dark;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  #root {
    overflow: auto;
  }

  body {
    background-color: var(--bg);
  }
`;

// ref: https://www.joshwcomeau.com/css/custom-css-reset/#the-css-reset
const reset = css`
  /**
   * 1. Use a more-intuitive box-sizing model.
   */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /**
   * 2. Remove default margin
   */
  * {
    margin: 0;
  }

  /**
   * 3. Allow percentage-based heights in the application
   */
  html,
  body {
    height: 100%;
  }

  /**
   * Typographic tweaks!
   * 4. Add accessible line-height
   * 5. Improve text rendering
   */
  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  /**
   * 6. Improve media defaults
   */
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  /**
   * 7. Remove built-in form typography styles
   */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  /**
   * 8. Avoid text overflows
   */
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  /**
   * 9. Create a root stacking context
   */
  #root {
    isolation: isolate;
  }
`;

export function GlobalStyles() {
  const themeStore = useThemeStore();
  const theme = themeStore.mode === 'dark' ? darkTheme : lightTheme;

  return (
    <>
      <Global styles={[reset, globals]} />
      <Global
        styles={css`
          body {
            --bg: ${theme.colors.background};
          }
        `}
      />
    </>
  );
}
