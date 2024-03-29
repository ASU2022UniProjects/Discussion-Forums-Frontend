import React from 'react';
import DiscussionCard from './DiscussionCard';
import styles from './DiscussionCard.module.css';
import { useNavigate } from 'react-router-dom';
import routes from '../../constants/routes';

const CourseCardContainer = ({ isCreateVisible, discussions, courseId }) => {
  const navigate = useNavigate();

  const onCourseClick = (discussionId) =>
    navigate(`${routes.Discussion}${discussionId}`);

  if (discussions.length === 0 && !isCreateVisible) {
    return <div>This Course has no discussions yet</div>;
  }

  const discussionsJSX = discussions.map(
    ({ title, id, user: { studentName: authorName }, createdAt, userId }) => (
      <DiscussionCard
        id={id}
        userId={userId}
        courseId={courseId}
        discussionName={title}
        authorName={authorName}
        createdAt={createdAt}
        key={id}
        onClick={() => onCourseClick(id)}
      />
    )
  );

  return <div className={styles.cardsContainer}>{discussionsJSX}</div>;
};

CourseCardContainer.propTypes = {};

export default CourseCardContainer;
