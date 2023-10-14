import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "../../../services/axios";
import { toast } from "react-toastify";

const NewPassword = () => {
  const navigate = useNavigate();

  const passwordSchema = Yup.object().shape({
    password1: Yup.string()
      .matches(/^(?=.*[A-Z])/, "Must include One uppercase letter")
      .matches(/^(?=.*\d)/, "Must include one digit")
      .matches(/^(?=.*\d)/, "Must include one digit"),
    password2: Yup.string()
      .oneOf([Yup.ref("password1")], "Passwords must match")
      .required("Password is required"),
  });
  const email = localStorage.getItem("validEmail");

  return (
    <>
      <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-2xl shadow-xl shadow-stone-500 md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Enter your new password
              </h1>
              <Formik
                initialValues={{
                  password1: "",
                  password2: "",
                }}
                validationSchema={passwordSchema}
                onSubmit={async (values) => {
                  try {
                    const response = await Axios.post("/savenewpassword", {
                      password: values.password1,
                      email,
                    });
                    if (response.status === 200) {
                      localStorage.removeItem("validEmail");
                      toast.success(`${response.data.message}`, {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        style: {
                          background: "#EEEEFF",
                          color: "green",
                        },
                      });
                      navigate("/login");
                    }
                  } catch (err) {
                    if (err.response.status === 400) {
                      toast.error(`${err.response.data.message}`, {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        style: {
                          background: "#EEEEFF",
                          color: "red",
                        },
                      });
                    }
                  }
                }}
              >
                <Form className="space-y-4 md:space-y-6">
                  <div>
                    <Field
                      type="password"
                      name="password1"
                      id="password1"
                      className="bg-gray-50 border border-gray-300 text-gray-800 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800"
                      placeholder="Password"
                    />
                    <ErrorMessage
                      name="password1"
                      component="p"
                      className="error text-red-600 "
                    />
                  </div>
                  <div>
                    <Field
                      type="password"
                      name="password2"
                      id="password2"
                      className="bg-gray-50 border border-gray-300 text-gray-800 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800"
                      placeholder="Re-enter new password"
                    />
                    <ErrorMessage
                      name="password2"
                      component="p"
                      className="error text-red-600 "
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="text-white bg-button p-3 rounded-xl"
                    >
                      Save
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewPassword;
