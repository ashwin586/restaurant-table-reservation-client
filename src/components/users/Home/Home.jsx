import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Axios from "../../../services/axios";
import ReactStars from "react-stars";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Footer from "../Footer";

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setIsLoading(true);
        const response = await Axios.get("/getAllRestaurants");
        if (response.status === 200) {
          setRestaurants(response.data);
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRestaurants();
  }, []);

  const filteredRestaurant = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="flex flex-col min-h-screen">
        {isLoading ? (
          <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 flex justify-center items-center z-50">
            <CircularProgress />
          </div>
        ) : null}
        <Navbar />
        <div className="bg-homeBg min-h-screen">
          <div className="sm:hidden">
            <img
              className="w-full"
              style={{ height: "150px" }}
              src="/assets/falafel-hummus-pita-middle-eastern-arabic-dishes-halal-food-top-view-banner.jpg"
              alt="bannerImage"
            />
          </div>
          <div className="hidden sm:block md:hidden">
            <img
              className="w-full"
              style={{ height: "200px" }}
              src="/assets/falafel-hummus-pita-middle-eastern-arabic-dishes-halal-food-top-view-banner.jpg"
              alt="bannerImage"
            />
          </div>
          <div className="hidden md:block lg:hidden">
            <img
              className="w-full"
              style={{ height: "300px" }}
              src="/assets/falafel-hummus-pita-middle-eastern-arabic-dishes-halal-food-top-view-banner.jpg"
              alt="bannerImage"
            />
          </div>
          <div className="hidden lg:block xl:hidden">
            <img
              className="w-full"
              style={{ height: "450px" }}
              src="/assets/falafel-hummus-pita-middle-eastern-arabic-dishes-halal-food-top-view-banner.jpg"
              alt="bannerImage"
            />
          </div>
          <div className="hidden xl:block 2xl:hidden">
            <img
              className="w-full"
              style={{ height: "550px" }}
              src="/assets/falafel-hummus-pita-middle-eastern-arabic-dishes-halal-food-top-view-banner.jpg"
              alt="bannerImage"
            />
          </div>
          <div className="hidden 2xl:block">
            <img
              className="w-full"
              style={{ height: "650px" }}
              src="/assets/falafel-hummus-pita-middle-eastern-arabic-dishes-halal-food-top-view-banner.jpg"
              alt="bannerImage"
            />
          </div>
          <div className="absolute top-14 pt-8 ps-2 md:top-20 md:left-10 lg:top-40 lg:left-10 xl:top-80 xl:left-20">
            <div className="text-md lg:text-6xl md:text-3xl sm:text-xl font-bold mb-4 text-white">
              <div className="md:hidden">Pick your favourite Restaurant</div>
              <div className="hidden md:block">
                Pick your favourite <br /> Restaurant
              </div>
            </div>
            <div className="relative">
              <svg
                className="w-4 h-4 dark:text-black absolute top-3 left-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <input
                type="text"
                className="pl-10 w-44 md:w-72 lg:w-full border p-2 rounded-md outline-none text-xs sm:text-lg lg:text-xl"
                placeholder="Search for Restaurants"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-auto h-full">
              <div>
                <h1 className="text-lg md:text-xl lg:text-3xl font-bold mt-5 ms-5">Restaurants Near By</h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                {filteredRestaurant.map((restaurant) => (
                  <div
                    className="max-w-md lg:w-80 md:h-72 bg-white shadow-lg rounded-lg m-10 p-4 hover:cursor-pointer"
                    key={restaurant?._id}
                    onClick={() =>
                      navigate(`/restaurantDetails/${restaurant?._id}`)
                    }
                  >
                    <div className="h-3/5 relative">
                      <img
                        src={restaurant?.images[0]}
                        alt="RestaurantImage"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="mt-2">
                      <h2 className="text-xl font-bold text-gray-700">
                        {restaurant?.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {restaurant?.address}
                      </p>
                      <div className="flex items-center">
                        <span>
                          <ReactStars
                            value={calculateAverageRating(restaurant.reviews)}
                            edit={false}
                            size={15}
                            color1="gray"
                            color2={"#ffd700"}
                          />
                        </span>
                        <span>({restaurant.reviews.length})</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
