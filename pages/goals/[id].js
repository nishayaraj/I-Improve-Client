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
    </div>
  );
}

export default ViewGoal;
