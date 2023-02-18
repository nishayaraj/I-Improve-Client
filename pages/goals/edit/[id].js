import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import GoalForm from '../../../components/goal/GoalForm';
import { getSingleGoal } from '../../../api/goalData';

export default function EditGoal() {
  const [goal, setGoal] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleGoal(id).then(setGoal);
  }, [id]);

  return (<GoalForm goalObj={goal} />);
}
