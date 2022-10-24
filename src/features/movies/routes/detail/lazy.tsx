// ref: https://www.infoxicator.com/react-router-6-4-code-splitting
// ref: https://gist.github.com/brophdawg11/03a475e26922e09aa35ca8b5900a4fb4
import React from 'react';
import { LoaderFunctionArgs } from 'react-router-dom';

let Component:
  | React.ComponentFactory<unknown, React.Component>
  | React.LazyExoticComponent<() => JSX.Element> = React.lazy(
  () => import('./index'),
);

// @TODO(shawk): add a full-screen loader component
function Fallback() {
  return <>...</>;
}

export function MovieDetailPage() {
  return (
    <React.Suspense fallback={<Fallback />}>
      <Component />
    </React.Suspense>
  );
}

export async function loadMovieDetailPage(args: LoaderFunctionArgs) {
  const controller = new AbortController();

  import('./index').then(
    (componentModule) => {
      if (!controller.signal.aborted) {
        Component = componentModule.default;
      }
    },
    () => null,
  );

  try {
    const { default: loader } = await import('./loader');
    return await loader(args);
  } finally {
    controller.abort();
  }
}
