import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../../../services/firebase/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import * as Yup from "yup";
import Axios from "../../../../services/axios";

const Register = () => {
  const navigate = useNavigate()
  const [otpPage, setOtpPage] = useState(false);
  const [confirm, setConfirmation] = useState(null);
  const [otp, setOtp] = useState("");
  const [info, setInfo] = useState({});
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
      const result = await confirm.confirm(otp);
      if (result) {
        console.log("success");
        await registerPartner();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const registerPartner = async (values) => {
    try {
      const response = await Axios.post("/partner/register", { values });
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
        navigate('/partner/login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const registerSchema = Yup.object().shape({
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
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  phoneNumber: "",
                  password1: "",
                  password2: "",
                }}
                validationSchema={registerSchema}
                onSubmit={async (values) => {
                  // const result = await sendOtp(values.phoneNumber);
                  // setConfirmation(result);
                  // setOtpPage(true);
                  await registerPartner(values);
                }}
              >
                <Form>
                  <Field
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="name"
                    placeholder="Full Name"
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="error text-red-600 "
                  />

                  <Field
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="email"
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="error text-red-600 "
                  />

                  <Field
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="phoneNumber"
                    placeholder="Phone Number"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="p"
                    className="error text-red-600 "
                  />

                  <Field
                    type="password"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="password1"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="password1"
                    component="p"
                    className="error text-red-600 "
                  />

                  <Field
                    type="password"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="password2"
                    placeholder="Re-enter Password"
                  />
                  <ErrorMessage
                    name="password2"
                    component="p"
                    className="error text-red-600 "
                  />

                  <button
                    type="submit"
                    className="w-full text-center py-3 rounded bg-green-500 text-white"
                  >
                    Create Account
                  </button>
                </Form>
              </Formik>
            </div>

            <div className="text-grey-dark mt-6">
              Already a Partner?
              <button
                className="no-underline border-b border-blue text-blue-600"
                onClick={() => navigate('/partner/login')}
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
                name="name"
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
