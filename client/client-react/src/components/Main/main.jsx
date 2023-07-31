import { NavLink } from "react-router-dom";
import styles from "./main.module.scss";
import { AuthContext } from "../../AuthContext";
import React, { useContext } from "react";

export const Main = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  console.log(isLoggedIn);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };
  if (isLoggedIn === false) {
    return (
      <div>
        <div>Вы не авторизованы.</div>
        <NavLink to="/">Перейти на страницу регистрации</NavLink>
      </div>
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
