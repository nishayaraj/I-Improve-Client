/* eslint-disable react/forbid-prop-types */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';

function RetroCard({ retroObj }) {
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
          <b>Action Item: {retroObj.actionItem}</b>
        </div>

      </div>
    </div>
  );
}

RetroCard.propTypes = {
  retroObj: PropTypes.shape({
    id: PropTypes.number,
    goalId: PropTypes.number,
    userId: PropTypes.number,
    wentWell: PropTypes.string,
    toImprove: PropTypes.string,
    actionItem: PropTypes.string,
    date: PropTypes.string,
    status: PropTypes.bool,
  }).isRequired,
};

export default RetroCard;
