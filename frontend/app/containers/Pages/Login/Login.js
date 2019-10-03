import React, { Component } from 'react';

import GoogleLogin from 'react-google-login'

import Loading from 'my-components/Loading';

import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

class Login extends Component {

    state={isSignedIn: false}

    render() {
        if (this.state.loading) {
            return <Loading />;
          }
        return (
            <div className="Login">
                {this.state.isSignedIn ? (
                    <div>Signed In!</div>
                ) : (
                    <div>Not Signed In!</div>
                )}
            </div>
        );
    }
}

export default Login;