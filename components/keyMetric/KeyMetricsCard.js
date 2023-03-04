/* eslint-disable react/forbid-prop-types */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { updateKeyMetrics } from '../../api';

function KeyMetricsCard({ keyMetricsObj }) {
  const [keyMetricsStatus, setKeyMetricsStatus] = useState(false);

  const handleKeyMetricsStatusClick = () => updateKeyMetrics({ ...keyMetricsObj, status: !keyMetricsStatus })
    .then((data) => {
      if (data) {
        setKeyMetricsStatus(!keyMetricsStatus);
      }
    });

  useEffect(() => {
    setKeyMetricsStatus(keyMetricsObj?.status || false);
  }, [keyMetricsObj.status]);

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
        <div />
        <button
          type="button"
          style={{
            background: 'transparent',
            border: 'none',
          }}
          onClick={handleKeyMetricsStatusClick}
        >
          <input
            type="checkbox"
            name="status"
            checked={keyMetricsStatus}
            readOnly
          />
          <span
            style={{
              marginLeft: '6px',
            }}
          >
            Mark completed
          </span>
        </button>
      </div>
    </div>
  );
}

KeyMetricsCard.propTypes = {
  keyMetricsObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    status: PropTypes.bool,
    goal: PropTypes.array,
    goalId: PropTypes.number,
  }).isRequired,
};

export default KeyMetricsCard;
