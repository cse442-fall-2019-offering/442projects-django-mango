import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login } from 'my-actions/userActions';
import Loading from 'my-components/Loading';

import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Avatar from './avatar.png';
import './style.css';

class Login extends Component {
  state = {
    isAuthenticating: true,
  };

  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => {
        this.authUser();
      },
    },
  };

  componentDidMount = () => {
    firebase.initializeApp({
      apiKey: process.env.REACT_APP_APIKEY,
      authDomain: process.env.REACT_APP_AUTHDOMAIN,
    });
    this.setState({ isAuthenticating: false });
  };

  authUser() {
    const { onLogin } = this.props;
    firebase.auth().onAuthStateChanged(function authStateChanged(user) {
      if (user) {
        localStorage.removeItem('firebaseui::rememberedAccounts');
        if (user.email.includes('@buffalo.edu')) {
          const payload = { user };
          onLogin(payload);
        } else {
          // eslint-disable-next-line no-alert
          alert('You must sign-in with an @buffalo.edu email address.');
          firebase.auth().signOut();
        }
      }
    });
    return false;
  }

  render() {
    if (this.state.isAuthenticating) {
      return <Loading />;
    }
    return (
      <span>
        <div className="background">
          <div className="loginbox">
            <img src={Avatar} className="avatar" alt="" />
            <h1>Welcome to Django Mango</h1>
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        </div>
      </span>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onLogin: payload => dispatch(login(payload)),
});

const LoginMapped = connect(
  null,
  mapDispatchToProps,
)(Login);

export default LoginMapped;
