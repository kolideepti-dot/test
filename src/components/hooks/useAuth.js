import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);
  // console.log("useAuth user", user)

  // Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token && username) {
      setUser({ username, token });
    }
  }, []);

  const login = (username, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    setUser({ username, token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
  };

  return { user, login, logout };
}
