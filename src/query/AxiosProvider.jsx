import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import * as Axios from 'axios';
import { Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router';

const UNAUTHORIZED_STATUS_CODE = 401;
const LOCAL_STORAGE_ACCESS_TOKEN_KEY = 'access_token';
const unauthorizedRedirectBlacklist = [`${process.env.REACT_APP_API}/login`];

const AxiosContext = createContext();

const AxiosProvider = ({ children }) => {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState('');
  const showSnackbar = (msg) => {
    setSnackBarMessage(msg);
    setSnackBarOpen(true);
  };

  const updateAccessToken = async (newToken) => {
    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, newToken);
    setAccessToken(newToken);
  };

  useEffect(() => {
    setAccessToken(localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY));
  }, []);

  const axios = useMemo(() => {
    const newAxios = Axios.create({
      baseURL: process.env.REACT_APP_API,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
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
  }, []);
  const [axiosRequestInterceptor, setAxiosRequestInterceptor] =
    useState(undefined);

  useEffect(() => {
    if (axiosRequestInterceptor !== undefined) {
      axios.interceptors.request.eject(axiosRequestInterceptor);
    }
    const requestInterceptor = axios.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });
    setAxiosRequestInterceptor(requestInterceptor);
  }, [accessToken]);

  return (
    <AxiosContext.Provider
      value={{
        axios,
        updateAccessToken,
      }}
    >
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackBarOpen(false)}
      >
        <Alert severity="error" variant="filled">
          {' '}
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
