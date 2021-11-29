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
import styles from './Common.module.css';
import DiscussionCardContainer from './discussionCard/DiscussionCardContainer';

const CoursePage = () => {
  const { courseId } = useParams();
  const { isLoading, data } = useGetDiscussions(courseId);
  const [isCreateVisible, setIsCreateVisible] = useState(false);

  const x = (
    <div className={styles.card}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.9em',
          marginTop: '0.3em',
        }}
      >
        <TextField
          id="discussion-title"
          label="Discussion Title"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="discussion-content"
          label="Discussion Content"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <TextField id="author-name" label="Author Name" variant="outlined" />
          <div style={{ display: 'flex', gap: '0.9em' }}>
            <Button variant="text" onClick={() => setIsCreateVisible(false)}>
              Cancel
            </Button>
            <Button variant="contained">Post</Button>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <PageHOC>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <div className={`${styles.title} ${styles.flexRow}`}>
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
          {isCreateVisible && x}
          <DiscussionCardContainer discussions={data.discussions} />
        </>
      )}
    </PageHOC>
  );
};

CoursePage.propTypes = {};

export default CoursePage;
