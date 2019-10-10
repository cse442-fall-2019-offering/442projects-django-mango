import React, { Component } from 'react';
import Loading from 'my-components/Loading';
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

firebase.initializeApp({
  apiKey:" AIzaSyDyQlqoOHI2Af0dzNswbZ4T-B9qicu4ByU",
  authDomain:"django-mango.firebaseapp.com"
})
class Login extends Component {

    state={isSignedIn: false}

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
      firebase.auth().onAuthStateChanged(user => {
        this.setState({isSignedIn:!!user})
        console.log("user",user)
        if (user) {
          window.location = '/dashboard'
        }
      })
    }

    render() {
      if (this.state.loading) {
        return <Loading />;
      }
      return (
        <div className="Login">
          {this.state.isSignedIn ? (
            //window.location.pathname = '/dashboard'
              <span>
              <div>Signed In!</div>
              <button onClick={()=>firebase.auth().signOut()}>Sign Out</button>
              <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
              <h1>Email: {firebase.auth().currentUser.email}</h1>
              <img alt="profile picture" src={firebase.auth().currentUser.photoURL}/>
            </span>
        ) : (
          <span><h1>Welcome to Django Mango</h1>
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </span>
        )}
      </div>
    );
  }
}

export default Login;