import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useGetDiscussion } from '../query';
import { CircularProgress } from '@mui/material';

const ViewDiscussionPage = (props) => {
  const { discussionId } = useParams();
  const { isLoading, data } = useGetDiscussion('courseId', discussionId);
  return isLoading ? (
    <CircularProgress />
  ) : (
    <div>
      discuss ur life choices. discussionId: {discussionId}. Data:{' '}
      {JSON.stringify(data)}
    </div>
  );
};

ViewDiscussionPage.propTypes = {};

export default ViewDiscussionPage;
