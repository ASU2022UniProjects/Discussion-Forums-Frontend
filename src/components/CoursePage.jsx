import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetDiscussions } from '../query';
import { Button, CircularProgress } from '@mui/material';
import PageHOC from './pageHOC/PageHOC';
import styles from './Common.module.css';
import DiscussionCardContainer from './discussionCard/DiscussionCardContainer';

const CoursePage = () => {
  const { courseId } = useParams();
  const { isLoading, data } = useGetDiscussions(courseId);
  const [isCreateVisible, setIsCreateVisible] = useState(false);

  return (
    <PageHOC>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <div className={`${styles.title} ${styles.flexRow}`}>
            <div> {data.course.courseName}</div>
            <Button variant="contained">Contained</Button>
          </div>
          <DiscussionCardContainer discussions={data.discussions} />
        </>
      )}
    </PageHOC>
  );
};

CoursePage.propTypes = {};

export default CoursePage;
