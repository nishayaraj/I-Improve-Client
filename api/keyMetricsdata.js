import { clientCredentials } from '../utils/client';

const getKeyMetricsByGoalId = (goalId) => fetch(`${clientCredentials.apiUrl}/keymetrics?goalId=${goalId}`)
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error:', error);
  });

const createKeyMetrics = (keyMetrics) => fetch(`${clientCredentials.apiUrl}/keymetrics`, {
  method: 'POST',
  body: JSON.stringify(keyMetrics),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
  .then((resp) => resp.json())
  .catch((error) => {
    console.error('Error:', error);
  });

const updateKeyMetrics = (keyMetrics) => fetch(`${clientCredentials.apiUrl}/keymetrics/${keyMetrics.id}`, {
  method: 'PUT',
  body: JSON.stringify(keyMetrics),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
  .then((resp) => {
    if (resp.status === 204) {
      return 'KM update';
    }
    throw Error('Unable to update KM');
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// const deleteKeyMetrics = (keyMetricsId) => fetch(`http://localhost:8000/tags/${keyMetricsId}`, {
//   method: 'DELETE',
// });

export { getKeyMetricsByGoalId, createKeyMetrics, updateKeyMetrics };
