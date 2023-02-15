/* eslint-disable import/prefer-default-export */
import { getKeyMetricsByGoalId } from './keyMetricsdata';
import { getSingleGoal } from './goalData';

const getGoalKeyMetrics = (goalId) => new Promise((resolve, reject) => {
  getSingleGoal(goalId)
    .then((goalData) => {
      getKeyMetricsByGoalId(goalId)
        .then((keyMetricsData) => {
          resolve({ goalData, keyMetricsData });
        });
    }).catch((error) => reject(error));
});

export {
  getGoalKeyMetrics,
};
