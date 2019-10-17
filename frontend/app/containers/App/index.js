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
import { makeSelectAuth } from 'my-selectors/userSelectors';

import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

import { Dashboard, Group, Login } from '../pageListAsync';

class App extends Component {
  state = {
    isAuthenticated: false,
  };

  static getDerivedStateFromProps(props) {
    return {
      isAuthenticated: props.auth,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.onCheckAuth();
    }, 500);
  }

  render() {
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
          <Route exact path="/groups" component={withRouter(Dashboard)} />
          <Route exact path="/groups/:groupId" component={withRouter(Group)} />
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
