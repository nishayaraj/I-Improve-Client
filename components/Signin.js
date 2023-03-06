/* eslint-disable @next/next/no-img-element */
import React from 'react';
import LoggedoutNavbar from './LoggedoutNavbar';
import { signIn } from '../auth/auth';

function Signin() {
  return (
    <div
      className="signin-container"
    >
      <LoggedoutNavbar />
      <div className="signin-intro-container">
        <div className="signin-intro-title">Get started with i-improve application.</div>
        <div className="signin-intro-sub-title1">Create a free account to start tracking time and supercharge your productivity.</div>
        <div className="signin-intro-sub-title2">No credit card required · Unsubscribe at any time</div>
      </div>
      <div className="signin-button-container">
        <button
          type="button"
          onClick={signIn}
          className="signin-button-google"
        >
          <img src="./google.svg" alt="google logo" />
          <div className="signin-button-google-text">Login with Google</div>
        </button>
      </div>
    </div>
  );
}

export default Signin;
