import React from 'react';
import PropTypes from 'prop-types';
import styles from './PageHOC.module.css';

const PageHOC = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>DISCUSSION FORUMS</div>
      <div className={styles.page}>
        <div></div>
        {children}
      </div>
    </div>
  );
};

PageHOC.propTypes = {};

export default PageHOC;
