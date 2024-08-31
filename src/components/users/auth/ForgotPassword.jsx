import React, { useState } from "react";
import Axios from "../../../services/axios";
import showNotification from "../../../utils/Toast/ShowNotification";

const ForgotPassword = ({ setForgetPasswordOpen }) => {
  const [email, setEmail] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("/sendlink", { email });
      if (response.status === 200) {
        setForgetPasswordOpen(false);
        showNotification("info", response.data.message);
      }
    } catch (error) {
      console.log(error);
      // if (error.response.status === 400) {
      //   console.log(error);
      //   showNotification("error", "Something went wrong");
      // }
    }
  };

  const closeHandler = () => {
    setForgetPasswordOpen(false);
  };

  return (
    <>
      <section className="fixed inset-0 items-center justify-center z-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-2xl shadow-xl shadow-stone-500 md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 relative">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Enter the registered email
              </h1>
              <div
                className="absolute -top-4 right-2 font-extrabold hover:cursor-pointer px-3 py-1 rounded-full bg-red-400 hover:bg-red-600 text-white"
                onClick={closeHandler}
              >
                X
              </div>
              <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
                <div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-800 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800"
                    placeholder="email"
                    required=""
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="text-white bg-blue-400 hover:bg-blue-600 p-3 rounded-xl"
                  >
                    Send Link
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
