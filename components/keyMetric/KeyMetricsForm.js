import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createKeyMetrics } from '../../api/keyMetricsdata';

function KeyMetricsForm({ goalId, onNewKeyMetricCreated }) {
  const [newKeyMetric, setNewKeyMetric] = useState('');

  const onChange = (e) => setNewKeyMetric(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      goalId: Number(goalId),
      title: newKeyMetric,
    };
    createKeyMetrics(payload).then(onNewKeyMetricCreated);
    setNewKeyMetric('');
  };

  return (
    <Form className="comment-form-div" onSubmit={handleSubmit}>
      <Form.Group className="comment-form">
        <Form.Label>Add a key metric to this goal</Form.Label>
        <input className="comment-form-input" type="text" name="Comment" value={newKeyMetric} onChange={onChange} />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
}

KeyMetricsForm.propTypes = {
  onNewKeyMetricCreated: PropTypes.func.isRequired,
  goalId: PropTypes.string.isRequired,
};

export default KeyMetricsForm;
