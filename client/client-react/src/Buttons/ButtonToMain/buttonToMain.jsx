import React from "react";
import { NavLink } from "react-router-dom";
import styles from './button-to-main.module.scss'

export const ButtonToMain = () => {
    return (
        <div>
            <NavLink to="/" className={styles.button}>Назад</NavLink>
        </div>
    )
}

