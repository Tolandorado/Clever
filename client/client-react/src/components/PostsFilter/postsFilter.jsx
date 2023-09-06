import { NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { PostCreate } from "../../Buttons/PostCreate/postCreate";
import  { LoadingIcon } from "../../UI_units/LoadingIcon/loadingIcon";
import styles from "./posts.module.scss";

export const Posts = () => {

  return (
    <div className={styles.container}>
      <h1>post</h1>
    </div>
  );
};
