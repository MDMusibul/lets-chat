import React from 'react';
import { auth, provider } from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
import { Button } from '@material-ui/core';
import './Login.css';

function Login() {
  const [state, dispatch] = useStateValue();  // dispatch is how we shoot thing into the data layer

  const signIn = (e) => {
    // e.preventDefault();
    auth  // implementing the sign in with google functionality.
      .signInWithPopup(provider)
      .then(result => {
        console.log(result);
        dispatch({  // we will be dispatching action to set user
          type: actionTypes.SET_USER,  // this action will be listioned in reducer and will be modifing the state.
          user: result.user,  // this is the payload, and it will push the user into the data layer.
        })  // so what are we doing here is that when we loged in we are dispatching a SET_USER action into the reducer along with the user. And inside the reducer we are the updateing the user int the state with the dispatched user (action.user). The reducer will update the user in the data layer. And the user will be checker at the App.js page, after exxtacting it from the data layer using useStateValue hook.
      })
      .catch(error => {
        alert(error.message);  // this line will result in a pop up if some error occurs during the login process.
      })
  }

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://coronalabs.com/wordpress/wp-content/uploads/2017/04/Firebase_16-logo.png"
          alt=""
        />
        <h1>Sign in to lets-chat</h1>
        <p>lets-chat.com</p>
        <Button onClick={signIn}>Sign in with Google</Button>  {/* on clicking the button we will be loncging the signIn function to sign in using our google account. */}
      </div>
    </div>
  );
}

export default Login
