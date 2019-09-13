import React from 'react';
import Loading from 'my-components/Loading';
import loadable from '../utils/loadable';

// dashboard
export const Dashboard = loadable(() => import('./Pages/Dashboard/Dashboard'), {
  fallback: <Loading />,
});
