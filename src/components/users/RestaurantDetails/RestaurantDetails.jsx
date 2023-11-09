import React, { useEffect, useState } from "react";
import NavBar from "../Navbar";
import { useParams } from "react-router-dom";
import Axios from "../../../services/axios";

const RestaurantDetails = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState("");
  const [minDate, setMinDate] = useState("");
  const [menus, setMenus] = useState([]);

  const openTime = new Date(restaurant?.openTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const closeTime = new Date(restaurant?.closeTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
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
                        key={index}
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
                    restaurant?.cuisine.map((cuisine) => (
                      <span>{cuisine.cuisine} </span>
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
                  <div>
                    {menus &&
                      menus.map((menu) => (
                        <div
                          className="my-6 p-4 ms-20 bg-slate-100 shadow-lg rounded-lg w-4/5 h-40 flex transform transition-transform hover:scale-105 font-serif"
                          key={menu?._id}
                        >
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
                            {/* <h3>
                              <span className="text-lg font-bold">
                                Food Quantity:{" "}
                              </span>
                              {menu?.quantity}
                            </h3> */}
                            <h3>
                              <span className="text-lg font-bold">
                                Food Price:{" "}
                              </span>
                              ₹ {menu?.price}
                            </h3>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className=" col-span-3">
              <div className="flex justify-evenly mt-4">
                <div>
                  <input
                    type="date"
                    name="date"
                    className="w-40 h-12 bg-white rounded-xl border border-gray-700"
                    placeholder="DD/MM/YYYY"
                    min={minDate}
                  />
                </div>
                <div>
                  <select
                    name=""
                    id=""
                    className="w-40 h-12 bg-white rounded-xl cursor-pointer border border-gray-700"
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantDetails;
