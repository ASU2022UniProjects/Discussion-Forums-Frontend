import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetDiscussions } from '../query';
import { CircularProgress } from '@mui/material';
import PageHOC from './pageHOC/PageHOC';
import styles from './Common.module.css';
import DiscussionCardContainer from './discussionCard/DiscussionCardContainer';

const CoursePage = () => {
  const { courseId } = useParams();
  const { isLoading, data } = useGetDiscussions(courseId);
  return (
    <PageHOC>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <div className={styles.title}>{data.course.courseName}</div>
          <DiscussionCardContainer discussions={data.discussions} />
        </>
      )}
    </PageHOC>
  );
};

CoursePage.propTypes = {};

export default CoursePage;
