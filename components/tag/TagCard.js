/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import { deleteTag } from '../../api/tagData';

const TagCard = ({ tagObj, onUpdate }) => {
  const deleteSingleTag = () => {
    if (window.confirm(`Delete ${tagObj.title}?`)) {
      deleteTag(tagObj.id).then(() => onUpdate());
    }
  };

  return (
    <div
      className="keymetric-card"
    >
      <button
        type="button"
        className="keymetric-card-check"
        onClick={deleteSingleTag}
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
        {tagObj.title}
      </div>
    </div>
  );
};

TagCard.propTypes = {
  tagObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TagCard;
