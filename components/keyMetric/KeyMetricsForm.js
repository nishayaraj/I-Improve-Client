import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { createKeyMetrics } from '../../api/keyMetricsdata';

function KeyMetricsForm({ onNewKeyMetricCreated }) {
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
    createKeyMetrics(payload).then(onNewKeyMetricCreated);
    setNewKeyMetric('');
  };

  return (
    <Form className="key-metric-form-div" onSubmit={handleSubmit}>
      <Form.Group className="key-metric-form">
        <Form.Label>Add a key metric to this goal</Form.Label>
        <input className="key-metric-form-input" type="text" name="key-metric" value={newKeyMetric} onChange={onChange} />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
}

KeyMetricsForm.propTypes = {
  onNewKeyMetricCreated: PropTypes.func.isRequired,
};

export default KeyMetricsForm;
