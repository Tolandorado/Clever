import React from "react";
import styles from './loading-icon.module.scss';

export const LoadingIcon = () => {

    return (
        <svg className={styles.loader} viewBox="0 0 24 24">
  <circle className={styles.loader_value} cx="12" cy="12" r="10" />
  <circle className={styles.loader_value} cx="12" cy="12" r="10" />
  <circle className={styles.loader_value} cx="12" cy="12" r="10" />
  <circle className={styles.loader_value} cx="12" cy="12" r="10" />
  <circle className={styles.loader_value} cx="12" cy="12" r="10" />
  <circle className={styles.loader_value} cx="12" cy="12" r="10" />
</svg>
    )
}

