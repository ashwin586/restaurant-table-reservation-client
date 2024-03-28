import React, { useEffect, useState } from "react";
import { userAxios } from "../../../services/AxiosInterceptors/userAxios";
import NavBar from "../Navbar";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "../../../services/axios";
import { useSelector } from "react-redux";
import { add, format, isBefore, isAfter, parse, isToday } from "date-fns";
import ReactCalender from "react-calendar";
import { razorPay } from "../../../utils/razorPayConfig";
import ReactStars from "react-stars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faClock, faLocationDot, faUtensils} from "@fortawesome/free-solid-svg-icons"

import "./Calender.css";
import Location from "./Location";
import Menus from "./Menus";
import Cart from "./Cart";
import Reviews from "./Reviews";
import Footer from "../Footer";

const RestaurantDetails = () => {
  const [endLat, setEndLat] = useState(null);
  const [endLong, setEndLong] = useState(null);
  const [section, setSection] = useState("menus");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.isLogged);
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState("");
  const [menus, setMenus] = useState([]);
  const [review, setReviews] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState(2);
  const [date, setDate] = useState({
    justDate: null,
    dateTime: null,
  });
  const [dateTimeError, setDateTimeError] = useState(false);
  const [cart, setCart] = useState([]);

  const addToCart = (id, menu, newQuantity, total) => {
    const existingItemIndex = cart.findIndex((item) => item.menu === menu);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity = Math.max(1, newQuantity);
      updatedCart[existingItemIndex].total = Math.max(1, newQuantity) * total;
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [
        ...prevCart,
        {
          id: id,
          menu: menu,
          quantity: Math.max(1, newQuantity),
          total: Math.max(1, newQuantity) * total,
        },
      ]);
    }
  };

  const openTime = new Date(restaurant?.openTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const closeTime = new Date(restaurant?.closeTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // Avaiable time slots
  const timeSlots = () => {
    const { justDate } = date;
    const open = new Date(restaurant?.openTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const close = new Date(restaurant?.closeTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }); 
    const currentHour = new Date().getHours();
    const openingTime = parse(open, "HH:mm", new Date());
    const closingTime = parse(close, "HH:mm", new Date()); 
    const extractedOpenHour = openingTime.getHours();
    const extractedCloseHour = closingTime.getHours();
    let beginning;
    if (isToday(justDate) && isAfter(currentHour, extractedOpenHour)) {
      beginning = add(justDate, { hours: currentHour + 1 });
    } else {
      beginning = add(justDate, { hours: extractedOpenHour });
    }

    const end = add(justDate, { hours: extractedCloseHour });
    const interval = { hours: 1 };
    const times = [];

    for (let i = beginning; isBefore(i, end); i = add(i, interval)) {
      times.push(i);
    }

    return times;
  };
  const times = timeSlots();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await Axios.get("/getRestaurantDetails", {
          params: {
            id: restaurantId,
          },
        });
        if (response.status === 200) {
          setRestaurant(response.data?.restaurant);
          setMenus(response.data?.menus);
          setReviews(response.data?.reviews);
          setEndLat(response.data?.restaurant.latitude);
          setEndLong(response.data?.restaurant.longitude);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchRestaurant();
  }, [restaurantId]);

  const handlebooking = async () => {
    if (!date.justDate || !date.dateTime) {
      setDateTimeError(true);
      return;
    }
    const amount = cart.reduce((total, item) => total + item.total, 0);
    if (user) {
      try {
        await userAxios.get("/checkuser");
        const checkingSeatAvailablity = await userAxios.get(
          "/seatAvailablity",
          {
            params: {
              restaurantId: restaurantId,
              selectedSeats: selectedSeats,
              bookingDate: date.justDate,
              bookingTime: date.dateTime,
            },
          }
        );
        if (checkingSeatAvailablity.status === 200) {
          try {
            await razorPay(amount);
            const response = await userAxios.post("/bookingTable", {
              cart: cart,
              date: date,
              restaurantId: restaurantId,
              selectedSeats: selectedSeats,
            });
            if (response.status === 200) {
              setDateTimeError(false);
              navigate("/");
            }
          } catch (err) {
            console.log(err);
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
    } else {
      return navigate("/login");
    }
  };

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) {
      return 0;
    }
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    return Math.round(averageRating * 2) / 2;
  };

  return (
    <>
      <div className="bg-homeBg h-fit flex flex-col min-h-[calc(83vh)]">
        <NavBar />
        <div className="flex justify-center mt-4">
          <div className="bg-white w-3/5 h-screen grid grid-cols-10">
            <div className="col-span-7 overflow-auto">
              <div
                id="controls-carousel"
                className="relative w-full"
                data-carousel="static"
              >
                <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                  {restaurant?.images &&
                    restaurant.images.map((image, index) => (
                      <div
                        key={`image-${index}`}
                        className="duration-700 ease-in-out"
                        data-carousel-item
                      >
                        <img
                          src={image}
                          className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                          alt="..."
                        />
                      </div>
                    ))}
                </div>
                <button
                  type="button"
                  className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                  data-carousel-prev
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg
                      className="w-4 h-4 text-white dark:text-gray-800"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 1 1 5l4 4"
                      />
                    </svg>
                    <span className="sr-only">Previous</span>
                  </span>
                </button>
                <button
                  type="button"
                  className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                  data-carousel-next
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg
                      className="w-4 h-4 text-white dark:text-gray-800"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span className="sr-only">Next</span>
                  </span>
                </button>
              </div>
              <div className="p-4">
                <div>
                  <h1 className="text-2xl font-semibold ">
                    {restaurant?.name}
                  </h1> 
                </div>
                <div>
                  <span className="pe-2"><FontAwesomeIcon icon={faUtensils}/></span> 
                  {restaurant?.cuisine &&
                    restaurant?.cuisine.map((cuisine, index) => (
                      <span key={index}>{cuisine.cuisine}, </span>
                    ))}
                </div>
                <div>
                  <p> 
                    <span className="pe-2"><FontAwesomeIcon icon={faLocationDot}/></span> 
                    <span>{restaurant?.address}</span>,
                    <span>{restaurant?.city}</span>,
                    <span>{restaurant?.pinCode}</span>
                  </p>
                  <p>
                    <span className="pe-2">
                      <FontAwesomeIcon icon={faClock} />
                    </span>
                    Opens From : <span>{openTime}</span> -{" "} 
                    <span>{closeTime}</span>
                  </p>
                </div>
              </div>
              <div className="flex ms-4 items-center">
                <ReactStars
                  value={review ? calculateAverageRating(review) : 0}
                  edit={false}
                  size={30}
                  color1="gray"
                  color2={"#ffd700"}
                />
                <p className="ms-2 text-gray-500">({review?.length} Review)</p>
              </div>
              {endLat !== null && endLong !== null && (
                <Location endLat={endLat} endLong={endLong} />
              )}
              <div>
                <button
                  className={`w-auto h-10 mx-5 px-8 py-2 my-2 rounded-3xl ${
                    section === "menus" ? "bg-yellow-500" : "bg-slate-200"
                  }  shadow-lg hover:bg-yellow-500 hover:text-white`}
                  onClick={() => setSection("menus")}
                >
                  Menus
                </button>
                <button
                  className={`w-auto h-10 mx-5  px-8 py-2 my-2 rounded-3xl ${
                    section === "reviews" ? "bg-yellow-500" : "bg-slate-200"
                  } shadow-lg hover:bg-yellow-500 hover:text-white`}
                  onClick={() => setSection("reviews")}
                >
                  Reviews
                </button>
              </div>
              {section === "menus" ? (
                <Menus menus={menus} addToCart={addToCart} cart={cart} />
              ) : (
                <Reviews reviews={review} />
              )}
            </div>
            <div className=" col-span-3 ">
              <div className="">
                <div className="h-fit flex justify-center mt-3">
                  <ReactCalender
                    className="REACT-CALENDER p-2"
                    minDate={new Date()}
                    view="month"
                    onClickDay={(date) => {
                      setDate((prev) => ({
                        ...prev,
                        justDate: new Date(date),
                      }));
                      setDateTimeError(false);
                    }}
                  />
                </div>
                <div>
                  <select
                    name="seat"
                    id=""
                    className="w-11/12 h-10 mx-4 my-2 bg-white rounded-xl cursor-pointer border border-gray-500"
                    onClick={(e) => setSelectedSeats(e.target.value)}
                  >
                    <option value="1">1 Guests</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                    <option value="6">6 Guests</option>
                    <option value="7">7 Guests</option>
                    <option value="8">8 Guests</option>
                    <option value="9">9 Guests</option>
                    <option value="10">10 Guests</option>
                  </select>
                </div>
              </div>
              <div className="my-4 ms-2 flex overflow-x-auto">
                {times?.map((time, index) => (
                  <div
                    onClick={() =>
                      setDate((prev) => ({ ...prev, dateTime: time }))
                    }
                    className={`${
                      date &&
                      date.dateTime &&
                      date.dateTime.getTime() === time.getTime()
                        ? "bg-green-500 text-white"
                        : "border border-green-500 text-green-500"
                    } border border-green-500 text-green-500 w-28 h-10 mx-2 flex-shrink-0 whitespace-no-wrap text-center cursor-pointer font-semibold`}
                    key={`time-${index}`}
                  >
                    {format(time, "hh:mm a")}
                  </div>
                ))}
              </div>
              {dateTimeError && (
                <p className="text-red-500 mt-2 ms-4 text-sm">
                  Please select both date and time before booking.
                </p>
              )}
              <div>
                <hr className="border-t border-gray-800 my-4 mx-2" />
              </div>
              <Cart cart={cart} handlebooking={handlebooking} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default RestaurantDetails;
