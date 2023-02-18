/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import KeyMetricsCard from '../../components/keyMetric/KeyMetricsCard';
import { getGoalKeyMetrics } from '../../api/goalKeyMetrics';

function ViewGoal() {
  const router = useRouter();
  const { id } = router.query;
  const [goal, setGoal] = useState({});
  const [keyMetrics, setKeyMetrics] = useState([]);

  const getGoalAndAssociatedMetrics = () => {
    getGoalKeyMetrics(id)
      .then(({ goalData, keyMetricsData }) => {
        setGoal(goalData);
        setKeyMetrics(keyMetricsData);
      });
  };

  useEffect(() => {
    getGoalAndAssociatedMetrics();
  }, [id]);

  // refactor code to add goal.id to handle submitted keymetric addition to goal
  const routeToKeyMetricsForm = () => router.push(`/key_metrics/new?goalId=${goal.id}`);

  const renderKeyMetrics = () => {
    if (keyMetrics.length > 0) {
      return (
        keyMetrics.map((keyMetric) => <KeyMetricsCard keyMetricsObj={keyMetric} key={keyMetric.id}>{keyMetric.title}</KeyMetricsCard>)
      );
    }
    return (<div> No key metrics found for this goal</div>);
  };

  const renderGoalTagList = (tags) => {
    let goalTagList = '';
    if (tags && tags.length > 0) {
      tags.forEach((element) => {
        goalTagList += `${element.title}, `;
      });
    }
    return goalTagList;
  };

  return (
    <div style={{
      margin: '0px 20px 20px ',
      width: '400px',
      border: '1px solid lightgray',
      padding: '10px',
      borderRadius: '8px',
    }}
    >
      <h5>{goal.title}</h5>
      <p>Due Date: {goal.due}</p>
      <p>Goal Tags: {renderGoalTagList(goal.tags)}</p>
      {renderKeyMetrics()}
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
        onClick={routeToKeyMetricsForm}
      >
        Add new key metrics
      </button>
    </div>
  );
}

export default ViewGoal;
