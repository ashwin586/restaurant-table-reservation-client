import React from "react";
import Axios from "../../../services/axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import * as Yup from "yup";

const Signup = () => {
  const navigate = useNavigate();
  const signupSchema = Yup.object().shape({
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
      .matches(/^(?=.*\d)/, "Must include one digit"),
  });
  return (
    <>
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
              <Formik
                initialValues={{
                  name: '',
                  phoneNumber: '',
                  email: '',
                  password: '',
                }}
                validationSchema={signupSchema}
                onSubmit={async (values) => {
                  try {
                    const response = await Axios.post('/registeruser', values);
                    if (response.status === 200) {
                      navigate('/login');
                    }
                  } catch (err) {
                    if (err.response && err.response.status === 400) {
                      toast.error(err.response.data.message, {
                        position: 'top-right', 
                        autoClose: 5000,       
                        hideProgressBar: false, 
                        closeOnClick: true,   
                        pauseOnHover: true,
                        theme: "dark",
                      })
                    }
                  }
                }}
              >
                <Form>
                  <div className="mx-8">
                    <Field
                      type="text"
                      name="name"
                      className="outline-none border-b w-full p-2 rounded-md text-gray-800"
                      placeholder="Full Name"
                    />
                    <ErrorMessage name="name" component="p" className="error text-red-500 font-bold" />
                  </div>
                  <div className="mx-8">
                    <Field
                      type="text"
                      name="phoneNumber"
                      className="outline-none border-b w-full p-2 mt-2 rounded-md text-gray-800"
                      placeholder="Phone Number"
                    />
                    <ErrorMessage name="phoneNumber" component="p" className="error text-red-500 font-bold" />
                  </div>
                  <div className="mx-8">
                    <Field
                      type="email"
                      name="email"
                      className="outline-none border-b w-full p-2 mt-2 rounded-md text-gray-800"
                      placeholder="Email"
                    />
                    <ErrorMessage name="email" component="p" className="error text-red-500 font-bold" />
                  </div>
                  <div className="mx-8">
                    <Field
                      type="password"
                      name="password"
                      className="outline-none border-b w-full p-2 mt-2 rounded-md text-gray-800"
                      placeholder="Password"
                    />
                    <ErrorMessage name="password" component="p" className="error text-red-500 font-bold" />
                  </div>
                  <div className="mt-5 flex justify-center">
                    <button className="px-2 py-1 rounded-xl bg-button text-white">
                      Sign up
                    </button>
                  </div>
                </Form>
              </Formik>
              <div className="px-5 mt-2">
                <p>
                  Already have an account?{" "}
                  <button type="submit" onClick={() => navigate('/login')} className="text-gray-800">
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
