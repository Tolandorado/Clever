import { NavLink } from "react-router-dom";
import styles from "./main.module.scss"
import { AuthContext } from '../../AuthContext';
import React, { useContext, useState } from "react";

export const Main = () => {

    const { username, setUsername, password, setPassword, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    console.log(isLoggedIn);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isLoggedIn === true) {
            setIsLoggedIn(false)
            console.log(isLoggedIn)
        }
    }

    return (
        <div className={styles.container}>
            <h1>Main</h1>
            <NavLink to='/posts'>Go to Posts page</NavLink>
            {/* не работает */}
            <NavLink to='/' onClick={handleSubmit}>Log out</NavLink> 
           
        </div>
    )
}
