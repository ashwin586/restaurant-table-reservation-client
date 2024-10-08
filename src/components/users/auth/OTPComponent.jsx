import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import showNotification from "../../../utils/Toast/ShowNotification";
import Axios from "../../../services/axios";

const OTPComponent = ({ isOpen, email, resendOTP, setOpen }) => {
  const [otpTimer, setOtpTimer] = useState(30);

  useEffect(() => {
    let timer;
    if (otpTimer > 0) {
      timer = setTimeout(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [otpTimer]);

  const handleOTP = () => {
    setOtpTimer(30);
    resendOTP();
  };

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object().shape({
      otp: Yup.string()
        .length(4, "Please enter a valid OTP")
        .required("The field cannot be empty"),
    }),
    onSubmit: async (values) => {
      try {
        const otp = values.otp;
        const response = await Axios.post("/otpVerify", { otp, email });
        if (response.status === 200) {
          setOpen(false);
          showNotification("success", "Email verified, Now you can login.");
          navigate("/login");
        }
      } catch (err) {
        if (err.response && err.response.status === 400) {
          showNotification("error", err.response.data.message);
        }
      }
    },
  });

  return (
    <>
      {isOpen && (
        <section className="">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-2xl shadow-xl shadow-stone-500 md:mt-0 sm:max-w-md xl:p-0 ">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Enter the OTP send to your email
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={formik.handleSubmit}
                >
                  <div>
                    <input
                      type="text"
                      name="otp"
                      id="otp"
                      className="bg-gray-50 border border-gray-300 text-gray-800 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800"
                      placeholder="OTP"
                      value={formik.values.otp}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="flex justify-center items-center flex-col">
                    <button
                      type="submit"
                      className="text-white bg-button p-3 rounded-xl w-40"
                    >
                      Verify OTP
                    </button>
                    <div className="mt-2">
                      {otpTimer > 0 ? (
                        <p className="text-slate-400">{otpTimer}</p>
                      ) : (
                        <button
                          type="button"
                          className="text-white bg-blue-500 p-3 rounded-xl w-40"
                          onClick={handleOTP}
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default OTPComponent;
