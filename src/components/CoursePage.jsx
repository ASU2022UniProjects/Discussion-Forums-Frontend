import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useGetDiscussions } from '../query';
import { CircularProgress } from '@mui/material';

const CoursePage = (props) => {
  const { courseId } = useParams();
  const { isLoading, data } = useGetDiscussions(courseId);
  return isLoading ? (
    <CircularProgress />
  ) : (
    <div>
      discuss ur life choices. Course Id: {courseId}. Data:{' '}
      {JSON.stringify(data)}
    </div>
  );
};

CoursePage.propTypes = {};

export default CoursePage;
