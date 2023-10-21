import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "../../../../services/axios";

const OTPVerify = () => {
  const location = useLocation();
  const [otp, setOtp] = useState("");
  // const { values } = location.state;
  // const confirm = localStorage.getItem("confirm");
  // const verifyOtp = async () => {
  //   try {
  //     if (otp && confirm) {
  //       const result = await confirm.confirm(otp);
  //       if (result) {
  //         console.log("success");
  //         // await registerSubmit
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const registerSubmit = async () => {
  //   try {
  //     await Axios.post("/partner/register", { values });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="bg-adminDashboard min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-2xl text-center">
            Enter the OTP send in your Registered Mobile Number
          </h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="name"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-green-500 text-white"
            // onClick={}
          >
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerify;
