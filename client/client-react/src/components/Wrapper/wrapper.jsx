import React from "react";
import styles from './wrapper.module.scss';

export const Wrapper = ({children}) => {
    return(
        <div className={styles.wrapper}>{children}</div>
    );
}