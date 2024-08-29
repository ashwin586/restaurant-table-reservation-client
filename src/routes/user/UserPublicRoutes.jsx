import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const UserPublicRoutes = () => {
  const token = localStorage.getItem("userToken");
  if (token) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default UserPublicRoutes;
