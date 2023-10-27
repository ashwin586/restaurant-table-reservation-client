import React from "react";
import AdminHeader from "../AdminHeader";
import AdminSideBar from "../AdminSideBar";

const Dashboard = () => {
  return (
    <div className="h-screen bg-adminDashboard">
      <AdminHeader />
      <AdminSideBar />
      <div className="ml-[260px]">
        <h1>The Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;
