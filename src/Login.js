import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username.endsWith("@kiit.ac.in")) {
      setError("Username must end with '@kiit.ac.in'.");
      return;
    }
    if (password !== "sp") {
      setError("Incorrect password.");
      return;
    }
    navigate("/home");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>WELCOME BACK</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <FaUser className="icon" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <FaLock className="icon" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" id="btn">LOGIN</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
