import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { deleteTag } from '../../api/tagData';

const TagCard = ({ tagObj, onUpdate }) => {
  const deleteSingleTag = () => {
    if (window.confirm(`Delete ${tagObj.title}?`)) {
      deleteTag(tagObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Text>{tagObj.title}</Card.Text>
        <Button variant="danger" onClick={deleteSingleTag} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
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
