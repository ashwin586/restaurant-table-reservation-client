import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import ProfileSideBar from "./ProfileSideBar";
import { userAxios } from "../../../services/AxiosInterceptors/userAxios";
import ReviewComponent from "./ReviewComponent";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import Footer from "../Footer";

const Bookings = () => {
  const [isReview, setIsReview] = useState(false);
  const [restaurantId, setRestaurantId] = useState("");
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        const response = await userAxios.get("/getBookings");
        if (response.status === 200) {
          setBookings(response.data);
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      const response = await userAxios.put("/bookingCancel", { id });
      if (response.status === 200) {
      }
    } catch (err) {
      console.log(err);
    }
  };

  function formatDate(date) {
    const originalBookedDate = new Date(date);
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    };

    const formattedBookedDate = originalBookedDate.toLocaleDateString(
      "en-US",
      options
    );
    return formattedBookedDate;
  }

  function formatTime(time) {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedTime = new Date(time).toLocaleTimeString("en-US", options);
    return formattedTime;
  }

  const bookedDateTime = (bookedDate, bookedTime) => {
    const date = new Date(bookedDate);
    const time = new Date(bookedTime);
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
      time.getSeconds()
    );
  };
  const currentTime = new Date();

  return (
    <>
      {/* <div className="flex flex-col min-h-[calc(85vh)]"> */}
      <div className="flex flex-col min-h-screen bg-homeBg">
        {isLoading ? (
          <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 flex justify-center items-center z-50">
            <CircularProgress />
          </div>
        ) : null}
        {isReview && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center">
            <ReviewComponent
              open={isReview}
              close={() => setIsReview(false)}
              id={restaurantId}
            />
          </div>
        )}
        <Navbar />
        <div className="flex justify-center mt-10 ">
          <div className="bg-white w-3/4 rounded-xl shadow-2xl">
            <div className="bg-yellow-300 p-4 text-white rounded-t-xl relative">
              <h1 className="text-4xl font-extrabold p-5">Your Bookings</h1>
            </div>
            <div className="container mx-auto mt-2 p-4">
              <div className="flex">
                <ProfileSideBar />
                <div className="container flex justify-center ">
                  <div className="w-3/4 ">
                    <div className="border-b border-dashed border-black h-1 my-2"></div>
                    {bookings &&
                      bookings?.map((booking, index) => (
                        <div
                          key={index}
                          className="border-b border-dashed border-black my-4"
                        >
                          <div className="flex flex-col lg:flex-row items-start lg:items-center">
                            <div className="mb-4 lg:mb-0 lg:mr-4">
                              <img
                                src={booking?.restaurantDetails.images[0]}
                                alt="restaurantImage"
                                className="h-20 w-20 md:h-30 md:w-30 lg:h-40 lg:w-40 cursor-pointer rounded-lg"
                              />
                            </div>
                            <div className="flex-1">
                              <h2 className="font-semibold text-xl mb-1 lg:mb-3">
                                {booking.restaurantDetails.name}
                              </h2>
                              <div className="mb-2">
                                <span className="text-lg">
                                  {booking?.restaurantDetails.address}
                                </span>
                                ,{" "}
                                <span className="text-lg">
                                  {booking?.restaurantDetails.city}
                                </span>
                              </div>
                              <div className="mb-2">
                                <span>{formatDate(booking?.bookedDate)}</span>{" "}
                                at{" "}
                                <span>{formatTime(booking?.bookedTime)}</span>{" "}
                                for{" "}
                                <span>{booking?.numberOfSeats} guests </span>
                              </div>
                            </div>
                            <div className="flex-2 text-center">
                              {booking.orderStatus === "Cancelled" && (
                                <h1 className="text-red-500 lg:text-lg text-sm mr-4 lg:mr-2 lg:font-bold">
                                  {booking?.orderStatus.toUpperCase()}
                                </h1>
                              )}
                              <span className="text-lg font-bold me-2">
                                Paid:
                              </span>
                              <span className="text-blue-500">
                                ₹ {booking?.grandTotal}
                              </span>
                              {currentTime <
                                bookedDateTime(
                                  booking?.bookedDate,
                                  booking?.bookedTime
                                ) &&
                                booking.orderStatus !== "Cancelled" && (
                                  <div className="mt-4 lg:mt-0">
                                    <button
                                      className="w-full lg:w-auto p-2 bg-red-500 text-slate-200 rounded-lg hover:bg-red-700 hover:text-white"
                                      onClick={() => {
                                        handleCancel(booking._id);
                                      }}
                                    >
                                      Cancel Booking
                                    </button>
                                  </div>
                                )}
                              {currentTime >
                                bookedDateTime(
                                  booking?.bookedDate,
                                  booking?.bookedTime
                                ) &&
                                booking.orderStatus !== "Cancelled" && (
                                  <div
                                    className="mt-4 lg:mt-0 cursor-pointer"
                                    onClick={() => {
                                      setIsReview(true);
                                      setRestaurantId(booking?.restaurant);
                                    }}
                                  >
                                    <p className="flex items-center">
                                      <span className=" text-yellow-500">
                                        Write a review
                                      </span>{" "}
                                      <EditIcon fontSize="inherit" />
                                    </p>
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="absolute bottom-0 w-full">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Bookings;
