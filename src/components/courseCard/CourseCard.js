import React from 'react';
import PropTypes from 'prop-types';
import commonStyles from '../Common.module.css';
import { CardActionArea } from '@mui/material';
import ContextMenuDelete from '../ContextMenuDelete';
import { coursesQueryKey, useDeleteCourse } from '../../query';
import { useQueryClient } from 'react-query';

const CourseCard = ({ courseName, onClick, courseId }) => {
  const queryClient = useQueryClient();
  const mutation = useDeleteCourse(courseId, {
    onSuccess: () => queryClient.invalidateQueries(coursesQueryKey),
  });
  return (
    <div>
      <CardActionArea>
        <div
          className={`${commonStyles.card} ${commonStyles.row}`}
          onClick={onClick}
        >
          {courseName}
          <div className={commonStyles.marginLeftAuto}>
            <ContextMenuDelete deleteMutation={mutation} />
          </div>
        </div>
      </CardActionArea>
    </div>
  );
};

CourseCard.propTypes = {
  onClick: PropTypes.func.isRequired,
  courseName: PropTypes.string.isRequired,
  courseId: PropTypes.number.isRequired,
};

export default CourseCard;
