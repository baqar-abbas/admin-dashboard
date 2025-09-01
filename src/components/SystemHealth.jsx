import React, { useState, useEffect, use } from "react";
import api from "../lib/api";

const getColor = (value) => {
  if (value < 50) return "bg-green-500";
  if (value < 75) return "bg-yellow-500";
  return "bg-red-500";
};

const SystemHealth = () => {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await api.get("/systemHealth");
        setHealth(response.data);
        console.log("System Health Data:", response.data);
      } catch (err) {
        console.error("Error fetching system health data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHealth();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          System Health
        </h2>
        <p className="text-gray-500 text-sm animate-pulse">
          Loading system health...
        </p>
      </div>
    );
  }

  if (!health) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          System Health
        </h2>
        <p className="text-red-500 text-sm">Failed to load data ❌</p>
      </div>
    );
  }

  const data = [
    { label: "CPU Usage", value: health.cpu },
    { label: "Memory Usage", value: health.memory },
    { label: "Disk Usage", value: health.disk },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        System Health
      </h2>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">
                {item.label}
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {item.value}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${getColor(item.value)}`}
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemHealth;
