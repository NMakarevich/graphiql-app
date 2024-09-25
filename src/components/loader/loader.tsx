import React from 'react';
import styles from './loader.module.scss';

const Loader: React.FC = (): React.JSX.Element => {
  return (
    <div className={styles.loader}>
      <span className={styles.loader__item}></span>
    </div>
  );
};

export default Loader;
