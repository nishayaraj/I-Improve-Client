/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useRouter } from 'next/router';

function AddTagLink() {
  const router = useRouter();
  const routeToNewTagPage = () => router.push('/tags/new');

  return (
    <button
      type="button"
      className="add-km-button"
      onClick={routeToNewTagPage}
    >
      Add a new tag
    </button>
  );
}

export default AddTagLink;
