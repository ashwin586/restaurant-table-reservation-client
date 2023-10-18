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

const UserRouter = () => {
  const user = useSelector((state) => state.user.isLogged);
  return (
    <>
      <Routes>
        <Route path="/login" element={user ? <Navigate to={'/'}/> : <LoginPage />} />
        <Route path="/register" element={user ? <Navigate to={'/'}/> : <SignupPage />} />
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/otpverify" element={<Otp />} />
        <Route path="/newPassword" element={<NewPassword />} />
        <Route path="/profile" element={<ProfilePage />}/>
      </Routes>
    </>
  );
};

export default UserRouter;
