import React from "react";
import { NavLink } from "react-router-dom";
import styles from './button-logout.module.scss';
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";

export const ButtonLogout = () => {
    const { isLoggedIn, setIsLoggedIn, userId, setUserId, username, setUsername, setPassword } = useContext(AuthContext);

    const handleSubmit = (event) => {
        console.log("Submit button clicked")
        setIsLoggedIn(false);
        setPassword("");
        setUsername("");
        setUserId("");
      };

    return (
        <NavLink to="/" onClick={handleSubmit} className={styles.button}>
        Выйти
      </NavLink>
    )
}

