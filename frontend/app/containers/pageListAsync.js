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

// group creatipn
export const GroupCreation = loadable(
  () => import('./Pages/GroupCreation/GroupCreation'),
  {
    fallback: <Loading />,
  },
);

// login
export const Login = loadable(() => import('./Pages/Login/Login'), {
  fallback: <Loading />,
});

// Profile
export const Profile = loadable(() => import('./Pages/ProfilePage/Profile'), {
  fallback: <Loading />,
});

// Settings
export const Settings = loadable(() => import('./Pages/Settings/Settings'), {
  fallback: <Loading />,
});
