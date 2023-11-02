import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { adminAxios } from "../../../services/AxiosInterceptors/adminAxios";

const AddCategory = ({ closeModal, isClicked, updatedCategory }) => {
  const formik = useFormik({
    initialValues: {
      category: "",
    },
    validationSchema: Yup.object({
      category: Yup.string()
        .min(3, "Minimum length must be 3 character")
        .required("The field cannot be empty")
        .test("is-uppercase", "First letter must be uppercase", (value) => {
          if (!value) return true;
          const firstLetter = value[0];
          return firstLetter === firstLetter.toUpperCase();
        }),
    }),
    onSubmit: async (values) => {
      try {
        const response = await adminAxios.post("/admin/addCategory", {
          values,
        });
        if (response.status === 200) {
          closeModal();
          updatedCategory(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <>
      {isClicked && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Category</h2>
            <form onSubmit={formik.handleSubmit}>
              <input
                type="text"
                placeholder="Enter the category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                className="w-full border border-gray-300 rounded p-2 mb-2"
              />
              {formik.touched.category && formik.errors.category && (
                <p className="error text-red-600 ">{formik.errors.category}</p>
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
      )}
    </>
  );
};

export default AddCategory;
