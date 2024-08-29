import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Axios from "../../../../services/axios";
import { useNavigate, Link } from "react-router-dom";
import showNotification from "../../../../utils/Toast/ShowNotification";
// import { useDispatch } from "react-redux";
// import { partnerLogin } from "../../../../redux/slice/partnerSlice";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const loginValidation = Yup.object().shape({
    phoneNumber: Yup.string()
      .length(10, "Please enter a valid Phone Number")
      .required("Please enter a Phone Number"),
    password: Yup.string().required("Please enter the password"),
  });
  return (
    <div className="bg-adminDashboard min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-2xl text-center">Partner Login</h1>
          <Formik
            initialValues={{
              phoneNumber: "",
              password: "",
            }}
            validationSchema={loginValidation}
            onSubmit={async (values) => {
              try {
                const response = await Axios.post("/partner/login", values);
                if (response.status === 200) {
                  localStorage.setItem(
                    "partnerToken",
                    response.data.partnerToken
                  );
                  navigate("/partner/dashboard");
                }
              } catch (err) {
                console.log(err.response);
                showNotification("error", err.response.data);
              }
            }}
          >
            <Form>
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
                name="password"
                placeholder="password"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="error text-red-600 "
              />
              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green-500 text-white"
              >
                Login
              </button>
            </Form>
          </Formik>
          <Link to={"/partner/forgotpassword"} className="text-blue-500">
            Forgot Password ?
          </Link>
        </div>

        <div className="text-grey-dark mt-6">
          Want to sign up for partner program?
          <button
            className="no-underline border-b border-blue text-blue-600"
            onClick={() => navigate("/partner/register")}
          >
            Sign up
          </button>
          .
        </div>
      </div>
    </div>
  );
};

export default Login;
