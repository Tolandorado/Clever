import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/login", {
        username,
        password,
      });

      if (response.status === 200) {
        setIsLoggedIn(true);
      } else {
        // Обработка ошибки входа
        return (
            <h1>не вошел ты!</h1>
        )
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoggedIn) {
    return <div>Добро пожаловать на сайт!</div>;
    <NavLink to="/login">Перейти на главную страницу</NavLink>
  }

  return (
    <div className="cont">

<form onSubmit={handleSubmit}>
      <label>
        Имя пользователя:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label>
        Пароль:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>

    <button type="submit">
      Войти
      <NavLink to="/login">Перейти на главную страницу</NavLink>
      </button>
   
    </form>

    {/* <NavLink to='/login'>Go to Main page</NavLink> */}

    </div>
    
  );
};

