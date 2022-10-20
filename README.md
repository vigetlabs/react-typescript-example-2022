# React TypeScript Example (2022)

This repo contains a React app written in TypeScript using vite as a bundler
and build tool. Its purpose is to document and demonstrate the JS Dev team's
opinions, best practices, preferred libraries, testing methodology,
and application architecture.

**Note**: This repo represents a snapshot in time. The frontend development
landscape is notorious for changing rapidly. It is not expected for this project
to be maintained and adapted over time, though contributions are welcome.

## Setup

```bash
$ bin/setup
```

### Run the app

```bash
$ bin/server
```

## Styling

This app uses `emotion` with the `styled` variation. This variation is preferred
(over the `css` prop) because it allows for highly expressive and tidy jsx
(using appropriately named styled components with descriptive names that
indicate their intended purpose).

Within the `styled` API, this app uses the CSS object notation which looks like:

```js
const Button = styled('button')(({ theme }) => ({
  background: theme.colors.background,
}))
```

This approach has several benefits:
- better support for intellisense over css string template literals
- more concise when referencing props such as the theme

**Note(10/12/2022)**: For some unknown reason  using the latest versions of
`@emotion/react` and `@emotion/styled` (`11.10.4`) breaks the tests in some
strange and undebuggable way. The `ThemeProvider` does not seem to properly
provide the theme to `styled` components.

For this reason, we explicitly depend on `11.9.3` as a workaround until the
issue is resolved.

## Testing

### Running Unit Tests

To run the test suite once, immediately, use:

```bash
$ bin/test
```

This also supports optionally passing a test file name that will be fuzzy
matched against all the specs that `vitest` knows about, e.g.:

```bash
$ bin/test counter
```

**Interactively Running Tests (watch mode)**:

To run tests in watch mode:

```bash
$ npm run test:watch
```

If you want to open the browser UI:

```bash
$ npm run test:watch -- --ui
```

### Running Test Coverage

Test coverage is provided by `vitest` using the `istanbul` provider. Reporters
are configured for `html-spa` (handy for local browsing), `text` (cli output),
and `clover` (XML report used in CI).

```bash
$ bin/cov
```

Reports are generated in the `coverage` folder.

**Ignoring lines for coverage**

Istanbul supports [special comments](https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md)
for ignoring certain lines for the purposes of calculating test coverage. But
because of [this issue](https://github.com/vitest-dev/vitest/issues/2021) the
comments you add may not have any effect on the coverage due to `esbuild`
removing the comments during compilation. There is a [PR](https://github.com/istanbuljs/istanbuljs/pull/693)
to Istanbul to allow for "legal comments" (`/*! istanbul ignore next */`) which
shouldn't get stripped but for the time being we use `/* istanbul ignore next -- @preserve */`.
