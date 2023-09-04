import { NavLink } from "react-router-dom";
import styles from "./main.module.scss";
import { AuthContext } from "../../AuthContext";
import React, { useContext, useState, useEffect } from "react";
import { Login } from "../Login/login";
import { Posts } from "../Posts/posts";
import axios from "axios";
import { PostCreate } from "../../Buttons/PostCreate/postCreate";
import { ButtonLogout } from "../../Buttons/ButtonLogout/buttonLogout";

export const Main = () => {
  const { isLoggedIn} = useContext(AuthContext);
 

  if (isLoggedIn === false) {
    return <Login />;
  } 

  return (

    <div className={styles.container}>
     <div className={styles.navigation}>
     <ButtonLogout/>
     <PostCreate/>
     </div>
    <div className={styles.wrapper}>   
      <Posts/>
    </div>  
    </div>

  );
};
