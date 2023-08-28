import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import styles from "./post-create.module.scss"


export const PostCreate = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuItemClick = () => {
    setMenuOpen(false);
  };

  return (
    <div>
      <div>
        <button onClick={handleMenuToggle} >
          Создать
        </button>
      </div>
      {menuOpen && (
        <div>
          <NavLink
            to="/create-event"
            onClick={handleMenuItemClick}
            
          >
            Мероприятие
          </NavLink>
          <NavLink
            to="/create-project"
            onClick={handleMenuItemClick}
            
          >
            Проект
          </NavLink>
        </div>
      )}

    </div>
  );
};
