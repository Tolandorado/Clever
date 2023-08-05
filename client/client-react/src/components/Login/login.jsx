import React, { useCallback, useContext, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import styles from "./login.module.scss";

export const Login = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    isLoggedIn,
    setIsLoggedIn,
  } = useContext(AuthContext);

 

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com"
          // {
          //   username: username,
          //   password: password,
          // }
        );

        if (response.status === 200) {
          setIsLoggedIn(true);
          console.log(response);
        } else {
          // Обработка ошибки входа
          return <h1>не вошел ты!</h1>;
        }
      } catch (error) {
        console.error(error);
      }
    },
    [password, username, setIsLoggedIn]
  );

  if (isLoggedIn) {
    return (
      <div>
        <div>Вы вошли в аккаунт.</div>
        <NavLink to="/">Перейти на главную страницу</NavLink>
      </div>
    );
  }

  return (
    <div className={styles.form}>
      <h1>Вход</h1>
      <form onSubmit={handleSubmit}>
        <label className={styles.form_label}>
          Имя пользователя:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className={styles.form_input}
          />
        </label>
        <label >
          Пароль:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={styles.form_input}
          />
        </label>

        <button type="submit">Войти</button>
      </form>

      <NavLink to="/reg">Не зарегистрированы?</NavLink>
    </div>
  );
};
