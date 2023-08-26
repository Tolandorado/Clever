import React, { useCallback, useContext, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import styles from "./registration.module.scss";

export const Registration = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    isLoggedIn,
    setIsLoggedIn,
  } = useContext(AuthContext);

  useEffect(() => {
    console.log(isLoggedIn);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post(
          "http://213.59.167.213:5000/api/users/create",
          {
            username: username,
            password: password,
          }
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
        <div>Вы зарегистрированы.</div>
        <NavLink to="/">Перейти на главную страницу</NavLink>
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

        <button className={styles.form_submit} type="submit">Войти</button>
      </form>

      <NavLink to="/"><p>Уже есть аккаунт?</p></NavLink>
    </div>
  );
};
