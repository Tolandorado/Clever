import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./post-create.module.scss"


export const PostCreate = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

 

  return (

  <>
      <NavLink className={styles.button} onClick={toggleMenu}>Создать</NavLink>
      {isOpen && (
        <ul className={styles.submenu}>
          <li className={styles.submenuItem}>
            <NavLink
            className={styles.button}
             to="/create-project"
>
             Проект
           </NavLink></li>
          <li className={styles.submenuItem}>
            <NavLink
             className={styles.button}
             to="/create-event"
>
             Мероприятие
           </NavLink></li>
        </ul>
      )}
    </>
 
  );
};
