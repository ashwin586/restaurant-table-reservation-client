import React from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {useNavigate} from 'react-router-dom'
import Axios from "../../../services/axios";

const OTPComponent = ({ isOpen, data }) => {
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
        const email = data.email;
        const otp = values.otp;
        const response = await Axios.post("/otpverify", { otp, email });
        if (response.status === 200) {
          const response = await Axios.post("/registeruser", data);
          if (response.status === 200) {
            navigate('/login')
          }
        }
      } catch (err) {
        console.log(err);
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
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="text-white bg-button p-3 rounded-xl"
                    >
                      Verify OTP
                    </button>
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
