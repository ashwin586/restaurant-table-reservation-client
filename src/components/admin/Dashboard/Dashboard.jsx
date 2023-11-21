import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { adminAxios } from "../../../services/AxiosInterceptors/adminAxios";
import AdminHeader from "../AdminHeader";
import { Spinner } from "@chakra-ui/react";
import AdminSideBar from "../AdminSideBar";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalRestaurantOnline, setTotalRestaurantOnline] = useState(null);
  const [totalPartners, setTotalPartners] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(null);

  useEffect(() => {
    const fetchDashboardDetails = async () => {
      try {
        const response = await adminAxios.get("/admin/dashboard");
        if (response.data) {
          setTotalPartners(response.data.partners);
          setTotalUsers(response.data.users);
          setTotalRevenue(response.data.revenue);
          setTotalRestaurantOnline(response.data.restaurants);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchDashboardDetails();
  }, []);

  const pieChart = [
    {
      name: "Users",
      data: totalUsers,
    },
    {
      name: "Restaurants",
      data: totalRestaurantOnline,
    },
    {
      name: "Partners",
      data: totalPartners,
    },
  ];
  const options = {
    chart: {
      type: "pie",
    },
    labels: pieChart ? pieChart.map((item) => item.name) : [],
    colors: ["#321fdb", "#f9b017", "#3299fe"],
  };
  const series = pieChart ? pieChart.map((item) => item.data) : [];

  if (
    totalUsers === null ||
    totalRestaurantOnline === null ||
    totalPartners === null
  ) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 flex justify-center items-center z-50">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-adminDashboard">
      <AdminHeader />
      <AdminSideBar />
      <div className="bg-adminDashboard h-screen p-4 sm:ml-64">
        <h1 className="font-bold text-3xl text-gray-500">DASHBOARD</h1>
        <div className="w-11/12 h-1/4 mt-5 flex justify-between items-center">
          <div className="bg-firstBox w-60 h-40 rounded-lg flex flex-col justify-center items-center">
            <h1 className="font-bold text-5xl text-white">{totalUsers}</h1>
            <h1 className="font-semibold text-2xl text-white">Total Users</h1>
          </div>
          <div className="bg-secondBox w-60 h-40 rounded-lg flex flex-col justify-center items-center">
            <h1 className="font-bold text-5xl text-white">{totalPartners}</h1>
            <h1 className="font-semibold text-2xl text-white">
              Total Partners
            </h1>
          </div>
          <div className="bg-thirdBox w-60 h-40 rounded-lg flex flex-col justify-center items-center">
            <h1 className="font-bold text-5xl text-white">
              {totalRestaurantOnline}
            </h1>
            <h1 className="font-semibold text-2xl text-white">
              Total Restaurant Online
            </h1>
          </div>
          <div className="bg-fourthBox w-60 h-40 rounded-lg flex flex-col justify-center items-center">
            <h1 className="font-bold text-5xl text-white">₹ {totalRevenue}</h1>
            <h1 className="font-semibold text-2xl text-white">Total Revenue</h1>
          </div>
        </div>
        <div>
          <ReactApexChart
            options={options}
            series={series}
            type="pie"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
