import React from 'react';
import PropTypes from 'prop-types';
import { useGetCourses } from '../../query';
import CourseCard from './CourseCard';
import styles from './CourseCard.module.css';

const CourseCardContainer = (props) => {
  const { data, isLoading, isError, error } = useGetCourses();

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>{error}</div>;
  }

  const coursesJSX = data.map((course) => (
    <CourseCard courseName={course.courseName} key={course.courseId} />
  ));

  return <div className={styles.courseCardContainer}>{coursesJSX}</div>;
};

CourseCardContainer.propTypes = {};

export default CourseCardContainer;
