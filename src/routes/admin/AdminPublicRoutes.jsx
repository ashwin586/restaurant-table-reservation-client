import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const AdminPublicRoutes = () => {
  const token = localStorage.getItem("adminToken");
  if (token) return <Navigate to="/admin/dashboard" replace />;
  return <Outlet />;
};

export default AdminPublicRoutes;
