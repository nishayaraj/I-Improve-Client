/* eslint-disable react/forbid-prop-types */
import React, { useRef } from 'react';
// import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Multiselect from 'multiselect-react-dropdown';
// // import PageTitle from '../PageTitle';
// import { getMyTags } from '../../api/tagData';

const initialState = {
  id: '',
  title: '',
  due: '',
  tagId: 0,
  tags: [''],
};

function GoalForm({ goalObj }) {
  // const router = useRouter();
  // const { user } = useAuth();
  // const [goalFormInput, setGoalFormInput] = useState(initialState);
  // const [tagsList, setTagsList] = useState([]);
  // const [selectedTags, setSelectedTags] = useState([]);
  const tagMultiSelectRef = useRef();

  // useEffect(() => {
  //   if (goalObj?.id) {
  //     setGoalFormInput({ ...initialState, ...(goalObj || {}) });
  //     setSelectedTags(goalObj.tags);
  //   }
  // }, [goalObj]);

  // useEffect(() => {
  //   getMyTags(user.id).then((tagsData) => {
  //     setTagsList(tagsData);
  //   });
  // }, [user]);

  return (
    <Form
    // onSubmit={handleSubmit}
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
      <h6>Create Goal</h6>
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
          value={goalObj.title}
          // onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Multiselect
        // options={goalsList}
        // selectedValues={selectedTags}
        // onSelect={updateJournalSelected}
        // onRemove={updateJournalSelected}
        displayValue="title"
        placeholder="Select Tags"
        hidePlaceholder
        ref={tagMultiSelectRef}
      />
      <FloatingLabel
        controlId="floatingInput2"
        label="Date"
        className="mb-3"
        style={{ marginTop: '25px' }}
      >
        <Form.Control
          type="date"
          placeholder="Due Date"
          name="due"
          value={goalObj.due}
          // onChange={handleChange}
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
        Create Goal
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
