import React, { createContext, useContext, useMemo, useState } from 'react';
import * as Axios from 'axios';
import { Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router';
import localStorageKeys from '../constants/localStorageKeys';

const UNAUTHORIZED_STATUS_CODE = 401;
const unauthorizedRedirectBlacklist = [`${process.env.REACT_APP_API}/login`];

const AxiosContext = createContext();

const AxiosProvider = ({ children }) => {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem(localStorageKeys.ACCESS_TOKEN)
  );
  const [studentName, setStudentName] = useState(
    localStorage.getItem(localStorageKeys.STUDENT_NAME)
  );
  const [accountRole, setAccountRole] = useState(
    localStorage.getItem(localStorageKeys.ROLE)
  );
  const showSnackbar = (msg) => {
    setSnackBarMessage(msg);
    setSnackBarOpen(true);
  };

  const updateAccessToken = async (newToken) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, newToken);
    setAccessToken(newToken);
  };
  const updateStudentName = async (newName) => {
    localStorage.setItem(localStorageKeys.STUDENT_NAME, newName);
    setStudentName(newName);
  };
  const updateAccountRole = async (newRole) => {
    localStorage.setItem(localStorageKeys.ROLE, newRole);
    setAccountRole(newRole);
  };

  const axios = useMemo(() => {
    const newAxios = Axios.create({
      baseURL: process.env.REACT_APP_API,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });
    newAxios.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });
    newAxios.interceptors.response.use(
      async (response) => response,
      async (error) => {
        const { response } = error;
        if (response) {
          if (
            response.status === UNAUTHORIZED_STATUS_CODE &&
            unauthorizedRedirectBlacklist.indexOf(response.config.url) === -1
          ) {
            showSnackbar('Unauthorized, Please Login');
            navigate('/login');
          }
        } else if (error.request) {
          showSnackbar('Could not connect to the server');
        }
        return Promise.reject(error);
      }
    );
    return newAxios;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <AxiosContext.Provider
      value={{
        axios,
        updateAccessToken,
        studentName,
        accountRole,
        updateStudentName,
        updateAccountRole,
        isLoggedIn: !!accessToken
      }}
    >
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackBarOpen(false)}
      >
        <Alert severity="error" variant="filled">
          {snackBarMessage}
        </Alert>
      </Snackbar>
      {children}
    </AxiosContext.Provider>
  );
};

AxiosProvider.propTypes = {};

export default AxiosProvider;

export const useAxios = () => useContext(AxiosContext);
