/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
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

  const activPathName = router.pathname;

  const checkIfPathActive = (activeRouteArray) => (activeRouteArray.includes(activPathName)
    ? { borderBottom: '1px solid #185674' } : {});

  return (
    <div className="loggedin-navbar">
      <div
        className="loggedin-navbar-app-name-container"
      >
        <img
          className="loggedin-navbar-app-name-img"
          src="/brandText.png"
          alt="I-improve"
          onClick={routeToGoalPage}
        />
      </div>
      <div className="loggedin-navbar-buttons-container">
        <button
          className="loggedin-navbar-buttons"
          onClick={routeToGoalPage}
          style={{
            ...(checkIfPathActive(['/goals', '/goals/new', '/goals/[id]', '/key_metrics/new', '/goals/edit/[id]'])),
          }}
        >
          <img
            src="/goalIcon.png"
            className="loggedin-navbar-buttons-icon"
            alt="my goals icon"
          />
          My goals
        </button>
        <button
          className="loggedin-navbar-buttons"
          onClick={routeToActionItemPage}
          style={{
            ...(checkIfPathActive(['/retros/new', '/action_items'])),
          }}
        >
          <img
            src="/action.png"
            className="loggedin-navbar-buttons-icon"
            alt="action items icon"
          />
          Action items
        </button>
        <button
          className="loggedin-navbar-buttons"
          onClick={routeToTagsPage}
          style={{
            ...(checkIfPathActive(['/tags', '/tags/new'])),
          }}
        >
          <img
            src="/tags.png"
            className="loggedin-navbar-buttons-icon"
            alt="My goal categories icon"
          />
          Manage tags
        </button>
        <button
          className="loggedin-navbar-buttons"
          onClick={signOut}
        >
          <img
            src="/logoutIcon.png"
            className="loggedin-navbar-buttons-icon"
            alt="logout icon"
          />
          Log out
        </button>
      </div>
    </div>
  );
}
