import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import ProfileSideBar from "./ProfileSideBar";
import { userAxios } from "../../../services/AxiosInterceptors/userAxios";
import ReviewComponent from "./ReviewComponent";
import { EditIcon } from "@chakra-ui/icons";

const Bookings = () => {
  const [isReview, setIsReview] = useState(false);
  const [restaurantId, setRestaurantId] = useState("");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await userAxios.get("/getBookings");
        if (response.status === 200) {
          setBookings(response.data);
        }
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
      <div className="flex justify-center mt-10">
        <div className="w-3/4 rounded-xl shadow-2xl">
          <div className="container mx-auto mt-8 p-4">
            <div className="flex">
              <ProfileSideBar />
              <div className="container flex justify-center ">
                <div className="w-3/4 ">
                  <div className="border-b border-dashed border-black h-1 my-2"></div>
                  {bookings &&
                    bookings?.map((booking, index) => (
                      <div key={index}>
                        <div className="flex">
                          <div>
                            <img
                              src={booking?.restaurantDetails.images[0]}
                              alt="restaurantImage"
                              className="h-40 w-40 cursor-pointer rounded-lg"
                            />
                          </div>
                          <div className="flex-1 ms-4 ">
                            <h2 className="font-semibold text-xl my-3">
                              {booking.restaurantDetails.name}
                            </h2>
                            <h2>
                              <span className="text-lg">
                                {booking?.restaurantDetails.address}
                              </span>
                              ,{" "}
                              <span className="text-lg">
                                {booking?.restaurantDetails.city}
                              </span>
                            </h2>
                            <h2>
                              <span>{formatDate(booking?.bookedDate)}</span> at{" "}
                              <span>{formatTime(booking?.bookedTime)}</span> for{" "}
                              <span>{booking?.numberOfSeats} guests </span>
                            </h2>
                          </div>
                          <div className="flex-2 me-2 text-center">
                            {booking.orderStatus === "Cancelled" && (
                              <h1 className="text-red-500 text-sm">
                                {booking?.orderStatus.toUpperCase()}
                              </h1>
                            )}

                            <h1 className="text-lg font-bold">Paid:</h1>
                            <h1>₹ {booking?.grandTotal}</h1>
                            {currentTime <
                              bookedDateTime(
                                booking?.bookedDate,
                                booking?.bookedTime
                              ) &&
                              booking.orderStatus !== "Cancelled" && (
                                <div>
                                  <button
                                    className="w-auto p-2 bg-red-500 text-slate-200 rounded-lg hover:bg-red-700 hover:text-white"
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
                                  className="cursor-pointer"
                                  onClick={() => {
                                    setIsReview(true);
                                    setRestaurantId(booking?.restaurant);
                                  }}
                                >
                                  <p className="text-slate-500">
                                    Write a review <EditIcon boxSize={4} />
                                  </p>
                                </div>
                              )}
                          </div>
                        </div>
                        <div className="border-b border-dashed border-black h-1 my-2"></div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookings;
