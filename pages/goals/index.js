import React, { useEffect, useState, useCallback } from 'react';
// import AddGoalLink from '../../components/goal/AddGoalLink';
// import PageTitle from '../../components/PageTitle';
import GoalCard from '../../components/goal/GoalCard';
import { getMyGoals } from '../../api/goalData';
import { useAuth } from '../../auth/context/authContext';

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
    <div className="text-center my-4">
      {/* <PageTitle title="My Goals">
        <AddGoalLink />
      </PageTitle> */}
      <div
        className="d-flex flex-wrap"
        style={{ justifyContent: 'center' }}
      >
        {renderGoal()}
      </div>
    </div>
  );
}

export default MyGoals;
