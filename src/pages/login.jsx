import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import TextFieldFormik from '../components/TextFieldFormik';
import PageHOC from '../components/pageHOC/PageHOC';
import styles from './Login.module.css';
import { Button, FormHelperText } from '@mui/material';
import { useLogin } from '../query';
import { useAxios } from '../query/AxiosProvider';
import { useNavigate } from 'react-router';
import routes from '../constants/routes';

const validationSchema = yup.object({
  email: yup.string().email('must be a valid email').required('required'),
  password: yup.string().required('required'),
});

const Login = () => {
  const {
    updateAccessToken,
    updateStudentName,
    updateAccountRole,
    updateUserId,
  } = useAxios();
  const navigate = useNavigate();
  const loginMutation = useLogin({
    onSuccess: (data) => {
      updateAccessToken(data.token);
      updateStudentName(data.studentName);
      updateAccountRole(data.userRole);
      updateUserId(data.id);
      navigate(routes.Home);
    },
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      loginMutation.mutate(values);
    },
  });
  return (
    <PageHOC>
      <div className={styles.wrapper}>
        <h1>LOGIN</h1>
        <div className={styles.inputWrapper}>
          <TextFieldFormik
            label="Email"
            variant="outlined"
            fullWidth
            formik={formik}
            formikKey="email"
            disabled={loginMutation.isLoading}
            error={loginMutation.isError}
          />
          <TextFieldFormik
            label="Password"
            variant="outlined"
            fullWidth
            formik={formik}
            formikKey="password"
            type="password"
            disabled={loginMutation.isLoading}
            error={loginMutation.isError}
          />
          {loginMutation.isError && (
            <FormHelperText error>
              Invalid Email Password Combination
            </FormHelperText>
          )}
          <Button
            variant="contained"
            onClick={formik.handleSubmit}
            className={styles.loginButton}
            disabled={loginMutation.isLoading}
          >
            Login
          </Button>
        </div>
      </div>
    </PageHOC>
  );
};

Login.propTypes = {};

export default Login;
