import React, { useState, useEffect } from "react";
import api from "../lib/api";

const TopCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.get("/topCustomers");
        setCustomers(response.data);
        console.log("Top Customers Data:", response.data);
      } catch (err) {
        console.error("Error fetching top customers data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Top Customers
        </h2>
        <p className="text-gray-500 text-sm animate-pulse">
          Top customers data is being loaded...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Top Customers
        </h2>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Top Customers Component
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm">
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Orders</th>
              <th className="py-2 px-3">Total Spent ($)</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="py-2 px-3">{customer.name}</td>
                <td className="py-2 px-3">{customer.orders}</td>
                <td className="py-2 px-3 font-medium text-blue-600">
                  {customer.spend.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopCustomers;
