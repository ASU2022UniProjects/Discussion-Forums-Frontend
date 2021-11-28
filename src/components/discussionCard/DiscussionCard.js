import React from 'react';
import PropTypes from 'prop-types';
import commonStyles from '../Common.module.css';

const DiscussionCard = ({ courseName, onClick }) => {
  return (
    <div className={commonStyles.card} onClick={onClick}>
      {courseName}
    </div>
  );
};

DiscussionCard.propTypes = {
  onClick: PropTypes.func.isRequired,
  courseName: PropTypes.string.isRequired,
};

export default DiscussionCard;
