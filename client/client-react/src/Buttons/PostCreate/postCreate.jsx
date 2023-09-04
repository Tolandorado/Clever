import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./post-create.module.scss"


export const PostCreate = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

 

  return (
 
  //   <nav>
  //   <ul class={styles.menu}>
  //     <li class={styles.menu_item}>
  //       <a href="#">Меню</a>
  //       <ul class={styles.submenu}>
  //         <li class={styles.submenu_item}>
  //         <NavLink  className={styles.button} onClick={handleMenuToggle} >
  //         Создать     
  //        </NavLink>
  //         </li>
  //         <li class={styles.submenu_item}>
  //         <NavLink
  //           to="/create-project"
  //           onClick={handleMenuItemClick}>
  //           Проект
  //         </NavLink>
  //         </li>

  //       </ul>
  //     </li>
  //   </ul>
  // </nav>
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
