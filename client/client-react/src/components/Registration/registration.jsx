import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import styles from "./registration.module.scss";

export const Registration = () => {
  const [isReg, setIsReg] = useState(false);
  const {
    username,
    setUsername,
    userId,
    password,
    setPassword,
    isLoggedIn,
    setIsLoggedIn,
  } = useContext(AuthContext);

  useEffect(() => {
    console.log(username, userId, isLoggedIn);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post(
          "http://192.168.1.132:5000/api/users/create",
          {
            username: username,
            password: password,
          }
        );
        if (response.status === 200 && response.data["response-suc"] === true) {
          setIsReg(true);
          console.log(response);
          console.log("Данные пользователя при регистрации:", username, password, userId);
        } else {
          console.log(response)
        }
      } catch (error) {
        console.error(error);
      }
    },
    [password, username, setIsLoggedIn]
  );

  if (isReg === true) {
    return (
      <div>
        <div>Вы зарегистрированы.</div>
        <NavLink to="/">Авторизируетесь</NavLink>
      </div>
    );
  }

  return (
    <div className={styles.form}>
      <h1 className={styles.form_title}>Регистрация</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Имя пользователя:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className={styles.form_input}
          />
        </label>
        <label>
          Пароль:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={styles.form_input}
          />
        </label>

        <button className={styles.form_submit} type="submit">Зарегистрироваться</button>
      </form>

      <NavLink to="/"><p>Уже есть аккаунт?</p></NavLink>
    </div>
  );
};
