import React from 'react';
import PropTypes from 'prop-types';
import styles from './PageHOC.module.css';
import { useNavigate } from 'react-router-dom';
import routes from '../../constants/routes';
import { Button } from '@mui/material';

const PageHOC = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div onClick={() => navigate('/')} className={styles.logo}>
          DISCUSSION FORUMS
        </div>
        <Button
          variant="text"
          onClick={() => navigate(routes.Login)}
          className={styles.loginButton}
        >
          Login
        </Button>
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
