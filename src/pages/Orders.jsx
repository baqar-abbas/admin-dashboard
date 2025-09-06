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

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Update order
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/orders/${showModal.data.id}`, {
        ...formData,
        amount: parseFloat(formData.amount),
      });
      await fetchOrders();
      setShowModal({ type: null, data: null });
      setFormData({ date: "", customer: "", status: "Pending", amount: "" });
    } catch (err) {
      console.error("Error updating order:", err);
      setError("Failed to update order ❌");
    }
  };

  // Delete order
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await api.delete(`/orders/${id}`);
      setOrders((prev) => prev.filter((order) => order.id !== id));
    } catch (err) {
      console.error("Error deleting order:", err);
      setError("Failed to delete order ❌");
    }
  };
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
                  <button
                    onClick={() => setShowModal({ type: "view", data: order })}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => {
                      setShowModal({ type: "edit", data: order });
                      setFormData(order);
                    }}
                    className="text-green-500 hover:text-green-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* View Order Modal */}
      {showModal.type === "view" && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center ">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <p>
              <strong>ID</strong> {showModal.data.id}
            </p>
            <p>
              <strong>Date</strong> {showModal.data.date}
            </p>
            <p>
              <strong>Customer</strong> {showModal.data.customer}
            </p>
            <p>
              <strong>Status</strong> {showModal.data.status}
            </p>
            <p>
              <strong>Amount</strong> {showModal.data.amount.toFixed(2)}
            </p>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowModal({ type: null, data: null })}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Order Modal */}
      {showModal.type === "edit" && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4 ">Edit Order</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="Enter date"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                name="customer"
                value={formData.customer}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>

                <option value="Cancelled">Cancelled</option>
                <option value="Returned">Returned</option>
              </select>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                className="w-full border p-2 rounded"
                required
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal({ type: null, data: null })}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
