import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetDiscussion } from '../query';
import { CircularProgress } from '@mui/material';
import PageHOC from './pageHOC/PageHOC';
import styles from './DiscussionPage.module.css';
import CreateComment from './createComment/CreateComment';
import CommentCardContainer from './commentCard/CommentCardContainer';
import ErrorOccurred from './ErrorOccurred';

const ViewDiscussionPage = () => {
  const { discussionId } = useParams();
  const { isLoading, data, isError } = useGetDiscussion(discussionId);

  return (
    <PageHOC>
      {isLoading ? (
        <CircularProgress />
      ) : isError ? (
        <ErrorOccurred />
      ) : (
        <div className={styles.cardsContainer}>
          <div className={styles.title}>
            {data?.discussion.course.courseName}: {data?.discussion.title}
          </div>
          <CommentCardContainer
            comments={data?.comments ?? []}
            discussionId={discussionId}
          />
          <CreateComment discussionId={discussionId} />
        </div>
      )}
    </PageHOC>
  );
};

ViewDiscussionPage.propTypes = {};

export default ViewDiscussionPage;
