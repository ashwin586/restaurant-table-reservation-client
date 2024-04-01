import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import ReactApexChart from "react-apexcharts";
import { Spinner } from "@chakra-ui/react";
import { partnerAxios } from "../../../services/AxiosInterceptors/partnerAxios";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalRestaurant, setTotalRestaurant] = useState(null);
  const [totalIncome, setTotalIncome] = useState(null);
  const [totalReview, setTotalReview] = useState(null);
  const [totalBooking, setTotalBooking] = useState(null);
  const [chartData, setChartData] = useState(null);
  useEffect(() => {
    const fetchDashboardDetails = async () => {
      try {
        setIsLoading(true);
        const response = await partnerAxios.get("/partner/dashboard");
        if (response.status === 200) {
          setTotalRestaurant(response.data.totalRestaurants);
          setTotalIncome(response.data.totalRevenue);
          setTotalReview(response.data.totalReviewCount);
          setTotalBooking(response.data.totalBookingCount);
          setChartData(response.data?.chartData);
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDashboardDetails();
  }, []);

  const bookingData = chartData
    ? chartData.map((booking) => ({
        x: new Date(booking.bookedDate).getTime(),
        y: booking.grandTotal,
      }))
    : [];
  const options = {
    chart: {
      type: "line",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      title: {
        text: "Revenue",
      },
    },
  };

  const series = [
    {
      name: "Revenue",
      data: bookingData,
    },
  ];

  // ApexCharts configuration

  return (
    <>
      {isLoading ? (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 flex justify-center items-center z-50">
          <Spinner />
        </div>
      ) : null}
      <Sidebar />
      <div className="min-h-screen bg-adminDashboard">
        <div className="bg-adminDashboard h-screen p-4 sm:ml-64">
          <h1 className="font-bold text-3xl text-gray-500">DASHBOARD</h1>
          <div className="w-11/12 h-1/4 mt-5 flex justify-between items-center">
            <div className="bg-firstBox w-60 h-40 rounded-lg flex flex-col justify-center items-center">
              <h1 className="font-bold text-5xl text-white">
                {totalRestaurant}
              </h1>
              <h1 className="font-semibold text-2xl text-white">
                Total Restaurant
              </h1>
            </div>
            <div className="bg-secondBox w-60 h-40 rounded-lg flex flex-col justify-center items-center">
              <h1 className="font-bold text-5xl text-white">{totalReview}</h1>
              <h1 className="font-semibold text-2xl text-white">
                Total reviews
              </h1>
            </div>
            <div className="bg-thirdBox w-60 h-40 rounded-lg flex flex-col justify-center items-center">
              <h1 className="font-bold text-5xl text-white">{totalBooking}</h1>
              <h1 className="font-semibold text-2xl text-white">
                Total Bookings
              </h1>
            </div>
            <div className="bg-fourthBox w-60 h-40 rounded-lg flex flex-col justify-center items-center">
              <h1 className="font-bold text-5xl text-white">₹ {totalIncome}</h1>
              <h1 className="font-semibold text-2xl text-white">
                Total Revenue
              </h1>
            </div>
          </div>
          <div>
            <ReactApexChart
              options={options}
              series={series}
              type="line"
              height={300}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
