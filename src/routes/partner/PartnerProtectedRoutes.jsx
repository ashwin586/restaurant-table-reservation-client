import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PartnerProtectedRoutes = () => {
  const token = localStorage.getItem("partnerToken");
  return token ? <Outlet /> : <Navigate to="/partner/login" />;
};

export default PartnerProtectedRoutes;
