import React from 'react';
import PropTypes from 'prop-types';
import commonStyles from '../Common.module.css';
import styles from './DiscussionCard.module.css';
import { CardActionArea } from '@mui/material';
import ContextMenuDelete from '../ContextMenuDelete';
import { useDeleteDiscussion, getDiscussionsQueryKey } from '../../query';
import { useQueryClient } from 'react-query';

const DiscussionCard = ({
  id: discussionId,
  discussionName,
  onClick,
  authorName,
  createdAt,
  courseId,
  userId,
}) => {
  const queryClient = useQueryClient();
  const deleteMutation = useDeleteDiscussion(discussionId, {
    onSuccess: () =>
      queryClient.invalidateQueries(getDiscussionsQueryKey(courseId)),
  });
  return (
    <div>
      <CardActionArea>
        <div
          className={`${commonStyles.card} ${styles.card}`}
          onClick={onClick}
        >
          <div className={styles.discussionTitle}>{discussionName}</div>
          <div className={styles.discussionFooter}>
            <div>{authorName}</div>
            <div>{new Date(createdAt).toLocaleDateString()}</div>
            <ContextMenuDelete
              deleteMutation={deleteMutation}
              authorId={userId}
            />
          </div>
        </div>
      </CardActionArea>
    </div>
  );
};

DiscussionCard.propTypes = {
  onClick: PropTypes.func.isRequired,
  discussionName: PropTypes.string.isRequired,
};

export default DiscussionCard;
