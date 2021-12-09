import React from 'react';
import PropTypes from 'prop-types';
import commonStyles from '../Common.module.css';
import styles from './CommentCard.module.css';
import { getDiscussionQueryKey, useDeleteComment } from '../../query';
import { useQueryClient } from 'react-query';
import ContextMenuDelete from '../ContextMenuDelete';

const CommentCard = ({ comment, discussionId }) => {
  const { id: commentId, content, authorName, createdAt, userId } = comment;
  const queryClient = useQueryClient();
  const deleteMutation = useDeleteComment(commentId, {
    onSuccess: () => {
      queryClient.invalidateQueries(getDiscussionQueryKey(discussionId));
    },
  });

  return (
    <div className={`${commonStyles.card} ${styles.card}`}>
      <div className={styles.commentText}>{content}</div>
      <div className={styles.commentFooter}>
        <div>{authorName}</div>
        <div>{new Date(createdAt).toLocaleDateString()}</div>
      </div>
      <ContextMenuDelete deleteMutation={deleteMutation} authorId={userId} />
    </div>
  );
};

CommentCard.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default CommentCard;
