import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

const TextFieldFormik = ({ formik, formikKey, ...props }) => {
  return (
    <TextField
      id={formikKey}
      value={formik.values[formikKey]}
      error={formik.touched[formikKey] && Boolean(formik.errors[formikKey])}
      helperText={formik.touched[formikKey] && formik.errors[formikKey]}
      {...formik.getFieldProps(formikKey)}
      {...props}
    />
  );
};

TextFieldFormik.propTypes = {
  formik: PropTypes.object.isRequired,
  formikKey: PropTypes.string.isRequired,
};

export default TextFieldFormik;
