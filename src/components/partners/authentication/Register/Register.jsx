import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../../../services/firebase/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import * as Yup from "yup";
import Axios from "../../../../services/axios";

const Register = () => {
  const navigate = useNavigate();
  const [otpPage, setOtpPage] = useState(false);
  const [confirm, setConfirmation] = useState(null);
  const [otp, setOtp] = useState(null);
  // const [info, setInfo] = useState({});
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

  const verifyOtp = async () => {
    try {
      await confirm.confirm(otp);
      await registerPartner();
    } catch (err) {
      console.log(err);
    }
  };

  const registerPartner = async () => {
    try {
      const data = formik.values;
      console.log(data);
      const response = await Axios.post("/partner/register", { data });
      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          style: {
            background: "#EEEEFF",
            color: "green",
          },
        });
        navigate("/partner/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password1: "",
      password2: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(4, "Enter a valid Name")
        .required("Please enter a name"),
      phoneNumber: Yup.string()
        .length(10, "Please enter a valid Phone Number")
        .required("Please enter a Phone Number"),
      email: Yup.string()
        .email("Invalid email")
        .required("Please provide an email"),
      password1: Yup.string()
        .matches(/^(?=.*[A-Z])/, "Must include One uppercase letter")
        .matches(/^(?=.*\d)/, "Must include one digit")
        .matches(/^(?=.*\d)/, "Must include one digit"),
      password2: Yup.string()
        .oneOf([Yup.ref("password1")], "Passwords must match")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      // await sendOtp(values.phoneNumber);
      // setOtpPage(true);
      // setConfirmation(true);
      const result = await sendOtp(values.phoneNumber);
      setConfirmation(result);
      setOtpPage(true);
    },
  });

  return (
    <>
      {!otpPage ? (
        <div className="bg-adminDashboard min-h-screen flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-2xl text-center">
                Sign Up for Partner Program
              </h1>
              <form onSubmit={formik.handleSubmit}>
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="name"
                  placeholder="Full Name"
                  onChange={formik.handleChange}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="error text-red-600 ">{formik.errors.name}</p>
                )}

                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="email"
                  placeholder="Email"
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="error text-red-600 ">{formik.errors.email}</p>
                )}

                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  onChange={formik.handleChange}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <p className="error text-red-600 ">
                    {formik.errors.phoneNumber}
                  </p>
                )}

                <input
                  type="password"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="password1"
                  placeholder="Password"
                  onChange={formik.handleChange}
                />
                {formik.touched.password1 && formik.errors.password1 && (
                  <p className="error text-red-600 ">
                    {formik.errors.password1}
                  </p>
                )}

                <input
                  type="password"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="password2"
                  placeholder="Re-enter Password"
                  onChange={formik.handleChange}
                />
                {formik.touched.password2 && formik.errors.password2 && (
                  <p className="error text-red-600 ">
                    {formik.errors.password2}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full text-center py-3 rounded bg-green-500 text-white"
                >
                  Create Account
                </button>
              </form>
            </div>

            <div className="text-grey-dark mt-6">
              Already a Partner?
              <button
                className="no-underline border-b border-blue text-blue-600"
                onClick={() => navigate("/partner/login")}
              >
                Log in
              </button>
              .
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
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green-500 text-white"
                onClick={verifyOtp}
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

export default Register;
