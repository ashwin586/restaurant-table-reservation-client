import React from "react";
import { Routes, Route } from "react-router-dom";

import PartnerLoginPage from "../../pages/partners/Authentication/PartnerLoginPage";
import PartnerRegisterPage from "../../pages/partners/Authentication/PartnerRegisterPage";
import PartnerForgotPasswordPage from "../../pages/partners/Authentication/PartnerForgotPasswordPage";
import DashboardPage from "../../pages/partners/Home/DashboardPage";
import ProfilePage from "../../pages/partners/Home/ProfilePage";
import RestaurantPage from "../../pages/partners/Home/RestaurantPage";
import OrdersPage from "../../pages/partners/Home/OrdersPage";

import PartnerProtectedRoutes from "./PartnerProtectedRoutes";
import PartnerPublicRoutes from "./PartnerPublicRoutes";

function PartnerRouter() {
  return (
    <Routes>
      <Route element={<PartnerProtectedRoutes />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/restaurants" element={<RestaurantPage />} />
        <Route path="/:id/orders" element={<OrdersPage />} />
      </Route>
      <Route element={<PartnerPublicRoutes />}>
        <Route path="/register" element={<PartnerRegisterPage />} />
        <Route path="/login" element={<PartnerLoginPage />} />
        <Route path="/forgotpassword" element={<PartnerForgotPasswordPage />} />
      </Route>
    </Routes>
  );
}

export default PartnerRouter;
