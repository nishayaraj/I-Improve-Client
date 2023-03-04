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

  return (
    <div
      style={{
        margin: '0px 20px 20px',
        width: '320px',
        border: '1px solid lightgray',
        padding: '10px',
        borderRadius: '8px',
      }}
    >
      <div
        style={{ fontSize: '16px', textAlign: 'left', paddingTop: '16px' }}
      >
        <div
          style={{ color: '#717171' }}
        >
          <b>{goalObj.title}</b>
        </div>
        {keyMetricsStatusCount.total && (
        <div
          style={{
            height: '40px',
            width: '40px',
          }}
        >
          <CircularProgressbar
            value={getKMCompletedPercentage()}
            text={`${keyMetricsStatusCount.completed}/${keyMetricsStatusCount.total}`}
            styles={buildStyles({
              textColor: 'gray',
              pathColor: 'green',
              trailColor: 'red',
              textSize: 36,
            })}
          />
        </div>
        )}
        <div
          style={{ marginTop: '6px' }}
        >
          <span>Due Date : </span>{goalObj.due}
        </div>
        <div
          style={{ marginTop: '6px', color: '#717171' }}
        >
          <span>Tags : </span>
          <b>{renderGoalTagList(goalObj.tags)}</b>
        </div>
        <button
          type="button"
          style={{
            display: 'flex',
            padding: '6px',
            border: highlightRetroOption() ? '2px solid red' : '1.5px solid lightgray',
            borderRadius: '8px',
            alignItems: 'center',
            width: '90px',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginRight: '8px',
            background: 'none',
          }}
          onClick={routeToCreateRetroPage}
        >
          Retro
        </button>
        <div
          style={{
            margin: '10px 0px',
            color: '#717171',
            display: 'flex',
            justifyContent: 'start',
          }}
        >
          <button
            type="button"
            style={{
              display: 'flex',
              padding: '6px',
              border: '1.5px solid lightgray',
              borderRadius: '8px',
              alignItems: 'center',
              width: '90px',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginRight: '8px',
              background: 'none',
            }}
            onClick={viewGoal}
          >
            View
          </button>
          <button
            type="button"
            style={{
              display: 'flex',
              padding: '6px',
              border: '1.5px solid lightgray',
              borderRadius: '8px',
              alignItems: 'center',
              width: '90px',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginRight: '8px',
              background: 'none',
            }}
            onClick={editGoal}
            disabled={highlightRetroOption()}
          >

            Edit
          </button>
          <button
            type="button"
            style={{
              display: 'flex',
              padding: '6px',
              border: '1.5px solid lightgray',
              borderRadius: '8px',
              alignItems: 'center',
              width: '90px',
              cursor: 'pointer',
              fontWeight: 'bold',
              background: 'none',
            }}
            onClick={deleteThisGoal}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

MyGoalCard.propTypes = {
  goalObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    due: PropTypes.string,
    tags: PropTypes.array,
    tagId: PropTypes.number,
    keyMetrics: PropTypes.array,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default MyGoalCard;
