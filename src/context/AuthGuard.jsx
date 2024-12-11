import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Adjust the path as necessary

const AuthGuard = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default AuthGuard;