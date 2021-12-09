import React from 'react';
import PropTypes from 'prop-types';
import commonStyles from '../Common.module.css';
import styles from './CreateDiscussion.module.css';
import { Button, LinearProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextFieldFormik from '../TextFieldFormik';
import { useCreateComment, useCreateDiscussion } from '../../query';
import { useNavigate } from 'react-router';
import routes from '../../constants/routes';

const validationSchema = yup.object({
  'discussion-title': yup
    .string('Enter the discussion title')
    .required('discussion title is required'),
  'discussion-content': yup
    .string('Enter content for the discussion')
    .min(3, 'Content should be at least 3 letters')
    .required('Content is required'),
});

const CreateDiscussion = ({ onHideCreate, courseId }) => {
  const navigate = useNavigate();
  const commentMutation = useCreateComment(undefined);

  const discusstionMutation = useCreateDiscussion(courseId);

  const isFormDisabled =
    discusstionMutation.isLoading || commentMutation.isLoading;

  const formik = useFormik({
    initialValues: {
      'discussion-title': '',
      'discussion-content': '',
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      discusstionMutation.mutate(
        {
          title: values['discussion-title'],
          discDescription: values['discussion-content'],
        },
        {
          onSuccess: (data) => {
            commentMutation.mutate(
              {
                content: values['discussion-content'],
                discussionIdParam: data.id,
              },
              {
                onSuccess: () => {
                  navigate(routes.Discussion + data.id);
                },
              }
            );
          },
        }
      );
    },
  });

  return (
    <div className={`${commonStyles.card} ${styles.card}`}>
      <div className={styles.progress}>
        {isFormDisabled && <LinearProgress />}
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.container}>
          <TextFieldFormik
            label="Discussion Title"
            variant="outlined"
            fullWidth
            formik={formik}
            formikKey="discussion-title"
            disabled={isFormDisabled}
          />

          <TextFieldFormik
            label="Discussion Content"
            variant="outlined"
            fullWidth
            formik={formik}
            multiline
            rows={4}
            formikKey="discussion-content"
            disabled={isFormDisabled}
          />

          <div className={styles.actionButtons}>
            <Button
              variant="text"
              onClick={onHideCreate}
              disabled={isFormDisabled}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={formik.handleSubmit}
              disabled={isFormDisabled}
            >
              Post
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

CreateDiscussion.propTypes = {
  onHideCreate: PropTypes.func.isRequired,
  courseId: PropTypes.number.isRequired,
};

export default CreateDiscussion;
