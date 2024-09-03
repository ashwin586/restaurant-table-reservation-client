import React, { useState, useEffect } from "react";
import ProfileSideBar from "./ProfileSideBar";
import Navbar from "../Navbar";
import ReactStars from "react-stars";
import { userAxios } from "../../../services/AxiosInterceptors/userAxios";
import Footer from "../Footer";
import { CircularProgress } from "@mui/material";

const Reviews = () => {
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const response = await userAxios.get("/fetchReviews");
        console.log(response);
        if (response.status === 200) {
          setReviews(response.data);
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReviews();
  }, []);
  return (
    <>
      <div className="flex flex-col min-h-screen bg-homeBg">
        {isLoading ? (
          <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 flex justify-center items-center z-50">
            <CircularProgress />
          </div>
        ) : null}
        <Navbar />
        <div className="flex justify-center mt-10">
          <div className="bg-white w-3/4 rounded-xl shadow-2xl">
            <div className="bg-yellow-300 p-4 text-white rounded-t-xl relative">
              <h1 className="text-4xl font-extrabold p-5">Your Reviews</h1>
            </div>
            <div className="container mx-auto mt-8 p-4">
              <div className="flex">
                <ProfileSideBar />
                <div className="container flex justify-center ">
                  <div className="w-3/4 ">
                    <div className="border-b border-dashed border-black h-1 my-2"></div>
                    {/* {reviews &&
                      reviews?.map((review, index) => (
                        <div key={index}>
                          <div className="flex">
                            <div>
                              <img
                                src={review?.restaurant.images[0]}
                                alt="restaurantImage"
                                className="h-20 w-20 cursor-pointer rounded-lg"
                              />
                            </div>
                            <div className="flex-1 ms-4">
                              <h1 className="font-semibold text-xl my-3">
                                {review?.restaurant.name}
                              </h1>
                              <div>
                                <ReactStars
                                  value={review?.rating}
                                  edit={false}
                                  size={15}
                                  color1="gray"
                                  color2={"#ffd700"}
                                />
                              </div>
                              <p>{review?.review}</p>
                            </div>
                          </div>
                        </div>
                      ))} */}
                    {reviews &&
                      reviews?.map((review, index) => (
                        <div
                          key={index}
                          className="border-b border-dashed border-black my-4"
                        >
                          <div className="flex flex-col lg:flex-row items-start">
                            <div className="mb-4 lg:mb-0 lg:mr-4">
                              <img
                                src={review?.restaurant.images[0]}
                                alt="restaurantImage"
                                className="h-20 w-20 lg:h-20 lg:w-20 cursor-pointer rounded-lg"
                              />
                            </div>
                            <div className="flex-1">
                              <h1 className="font-semibold text-xl my-2 lg:my-3">
                                {review?.restaurant.name}
                              </h1>
                              <div className="mb-2 md:hidden">
                                <ReactStars
                                  value={review?.rating}
                                  edit={false}
                                  size={20}
                                  color1="gray"
                                  color2={"#ffd700"}
                                />
                              </div>
                              <div className="mb-2 hidden md:block">
                                <ReactStars
                                  value={review?.rating}
                                  edit={false}
                                  size={30}
                                  color1="gray"
                                  color2={"#ffd700"}
                                />
                              </div>
                              <p>{review?.review}</p>
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
        <div className="absolute bottom-0 w-full">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Reviews;
