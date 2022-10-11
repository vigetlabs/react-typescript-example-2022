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

Test coverage is provided by `vitest` using the `c8` provider. Reporters are
configured for `html` (handy for local browsing), `text` (cli output), and
`clover` (XML report for CI).

```bash
$ bin/cov
```

Reports are generated in the `coverage` folder.
