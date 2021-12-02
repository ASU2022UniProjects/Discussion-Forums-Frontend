import React from 'react';
import CommentCard from './CommentCard';
import styles from './CommentCard.module.css';

const CommentCardContainer = ({ comments }) => {
  if (comments.length === 0) {
    return <div>This disucssion has no comments yet</div>;
  }
  const commentsJSX = comments.map((comment) => (
    <CommentCard comment={comment} key={comment.id} />
  ));

  return <div className={styles.cardsContainer}>{commentsJSX}</div>;
};

CommentCardContainer.propTypes = {};

export default CommentCardContainer;
