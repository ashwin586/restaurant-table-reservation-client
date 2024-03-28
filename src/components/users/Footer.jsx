import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
  faReddit,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="text-center bg-white w-full">
      <hr className="border border-gray-400"/>
      <div className="flex flex-col">
        <Link to={"/"}>
          <div className="flex justify-center items-center">
            <span>
              <img
                src="/assets/reserve.png"
                style={{ height: "48px" }}
                alt="Logo"
              />
            </span>
            <h2 className="text-3xl font-extrabold mt-5 ml-2">RESERVETABLE</h2>
          </div>
        </Link>
        <p className="text-gray-500 p-2">
          Find the best Restaurants, Deals & Offers
        </p>
        <p className="pb-2 text-gray-500">
          Write to us at:{" "}
          <span className="font-semibold text-black">ashwinv586@gmail.com</span>
        </p>
        <div>
          <span className="p-4">
            <FontAwesomeIcon
              icon={faYoutube}
              size="2xl"
              className="hover:cursor-pointer"
            />
          </span>
          <span className="p-4">
            <FontAwesomeIcon
              icon={faInstagram}
              size="2xl"
              className="hover:cursor-pointer"
            />
          </span>
          <span className="p-4">
            <FontAwesomeIcon
              icon={faFacebook}
              size="2xl"
              className="hover:cursor-pointer"
            />
          </span>
          <span className="p-4">
            <FontAwesomeIcon
              icon={faTwitter}
              size="2xl"
              className="hover:cursor-pointer"
            />
          </span>
          <span className="p-4">
            <FontAwesomeIcon
              icon={faReddit}
              size="2xl"
              className="hover:cursor-pointer"
            />
          </span>
        </div>
      </div>
    </div>

  );
};

export default Footer;
