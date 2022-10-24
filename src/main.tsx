import { App } from './app';
import { config } from 'config';
import React from 'react';
import ReactDOM from 'react-dom/client';

/**
 * @NOTE(shawk): This is only intended to be used in development as a way to
 * build the app in isolation from remote dependencies. It should not be
 * enabled in production!
 */
async function prepare() {
  if (config.enableMockServer) {
    const { worker } = await import('./test/mocks/browser');

    if (import.meta.hot) {
      import.meta.hot.dispose(() => worker.stop());
    }

    return worker.start({ onUnhandledRequest: 'bypass' });
  }

  return Promise.resolve();
}

prepare().then(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
