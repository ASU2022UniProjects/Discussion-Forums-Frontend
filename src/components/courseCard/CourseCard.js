import React from 'react';
import PropTypes from 'prop-types';
import commonStyles from '../Common.module.css';

const CourseCard = ({ courseName, onClick }) => {
  return (
    <div className={commonStyles.card} onClick={onClick}>
      {courseName}
    </div>
  );
};

CourseCard.propTypes = {};

export default CourseCard;
