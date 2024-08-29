import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "../../pages/users/Authentication/LoginPage";
import SignupPage from "../../pages/users/Authentication/SignupPage";
import HomePage from "../../pages/users/HomePage";
import ForgotPasswordPage from "../../pages/users/Authentication/ForgotPasswordPage";
// import Otp from "../../components/users/Recover/Otp";
// import NewPassword from "../../components/users/Recover/NewPassword";
import ProfilePage from "../../pages/users/Profile/ProfilePage";
import RestaurantDetailsPage from "../../pages/users/RestaurantDetailsPage";
import BookingsPage from "../../pages/users/Profile/BookingsPage";
import ReviewsPage from "../../pages/users/Profile/ReviewsPage";

import UserProtectRoutes from "./UserProtectedRoutes";
import UserPublicRoutes from "./UserPublicRoutes";

function UserRouter() {
  return (
    <Routes>
      <Route element={<UserProtectRoutes />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route
          path="/restaurantDetails/:restaurantId"
          element={<RestaurantDetailsPage />}
        />
      </Route>
      <Route element={<UserPublicRoutes />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
      </Route>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default UserRouter;
