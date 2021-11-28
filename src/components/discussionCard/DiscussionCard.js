import React from 'react';
import PropTypes from 'prop-types';
import commonStyles from '../Common.module.css';
import { CardActionArea } from '@mui/material';

const DiscussionCard = ({ courseName, onClick }) => {
  return (
    <div>
      <CardActionArea>
        <div className={commonStyles.card} onClick={onClick}>
          {courseName}
        </div>
      </CardActionArea>
    </div>
  );
};

DiscussionCard.propTypes = {
  onClick: PropTypes.func.isRequired,
  courseName: PropTypes.string.isRequired,
};

export default DiscussionCard;
