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
        <div className="signin-intro-title">Groove your way to success while learning from setbacks!</div>
        <div className="signin-intro-sub-title1"> With i-improve, Your Self-Accountability Partner, Unlock Your Future with the Power of the Past!</div>
        <div className="signin-intro-sub-title2">Easily track progress, identify areas for improvement, and plan for a better future. Welcome aboard!</div>
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
