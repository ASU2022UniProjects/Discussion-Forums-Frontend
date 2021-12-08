import React from 'react';
import PropTypes from 'prop-types';
import styles from './PageHOC.module.css';
import { useNavigate } from 'react-router-dom';
import routes from '../../constants/routes';
import { Button } from '@mui/material';
import { useAxios } from '../../query/AxiosProvider';

const PageHOC = ({ children }) => {
  const navigate = useNavigate();
  const { isLoggedIn, studentName, accountRole, updateAccessToken } =
    useAxios();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div onClick={() => navigate('/')} className={styles.logo}>
          DISCUSSION FORUMS
        </div>
        {isLoggedIn ? (
          <div className={styles.loggedInWrapper}>
            <div className={styles.loggedInUser}>
              {studentName}
              <div className={styles.loggedInUserRole}>{accountRole}</div>
            </div>
            <Button
              variant="text"
              onClick={() => {
                updateAccessToken(undefined);
                navigate(routes.Login);
              }}
              className={styles.loginButton}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            variant="text"
            onClick={() => navigate(routes.Login)}
            className={styles.loginButton}
          >
            Login
          </Button>
        )}
      </div>
      <div className={styles.page}>
        <div></div>
        {children}
      </div>
    </div>
  );
};

PageHOC.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default PageHOC;
