import React, { useState, useEffect } from "react";
import api from "../../lib/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";

const OrdersByStatusChart = () => {
  const [data, setData] = useState(null);
  const [err, setError] = useState(null);

  useEffect(() => {
    api
      .get("/ordersByStatus")
      .then((response) => {
        setData(response.data);
        console.log("Orders by Status Data:", response.data);
      })
      .catch((error) => {
        setError(error);
        console.error("Error fetching Orders by Status Data:", error);
      });
  }, []);

  if (err)
    return (
      <div className="text-sm text-red-500">
        Failed to load Orders by Status.
      </div>
    );
  if (!data) return <div className="text-gray-500">Loading orders…</div>;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Orders by Status
        </h2>
        <p className="text-sm text-gray-500">from /ordersByStatus</p>
      </div>

      <div className="h-72">
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip
              formatter={(val) => [`${val}`, "Orders"]}
              labelFormatter={(label) => `Status: ${label}`}
            />
            <Bar dataKey="count" fill="#1D4ED8" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrdersByStatusChart;
