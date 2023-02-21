/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../auth/context/authContext';
import PageTitle from '../PageTitle';
import { createRetros } from '../../api/retroData';

const initialState = {
  id: 0,
  goalId: 0,
  userId: 0,
  wentWell: '',
  toImprove: '',
  actionItem: '',
  date: '',
  status: false,
};

function RetroForm({ retroObj }) {
  const router = useRouter();
  const { user } = useAuth();
  const [retroFormInput, setRetroFormInput] = useState(initialState);

  const { goalId } = router.query;

  useEffect(() => {
    if (retroObj?.id) {
      setRetroFormInput({ ...initialState, ...(retroObj || {}) });
    }
  }, [retroObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRetroFormInput({ ...retroFormInput, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (retroFormInput?.id === 0) {
      const createRetroObject = { ...retroFormInput };
      delete createRetroObject.id;
      const payload = { ...createRetroObject, goalId, userId: user.id };
      createRetros(payload).then(() => {
        router.push('/action_items');
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
      <PageTitle title="Create Retro" />
      <FloatingLabel
        controlId="floatingInput1"
        label="What went well with this goal ?"
        className="mb-3"
        style={{ marginTop: '18px' }}
      >
        <Form.Control
          type="text"
          placeholder="What went well with this goal"
          name="wentWell"
          value={retroFormInput.wentWell}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput1"
        label="What is one possible improvement that could have been made?"
        className="mb-3"
        style={{ marginTop: '18px' }}
      >
        <Form.Control
          type="text"
          placeholder="What is one possible improvement that could have been made?"
          name="toImprove"
          value={retroFormInput.toImprove}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput1"
        label="Action item to work towards"
        className="mb-3"
        style={{ marginTop: '18px' }}
      >
        <Form.Control
          type="text"
          placeholder="Action item to work towards"
          name="actionItem"
          value={retroFormInput.actionItem}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput2"
        label="date"
        className="mb-3"
        style={{ marginTop: '25px' }}
      >
        <Form.Control
          type="date"
          placeholder="Date"
          name="date"
          value={retroFormInput.date}
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
        Create Retro
      </Button>
    </Form>
  );
}

RetroForm.propTypes = {
  retroObj: PropTypes.shape({
    id: PropTypes.number,
    goalId: PropTypes.number,
    userId: PropTypes.number,
    wentWell: PropTypes.string,
    toImprove: PropTypes.string,
    actionItem: PropTypes.string,
    date: PropTypes.string,
    status: PropTypes.bool,
  }),
};

RetroForm.defaultProps = {
  retroObj: initialState,
};

export default RetroForm;
