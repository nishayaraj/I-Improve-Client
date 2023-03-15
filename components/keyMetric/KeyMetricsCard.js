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
      className="keymetric-card"
    >
      <button
        type="button"
        className="keymetric-card-check"
        onClick={handleKeyMetricsStatusClick}
      >
        {
          keyMetricsStatus
            ? (
              <img
                className="action-item-checkbox"
                src="/checkmark.png"
                alt="action item check icon"
              />
            )
            : (
              <img
                className="action-item-checkbox"
                src="/unchecked.png"
                alt="action item check icon"
              />
            )
        }

      </button>
      <div
        className="keymetric-card-title"
      >
        {keyMetricsObj.title}
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
