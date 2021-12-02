import React from 'react';
// import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useGetDiscussion } from '../query';
import { CircularProgress } from '@mui/material';
import PageHOC from './pageHOC/PageHOC';
import styles from './Common.module.css';
import CreateComment from './createComment/CreateComment';

const ViewDiscussionPage = (props) => {
  const { discussionId } = useParams();
  const { isLoading, data, isError } = useGetDiscussion(discussionId);

  return (
    <PageHOC>
      {isLoading ? (
        <CircularProgress />
      ) : isError ? (
        <div>An unkown error has occured</div>
      ) : (
        <div>
          <div className={styles.title}>Discussions</div>
          discuss ur life choices. discussionId: {discussionId}. Data:{' '}
          {JSON.stringify(data)}
          <CreateComment discussionId={discussionId} />
        </div>
      )}
    </PageHOC>
  );
};

ViewDiscussionPage.propTypes = {};

export default ViewDiscussionPage;
