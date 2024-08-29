import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const AdminProtectedRoutes = () => {
  const token = localStorage.getItem("adminToken");

  return token ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default AdminProtectedRoutes;
