import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetDiscussions } from '../query';
import { Button, CircularProgress } from '@mui/material';
import PageHOC from './pageHOC/PageHOC';
import commonStyles from './Common.module.css';
import DiscussionCardContainer from './discussionCard/DiscussionCardContainer';
import CreateDiscussion from './createDiscussion/CreateDiscussion';
import ErrorOccurred from './ErrorOccurred';

const CoursePage = () => {
  const { courseId } = useParams();
  const { isLoading, data, isError } = useGetDiscussions(courseId);
  const [isCreateVisible, setIsCreateVisible] = useState(false);

  let child;

  if (isLoading) {
    child = <CircularProgress />;
  } else if (isError) {
    child = <ErrorOccurred />;
  }

  return (
    <PageHOC>
      {child || (
        <>
          <div className={`${commonStyles.title} ${commonStyles.flexRow}`}>
            <div>{data.courseName}</div>
            {!isCreateVisible && (
              <Button
                variant="contained"
                onClick={() => setIsCreateVisible(true)}
              >
                Create Discussion
              </Button>
            )}
          </div>
          {isCreateVisible && (
            <CreateDiscussion
              onHideCreate={() => setIsCreateVisible(false)}
              courseId={parseInt(courseId)}
            />
          )}
          <DiscussionCardContainer discussions={data.discussions ?? []} />
        </>
      )}
    </PageHOC>
  );
};

CoursePage.propTypes = {};

export default CoursePage;
