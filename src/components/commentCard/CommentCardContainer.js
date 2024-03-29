import React from 'react';
import CommentCard from './CommentCard';
import styles from './CommentCard.module.css';

const CommentCardContainer = ({ comments, discussionId }) => {
  if (comments.length === 0) {
    return (
      <div className={styles.noDiscussion}>
        This discussion has no comments yet
      </div>
    );
  }
  const commentsJSX = comments.map((comment) => (
    <CommentCard
      comment={comment}
      key={comment.id}
      discussionId={discussionId}
    />
  ));

  return <div className={styles.cardsContainer}>{commentsJSX}</div>;
};

CommentCardContainer.propTypes = {};

export default CommentCardContainer;
