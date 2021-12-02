import React from 'react';
// import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useGetDiscussion } from '../query';
import { CircularProgress } from '@mui/material';
import PageHOC from './pageHOC/PageHOC';
import styles from './Common.module.css';

const ViewDiscussionPage = (props) => {
  const { discussionId } = useParams();
  const { isLoading, data } = useGetDiscussion(discussionId);
  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <PageHOC>
      <div className={styles.title}>Discussions</div>
      discuss ur life choices. discussionId: {discussionId}. Data:{' '}
      {JSON.stringify(data)}
    </PageHOC>
  );
};

ViewDiscussionPage.propTypes = {};

export default ViewDiscussionPage;
