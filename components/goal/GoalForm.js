/* eslint-disable react/forbid-prop-types */
import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Multiselect from 'multiselect-react-dropdown';
import { useAuth } from '../../auth/context/authContext';
import PageTitle from '../PageTitle';
import { getMyTags } from '../../api/tagData';
import { createGoal, updateGoal } from '../../api/goalData';

const initialState = {
  id: '',
  title: '',
  due: '',
  tagId: 0,
  tags: [''],
};

function GoalForm({ goalObj }) {
  const router = useRouter();
  const { user } = useAuth();
  const [goalFormInput, setGoalFormInput] = useState(initialState);
  const [tagsList, setTagsList] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const tagMultiSelectRef = useRef();

  useEffect(() => {
    if (goalObj?.id) {
      setGoalFormInput({ ...initialState, ...(goalObj || {}) });
      setSelectedTags(goalObj.tags);
    }
  }, [goalObj]);

  useEffect(() => {
    getMyTags(user.id).then((tagsData) => {
      setTagsList(tagsData);
    });
  }, [user]);

  // Handle Mutli select tags
  const updateTagSelected = (selectedTagData) => {
    setSelectedTags(selectedTagData);
  };

  // handles form element change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoalFormInput({ ...goalFormInput, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tags = [];
    selectedTags.forEach((tag) => !tags.includes(tag.id) && tags.push(tag.id));

    const payload = {
      ...goalFormInput, tags, userId: user.id,
    };
    if (goalFormInput.id) {
      updateGoal(payload).then(() => router.back());
    } else {
      createGoal(payload).then(() => {
        router.back();
      });
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      style={{
        color: 'black',
        lineHeight: '25px',
        padding: '30px 40px',
        border: '1px solid lightgray',
        borderRadius: '8px',
        marginBottom: '20px',
        background: 'white',
      }}
    >
      <PageTitle title={`${goalFormInput.id ? `Update : ${goalObj.title}` : 'Create goal'}`} />
      <FloatingLabel
        controlId="floatingInput1"
        label="Goal Title"
        className="mb-3"
        style={{ marginTop: '18px' }}
      >
        <Form.Control
          type="text"
          placeholder="Enter Goal Title"
          name="title"
          value={goalFormInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Multiselect
        options={tagsList}
        selectedValues={selectedTags}
        onSelect={updateTagSelected}
        onRemove={updateTagSelected}
        displayValue="title"
        placeholder="Select Tags"
        hidePlaceholder
        ref={tagMultiSelectRef}
      />
      <FloatingLabel
        controlId="floatingInput2"
        label="due"
        className="mb-3"
        style={{ marginTop: '25px' }}
      >
        <Form.Control
          type="date"
          placeholder="Due Date"
          name="due"
          value={goalFormInput.due}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button
        type="submit"
        style={{
          marginTop: '25px',
          background: '#f38449',
          border: '1px solid #f38449',
        }}
      >
        Submit Goal
      </Button>
    </Form>
  );
}

GoalForm.propTypes = {
  goalObj: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    tags: PropTypes.array,
    due: PropTypes.string,
  }),
};

GoalForm.defaultProps = {
  goalObj: initialState,
};

export default GoalForm;
