import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [loggedInUsername, setLoggedInUsername] = useState(localStorage.getItem("username") || "");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [progress, setProgress] = useState({
    week1done: false,
    week2done: false,
    week3done: false,
    week4done: false,
    week5done: false,
  });

  useEffect(() => {
    if (token) {
      fetch("http://localhost:3001/user/progress", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setProgress(data))
        .catch(console.error);
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ loggedInUsername, setLoggedInUsername, token, setToken, progress, setProgress }}>
      {children}
    </UserContext.Provider>
  );
};
