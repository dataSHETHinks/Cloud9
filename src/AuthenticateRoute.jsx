import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthenticateRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  return token ? children : <Navigate to="/login" />;
};

export default AuthenticateRoute;
