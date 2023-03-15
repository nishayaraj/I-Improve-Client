/* eslint-disable react/forbid-prop-types */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import { deleteRetros } from '../../api/retroData';

function RetroCard({ retroObj, onUpdate }) {
  const deleteThisRetro = () => {
    if (window.confirm(`Delete ${retroObj.actionItem}?`)) {
      deleteRetros(retroObj.id).then(() => onUpdate());
    }
  };

  return (
    <div
      className="keymetric-card"
    >
      <button
        type="button"
        className="keymetric-card-check"
        onClick={deleteThisRetro}
      >
        <img
          className="action-item-checkbox"
          src="/delete.png"
          alt="action item check icon"
        />

      </button>
      <div
        className="keymetric-card-title"
      >
        {retroObj.actionItem}
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
  onUpdate: PropTypes.func.isRequired,
};

export default RetroCard;
