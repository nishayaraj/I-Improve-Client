/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PageTitle from '../../components/PageTitle';
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

  const routeToKeyMetricsForm = () => router.push(`/key_metrics/new?goalId=${goal.id}`);

  const routeToRetroForm = () => router.push(`/retros/new?goalId=${goal.id}`);

  const renderKeyMetrics = () => ((keyMetrics.length > 0)
    ? (
      keyMetrics.map((keyMetric) => (
        <KeyMetricsCard
          keyMetricsObj={keyMetric}
          key={keyMetric.id}
        />
      ))
    )
    : (<div> No key metrics found for this goal</div>));

  function renderGoalTagList(tags) {
    let goalTagList = '';
    if (tags && tags.length > 0) {
      tags.forEach((element, i) => {
        if (tags.length === i + 1) {
          goalTagList += `${element.title}`;
        } else {
          goalTagList += `${element.title}, `;
        }
      });
    }
    return goalTagList;
  }

  return (
    <>
      <PageTitle title={goal.title} />
      <div className="goals-view-title-metadata-container">
        <div
          className="goals-view-title-metadata-item-container"
        >
          <span>
            <img
              src="/schedule.png"
              className="goal-meta-icon"
              alt="My goal categories icon"
            />
          </span>
          <div
            className="goals-view-title-metadata-item"
          >
            <div
              className="goals-view-title-metadata-key"
            >
              Due on
            </div>
            <div
              className="goals-view-title-metadata-value"
            >
              {goal.due}
            </div>
          </div>
          <button
            type="button"
            className="add-km-button"
            onClick={routeToRetroForm}
          >
            Start a retro
          </button>
        </div>
        <div className="goals-view-title-metadata-item-container">
          <span>
            <img
              src="/tags.png"
              className="goal-meta-icon"
              alt="My goal categories icon"
            />
          </span>
          <div
            className="goals-view-title-metadata-item"
          >
            <div
              className="goals-view-title-metadata-key"
            >
              Tags
            </div>
            <div
              className="goals-view-title-metadata-value"
            >
              {renderGoalTagList(goal.tags)}
            </div>
          </div>
        </div>
      </div>
      <div
        className="keymetric-card-container"
      >
        <div
          className="km-title-container"
        >
          <div
            style={{ flex: 1 }}
          >
            <img
              src="/checking.png"
              className="goal-meta-icon"
              alt="My goal action checklist icon"
            />
            <span
              className="action-title"
            >
              Key metrics
            </span>
          </div>
          <button
            type="button"
            className="add-km-button"
            onClick={routeToKeyMetricsForm}
          >
            Add a new key metric
          </button>
        </div>
        {renderKeyMetrics()}
      </div>
    </>
  );
}

export default ViewGoal;
