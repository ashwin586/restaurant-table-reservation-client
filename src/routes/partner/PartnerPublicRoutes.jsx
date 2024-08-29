import React from "react";
import { Outlet, Navigate } from "react-router-dom";
const PartnerPublicRoutes = () => {
  const token = localStorage.getItem("partnerToken");
  if (token) return <Navigate to="/partner/dashboard" replace />;
  return <Outlet />;
};

export default PartnerPublicRoutes;
