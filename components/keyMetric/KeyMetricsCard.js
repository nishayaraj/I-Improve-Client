/* eslint-disable react/forbid-prop-types */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';

function KeyMetricsCard({ keyMetricsObj }) {
  return (
    <div
      style={{
        margin: '0px 20px 20px',
        width: '320px',
        border: '1px solid lightgray',
        padding: '10px',
        borderRadius: '8px',
      }}
    >
      <div
        style={{ fontSize: '16px', textAlign: 'left', paddingTop: '16px' }}
      >
        <div
          style={{ color: '#717171' }}
        >
          <b>Key Metric: {keyMetricsObj.title}</b>
        </div>

      </div>
    </div>
  );
}

KeyMetricsCard.propTypes = {
  keyMetricsObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    goal: PropTypes.array,
    goalId: PropTypes.number,
  }).isRequired,
};

export default KeyMetricsCard;
