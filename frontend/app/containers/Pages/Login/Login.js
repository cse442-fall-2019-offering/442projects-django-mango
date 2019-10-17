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
    loading: false,
    isAuthenticating: true,
  };

  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  componentDidMount = () => {
    firebase.initializeApp({
      apiKey: process.env.REACT_APP_APIKEY,
      authDomain: process.env.REACT_APP_AUTHDOMAIN,
    });

    this.authUser().then(
      () => {
        this.setState({ isAuthenticating: false });
      },
      e => {
        this.setState({ isAuthenticating: false });
        // eslint-disable-next-line no-alert
        alert(e);
      },
    );
  };

  authUser() {
    return new Promise(function auth(resolve, reject) {
      firebase.auth().onAuthStateChanged(function authStateChanged(user) {
        if (user) {
          resolve(user);
          if (user.email.includes('@buffalo.edu')) {
            const { onLogin } = this.props;
            const payload = { user };
            onLogin(payload);
          } else {
            // eslint-disable-next-line no-alert
            alert('You must sign-in with an @buffalo.edu email address.');
            firebase.auth().signOut();
          }
        } else {
          reject(new Error('User not logged in'));
        }
      });
    });
  }

  render() {
    if (this.state.loading || this.state.isAuthenticating) {
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

const LoginMapped = connect(mapDispatchToProps)(Login);

export default LoginMapped;
