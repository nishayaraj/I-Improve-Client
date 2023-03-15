/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  CircularProgressbar,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { deleteGoal } from '../../api/goalData';

function MyGoalCard({ goalObj, onUpdate }) {
  const router = useRouter();
  const [keyMetricsStatusCount, setKeyMetricsStatusCount] = useState({
    completed: undefined,
    total: undefined,
  });

  useEffect(() => {
    if (goalObj?.keyMetrics && goalObj?.keyMetrics.length > 0) {
      const { keyMetrics } = goalObj;
      let completedKmCount = 0;

      keyMetrics.forEach((km) => {
        if (km.status) {
          completedKmCount += 1;
        }
      });

      setKeyMetricsStatusCount({
        completed: completedKmCount,
        total: keyMetrics.length,
      });
    }
  }, [goalObj]);

  const highlightRetroOption = () => {
    const goalCardDate = new Date(goalObj.due);
    const now = new Date().setHours(0, 0, 0, 0);
    return goalCardDate <= now;
  };

  const deleteThisGoal = () => {
    if (window.confirm(`Delete ${goalObj.title}?`)) {
      deleteGoal(goalObj.id).then(() => onUpdate());
    }
  };

  const editGoal = () => router.push(`/goals/edit/${goalObj.id}`);

  const viewGoal = () => router.push(`/goals/${goalObj.id}`);

  const routeToCreateRetroPage = () => router.push(`/retros/new?goalId=${goalObj.id}`);

  const renderGoalTagList = (tags) => {
    let goalTagList = '';
    if (tags && tags.length > 0) {
      tags.forEach((element, index) => {
        goalTagList += (index + 1 === tags.length) ? `${element.title}` : `${element.title}, `;
      });
    }
    return goalTagList;
  };

  const getKMCompletedPercentage = () => (keyMetricsStatusCount.total ? ((keyMetricsStatusCount.completed / keyMetricsStatusCount.total) * 100) : 0);

  const trimmedGoalTitle = (goalObj.title.length > 33) ? `${goalObj.title.substring(0, 33)}...` : goalObj.title;

  return (
    <div
      className="goal-card"
    >
      <div
        className="goal-title-container"
      >
        <div
          className="goal-title"
        >
          {trimmedGoalTitle}
        </div>
        {keyMetricsStatusCount.total && (
        <div
          className="goal-progress"
        >
          <CircularProgressbar
            value={getKMCompletedPercentage()}
            text={`${keyMetricsStatusCount.completed}/${keyMetricsStatusCount.total}`}
            styles={buildStyles({
              textColor: '#185674',
              pathColor: 'green',
              trailColor: '#ffc107',
              textSize: 36,
            })}
          />
        </div>
        )}
      </div>
      <div
        className="goal-info-item"
      >
        <div className="goal-key">
          Due on:
        </div>
        <div
          className="goal-value"
        >
          {goalObj.due}
        </div>
      </div>
      <div
        className="goal-info-item"
      >
        <div className="goal-key">
          Tags:
        </div>
        <div
          className="goal-value"
        >
          {renderGoalTagList(goalObj.tags)}
        </div>
      </div>
      <div
        className="goal-action-button-container"
      >
        <button
          type="button"
          className="goal-action-button"
          onClick={routeToCreateRetroPage}
          style={{
            fontWeight: `${highlightRetroOption() ? '800' : '400'}`,
          }}
        >
          <img
            src="/inspiration.png"
            className="goal-action-button-img"
            alt="retro goals icon"
          />
          <span>
            Start retro
          </span>
        </button>
        <button
          type="button"
          className="goal-action-button"
          onClick={viewGoal}
        >
          <img
            src="/view.png"
            className="goal-action-button-img"
            alt="View goals icon"
          />
          <span>
            View goal
          </span>
        </button>
        <button
          type="button"
          className="goal-action-button"
          onClick={editGoal}
          disabled={highlightRetroOption()}
          style={{
            color: `${highlightRetroOption() ? 'gray' : '#185674'}`,
          }}
        >
          <img
            src="/edit.png"
            className="goal-action-button-img"
            alt="Edit goals icon"
          />
          <span>
            Edit goal
          </span>
        </button>
        <button
          type="button"
          className="goal-action-button"
          onClick={deleteThisGoal}
        >
          <img
            src="/trash.png"
            className="goal-action-button-img"
            alt="Delete goals icon"
          />
          <span>
            Delete goal
          </span>
        </button>
      </div>
    </div>
  );
}

MyGoalCard.propTypes = {
  goalObj: PropTypes.shape({
    id: PropTypes.string || PropTypes.number,
    title: PropTypes.string,
    due: PropTypes.string,
    tags: PropTypes.array,
    tagId: PropTypes.number,
    keyMetrics: PropTypes.array,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default MyGoalCard;
