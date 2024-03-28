import React, { useState, useEffect } from "react";
import ProfileSideBar from "./ProfileSideBar";
import Navbar from "../Navbar";
import ReactStars from "react-stars";
import { userAxios } from "../../../services/AxiosInterceptors/userAxios";
import Footer from "../Footer";

const Reviews = () => {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await userAxios.get("/fetchReviews");
        if (response.status === 200) {
          setReviews(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchReviews();
  }, []);
  return (
    <>
      <div className="flex flex-col min-h-[calc(84vh)]">
        <Navbar />
        <div className="flex justify-center mt-10">
          <div className="w-3/4 rounded-xl shadow-2xl">
            <div className="container mx-auto mt-8 p-4">
              <div className="flex">
                <ProfileSideBar />
                <div className="container flex justify-center ">
                  <div className="w-3/4 ">
                    <div className="border-b border-dashed border-black h-1 my-2"></div>
                    {reviews &&
                      reviews?.map((review, index) => (
                        <div key={index}>
                          <div className="flex">
                            <div>
                              <img
                                src={review?.restaurant.images[0]}
                                alt="restaurantImage"
                                className="h-40 w-40 cursor-pointer rounded-lg"
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
      </div>
      <Footer />
    </>
  );
};

export default Reviews;
