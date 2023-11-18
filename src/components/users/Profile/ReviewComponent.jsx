import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Textarea } from "@chakra-ui/react";
import ReactStars from "react-stars";
import { userAxios } from "../../../services/AxiosInterceptors/userAxios";

const ReviewComponent = ({ open, close, id }) => {
  const [review, setReview] = useState(null);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      rating: review?.rating || 0,
      experience: review?.review || "",
    },
    validationSchema: Yup.object().shape({
      rating: Yup.number().required("Please give a rating"),
      experience: Yup.string()
        .min(5, "Minimum 5 character required")
        .required("Review cannot be blank"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await userAxios.post("/userReview", { values, id });
        if (response.status === 200) {
          close();
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await userAxios.get("/fetchReview", {
          params: { id },
        });
        if (response.status === 200) {
          setReview(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchReview();
  }, []);

  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-1/4 h-2/5 relative">
            <div className="relative">
              <div>
                <h1 className="text-2xl">Write a Review</h1>
              </div>
              <div
                className="absolute top-0 right-5 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer"
                onClick={close}
              >
                <div className="absolute w-5 h-1 bg-gray-500 transform rotate-45"></div>
                <div className="absolute w-5 h-1 bg-gray-500 transform -rotate-45"></div>
              </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col items-center mt-10">
                <div className="mb-4">
                  <ReactStars
                    value={formik.values.rating}
                    edit={true}
                    size={50}
                    onChange={(nextValue) =>
                      formik.setFieldValue("rating", nextValue)
                    }
                    color1="gray"
                    color2={"#ffd700"}
                  />
                  {formik.touched.rating && formik.errors.rating && (
                    <p className="error text-red-600 ">
                      {formik.errors.rating}
                    </p>
                  )}
                </div>
                <div className="mt-4 w-full">
                  <Textarea
                    name="experience"
                    value={formik.values.experience}
                    onChange={formik.handleChange}
                    placeholder="Tell us about the experience"
                  />
                  {formik.touched.experience && formik.errors.experience && (
                    <p className="error text-red-600 ">
                      {formik.errors.experience}
                    </p>
                  )}
                </div>
              </div>
              <div className="absolute right-4 mt-2">
                <button
                  className="mx-2 bg-blue-600 py-1 px-2 rounded-lg text-white"
                  type="submit"
                >
                  Submit
                </button>
                {/* <button
                  className="mx-2 bg-gray-300 py-1 px-2 rounded-lg text-gray-500"
                  type="button"
                >
                  Cancel
                </button> */}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewComponent;
