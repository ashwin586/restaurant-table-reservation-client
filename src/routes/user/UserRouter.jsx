import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "../../pages/users/Authentication/LoginPage";
import SignupPage from "../../pages/users/Authentication/SignupPage";
import HomePage from "../../pages/users/HomePage";
import ForgotPasswordPage from "../../pages/users/Authentication/ForgotPasswordPage";
import Otp from "../../components/users/Recover/Otp";
import NewPassword from "../../components/users/Recover/NewPassword";

const UserRouter = () => {
  const user = useSelector((state) => state.user.isLogged);
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/otpverify" element={<Otp />} />
        <Route path="/newPassword" element={<NewPassword />} />
      </Routes>
    </>
  );
};

export default UserRouter;
