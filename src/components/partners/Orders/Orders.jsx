import React, { useState, useEffect } from "react";
import { partnerAxios } from "../../../services/AxiosInterceptors/partnerAxios";
import { useParams } from "react-router-dom";
import SideBar from "../Sidebar";
import OrdersModal from "./OrdersModal";

const Orders = () => {
  const { id } = useParams();
  const [listOrder, setListOrder] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
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
      <SideBar />
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center">
          <OrdersModal
            open={isOpen}
            close={() => setIsOpen(false)}
            orders={listOrder}
          />
        </div>
      )}
      <div className="bg-adminDashboard h-screen p-4 sm:ml-64">
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
              <h1>User Name: {order?.user.name}</h1>
              <h1>User Email: {order?.user.email}</h1>
              <h1>User Phone no: {order?.user.phoneNumber}</h1>
              <div>
                <span className="font-semibold">Booking On</span>{" "}
                <span>{formatDate(order?.bookedDate)}</span>{" "}
                <span className="font-semibold">at</span>{" "}
                <span>{formatTime(order?.bookedTime)}</span>{" "}
                <span className="font-semibold">for</span>{" "}
                <span>{order?.numberOfSeats} Persons</span>
              </div>
              <button
                className="bg-blue-300 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-500"
                onClick={() => {
                  setIsOpen(true);
                  setListOrder(order?.cart);
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
