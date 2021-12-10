import React from 'react';
import PropTypes from 'prop-types';
import commonStyles from '../Common.module.css';
import styles from './CreateCourse.module.css';
import { Button, LinearProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextFieldFormik from '../TextFieldFormik';
import { useCreateCourse } from '../../query';
import { useNavigate } from 'react-router';
import routes from '../../constants/routes';

const validationSchema = yup.object({
  courseName: yup
    .string('Enter the course name')
    .required('course name is required'),
  courseDescription: yup.string('Enter course description'),
});

const CreateCourse = ({ onHideCreate }) => {
  const navigate = useNavigate();
  const mutation = useCreateCourse({
    onSuccess: (data) => {
      navigate(`${routes.Courses}${data.id}`);
    },
  });
  const isFormDisabled = mutation.isLoading;

  const formik = useFormik({
    initialValues: {
      courseName: '',
      courseDescription: '',
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      mutation.mutate(values);
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
            label="Course Name"
            variant="outlined"
            fullWidth
            formik={formik}
            formikKey="courseName"
            disabled={isFormDisabled}
          />

          <TextFieldFormik
            label="Course Description"
            variant="outlined"
            fullWidth
            formik={formik}
            multiline
            rows={4}
            formikKey="courseDescription"
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

CreateCourse.propTypes = {
  onHideCreate: PropTypes.func.isRequired,
};

export default CreateCourse;
