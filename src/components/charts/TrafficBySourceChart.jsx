import React, { useEffect, useState } from "react";
import api from "../../lib/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#2176FF", "#1E40AF", "#1D4ED8", "#60A5FA", "#93C5FD"];

const TrafficBySourceChart = () => {
  const [trafficData, setTrafficData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/traffic");
        setTrafficData(response.data);
        console.log("Traffic Data:", response.data);
      } catch (err) {
        console.error("Error fetching traffic data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-2xl p-6 flex justify-center items-center">
        <p className="text-gray-500">Loading Traffic by Source...</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Traffic Data by Source
      </h2>
      {trafficData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={trafficData}
              dataKey="visits"
              nameKey="source"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {trafficData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 text-center">No traffic data available</p>
      )}
    </div>
  );
};

export default TrafficBySourceChart;
