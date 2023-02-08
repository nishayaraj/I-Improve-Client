/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useRouter } from 'next/router';

function AddTagLink() {
  const router = useRouter();
  const routeToNewTagPage = () => router.push('/tags/new');

  return (
    <button
      type="button"
      onClick={routeToNewTagPage}
      className="addButton"
    >
      <span
        style={{
          fontSize: '14px',
        }}
      >
        Add New Tag
      </span>
    </button>
  );
}

export default AddTagLink;
