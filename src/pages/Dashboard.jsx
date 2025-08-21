import React from "react";
import KpiCards from "../components/KpiCards";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Welcome to Dashboard
      </h1>
      <KpiCards />
      {/* Later: charts, tables, logs etc */}
    </div>
  );
};

export default Dashboard;
