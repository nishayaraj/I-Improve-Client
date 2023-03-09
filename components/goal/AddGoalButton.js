/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useRouter } from 'next/router';

export default function AddGoalButton() {
  const router = useRouter();
  const routeToGoalForm = () => router.push('/goals/new');

  return (
    <button
      type="button"
      className="add-goal-button"
      onClick={routeToGoalForm}
    >
      <img
        src="./add.png"
        className="add-goal-button-img"
        alt="add goals icon"
      />
      <span>
        Add new goal
      </span>
    </button>
  );
}
