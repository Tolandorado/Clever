import { NavLink } from "react-router-dom";
import styles from "./main.module.scss";
import { AuthContext } from "../../AuthContext";
import React, { useContext, useState } from "react";
import { Login } from "../Login/login";

export const Main = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

  console.log(isLoggedIn);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuItemClick = () => {
    setMenuOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoggedIn(false);
  };

  if (isLoggedIn === false) {
    return <Login />;
  }

  return (
    <div className={styles.container}>
      <div>
        <button onClick={handleMenuToggle} className={styles.menuButton}>
          Меню
        </button>
      </div>
      {menuOpen && (
        <div className={styles.menu}>
          <NavLink
            to="/create-event"
            onClick={handleMenuItemClick}
            className={styles.menuItem}
          >
            Мероприятие
          </NavLink>
          <NavLink
            to="/create-project"
            onClick={handleMenuItemClick}
            className={styles.menuItem}
          >
            Проект
          </NavLink>
        </div>
      )}
      <h1>Main</h1>
      <NavLink to="/posts">Перейти к странице постов</NavLink>
      <NavLink to="/" onClick={handleSubmit}>
        Выйти
      </NavLink>

      {/* Форма для создания проекта */}
      {window.location.pathname === "/create-project" && (
        <form>
          <label>
            Project Name:
            <input
              type="text"
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
            />
          </label>
          <label>
            Project Description:
            <input
              type="text"
              value={projectDescription}
              onChange={(event) => setProjectDescription(event.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}

      {/* Форма для создания мероприятия */}
      {window.location.pathname === "/create-event" && (
        <form>
          <label>
            Event Name:
            <input
              type="text"
              value={eventName}
              onChange={(event) => setEventName(event.target.value)}
            />
          </label>
          <label>
            Event Date:
            <input
              type="text"
              value={eventDate}
              onChange={(event) => setEventDate(event.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};
