import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';
import PageTitle from '../PageTitle';
import { createTag } from '../../api/tagData';
import { useAuth } from '../../auth/context/authContext';

function TagForm() {
  const [newTag, setNewTag] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  const onChange = (e) => setNewTag(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: newTag,
      userId: user.id,
    };
    createTag(payload).then(() => {
      router.replace('/tags');
    });
  };

  return (
    <>
      <PageTitle title="Add new tag" />
      <Form
        onSubmit={handleSubmit}
        className="form"
      >
        <FloatingLabel
          controlId="floatingInput1"
          label="New tag title"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Enter Goal Title"
            name="title"
            value={newTag}
            onChange={onChange}
            required
          />
        </FloatingLabel>
        <div
          className="form-button-container"
        >
          <button
            type="submit"
            className="form-button"
          >
            Create tag
          </button>
        </div>
      </Form>
    </>
  );
}

export default TagForm;
