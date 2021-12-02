import React from 'react';
import PropTypes from 'prop-types';
import commonStyles from '../Common.module.css';
import styles from './CreateDiscussion.module.css';
import { Button, LinearProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextFieldFormik from '../TextFieldFormik';
import { useCreateDiscussion } from '../../query';

const validationSchema = yup.object({
  'discussion-title': yup
    .string('Enter the discussion title')
    .required('discussion title is required'),
  'discussion-content': yup
    .string('Enter content for the discussion')
    .min(3, 'Content should be at least 3 letters')
    .required('Content is required'),
  'author-name': yup
    .string('Enter your name')
    .min(2, 'Your name should be at least 2 letters')
    .required('Your name is required'),
});

const CreateDiscussion = ({ onHideCreate, courseId }) => {
  const mutation = useCreateDiscussion(courseId);
  const isFormDisabled = mutation.isLoading;
  if (mutation.isSuccess) {
    console.log('woooooooo');
  }

  const formik = useFormik({
    initialValues: {
      'discussion-title': '',
      'discussion-content': '',
      'author-name': '',
    },
    validationSchema: validationSchema,

    // todo discussion content?
    // todo body mismatch
    onSubmit: (values) => {
      mutation.mutate({
        title: values['discussion-title'],
        authorName: values['author-name'],
      });
      // alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className={`${commonStyles.card} ${styles.card}`}>
      <div className={styles.progress}>
        {mutation.isLoading && <LinearProgress />}
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

          <div className={styles.spaceBetweenRowFlex}>
            <TextFieldFormik
              label="Author Name"
              variant="outlined"
              formik={formik}
              formikKey="author-name"
              disabled={isFormDisabled}
            />
            <div style={{ display: 'flex', gap: '0.9em' }}>
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
