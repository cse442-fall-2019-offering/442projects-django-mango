import React, { Component } from 'react';
import Loading from 'my-components/Loading';
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

firebase.initializeApp({
  apiKey:" AIzaSyDyQlqoOHI2Af0dzNswbZ4T-B9qicu4ByU",
  authDomain:"django-mango.firebaseapp.com"
})
class Login extends Component {

    state = {
      isSignedIn: false,
      loading: false,
      isAuthenticating: true,
    }

    uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccess: () => false
      }
    }

    componentDidMount = ()=>{
      this.authUser().then((user) => {
        this.setState({ isAuthenticating: false });
     }, (error) => {
        this.setState({ isAuthenticating: false });
        alert(e);
     });

      firebase.auth().onAuthStateChanged(user => {
        this.setState({isSignedIn:!!user})
        if (user) {
          window.location.href = '/dashboard';
        }
      })
    }

    authUser() {
      return new Promise(function (resolve, reject) {
         firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              resolve(user);
              window.location.href = '/dashboard';
              this.setState({isSignedIn:!!user})
            } else {
              reject('User not logged in');
            }             
         });
      });
    }

    render() {
      if (this.state.loading || this.state.isAuthenticating) {
        return <Loading />;
      }
      //window.location.pathname = '/dashboard'
            //  <span>
            //  <div>Signed In!</div>
            //  <button onClick={()=>firebase.auth().signOut()}>Sign Out</button>
            //  <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
            //  <h1>Email: {firebase.auth().currentUser.email}</h1>
            //  <img alt="profile picture" src={firebase.auth().currentUser.photoURL}/>
            //</span>
      return (
        <div className="Login">(
            
          <span><h1>Welcome to Django Mango</h1>
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </span>
      </div>
    );
  }
}

export default Login;