import React from 'react';
import { useGetCourses } from '../../query';
import CourseCard from './CourseCard';
import styles from './CourseCard.module.css';
import { useNavigate } from 'react-router-dom';
import routes from '../../constants/routes';
import { CircularProgress } from '@mui/material';

const CourseCardContainer = () => {
  const { data, isLoading, isError } = useGetCourses();
  const navigate = useNavigate();

  const onCourseClick = (courseId) => navigate(`${routes.Courses}${courseId}`);

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  } else if (isError) {
    return <div>An unkown error has occured</div>;
  }

  const coursesJSX = data.map(({ courseName, courseId }) => (
    <CourseCard
      courseName={courseName}
      key={courseId}
      onClick={() => onCourseClick(courseId)}
    />
  ));

  return <div className={styles.cardsContainer}>{coursesJSX}</div>;
};

CourseCardContainer.propTypes = {};

export default CourseCardContainer;
