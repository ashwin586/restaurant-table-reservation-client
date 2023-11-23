import React from "react";
import Axios from "../../../services/axios";
import { Formik, Field, Form } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../redux/slice/userSlice";
import { auth, googleProvider } from "../../../services/firebase/firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginCheck = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Please provide an email"),
    password: Yup.string().required("Please enter the password"),
  });

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result) {
        const email = result.user.email;
        const response = await Axios.post("/google/login", { email });
        if (response.status === 200) {
          dispatch(userLogin());
          localStorage.setItem("userToken", response.data.userToken);
          navigate("/");
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "dark",
        });
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex justify-center rounded-2xl shadow-xl shadow-stone-500">
          <div className="m-10">
            <img
              style={{ height: "350px", width: "300px" }}
              className="rounded-xl"
              src="/assets/10806958_4572220.jpg"
              alt="LoginImage"
            />
          </div>
          <div className="mx-5 my-10">
            <div className="flex justify-center font-bold text-2xl text-gray-800">
              <h1>LOGIN</h1>
            </div>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={loginCheck}
              onSubmit={async (values) => {
                try {
                  const response = await Axios.post("/login", values);
                  if (response.status === 200) {
                    dispatch(userLogin());
                    localStorage.setItem("userToken", response.data.userToken);
                    navigate("/");
                  }
                } catch (err) {
                  toast.error(err.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "dark",
                  });
                }
              }}
            >
              <Form>
                <div>
                  <Field
                    type="text"
                    name="email"
                    className="outline-none border-b w-full text-gray-800 my-5 p-2 rounded-md"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <Field
                    type="password"
                    name="password"
                    className="outline-none border-b w-full text-gray-800 mt-5 mb-2 p-2 rounded-md"
                    placeholder="Password"
                  />
                </div>
                <button
                  className="text-blue-500 hover:cursor-pointer"
                  onClick={() => navigate("/forgotpassword")}
                >
                  Forgot Password ?
                </button>
                <div className="mt-4 flex justify-evenly">
                  <div className="me-4">
                    <button className="px-4 py-1 rounded-xl bg-button text-white">
                      Login
                    </button>
                  </div>
                  <div className="ms-4">
                    <button
                      type="submit"
                      className="px-2 py-1 rounded-xl bg-button text-white"
                      onClick={() => navigate("/register")}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </Form>
            </Formik>
            <div className="mt-3">
              <button
                className="flex px-2 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-400"
                onClick={handleGoogleLogin}
              >
                Sign In with{" "}
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
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
