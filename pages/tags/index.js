import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../auth/context/authContext';
import PageTitle from '../../components/PageTitle';
import AddTagLink from '../../components/tag/AddTagLink';
import { getMyTags } from '../../api/tagData';
import TagCard from '../../components/tag/TagCard';

function MyTags() {
  const { user } = useAuth();
  const [tags, setTags] = useState([]);

  const getAllMyTags = useCallback(() => {
    getMyTags(user.id).then(setTags);
  }, [user]);

  useEffect(() => {
    getAllMyTags();
  }, [getAllMyTags, user]);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <PageTitle title="Tags" />
        <AddTagLink />
      </div>
      <div>
        {tags?.map((tag) => (
          <TagCard
            key={tag.id}
            tagObj={tag}
            onUpdate={getAllMyTags}
          />
        ))}
      </div>
    </>
  );
}

export default MyTags;
