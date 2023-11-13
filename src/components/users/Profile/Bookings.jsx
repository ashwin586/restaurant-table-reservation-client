import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import ProfileSideBar from "./ProfileSideBar";
import { userAxios } from "../../../services/AxiosInterceptors/userAxios";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  // Output: "Sun, 12 Nov"

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await userAxios.get("/getBookings");
        if (response.status === 200) {
          console.log(response.data);
          setBookings(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchBookings();
  }, []);

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

  return (
    <>
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
                        <div className="flex" >
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
                              <span>{formatDate(booking?.bookedDate)}</span>{" "}
                              <span>{formatTime(booking?.bookedTime)}</span> for{" "}
                              <span>{booking?.numberOfSeats} guests </span>
                            </h2>
                          </div>
                          <div className="flex-2 me-2 text-center">
                            <h1 className="text-lg font-bold">Paid:</h1>
                            <h1>₹ {booking?.grandTotal}</h1>
                          </div>
                        </div>
                        <div className="border-b border-dashed border-black h-1 my-2" ></div>
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
