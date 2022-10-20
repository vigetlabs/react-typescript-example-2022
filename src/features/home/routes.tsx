import React from 'react';

const HomePage = React.lazy(() => import('./routes/home'));

export const urls = {
  home: '/',
};

export const routes = [
  {
    path: urls.home,
    element: <HomePage />,
  },
];
