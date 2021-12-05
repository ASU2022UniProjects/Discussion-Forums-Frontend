import React from 'react';
import { useGetCourses } from '../../query';
import CourseCard from './CourseCard';
import styles from './CourseCard.module.css';
import { useNavigate } from 'react-router-dom';
import routes from '../../constants/routes';
import { CircularProgress } from '@mui/material';

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
    return <div>An unknown error has occurred</div>;
  }
  if (data.length === 0) {
    return <div>No courses were found</div>;
  }

  return (
    <div className={styles.cardsContainer}>
      {data.map(({ courseName, id }) => (
        <CourseCard
          courseName={courseName}
          key={id}
          onClick={() => navigate(`${routes.Courses}${id}`)}
        />
      ))}
    </div>
  );
};

CourseCardContainer.propTypes = {};

export default CourseCardContainer;
