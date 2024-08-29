import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminDashboardPage from "../../pages/admin/AdminDashboardPage";
import AdminUserManagment from "../../pages/admin/AdminUserManagment";
import AdminLoginPage from "../../pages/admin/AdminLoginPage";
import AdminSignupPage from "../../pages/admin/AdminSignupPage";
import AdminPartnerManagementPage from "../../pages/admin/AdminPartnerManagmentPage";
import AdminRestaurantManagmentPage from "../../pages/admin/AdminRestaurantManagmentPage";
import AdminCuisinesPage from "../../pages/admin/AdminCuisinesPage";
import AdminCategoryManagment from "../../pages/admin/AdminCategoryManagment";

import AdminProtectedRoutes from "./AdminProtectedRoutes";
import AdminPublicRoutes from "./AdminPublicRoutes";

function AdminRouter() {
  return (
    <Routes>
      <Route element={<AdminPublicRoutes />}>
        <Route path="/login" element={<AdminLoginPage />} />
        <Route path="/signup" element={<AdminSignupPage />} />
      </Route>

      <Route element={<AdminProtectedRoutes />}>
        <Route path="/dashboard" element={<AdminDashboardPage />} />
        <Route path="/usermanagment" element={<AdminUserManagment />} />
        <Route
          path="/partnermanagment"
          element={<AdminPartnerManagementPage />}
        />
        <Route
          path="/restaurantmanagment"
          element={<AdminRestaurantManagmentPage />}
        />
        <Route path="/cuisines" element={<AdminCuisinesPage />} />
        <Route path="/categoryManagment" element={<AdminCategoryManagment />} />
      </Route>
    </Routes>
  );
}

export default AdminRouter;
