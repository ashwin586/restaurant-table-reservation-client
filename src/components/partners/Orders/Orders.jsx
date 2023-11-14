import React, { useState, useEffect } from "react";
import { partnerAxios } from "../../../services/AxiosInterceptors/partnerAxios";
import SideBar from "../Sidebar";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await partnerAxios.get(
          "/partner/getAllOrdersOfPartner"
        );
        if (response.status === 200) {
          console.log(response.data);
          setOrders(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrders();
  }, []);
  return (
    <>
      <SideBar />
      <div className="bg-adminDashboard h-screen p-4 sm:ml-64">
        <div className="my-6 p-4 ms-20 bg-white shadow-lg rounded-lg w-4/5 h-48 flex transform transition-transform hover:scale-105 font-serif"></div>
      </div>
    </>
  );
};

export default Orders;
