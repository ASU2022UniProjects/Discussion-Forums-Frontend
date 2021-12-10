import React from 'react';
import { useGetCourses } from '../../query';
import CourseCard from './CourseCard';
import styles from './CourseCard.module.css';
import { useNavigate } from 'react-router-dom';
import routes from '../../constants/routes';
import { CircularProgress } from '@mui/material';
import ErrorOccurred from '../ErrorOccurred';

const CourseCardContainer = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCourses();

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
  if (isError) {
    return <ErrorOccurred />;
  }

  let new_data;
  if (Array.isArray(data?.courses)) {
    new_data = data?.courses;
  } else {
    new_data = data;
  }

  if (new_data.length === 0) {
    return <div className={styles.noCourses}>No courses were found</div>;
  }

  return (
    <div className={styles.cardsContainer}>
      {new_data?.map(({ courseName, id }) => (
        <CourseCard
          courseName={courseName}
          courseId={id}
          key={id}
          onClick={() => navigate(`${routes.Courses}${id}`)}
        />
      ))}
    </div>
  );
};

CourseCardContainer.propTypes = {};

export default CourseCardContainer;
