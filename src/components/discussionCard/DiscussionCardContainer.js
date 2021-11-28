import React from 'react';
import DiscussionCard from './DiscussionCard';
import styles from './DiscussionCard.module.css';
import { useNavigate } from 'react-router-dom';
import routes from '../../constants/routes';

const CourseCardContainer = ({ discussions }) => {
  const navigate = useNavigate();

  const onCourseClick = (discussionId) =>
    navigate(`${routes.Discussion}${discussionId}`);

  const discussionsJSX = discussions.map(
    ({ title, discussionId, authorName, createdAt }) => (
      <DiscussionCard
        courseName={title}
        key={discussionId}
        onClick={() => onCourseClick(discussionId)}
      />
    )
  );

  return <div className={styles.cardsContainer}>{discussionsJSX}</div>;
};

CourseCardContainer.propTypes = {};

export default CourseCardContainer;
