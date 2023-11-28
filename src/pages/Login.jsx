import React, { useState } from "react";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import api from "../apiConfig";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    api("POST", "/login/", {
      username: username,
      password: password,
    })
      .then((response) => {
        localStorage.setItem("accessToken", response.data.access_token);
        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response) {
          toast.error(error.response.data.error)
        }
      });
  };

  return (
    <div className="login-container">
      <div className="left-side"></div>
      <div className="right-side">
        <div className="login-form w-50 p-3">
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button className="mt-3 mb-3" type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="forgot-password p-2">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
