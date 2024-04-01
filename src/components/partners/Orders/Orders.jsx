import React, { useState, useEffect } from "react";
import { partnerAxios } from "../../../services/AxiosInterceptors/partnerAxios";
import { Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import SideBar from "../Sidebar";
import OrdersModal from "./OrdersModal";

const Orders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [listOrder, setListOrder] = useState([]);
  const [userName, setUserName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true)
        const response = await partnerAxios.get(
          "/partner/getAllOrdersOfRestaurant",
          {
            params: {
              id: id,
            },
          }
        );
        if (response.status === 200) {
          setOrders(response.data);
        }
        setIsLoading(false)
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrders();
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
      {isLoading ? (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 flex justify-center items-center z-50">
          <Spinner />
        </div>
      ) : null}
      <SideBar />
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center">
          <OrdersModal
            open={isOpen}
            close={() => setIsOpen(false)}
            orders={listOrder}
            userName={userName}
          />
        </div>
      )}
      <div className="bg-adminDashboard min-h-screen p-4 sm:ml-64">
        <div>
          <h1 className="font-bold text-3xl">
            {orders[0]?.restaurant.name} Orders
          </h1>
        </div>

        {orders &&
          orders.map((order) => (
            <div
              className="my-6 p-4 ms-20 bg-white shadow-lg rounded-lg w-4/5 h-48 font-mono"
              key={order?._id}
            >
              <div>
                <span className="font-bold text-lg">User Name:</span>
                {order?.user.name}
              </div>
              <div>
                <span className="font-bold text-lg">User Email:</span>
                {order?.user.email}
              </div>
              <div>
                <span className="font-bold text-lg">User Phone no:</span>
                {order?.user.phoneNumber}
              </div>
              <div>
                <span className="font-semibold text-lg">Booking On:</span>{" "}
                <span>{formatDate(order?.bookedDate)}</span>{" "}
                <span className="font-semibold">at</span>{" "}
                <span>{formatTime(order?.bookedTime)}</span>{" "}
                <span className="font-semibold">for</span>{" "}
                <span>{order?.numberOfSeats} Persons</span>
              </div>
              <button
                className="bg-amber-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-amber-400 border-b-4 border-b-amber-800 hover:border-b-amber-500"
                onClick={() => {
                  setIsOpen(true);
                  setListOrder(order?.cart);
                  setUserName(order?.user.name);
                }}
              >
                View Orders
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default Orders;
