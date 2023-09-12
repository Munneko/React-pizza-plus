import React from 'react';
import styles from './Error.module.scss';

 const Error: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>Error</h1>
      <h2>Что-то пошло не так!</h2>
    </div>
  );
};
export default Error;