import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { adminAxios } from "../../../services/AxiosInterceptors/adminAxios";

const AddCusine = ({ isClicked, closeModal, updateCuisines }) => {
  const formikValues = useFormik({
    initialValues: {
      cuisine: "",
    },
    validationSchema: Yup.object({
      cuisine: Yup.string()
        .min(3, "Minimum length must be 3 character")
        .matches(/^\S.*$/, "Cannot start with whitespace")
        .required("The field cannot be empty")
        .test("is-uppercase", "First letter must be uppercase", (value) => {
          if (!value) return true;
          const firstLetter = value[0];
          return firstLetter === firstLetter.toUpperCase();
        }),
    }),
    onSubmit: async (values) => {
      try {
        const response = await adminAxios.post("/admin/addcusines", { values });
        if (response.status === 200) {
          closeModal();
          updateCuisines(response.data.result);
        }
      } catch (err) {
        if (err.response && err.response.status === 400) {
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
          });
        }
      }
    },
  });

  return (
    isClicked && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">Add Cuisine</h2>
          <form onSubmit={formikValues.handleSubmit}>
            <input
              type="text"
              placeholder="Enter the cuisine name"
              name="cuisine"
              value={formikValues.values.cuisine}
              onChange={formikValues.handleChange}
              className="w-full border border-gray-300 rounded p-2 mb-2"
            />
            {formikValues.touched.cuisine && formikValues.errors.cuisine && (
              <p className="error text-red-600 ">
                {formikValues.errors.cuisine}
              </p>
            )}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded-md mr-2"
              >
                Save
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddCusine;
