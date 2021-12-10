import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetDiscussions } from '../query';
import { Button, CircularProgress } from '@mui/material';
import PageHOC from './pageHOC/PageHOC';
import commonStyles from './Common.module.css';
import DiscussionCardContainer from './discussionCard/DiscussionCardContainer';
import CreateDiscussion from './createDiscussion/CreateDiscussion';
import ErrorOccurred from './ErrorOccurred';
import AddStudent from './addStudent/AddStudent';
import { useAxios } from '../query/AxiosProvider';

const CoursePage = () => {
  const { courseId } = useParams();
  const { accountRole } = useAxios();
  const { isLoading, data, isError } = useGetDiscussions(courseId);
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [isAddStudentVisible, setIsAddStudentVisible] = useState(false);

  let child;

  if (isLoading) {
    child = <CircularProgress />;
  } else if (isError) {
    child = <ErrorOccurred />;
  }

  console.log('🚀 ~ file: CoursePage.jsx ~ line 34 ~ CoursePage ~ data', data);
  return (
    <PageHOC>
      {child || (
        <>
          <div className={`${commonStyles.title} ${commonStyles.flexRow}`}>
            <div>{data.course.courseName}</div>
            <div
              style={{ display: 'flex', gap: '0.4em', marginBottom: '0.4em' }}
            >
              {!isCreateVisible && (
                <Button
                  variant="contained"
                  onClick={() => {
                    setIsCreateVisible(true);
                    setIsAddStudentVisible(false);
                  }}
                >
                  Create Discussion
                </Button>
              )}
              {accountRole === 'Admin' && !isAddStudentVisible && (
                <Button
                  variant="contained"
                  onClick={() => {
                    setIsCreateVisible(false);
                    setIsAddStudentVisible(true);
                  }}
                >
                  Add Student
                </Button>
              )}
            </div>
          </div>
          {isCreateVisible && (
            <CreateDiscussion
              onHideCreate={() => setIsCreateVisible(false)}
              courseId={parseInt(courseId)}
            />
          )}
          {isAddStudentVisible && (
            <AddStudent
              onHide={() => setIsAddStudentVisible(false)}
              courseId={parseInt(courseId)}
            />
          )}
          <DiscussionCardContainer
            courseId={courseId}
            isCreateVisible={isCreateVisible}
            discussions={data.discussions ?? []}
          />
        </>
      )}
    </PageHOC>
  );
};

CoursePage.propTypes = {};

export default CoursePage;
