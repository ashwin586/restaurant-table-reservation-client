import React, { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useDispatch } from "react-redux";
import { partnerLogin } from "../../../../redux/slice/partnerSlice";
import { auth } from "../../../../services/firebase/firebase";
import Axios from "../../../../services/axios";

const ForgotPassword = () => {
  const [otpPage, setOtpPage] = useState(false);
  const [confirm, setConfirmation] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "normal",
        callback: () => {
          toast.success("Otp sent successfully");
        },
        "expired-callback": () => {
          toast.error("Timeout");
        },
      }
    );
  };

  const sendOtp = async (number) => {
    try {
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      const phoneNumber = `+91${number}`;
      return await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
    },
    validationSchema: Yup.object().shape({
      phoneNumber: Yup.number()
        .min(1000000000, "Phone number must be exactly 10 digits")
        .max(9999999999, "Phone number must be exactly 10 digits")
        .required("Please provide your registered phone number"),
    }),
    onSubmit: async (values) => {
      try {
        const result = await sendOtp(values.phoneNumber);
        setConfirmation(result);
        setOtpPage(true);
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleSubmit = async () => {
    try {
      const phoneNumber = formik.values.phoneNumber;
      const response = await Axios.post("/partner/recover", { phoneNumber });
      if (response.status === 200) {
        console.log("yes");
        dispatch(partnerLogin());
        localStorage.setItem("partnerToken", response.data.partnerToken);
        navigate("/partner/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const otpFormik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object().shape({
      otp: Yup.number().required("Enter the otp"),
    }),
    onSubmit: async (values) => {
      try {
        await confirm.confirm(values.otp);
        await handleSubmit();
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <>
      {!otpPage ? (
        <div className="bg-adminDashboard min-h-screen flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-2xl text-center">
                Enter your Registered Mobile Number
              </h1>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className="error text-red-600 ">
                  {formik.errors.phoneNumber}
                </p>
              )}
              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green-500 text-white"
                onClick={formik.handleSubmit}
              >
                Send OTP
              </button>
            </div>
          </div>
          <div id="recaptcha-container"></div>
        </div>
      ) : (
        <div className="bg-adminDashboard min-h-screen flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-2xl text-center">
                Enter the OTP send in your Registered Mobile Number
              </h1>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="otp"
                placeholder="OTP"
                value={otpFormik.values.otp}
                onChange={otpFormik.handleChange}
              />
              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green-500 text-white"
                onClick={otpFormik.handleSubmit}
              >
                Verify OTP
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
