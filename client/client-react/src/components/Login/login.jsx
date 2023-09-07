import React, { useCallback, useContext, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import styles from "./login.module.scss";
import API_URL from "../../api.config";

export const Login = () => {
  const {
    username,
    setUsername,
    userId,
    setUserId,
    password,
    setPassword,
    isLoggedIn,
    setIsLoggedIn,
  } = useContext(AuthContext);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        const response = await axios.post(
          `${API_URL}:5001/api/users/verify`,               
          {
            username: username,
            password: password,
          }          
        );

        if (response.status === 200 && response.data["response-suc"] === true) {
          const data = response.data;
          setIsLoggedIn(true);
          setUserId(data.id)
          console.log("ответ с сервера", userId);
          console.log("Данные пользователя при авторизации:", username, password, userId);

        } else {
          console.log(response)
          }
      } catch (error) {
        console.error(error);
      }
    },
    [password, username, setIsLoggedIn]
  );

  return (
    <div className={styles.form}>
      <h1 className={styles.form_title}>Вход</h1>
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

        <button className={styles.form_submit} type="submit">Войти</button>
      </form>

      <NavLink to="/reg"><p>Не зарегистрированы?</p></NavLink>
    </div>
  );
};
