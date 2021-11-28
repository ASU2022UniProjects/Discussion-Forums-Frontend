import React from 'react';
import PropTypes from 'prop-types';
import commonStyles from '../Common.module.css';

const CourseCard = ({ courseName }) => {
  return <div className={commonStyles.card}>{courseName}</div>;
};

CourseCard.propTypes = {};

export default CourseCard;
