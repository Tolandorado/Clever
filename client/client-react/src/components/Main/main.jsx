import { NavLink } from "react-router-dom";
import styles from "./main.module.scss";
import { AuthContext } from "../../AuthContext";
import React, { useContext, useState, useEffect } from "react";
import { Login } from "../Login/login";
import { Posts } from "../Posts/posts";
import axios from "axios";

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

    <>
    <NavLink to="/" onClick={handleSubmit}>
        Выйти
      </NavLink>
    <div className={styles.container}> 
      <Posts/>
    </div>  
    </>

  );
};
