/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

import { Dashboard, Group, Login } from '../pageListAsync';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={withRouter(Dashboard)} />
        <Route exact path="/groups/:groupId" component={withRouter(Group)} />
        <Route exact path="/login" component={withRouter(Login)} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
