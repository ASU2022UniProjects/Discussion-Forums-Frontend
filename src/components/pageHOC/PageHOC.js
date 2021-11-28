import React from 'react';
import PropTypes from 'prop-types';
import styles from './PageHOC.module.css';
import { useNavigate } from 'react-router-dom';

const PageHOC = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div onClick={() => navigate('/')} className={styles.header}>
        DISCUSSION FORUMS
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
