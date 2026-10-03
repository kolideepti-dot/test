import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";
import styles from "../css/Login.module.css";
import { loginUser } from "./actions/auth"; // Import the loginUser action
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Get the dispatch function from Redux
  const { loading, token, loginError } = useSelector((state) => state.auth); // Access auth state from Redux

  const validateForm = () => {
     // Username: only letters, numbers, underscores, 3–15 chars
  const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;

  // Password: at least 6 chars, one uppercase, one lowercase, one number, one special char
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  if (!usernameRegex.test(username)) {
    setError("Username must be 3–15 characters, letters/numbers/underscores only");
    return false;
  }

  if (!passwordRegex.test(password)) {
    setError("Password must be ≥6 chars, include uppercase, lowercase, number, and special symbol");
    return false;
  }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
   dispatch(loginUser(username, password)); // Dispatch the loginUser action
   navigate("/watchlist"); // Navigate to dashboard on successful login
    }
   

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} type="submit">
          Login
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default Login;
