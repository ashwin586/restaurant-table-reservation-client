import React, { useState } from "react";
import Axios from "../../../services/axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, googleProvider } from "../../../services/firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import * as Yup from "yup";
import OTPComponent from "./OTPComponent";

const Signup = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

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
        const email = values.email;
        const response = await Axios.post("/sendOtp", { email });
        if (response.status === 200) {
          setOpen(true);
        }
      } catch (err) {
        if (err.response && err.response.status === 400) {
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "dark",
          });
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
      console.log(err);
    }
  };

  const resendOTP = async () => {
    try {
      await Axios.post("/sendOtp", { email: formik.values.email });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div>
        {open && (
          <OTPComponent
            isOpen={open}
            data={formik.values}
            resendOTP={resendOTP}
          />
        )}
      </div>
      <div className="flex items-center justify-center h-screen">
        <div className="flex justify-center rounded-2xl shadow-xl shadow-stone-500">
          <div className="m-8">
            <img
              style={{ width: "350px", height: "350px" }}
              src="/assets/20827570_Cartoon character filling in form in survey or checklist.jpg"
              alt="registerImage"
            />
          </div>
          <div className="bg-signupBg flex rounded-2xl shadow-xl flex-col items-center">
            <div className="m-5">
              <h1 className="font-bold text-2xl text-gray-800">Register</h1>
            </div>
            <div className="flex-column justify-center">
              <form onSubmit={formik.handleSubmit}>
                <div className="mx-8">
                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    className="outline-none border-b w-full p-2 rounded-md text-gray-800"
                    placeholder="Full Name"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="error text-red-600 ">{formik.errors.name}</p>
                  )}
                </div>
                <div className="mx-8">
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    className="outline-none border-b w-full p-2 mt-2 rounded-md text-gray-800"
                    placeholder="Phone Number"
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <p className="error text-red-600 ">
                      {formik.errors.phoneNumber}
                    </p>
                  )}
                </div>
                <div className="mx-8">
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className="outline-none border-b w-full p-2 mt-2 rounded-md text-gray-800"
                    placeholder="Email"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="error text-red-600 ">{formik.errors.email}</p>
                  )}
                </div>
                <div className="mx-8">
                  <input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className="outline-none border-b w-full p-2 mt-2 rounded-md text-gray-800"
                    placeholder="Password"
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p className="error text-red-600 ">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
                <div className="mt-5 flex justify-center">
                  <button
                    type="submit"
                    className="px-2 py-1 rounded-xl bg-button text-white"
                  >
                    Sign up
                  </button>
                </div>
              </form>
              <div className="mt-2 flex justify-center">
                <button
                  className=" flex  px-2 py-1 rounded-xl bg-white text-black hover:bg-gray-200"
                  onClick={signUpWithGoogle}
                >
                  <span>Sign Up with </span>
                  <span>
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
              <div className="px-5 mt-2">
                <p>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="text-gray-800"
                  >
                    Login{" "}
                  </button>
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
