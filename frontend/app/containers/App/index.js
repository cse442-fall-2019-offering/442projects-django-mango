/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { checkAuth } from 'my-actions/userActions';
import Loading from 'my-components/Loading';
import { makeSelectAuth } from 'my-selectors/userSelectors';

import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

import {
  Dashboard,
  Group,
  Login,
  Profile,
  GroupCreation,
  Settings,
} from '../pageListAsync';

class App extends Component {
  state = {
    isAuthenticated: null,
  };

  static getDerivedStateFromProps(props) {
    return {
      isAuthenticated: props.auth,
    };
  }

  componentDidMount() {
    this.props.onCheckAuth();
  }

  render() {
    if (this.state.isAuthenticated === null) {
      return <Loading />;
    }
    if (!this.state.isAuthenticated) {
      return (
        <div>
          <Route component={Login} />
          <GlobalStyle />
        </div>
      );
    }
    return (
      <div>
        <Switch>
          <Route exact path="/" component={withRouter(Dashboard)} />
          <Route exact path="/groups" component={withRouter(Dashboard)} />
          <Route exact path="/groups/new" component={GroupCreation} />
          <Route exact path="/groups/:groupId" component={withRouter(Group)} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/settings" component={Settings} />
          <Route
            exact
            path="auto_join_group"
            component={withRouter(Dashboard)}
          />
          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </div>
    );
  }
}

App.propTypes = {
  onCheckAuth: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth(),
});

const mapDispatchToProps = dispatch => ({
  onCheckAuth: () => dispatch(checkAuth()),
});

const AppMapped = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default AppMapped;
