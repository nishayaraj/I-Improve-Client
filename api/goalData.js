import { clientCredentials } from '../utils/client';

const getMyGoals = (userId) => fetch(`${clientCredentials.apiUrl}/goals?userId=${userId}`)
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error:', error);
  });

const getSingleGoal = (goalId) => fetch(`${clientCredentials.apiUrl}/goals/${goalId}`)
  .then((response) => response.json());

const updateGoal = (goal) => fetch(`${clientCredentials.apiUrl}/goals/${goal.id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(goal),
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error:', error);
  });

const createGoal = (goal) => fetch(`${clientCredentials.apiUrl}/goals`, {
  method: 'POST',
  body: JSON.stringify(goal),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
  .then((resp) => resp.json())
  .catch((error) => {
    console.error('Error:', error);
  });

const deleteGoal = (goalId) => fetch(`http://localhost:8000/goals/${goalId}`, {
  method: 'DELETE',
});

export {
  getMyGoals,
  getSingleGoal,
  createGoal,
  updateGoal,
  deleteGoal,
};
