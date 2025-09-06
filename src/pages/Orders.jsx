import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import api from "../lib/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState({ type: null, data: null }); // unified modal state
  const [formData, setFormData] = useState({
    date: "",
    customer: "",
    status: "Pending",
    amount: "",
  });

  // Fetch orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await api.get("/orders");
      setOrders(response.data);
      console.log("Orders Data:", response.data);
    } catch (err) {
      console.error("Error fetching orders data:", err);
      setError("Failed to load orders ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Orders</h1>

      {/* Loading / Error or render orders data */}
      {loading ? (
        <p className="text-gray-500 animate-pulse">Loading orders...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="w-full border border-gray-200 shadow-md border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Customer</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="text-center">
                <td className="px-4 py-2 border">{order.id}</td>
                <td className="px-4 py-2 border">{order.date}</td>
                <td className="px-4 py-2 border">{order.customer}</td>
                <td className="px-4 py-2 border">{order.status}</td>
                <td className="px-4 py-2 border">{order.amount.toFixed(2)}</td>
                <td className="border px-4 py-2 flex justify-center gap-3">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEye />
                  </button>
                  <button className="text-green-500 hover:text-green-700">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
