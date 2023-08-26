import { NavLink } from "react-router-dom";
import styles from "./main.module.scss";
import { AuthContext } from "../../AuthContext";
import React, { useContext, useState } from "react";
import { Login } from "../Login/login";
import { Posts } from "../Posts/posts";

export const Main = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoggedIn(false);
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
