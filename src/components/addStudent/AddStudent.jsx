import React, { useState } from 'react';
import PropTypes from 'prop-types';
import commonStyles from '../Common.module.css';
import styles from './AddStudent.module.css';
import { Alert, Button, LinearProgress, Snackbar } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextFieldFormik from '../TextFieldFormik';
import { DataGrid } from '@mui/x-data-grid';
import {
  useAddStudent,
  useGetCourseStudents,
  useRemoveStudentsFromCourse,
} from '../../query';

const validationSchema = yup.object({
  studentId: yup
    .number('Enter the Student id')
    .required('student id is required'),
});

const AddStudent = ({ onHide, courseId }) => {
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const showSnackbar = (msg) => {
    setSnackBarMessage(msg);
    setSnackBarOpen(true);
  };

  const { data: students, refetch: refetchStudents } =
    useGetCourseStudents(courseId);

  const addStudentMutation = useAddStudent(courseId, {
    onMutate: (newStudentId) => {
      if (students.some((st) => st.id === parseInt(newStudentId))) {
        showSnackbar('Student already in the course');
      }
    },
    onSuccess: refetchStudents,
    onError: () => {
      showSnackbar('Error in the student id');
    },
  });
  const removeStudentMutation = useRemoveStudentsFromCourse(courseId, {
    onSuccess: refetchStudents,
    onError: () => {
      showSnackbar('An unknown error has occured');
    },
  });

  const isFormDisabled = addStudentMutation.isLoading;
  const [deletedRows, setDeletedRows] = useState([]);

  const handleRowSelection = (selectedRowIds) => {
    setDeletedRows(selectedRowIds);
  };

  const formik = useFormik({
    initialValues: {
      studentId: '',
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      addStudentMutation.mutate(values.studentId, {
        onSuccess: () => formik.resetForm(),
      });
    },
  });

  return (
    <div className={`${commonStyles.card} ${styles.card}`}>
      <div className={styles.progress}>
        {addStudentMutation.isLoading && <LinearProgress />}
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.container}>
          <div className={styles.spaceBetweenRowFlex}>
            <TextFieldFormik
              label="Student Id"
              variant="outlined"
              fullWidth
              formik={formik}
              formikKey="studentId"
              disabled={isFormDisabled}
            />

            <div style={{ display: 'flex', gap: '0.9em' }}>
              <Button
                variant="contained"
                onClick={formik.handleSubmit}
                disabled={isFormDisabled}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </form>
      <DataGrid
        rows={students || []}
        columns={[
          { field: 'id', headerName: 'ID', flex: 1 },
          { field: 'studentName', headerName: 'NAME', flex: 20 },
        ]}
        pageSize={5}
        rowsPerPageOptions={[5]}
        autoHeight
        checkboxSelection
        onSelectionModelChange={handleRowSelection}
      />
      <div
        style={{
          display: 'flex',
          marginTop: '1em',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            removeStudentMutation.mutate(deletedRows);
          }}
          disabled={isFormDisabled || deletedRows.length === 0}
        >
          Remove Selected Students
        </Button>
        <Button
          style={{
            marginLeft: '0.4em',
          }}
          variant="contained"
          onClick={onHide}
          disabled={isFormDisabled}
        >
          Close
        </Button>
        <Snackbar
          open={snackBarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackBarOpen(false)}
        >
          <Alert severity="error" variant="filled">
            {snackBarMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

AddStudent.propTypes = {
  onHide: PropTypes.func.isRequired,
  courseId: PropTypes.number.isRequired,
};

export default AddStudent;
