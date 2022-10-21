// ref: https://www.infoxicator.com/react-router-6-4-code-splitting
// ref: https://gist.github.com/brophdawg11/03a475e26922e09aa35ca8b5900a4fb4
import React from 'react';

let Component:
  | React.ComponentFactory<unknown, React.Component>
  | React.LazyExoticComponent<() => JSX.Element> = React.lazy(
  () => import('./index'),
);

function Fallback() {
  return <>...</>;
}

export function LoginPage() {
  return (
    <React.Suspense fallback={<Fallback />}>
      <Component />
    </React.Suspense>
  );
}

export async function loadLoginPage() {
  const controller = new AbortController();

  return import('./index').then(
    (componentModule) => {
      if (!controller.signal.aborted) {
        // We loaded the component _before_ our loader finished, so we can
        // blow away React.lazy and just use the component directly.  This
        // avoids the flicker we'd otherwise get since React.lazy would need
        // to throw the already-resolved promise up to the Suspense boundary
        // one time to get the resolved value
        Component = componentModule.default;
      }
    },
    () => null,
  );
}
