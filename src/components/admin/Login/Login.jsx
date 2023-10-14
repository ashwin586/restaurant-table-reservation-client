import React, { useState } from "react";
import Axios from "../../../services/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';
import { adminLogin } from "../../../redux/slice/adminSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const response = await Axios.post("/admin/login", { email, password });
      if (response.status === 200) {
        dispatch(adminLogin());
        localStorage.setItem("adminToken", response.data.adminToken);
        navigate("/admin/dashboard");
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
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-5 text-center">
            Welcome back, Admin
          </h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-blue-500"
              placeholder=""
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-blue-500"
              placeholder=" "
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none"
            onClick={handleSubmit}
          >
            Log In
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
