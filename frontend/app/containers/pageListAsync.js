import React from 'react';
import Loading from '../components/Loading/index';
import loadable from '../utils/loadable';

// dashboard
export const Dashboard = loadable(() => import('./Pages/Dashboard/Dashboard'), {
  fallback: <Loading />,
});

// group
export const Group = loadable(() => import('./Pages/Group/Group'), {
  fallback: <Loading />,
});

// login
export const Login = loadable(() => import('./Pages/Login/Login'), {
  fallback: <Loading />,
});
