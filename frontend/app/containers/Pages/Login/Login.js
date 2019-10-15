import React, { Component } from 'react';
import Loading from 'my-components/Loading';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Avatar from './avatar.png';
import './style.css';

firebase.initializeApp({
  apiKey: ' AIzaSyDyQlqoOHI2Af0dzNswbZ4T-B9qicu4ByU',
  authDomain: 'django-mango.firebaseapp.com',
});

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
    this.authUser().then(
      () => {
        this.setState({ isAuthenticating: false });
      },
      () => {
        this.setState({ isAuthenticating: false });
        // alert(e);
      },
    );
<<<<<<< HEAD
=======

    firebase.auth().onAuthStateChanged(function vars(result) {
      // const { token } = result.token; // Obtains the token
      const { user } = result.user;
      if (user) {
        window.location.href = '/dashboard';
      }
    });
>>>>>>> d089aa6c3274407c9a258d36f2baa51e0aea3f10
  };

  authUser() {
    return new Promise(function auth(resolve, reject) {
      firebase.auth().onAuthStateChanged(function authStateChanged(user) {
        if (user) {
          resolve(user);
<<<<<<< HEAD
          if (user.email.includes('@buffalo.edu')) {
            window.location.href = '/dashboard';
          } else {
            alert('You must sign-in with an @buffalo.edu email address.');
            firebase.auth().signOut();
            window.location.href = '/';
          }
=======
          window.location.href = '/dashboard';
>>>>>>> d089aa6c3274407c9a258d36f2baa51e0aea3f10
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
<<<<<<< HEAD
=======
    // window.location.pathname = '/dashboard'
    //  <span>
    //  <div>Signed In!</div>
    //  <button onClick={()=>firebase.auth().signOut()}>Sign Out</button>
    //  <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
    //  <h1>Email: {firebase.auth().currentUser.email}</h1>
    //  <img alt="profile picture" src={firebase.auth().currentUser.photoURL}/>
    // </span>
>>>>>>> d089aa6c3274407c9a258d36f2baa51e0aea3f10
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

export default Login;
