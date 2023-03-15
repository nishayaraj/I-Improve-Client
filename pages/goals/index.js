import React, { useEffect, useState, useCallback } from 'react';
import PageTitle from '../../components/PageTitle';
import GoalCard from '../../components/goal/GoalCard';
import { getMyGoals } from '../../api/goalData';
import { useAuth } from '../../auth/context/authContext';
import AddGoalButton from '../../components/goal/AddGoalButton';

function MyGoals() {
  const { user: { id } } = useAuth();
  const [goals, setGoals] = useState([]);

  const getAllMyGoals = useCallback(() => {
    if (id) {
      getMyGoals(id).then(setGoals);
    }
  }, [id]);

  useEffect(() => {
    getAllMyGoals();
  }, [getAllMyGoals]);

  const mostRecentGoalByDate = goals.sort((a, b) => b.due.split('-').join('') - a.due.split('-').join(''));

  const renderGoal = () => mostRecentGoalByDate.map((goal) => (
    <GoalCard
      key={goal.id}
      goalObj={goal}
      onUpdate={getAllMyGoals}
    />
  ));

  return (
    <>
      <AddGoalButton />
      <PageTitle title="My goals" />
      <div
        className="goal-card-container"
      >
        {renderGoal()}
      </div>
    </>
  );
}

export default MyGoals;
