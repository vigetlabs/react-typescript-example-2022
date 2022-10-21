// ref: https://www.infoxicator.com/react-router-6-4-code-splitting
// ref: https://gist.github.com/brophdawg11/03a475e26922e09aa35ca8b5900a4fb4
import React from 'react';

let Component:
  | React.ComponentFactory<unknown, React.Component>
  | React.LazyExoticComponent<() => JSX.Element> = React.lazy(
  () => import('./index'),
);

// @TODO(shawk): add a full-screen loader component
function Fallback() {
  return <>...</>;
}

export function HomePage() {
  return (
    <React.Suspense fallback={<Fallback />}>
      <Component />
    </React.Suspense>
  );
}

export async function loadHomePage() {
  const controller = new AbortController();

  return import('./index').then(
    (componentModule) => {
      if (!controller.signal.aborted) {
        Component = componentModule.default;
      }
    },
    () => null,
  );
}
