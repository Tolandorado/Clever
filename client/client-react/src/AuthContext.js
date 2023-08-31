import React, { useState } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider
      value={{ username, password, isLoggedIn, userId, setUsername, setPassword, setIsLoggedIn,setUserId }}
    >
      {children}
    </AuthContext.Provider>
  );
};