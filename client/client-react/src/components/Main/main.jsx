import { NavLink } from "react-router-dom";
import styles from "./main.module.scss";
import { AuthContext } from "../../AuthContext";
import React, { useContext, useState } from "react";
import { Login } from "../Login/login";
import { Posts } from "../Posts/posts";

export const Main = () => {
  const { isLoggedIn, setIsLoggedIn, userId, setUserId, username, setUsername, setPassword } = useContext(AuthContext);


  const handleSubmit = (event) => {
    console.log("Submit button clicked")
    setIsLoggedIn(false);
    setPassword("");
    setUsername("");
    setUserId("");
  };

  if (isLoggedIn === false) {
    return <Login />;
  } 

  return (
    <div className={styles.container}>
      <h1>Main</h1>
      <Posts/>
      <NavLink to="/" onClick={handleSubmit}>
        Выйти
      </NavLink>


    </div>
  );
};
