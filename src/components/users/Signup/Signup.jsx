import React, { useState } from "react";
import Axios from "../../../services/axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
  return (
    <>
      <div>{open && <OTPComponent isOpen={open} data={formik.values} />}</div>
      <div className="flex items-center justify-center h-screen">
        <div className="flex justify-center rounded-2xl shadow-xl shadow-stone-500">
          <div className="m-8">
            <img
              style={{ width: "300px", height: "300px" }}
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
