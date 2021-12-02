import React from 'react';
import PropTypes from 'prop-types';
import commonStyles from '../Common.module.css';
import styles from './CommentCard.module.css';

const CommentCard = ({ comment }) => {
  const { content, authorName, createdAt } = comment;
  return (
    <div className={`${commonStyles.card} ${styles.card}`}>
      <div className={styles.commentText}>{content}</div>
      <div className={styles.commentFooter}>
        <div>{authorName}</div>
        <div>{new Date(createdAt).toLocaleDateString()}</div>
      </div>
    </div>
  );
};

CommentCard.propTypes = {
  onClick: PropTypes.func.isRequired,
  courseName: PropTypes.string.isRequired,
};

export default CommentCard;
