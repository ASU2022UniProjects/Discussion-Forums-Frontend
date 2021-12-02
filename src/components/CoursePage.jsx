import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetDiscussions } from '../query';
import {
  Button,
  CardActionArea,
  CircularProgress,
  TextField,
} from '@mui/material';
import PageHOC from './pageHOC/PageHOC';
import commonStyles from './Common.module.css';
import DiscussionCardContainer from './discussionCard/DiscussionCardContainer';
import CreateDiscussion from './createDiscussion/CreateDiscussion';

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
          <div className={`${commonStyles.title} ${commonStyles.flexRow}`}>
            <div> {data.course.courseName}</div>
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
              courseId={courseId}
            />
          )}
          <DiscussionCardContainer discussions={data.discussions} />
        </>
      )}
    </PageHOC>
  );
};

CoursePage.propTypes = {};

export default CoursePage;
