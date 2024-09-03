// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";
import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TimePicker from "react-time-picker";
import { partnerAxios } from "../../../services/AxiosInterceptors/partnerAxios";
import "mapbox-gl/dist/mapbox-gl.css";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

function AddRestaurantModal({ isOpen, closeModal }) {
  const navigate = useNavigate()
  const [cuisines, setCuisines] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const mapContainerRef = useRef(null);
  const map = useRef(null);
  const markerRef = useRef(new mapboxgl.Marker());
  const [isLoading, setIsLoading] = useState(false);
  // const [image, setImage] = useState(null);
  // const [imageURL, setImageURL] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      selectedCuisines: [],
      openTime: "10:00",
      closeTime: "5:00",
      seats: "",
      address: "",
      city: "",
      pinCode: "",
      latitude: userLocation ? userLocation.latitude : 0,
      longitude: userLocation ? userLocation.longitude : 0,
      // imageUrl: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Minimum length must be 3 character")
        .required("The field cannot be empty")
        .matches(/^\S.*$/, "Cannot start with whitespace")
        .test("is-uppercase", "First letter must be uppercase", (value) => {
          if (!value) return true;
          const firstLetter = value[0];
          return firstLetter === firstLetter.toUpperCase();
        }),
      selectedCuisines: Yup.array()
        .min(1, "At least one cuisine must be selected")
        .required("At least one cuisine must be selected"),
      seats: Yup.number()
        .typeError("Please enter numbers")
        .positive("Seats must be a positive number")
        .required("Number of seat on restaurant"),
      address: Yup.string()
        .min(10, "Minimum 10 character address")
        .matches(/^\S.*$/, "Cannot start with whitespace")
        .required("The field cannot be empty"),
      city: Yup.string()
        .min(2, "Minimum length must be 2 character")
        .matches(/^\S.*$/, "Cannot start with whitespace")
        .required("Please enter the city"),
      pinCode: Yup.number()
        .min(6, "Invalid Pincode")
        .typeError("Please enter a valid pincode")
        .positive("Incorrect pincode")
        .required("Please provide pincode"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await partnerAxios.post(
          "/partner/addRestaurant",
          values
        );
        if (response.status === 200) {
          navigate(0);
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const response = await partnerAxios.get("/partner/getAllCuisines");
        if (response.status === 200) {
          setCuisines(response.data.result);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchCuisines();
  }, []);

  // For Map Box
  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOXTOKEN;

    let isMounted = true;

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation({ latitude, longitude });

      formik.setValues({
        ...formik.values,
        latitude,
        longitude,
      });

      if (mapContainerRef.current && isMounted) {
        map.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [longitude, latitude],
          zoom: 8,
        });

        map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

        map.current.on("load", () => {
          if (isMounted) {
            map.current.resize();
            markerRef.current
              .setLngLat([longitude, latitude])
              .addTo(map.current);
          }
        });

        map.current.on("click", (e) => {
          if (isMounted) {
            const { lng, lat } = e.lngLat;
            formik.setValues((prevValues) => ({
              ...prevValues,
              latitude: lat,
              longitude: lng,
            }));
            markerRef.current.setLngLat([lng, lat]);
          }
        });
      }
    });

    return () => {
      isMounted = false; // Update the flag to indicate component unmount

      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // const handleImageChange = (e) => {
  //   const selectedImages = e.target.files[0];
  //   setImage(selectedImages);
  // };

  return (
    <>
      isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg h-5/6 w-2/4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Add New Restaurant</h2>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="w-full border border-gray-300 rounded p-2 mb-2"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="error text-red-600 ">{formik.errors.name}</p>
            )}
            <h2 className="font-semibold">Select the cuisines</h2>
            <div className="flex my-3">
              {cuisines.map((cuisine) => (
                <label key={cuisine._id}>
                  <input
                    className="ms-5"
                    type="checkbox"
                    value={cuisine._id}
                    name="selectedCuisines"
                    onChange={(event) => {
                      const { value, checked } = event.target;
                      if (checked) {
                        formik.setFieldValue("selectedCuisines", [
                          ...formik.values.selectedCuisines,
                          value,
                        ]);
                      } else {
                        formik.setFieldValue(
                          "selectedCuisines",
                          formik.values.selectedCuisines.filter(
                            (id) => id !== value
                          )
                        );
                      }
                    }}
                    checked={formik.values.selectedCuisines.includes(
                      cuisine._id
                    )}
                  />
                  {cuisine.cuisine}
                </label>
              ))}
            </div>
            {formik.touched.selectedCuisines &&
              formik.errors.selectedCuisines && (
                <p className="error text-red-600 ">
                  {formik.errors.selectedCuisines}
                </p>
              )}
            <h1 className="font-bold pb-2">Select open and close time</h1>
            <div className="flex">
              <TimePicker
                name="openTime"
                className="w-full border border-gray-300 rounded p-2 mb-2 me-2"
                onChange={(time) => formik.setFieldValue("openTime", time)}
                value={formik.values.openTime}
              />
              {formik.touched.openTime && formik.errors.openTime && (
                <p className="error text-red-600 ">{formik.errors.openTime}</p>
              )}
              <TimePicker
                name="closeTime"
                className="w-full border border-gray-300 rounded p-2 mb-2 ms-2"
                onChange={(time) => formik.setFieldValue("closeTime", time)}
                value={formik.values.closeTime}
              />
              {formik.touched.closeTime && formik.errors.closeTime && (
                <p className="error text-red-600 ">{formik.errors.closeTime}</p>
              )}
            </div>
            <h1 className="font-bold pb-2">Restaurant Seats </h1>
            <input
              placeholder="No of Seats"
              type="text"
              name="seats"
              className="w-full border border-gray-300 rounded p-2 mb-2"
              value={formik.values.seats}
              onChange={formik.handleChange}
            />
            {formik.touched.seats && formik.errors.seats && (
              <p className="error text-red-600 ">{formik.errors.seats}</p>
            )}
            <h1 className="font-bold pb-2">Address</h1>
            <input
              placeholder="Street Address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              className="w-full border border-gray-300 rounded p-2 mb-2 h-16 max-h-40 overflow-y-auto"
            />
            {formik.touched.address && formik.errors.address && (
              <p className="error text-red-600 ">{formik.errors.address}</p>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h1 className="font-bold">City</h1>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
                {formik.touched.city && formik.errors.city && (
                  <p className="error text-red-600 ">{formik.errors.city}</p>
                )}
              </div>
              <div className="space-y-2">
                <h1 className="font-bold">Pincode</h1>
                <input
                  type="text"
                  id="pinCode"
                  name="pinCode"
                  value={formik.values.pinCode}
                  onChange={formik.handleChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
                {formik.touched.pinCode && formik.errors.pinCode && (
                  <p className="error text-red-600 ">{formik.errors.pinCode}</p>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <div
                className="map-container mt-4 h-56 w-11/12 mx-auto"
                ref={mapContainerRef}
              />
            </div>

            {/* <div className="flex">
              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 mb-2"
              />
            </div> */}
            {/* {formik.touched.image && formik.errors.image && (
              <p className="error text-red-600 ">{formik.errors.image}</p>
            )} */}
            {/* {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="SelectedImage"
                className="max-h-40 mb-2"
              />
            )} */}

            <div className="flex justify-end mt-4">
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
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 flex justify-center items-center z-50">
          <CircularProgress />
        </div>
      )}
    </>
  );
}

export default AddRestaurantModal;
