import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Axios from "../../../services/axios";
import ReactStars from "react-stars";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import Footer from "../Footer";

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setIsLoading(true)
        const response = await Axios.get("/getAllRestaurants");
        if (response.status === 200) {
          setRestaurants(response.data);
        }
        setIsLoading(false)
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
            <Spinner />
          </div>
        ) : null}
        <Navbar />
        <div className="bg-homeBg min-h-screen">
          <div>
            <img
              className="w-full"
              style={{ height: "550px" }}
              src="/assets/falafel-hummus-pita-middle-eastern-arabic-dishes-halal-food-top-view-banner.jpg"
              alt="bannerImage"
            />
          </div>
          <div className="absolute top-80 left-52  p-8 ">
            <h1 className="text-6xl font-bold mb-4 text-white">
              Pick your favourite <br /> Restaurant
            </h1>
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
                className="pl-10 w-full border p-2 rounded-md outline-none"
                placeholder="Search for Restaurants"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-2/3 h-full">
              <div>
                <h1 className="text-2xl font-bold p-5">Restaurants Near By</h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {filteredRestaurant.map((restaurant) => (
                  <div
                    className="max-w-xs md:max-w-full md:w-96 md:h-80 bg-white shadow-lg rounded-lg m-10 p-4 hover:cursor-pointer transform transition-transform hover:scale-102"
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
