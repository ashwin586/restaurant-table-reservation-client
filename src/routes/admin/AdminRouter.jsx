import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import AdminDashboardPage from "../../pages/admin/AdminDashboardPage";
import AdminUserManagment from "../../pages/admin/AdminUserManagment";
import AdminLoginPage from "../../pages/admin/AdminLoginPage";
import AdminSignupPage from "../../pages/admin/AdminSignupPage";
import AdminPartnerManagementPage from "../../pages/admin/AdminPartnerManagmentPage";
import AdminRestaurantManagmentPage from "../../pages/admin/AdminRestaurantManagmentPage";
import AdminCuisinesPage from "../../pages/admin/AdminCuisinesPage";
import AdminCategoryManagment from "../../pages/admin/AdminCategoryManagment";

const AdminRouter = () => {
  const admin = useSelector((state) => state.admin.isLogged);
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            admin ? <Navigate to="/admin/dashboard" /> : <AdminLoginPage />
          }
        />
        <Route
          path="/signup"
          element={
            admin ? <Navigate to={"/admin/dashboard"} /> : <AdminSignupPage />
          }
        />
        <Route
          path="dashboard"
          element={
            !admin ? <Navigate to="/admin/login" /> : <AdminDashboardPage />
          }
        />
        <Route
          path="usermanagment"
          element={
            !admin ? <Navigate to="/admin/login" /> : <AdminUserManagment />
          }
        />
        <Route
          path="partnermanagment"
          element={
            !admin ? (
              <Navigate to="/admin/login" />
            ) : (
              <AdminPartnerManagementPage />
            )
          }
        />
        <Route
          path="restaurantmanagment"
          element={
            !admin ? (
              <Navigate to="/admin/login" />
            ) : (
              <AdminRestaurantManagmentPage />
            )
          }
        />
        <Route
          path="cuisines"
          element={
            !admin ? <Navigate to="/admin/login" /> : <AdminCuisinesPage />
          }
        />
        <Route
          path="categoryManagment"
          element={
            !admin ? <Navigate to="/admin/login" /> : <AdminCategoryManagment />
          }
        />
      </Routes>
    </>
  );
};

export default AdminRouter;
