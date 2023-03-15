import React, { useState } from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { createKeyMetrics } from '../../api/keyMetricsdata';
import PageTitle from '../PageTitle';

function KeyMetricsForm() {
  const router = useRouter();
  const { goalId } = router.query;
  const [newKeyMetric, setNewKeyMetric] = useState('');

  const onChange = (e) => setNewKeyMetric(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      goalId: Number(goalId),
      title: newKeyMetric,
      status: false,
    };
    createKeyMetrics(payload).then(() => {
      setNewKeyMetric('');
      router.back();
    });
  };

  return (
    <>
      <PageTitle title="Add a key metric to the goal" />
      <Form
        onSubmit={handleSubmit}
        className="form"
      >
        <FloatingLabel
          controlId="floatingInput1"
          label="New key metric"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Enter new key metric"
            name="key-metric"
            value={newKeyMetric}
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
            Add new key metrics
          </button>
        </div>
      </Form>
    </>
  );
}

export default KeyMetricsForm;
