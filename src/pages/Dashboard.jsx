import React from "react";
import KpiCards from "../components/KpiCards";
import RevenueLineChart from "../components/charts/RevenueLineChart";
import OrdersByStatusChart from "../components/charts/OrdersByStatusChart";
import TrafficBySourceChart from "../components/charts/TrafficBySourceChart";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Welcome to Dashboard
      </h1>
      <KpiCards />

      {/* Line Chart */}
      <div className="grid grid-cols-1 gap-6 mb-10">
        <RevenueLineChart />
      </div>

      {/* Bar Chart */}
      <div className="grid grid-cols-1 gap-6">
        <OrdersByStatusChart />
      </div>

      {/* Pie Chart - Traffic by Source */}
      <div className="grid grid-cols-1 gap-6 mb-10">
        <TrafficBySourceChart />
      </div>
    </div>
  );
};

export default Dashboard;
