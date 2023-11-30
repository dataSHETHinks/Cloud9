import React, { useState } from "react";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import AuthAPI from "../api/AuthComponentApis/AuthAPI";
import CustomLoader from "../components/CustomLoader";

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await AuthAPI.login(username, password);
      localStorage.setItem("accessToken", result.response.data.access_token);
      navigate("/");
      if (result.isLogout) {
        localStorage.removeItem("accessToken");
        navigate("/login/");
      }
    } catch (error) {
      toast.error(error.error);
      if (error.isLogout) {
        localStorage.removeItem("accessToken");
        navigate("/login/");
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <div className="centered-loader">
          <CustomLoader />
        </div>
      ) : null}
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
    </>
  );
}

export default Login;
