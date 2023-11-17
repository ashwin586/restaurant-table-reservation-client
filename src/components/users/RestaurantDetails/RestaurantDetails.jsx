import React, { useEffect, useState } from "react";
import { userAxios } from "../../../services/AxiosInterceptors/userAxios";
import NavBar from "../Navbar";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "../../../services/axios";
import { useSelector } from "react-redux";
import { add, format, isBefore, isSameDay, parse, isToday } from "date-fns";
import ReactCalender from "react-calendar";
import { razorPay } from "../../../utils/razorPayConfig";
import "./Calender.css";

const RestaurantDetails = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.isLogged);
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState("");
  const [menus, setMenus] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState(2);
  const [date, setDate] = useState({
    justDate: null,
    dateTime: null,
  });
  const [cart, setCart] = useState([]);

  const initialQuantities = Array(menus.length).fill(1);
  const [quantities, setQuantities] = useState(initialQuantities);
  const updateQuantity = (index, newQuantity) => {
    setQuantities((prev) => {
      const newQuantities = [...prev];
      newQuantities[index] = newQuantity;
      return newQuantities;
    });
  };

  const addToCart = (id, menu, quantity, total) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.menu === menu
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity = quantity;
        updatedCart[existingItemIndex].total = total;
        return updatedCart;
      }

      return [
        ...prevCart,
        {
          id: id,
          menu: menu,
          quantity: quantity,
          total: total,
        },
      ];
    });
  };

  const openTime = new Date(restaurant?.openTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const closeTime = new Date(restaurant?.closeTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const timeSlots = () => {
    const { justDate } = date;
    const currentHour = new Date().getHours();
    const openHour = parse(openTime, "h:mm aa", new Date());
    const extractedOpenHour = openHour.getHours();
    const CloseHour = parse(closeTime, "h:mm aa", new Date());
    const extractedCloseHour = CloseHour.getHours();

    let beginning;
    if (isSameDay(justDate, add(new Date(), { days: 1 }))) {
      beginning = add(justDate, { hours: extractedOpenHour });
    } else {
      beginning = isBefore(currentHour, extractedOpenHour)
        ? add(justDate, { hours: extractedOpenHour })
        : add(justDate, { hours: currentHour });
    }
    // if (isToday(justDate)) {
    //   // The date is today or in the future
    //   beginning = add(justDate, { hours: extractedOpenHour });
    // } else {
    //   // The date is in the past
    //   beginning = isBefore(currentHour, extractedOpenHour)
    //     ? add(justDate, { hours: extractedOpenHour })
    //     : add(justDate, { hours: currentHour });
    // }

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
          setRestaurant(response.data.restaurant);
          setMenus(response.data.menus);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchRestaurant();
  }, []);

  const handlebooking = async () => {
    const amount = cart.reduce((total, item) => total + item.total, 0);
    if (user) {
      await razorPay(amount);
      const response = await userAxios.post("/bookingTable", {
        cart: cart,
        date: date,
        restaurantId: restaurantId,
        selectedSeats: selectedSeats,
      });
      if (response.status === 200) {
        navigate("/");
      }
    } else {
      return navigate("/login");
    }
  };

  return (
    <>
      <div className="bg-adminDashboard h-fit">
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
                  {restaurant?.cuisine &&
                    restaurant?.cuisine.map((cuisine, index) => (
                      <span key={index}>{cuisine.cuisine} </span>
                    ))}
                </div>
                <div>
                  <p>
                    <span>{restaurant?.address}</span>,
                    <span>{restaurant?.city}</span>,
                    <span>{restaurant?.pinCode}</span>
                  </p>
                  <p>
                    Opens From : <span>{openTime}</span> -{" "}
                    <span>{closeTime}</span>
                  </p>
                </div>
              </div>

              <div className="p-3">
                <h1 className="text-2xl font-semibold ">Menus</h1>
                <div>
                  <div className="relative">
                    {menus &&
                      menus.map((menu, index) => (
                        <div
                          className="my-6 p-4 ms-20 bg-slate-100 shadow-lg rounded-lg w-4/5 h-40 flex transform transition-transform hover:scale-105 font-serif"
                          key={menu?._id}
                        >
                          <div className="flex">
                            <div>
                              <img
                                src={menu?.imageURL}
                                alt="FoodImage"
                                className="h-32 w-32 cursor-pointer"
                              />
                            </div>
                            <div className="flex-1 ms-4 cursor-pointer">
                              <h3>
                                <span className="text-lg font-bold">
                                  Food Name:{" "}
                                </span>
                                {menu?.name}
                              </h3>
                              <h3>
                                <span className="text-lg font-bold">
                                  Food Type:{" "}
                                </span>
                                {menu?.foodCategory.category}
                              </h3>
                              <h3>
                                <span className="text-lg font-bold">
                                  Food Price:{" "}
                                </span>
                                ₹ {menu?.price}
                              </h3>
                            </div>
                          </div>
                          <div className="absolute bottom-3 right-2">
                            <div className="flex items-center space-x-2 justify-center mb-2">
                              <button
                                className="bg-slate-400 text-white px-2 py-1  focus:outline-none"
                                onClick={() =>
                                  updateQuantity(
                                    index,
                                    Math.max(1, quantities[index] - 1)
                                  )
                                }
                              >
                                -
                              </button>
                              <span className="text-lg">
                                {isNaN(quantities[index])
                                  ? 1
                                  : quantities[index]}
                              </span>
                              <button
                                className="bg-slate-400 text-white px-2 py-1  focus:outline-none"
                                onClick={() =>
                                  updateQuantity(
                                    index,
                                    (quantities[index] || 0) + 1
                                  )
                                }
                              >
                                +
                              </button>
                            </div>
                            <button
                              className="bg-button text-gray-800 px-4 py-2 rounded-md flex items-center"
                              type="button"
                              onClick={() => {
                                addToCart(
                                  menu?._id,
                                  menu?.name,
                                  quantities[index],
                                  quantities[index] * menu?.price
                                );
                              }}
                            >
                              <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                              </svg>
                              Add Item
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className=" col-span-3 ">
              <div className="">
                <div className="h-fit flex justify-center mt-3">
                  <ReactCalender
                    className="REACT-CALENDER p-2"
                    minDate={new Date()}
                    view="month"
                    onClickDay={(date) =>
                      setDate((prev) => ({ ...prev, justDate: new Date(date) }))
                    }
                  />
                </div>
                <div>
                  <select
                    name=""
                    id=""
                    className="w-11/12 h-10 mx-4 my-2 bg-white rounded-xl cursor-pointer border border-gray-500"
                    onClick={(e) => setSelectedSeats(e.target.value)}
                  >
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
                    className="border border-green-500 text-green-500 w-28 h-10 mx-2 flex-shrink-0 whitespace-no-wrap text-center cursor-pointer font-semibold"
                    key={`time-${index}`}
                  >
                    {format(time, "hh:mm a")}
                  </div>
                ))}
              </div>
              <div>
                <hr className="border-t border-gray-800 my-4 mx-2" />
              </div>
              <div>
                {cart.length > 0 && (
                  <div>
                    <h1 className="font-bold text-lg text-center">
                      Items Added
                    </h1>
                    <div className="flex justify-center">
                      <table className="w-11/12">
                        <thead>
                          <tr>
                            <th className="border border-gray-500 px-4 py-2">
                              Menu
                            </th>
                            <th className="border border-gray-500 px-4 py-2">
                              Quantity
                            </th>
                            <th className="border border-gray-500 px-4 py-2">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart.map((item, index) => (
                            <tr key={index} className="border border-gray-500">
                              <td className="border border-gray-500 px-4 py-2">
                                {item.menu}
                              </td>
                              <td className="border border-gray-500 px-4 py-2">
                                {item.quantity}
                              </td>
                              <td className="border border-gray-500 px-4 py-2">
                                ₹ {item.total}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td
                              className="border border-gray-500 px-4 py-2 font-bold"
                              colSpan="2"
                            >
                              Grand Total
                            </td>
                            <td className="border border-gray-500 px-4 py-2">
                              ₹{" "}
                              {cart.reduce((acc, item) => acc + item.total, 0)}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                )}
                {cart.length > 0 && (
                  <div className="w-full flex justify-center mt-4">
                    <button
                      className="bg-button text-gray-800 px-4 py-2 rounded-md flex items-center"
                      type="submit"
                      onClick={handlebooking}
                    >
                      {" "}
                      Book a table
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantDetails;
