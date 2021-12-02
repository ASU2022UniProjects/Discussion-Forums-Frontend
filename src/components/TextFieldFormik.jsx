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
  formik: PropTypes.exact({
    dirty: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    isValidating: PropTypes.bool.isRequired,
    resetForm: PropTypes.func.isRequired,
    setErrors: PropTypes.func.isRequired,
    setFieldError: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired,
    submitCount: PropTypes.number.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    setStatus: PropTypes.func.isRequired,
    setSubmitting: PropTypes.func.isRequired,
    setTouched: PropTypes.func.isRequired,
    setValues: PropTypes.func.isRequired,
    status: PropTypes.any,
    touched: PropTypes.object.isRequired,
    values: PropTypes.object.isRequired,
    validateForm: PropTypes.func.isRequired,
    validateField: PropTypes.func.isRequired,
  }).isRequired,
  formikKey: PropTypes.string.isRequired,
};

export default TextFieldFormik;
