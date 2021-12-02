import React from 'react';
import PropTypes from 'prop-types';
import commonStyles from '../Common.module.css';
import styles from './CreateComment.module.css';
import { Button, LinearProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextFieldFormik from '../TextFieldFormik';
import { useCreateComment } from '../../query';

const validationSchema = yup.object({
  comment: yup
    .string('Enter comment content')
    .min(3, 'comment should be at least 3 letters')
    .required('comment content is required'),
  'author-name': yup
    .string('Enter your name')
    .min(2, 'Your name should be at least 2 letters')
    .required('Your name is required'),
});

const CreateComment = ({ discussionId }) => {
  const mutation = useCreateComment(discussionId);
  const isFormDisabled = mutation.isLoading;

  const formik = useFormik({
    initialValues: {
      comment: '',
      'author-name': '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutation.mutate({
        comment: values['comment'],
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
            label="Reply Content"
            variant="outlined"
            fullWidth
            formik={formik}
            multiline
            rows={4}
            formikKey="comment"
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

CreateComment.propTypes = {
  discussionId: PropTypes.string.isRequired,
};

export default CreateComment;
