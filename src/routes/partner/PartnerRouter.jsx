import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import PartnerLoginPage from "../../pages/partners/Authentication/PartnerLoginPage";
import PartnerRegisterPage from "../../pages/partners/Authentication/PartnerRegisterPage";
// import OTPVerify from '../../components/partners/authentication/OTP/OTPVerify';
import DashboardPage from "../../pages/partners/Home/DashboardPage";
import ProfilePage from "../../pages/partners/Home/ProfilePage";

const PartnerRouter = () => {
  const partner = useSelector((state) => state.partner.isLogged);
  return (
    <>
      <Routes>
        <Route path="register" element={<PartnerRegisterPage />} />
        {/* <Route path='/otp' element={<OTPVerify />} /> */}
        <Route
          path="login"
          element={
            partner ? (
              <Navigate to="/partner/dashboard" />
            ) : (
              <PartnerLoginPage />
            )
          }
        />
        <Route
          path="dashboard"
          element={
            partner ? <DashboardPage /> : <Navigate to="/partner/login" />
          }
        />
        <Route
          path="profile"
          element={partner ? <ProfilePage /> : <Navigate to="/partner/login" />}
        />
      </Routes>
    </>
  );
};

export default PartnerRouter;
