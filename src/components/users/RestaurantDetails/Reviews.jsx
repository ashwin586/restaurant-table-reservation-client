import React from "react";
import ReactStars from "react-stars";

const Reviews = ({ reviews }) => {
  return (
    <>
      <div className="p-3">
        <h1 className="text-2xl font-semibold ">Reviews</h1>
        <div>
          {/* {reviews &&
            reviews.map((review, index) => (
              <div>
                <div
                  className="my-6 p-4 ms-20 bg-slate-100 shadow-lg rounded-lg w-4/5 h-28 flex transform transition-transform hover:scale-105 font-serif"
                  key={index}
                >
                  <div className="flex">
                    <img
                      src={
                        review.user?.userImage ||
                        "/assets/blank-profile-picture-973460_1920.png"
                      }
                      className="h-8 w-8 rounded-2xl"
                      alt="userImage"
                    />
                    <div className="ms-2">
                      <p className="text-sm">{review.user?.name}</p>
                      <ReactStars
                        value={review?.rating}
                        edit={false}
                        size={15}
                        color1="gray"
                        color2={"#ffd700"}
                      />
                    </div>
                  </div>
                  <div >
                    <p>{review?.review}</p>
                  </div>
                </div>
              </div>
            ))} */}
          {reviews &&
            reviews.map((review, index) => (
              <div key={index}>
                <div className="my-6 p-4 ms-20 bg-blue-100 shadow-lg rounded-lg w-4/5 h-28 transform transition-transform hover:scale-105 font-serif">
                  <div className="flex">
                    <img
                      src={
                        review.user?.userImage ||
                        "/assets/blank-profile-picture-973460_1920.png"
                      }
                      className="h-8 w-8 rounded-2xl"
                      alt="userImage"
                    />
                    <div className="ms-2">
                      <p className="text-sm">{review.user?.name}</p>
                      <ReactStars
                        value={review?.rating}
                        edit={false}
                        size={15}
                        color1="gray"
                        color2={"#ffd700"}
                      />
                    </div>
                  </div>
                  <div className="mt-2 italic text-gray-800">
                    <h1>{review?.review}</h1>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Reviews;
