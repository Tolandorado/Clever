import React, { useContext, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { AuthContext } from '../../AuthContext';

export const Login = () => {

  const { username, setUsername, password, setPassword, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  console.log(isLoggedIn);
 
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://192.168.1.98:5000/api/users/verify", 
      {
        username: username,
        password: password,  
      },
      
      );

      if (response.status === 200) {
        setIsLoggedIn(true);
        console.log(response);
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
    return (
      <div>
        <div>Вы вошли в аккаунт.</div>
        <NavLink to="/logined">Перейти на главную страницу</NavLink>
      </div>
    );
  }

  return (
    <div className="cont">
    <h1>Вход</h1>
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
      
      </button>
   
    </form>

    <NavLink to="/reg">Не зарегистрированы?</NavLink>

    </div>
    
  );
};

