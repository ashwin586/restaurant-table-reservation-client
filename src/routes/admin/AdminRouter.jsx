import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import AdminDashboardPage from "../../pages/admin/AdminDashboardPage";
import AdminUserManagment from "../../pages/admin/AdminUserManagment";
import AdminLoginPage from "../../pages/admin/AdminLoginPage";

const AdminRouter = () => {
  const admin = useSelector((state) => state.admin.isLogged);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            admin === true ? (
                <Navigate to={'dashboard'}/>
            ) : (
              <AdminLoginPage />
            )
          }
        />
        <Route
          path="dashboard"
          element={
            admin === false ? (
              <Navigate to="/" />
            ) : (
              <AdminDashboardPage />
            )
          }
        />
        <Route
          path="usermanagment"
          element={
            admin === false ? (
              <Navigate to={"/"} />
            ) : (
              <AdminUserManagment />
            )
          }
        />
      </Routes>
    </>
  );
};

export default AdminRouter;
