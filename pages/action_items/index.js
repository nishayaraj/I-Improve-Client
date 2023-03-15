import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../auth/context/authContext';
import PageTitle from '../../components/PageTitle';
import RetroCard from '../../components/retro/RetroCard';
import { getMyRetros } from '../../api/retroData';

function MyRetros() {
  const { user } = useAuth();
  const [retros, setRetros] = useState([]);

  const getAllMyRetros = useCallback(() => {
    getMyRetros(user.id).then(setRetros);
  }, [user]);

  useEffect(() => {
    getAllMyRetros();
  }, [getAllMyRetros, user]);

  return (
    <div className="text-center my-4">
      <PageTitle title="Action items" />
      <div className="">
        {retros?.map((retro) => (
          <RetroCard
            key={retro.id}
            retroObj={retro}
            onUpdate={getAllMyRetros}
          />
        ))}
      </div>
    </div>
  );
}

export default MyRetros;
