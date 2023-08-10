import { NavLink } from "react-router-dom";
import styles from "./main.module.scss";
import { AuthContext } from "../../AuthContext";
import React, { useContext } from "react";
import { Login } from "../Login/login";
import { useState } from "react";

export const Main = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Общее количество страниц

  console.log(isLoggedIn);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
      setIsLoggedIn(false);
    
  };
  if (isLoggedIn === false) {
    return (
    //   <div>
    //     <div>Вы не авторизованы.</div>
    //     <NavLink to="/">Перейти на страницу регистрации</NavLink>
    //   </div>
    <Login />
    );
  }

  return (
    <div className={styles.container}>
      <h1>Main</h1>
      <NavLink to="/posts">Go to Posts page</NavLink>
      {/* не работает */}
      <NavLink to="/" onClick={handleSubmit}>
        Log out
      </NavLink>
    </div>
  );
};
