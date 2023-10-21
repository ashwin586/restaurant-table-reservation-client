import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import AdminDashboardPage from "../../pages/admin/AdminDashboardPage";
import AdminUserManagment from "../../pages/admin/AdminUserManagment";
import AdminLoginPage from "../../pages/admin/AdminLoginPage";
import AdminPartnerManagementPage from '../../pages/admin/AdminPartnerManagmentPage'

const AdminRouter = () => {
  const admin = useSelector((state) => state.admin.isLogged);
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={admin ? <Navigate to="/admin/dashboard" /> : <AdminLoginPage />}
        />
        <Route
          path="dashboard"
          element={!admin ? <Navigate to="/admin/login" /> : <AdminDashboardPage />}
        />
        <Route
          path="usermanagment"
          element={!admin ? <Navigate to="/admin/login" /> : <AdminUserManagment />}
        />
        <Route path="partnermanagment" element={!admin ? <Navigate to='/admin/login' /> : <AdminPartnerManagementPage/>}/>
      </Routes>
    </>
  );
};

export default AdminRouter;
