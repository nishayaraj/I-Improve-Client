/* eslint-disable react/button-has-type */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useRouter } from 'next/router';
import { signOut } from '../auth/auth';

export default function LoggedinNavbar() {
  const router = useRouter();
  const routeToGoalPage = () => router.push('/goals');
  const routeToTagsPage = () => router.push('/tags');
  const routeToActionItemPage = () => router.push('/action_items');

  return (
    <div className="loggedin-navbar">
      <div
        className="loggedin-navbar-app-name-container"
      >
        <img
          className="loggedin-navbar-app-name-img"
          src="./improveBrandtextGY.png"
          alt="I-improve"
        />
      </div>
      <div className="loggedin-navbar-buttons-container">
        <button
          className="loggedin-navbar-buttons"
          onClick={routeToGoalPage}
        >
          <img
            src="./goalIcon.png"
            className="loggedin-navbar-buttons-icon"
            alt="my goals icon"
          />
          My goals
        </button>
        <button className="loggedin-navbar-buttons" onClick={routeToActionItemPage}>
          <img
            src="./action.png"
            className="loggedin-navbar-buttons-icon"
            alt="action items icon"
          />
          Action items
        </button>
        <button className="loggedin-navbar-buttons" onClick={routeToTagsPage}>
          <img
            src="./options.png"
            className="loggedin-navbar-buttons-icon"
            alt="My goal categories icon"
          />
          Manage tags
        </button>
        <button className="loggedin-navbar-buttons" onClick={signOut}>
          <img
            src="./logoutIcon.png"
            className="loggedin-navbar-buttons-icon"
            alt="logout icon"
          />
          Log out
        </button>
      </div>
    </div>
  );
}
