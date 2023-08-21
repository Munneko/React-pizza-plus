import React from 'react';
import styles from './Error.module.scss'

export default function Error() {
  return (
      <div className={styles.root}>
      <h1>Error</h1>
      <h2>Что-то пошло не так!</h2>
    </div>
  );
}
