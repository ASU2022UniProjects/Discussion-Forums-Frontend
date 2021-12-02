import React from 'react';
import PropTypes from 'prop-types';
import commonStyles from '../Common.module.css';
import styles from './DiscussionCard.module.css';
import { CardActionArea } from '@mui/material';

const DiscussionCard = ({ discussionName, onClick, authorName, createdAt }) => {
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
