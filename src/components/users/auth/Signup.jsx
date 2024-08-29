import React, { useState } from "react";
import Axios from "../../../services/axios";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { auth, googleProvider } from "../../../services/firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import * as Yup from "yup";
import showNotification from "../../../utils/Toast/ShowNotification";
import OTPComponent from "./OTPComponent";

const Signup = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(4, "Enter a valid Name")
        .matches(/^\S.*$/, "Cannot start with whitespace")
        .required("Please enter a name"),
      phoneNumber: Yup.string()
        .length(10, "Please enter a valid Phone Number")
        .required("Please enter a Phone Number"),
      email: Yup.string()
        .email("Invalid email")
        .required("Please provide an email"),
      password: Yup.string()
        .matches(/^(?=.*[A-Z])/, "Must include One uppercase letter")
        .matches(/^(?=.*\d)/, "Must include one digit")
        .matches(/^(?=.*\d)/, "Must include one digit")
        .required("Please enter a password"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await Axios.post("/registerUser", values);
        if (response.status === 200) {
          setEmail(response.data.email);
          setOpen(true);
        }
      } catch (err) {
        if (err.response && err.response.status === 400) {
          showNotification("error", err.response.data.message);
        }
      }
    },
  });

  const signUpWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result) {
        const { displayName, email } = result.user;
        const response = await Axios.post("/google/signup", {
          displayName,
          email,
        });
        if (response.status === 200) {
          navigate("/login");
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        showNotification("error", err.response.data.message);
      }
    }
  };

  const resendOTP = async () => {
    try {
      await Axios.post("/reSendOtp", { email: email });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        {open && (
          <OTPComponent isOpen={open} email={email} resendOTP={resendOTP} setOpen={setOpen} />
        )}
      </div>
      <div className="flex items-center justify-center h-screen bg-signup bg-cover bg-no-repeat">
        <div className="flex justify-center rounded-2xl shadow-xl shadow-stone-500 bg-white">
          <div className="m-10">
            <img
              style={{ width: "500px", height: "350px" }}
              src="/assets/10088619.jpg"
              alt="registerImage"
            />
          </div>
          <div className="bg-signupFormBg flex rounded-2xl shadow-xl flex-col items-center">
            <div className="m-5">
              <div
                className="flex cursor-pointer"
                onClick={() => navigate("/")}
              >
                <span className="hidden md:block mx-2">
                  <img
                    src="/assets/reserve.png"
                    style={{ height: "38px" }}
                    alt="Logo"
                  />
                </span>
                <span className="md:hidden mx-2">
                  <img
                    src="/assets/reserve.png"
                    style={{ height: "28px" }}
                    alt="Logo"
                  />
                </span>
                <span className="font-extrabold text-2xl text-gray-900 my-2">
                  RESERVETABLE
                </span>
              </div>
              <h1 className="font-bold text-2xl text-gray-800 text-center">
                Register
              </h1>
            </div>
            <div className="flex-column justify-center">
              <form onSubmit={formik.handleSubmit}>
                <div className="mx-8 mb-2">
                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    className={`${
                      formik.errors.name
                        ? "border-2 border-red-500 outline-none w-full p-2 rounded-md"
                        : "outline-none w-full p-2 rounded-md text-gray-800 border-2 border-signupBorderColor"
                    }`}
                    placeholder="Full Name"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="error text-red-600 ">{formik.errors.name}</p>
                  )}
                </div>
                <div className="mx-8 mb-2">
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    className={`${
                      formik.errors.phoneNumber
                        ? "border-2 border-red-500 outline-none w-full p-2 rounded-md"
                        : "outline-none w-full p-2 rounded-md text-gray-800 border-2 border-signupBorderColor"
                    }`}
                    placeholder="Phone Number"
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <p className="error text-red-600 ">
                      {formik.errors.phoneNumber}
                    </p>
                  )}
                </div>
                <div className="mx-8 mb-2">
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className={`${
                      formik.errors.email
                        ? "border-2 border-red-500 outline-none w-full p-2 rounded-md"
                        : "outline-none w-full p-2 rounded-md text-gray-800 border-2 border-signupBorderColor"
                    }`}
                    placeholder="Email"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="error text-red-600 ">{formik.errors.email}</p>
                  )}
                </div>
                <div className="mx-8 mb-2">
                  <input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className={`${
                      formik.errors.password
                        ? "border-2 border-red-500 outline-none w-full p-2 rounded-md"
                        : "outline-none w-full p-2 rounded-md text-gray-800 border-2 border-signupBorderColor"
                    }`}
                    placeholder="Password"
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p className=" text-red-600 ">{formik.errors.password}</p>
                  )}
                </div>
                <div className="mt-5 flex justify-center">
                  <button
                    type="submit"
                    className="px-20 py-2 rounded-lg bg-signupBtn text-white hover:bg-signupBorderColor"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              <div className="mt-2 flex justify-center">
                <button
                  className=" flex px-12 py-2 rounded-lg text-white hover:bg-blue-300 bg-blue-500"
                  onClick={signUpWithGoogle}
                >
                  <span>Sign Up with </span>
                  <span className="px-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="24"
                      height="24"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#fbc02d"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                      <path
                        fill="#e53935"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      ></path>
                      <path
                        fill="#4caf50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      ></path>
                      <path
                        fill="#1565c0"
                        d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div className="px-5 mt-2 text-sm text-center">
                <p className="text-signupBorderColor">
                  Already have an account?{" "}
                  <Link
                    className="text-white hover:text-gray-200"
                    to={"/login"}
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
