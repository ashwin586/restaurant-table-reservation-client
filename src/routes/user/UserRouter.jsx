import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "../../pages/users/Authentication/LoginPage";
import SignupPage from "../../pages/users/Authentication/SignupPage";
import HomePage from "../../pages/users/HomePage";
import ForgotPasswordPage from "../../pages/users/Authentication/ForgotPasswordPage";
import Otp from "../../components/users/Recover/Otp";
import NewPassword from "../../components/users/Recover/NewPassword";
import ProfilePage from "../../pages/users/Profile/ProfilePage";
import RestaurantDetailsPage from "../../pages/users/RestaurantDetailsPage";
import BookingsPage from "../../pages/users/Profile/BookingsPage";
import ReviewsPage from "../../pages/users/Profile/ReviewsPage";

const UserRouter = () => {
  const user = useSelector((state) => state.user.isLogged);
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to={"/"} /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to={"/"} /> : <SignupPage />}
        />
        {/* <Route path="/sendOtp" element={<OtpPage />}/> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/otpverify" element={<Otp />} />
        <Route path="/newPassword" element={<NewPassword />} />
        <Route
          path="/profile"
          element={user ? <ProfilePage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/restaurantDetails/:restaurantId"
          element={<RestaurantDetailsPage />}
        />
        <Route
          path="/bookings"
          element={user ? <BookingsPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/reviews"
          element={user ? <ReviewsPage /> : <Navigate to={"/"} />}
        />
      </Routes>
    </>
  );
};

export default UserRouter;
