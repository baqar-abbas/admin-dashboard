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

const COLORS = ["#2176FF", "#1E40AF", "#1D4ED8", "#60A5FA"];

const CategoryShareChart = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/categoryShare");
        setCategoryData(response.data);
        console.log("Category Data:", response.data);
      } catch (err) {
        console.error("Error fetching category data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-2xl p-6 flex justify-center items-center">
        <p className="text-gray-500">Loading Category Share...</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Category Share
      </h2>
      {categoryData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              label
            >
              {categoryData.map((entry, index) => (
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
        <p className="text-gray-500 text-center">No category data available</p>
      )}
    </div>
  );
};

export default CategoryShareChart;
