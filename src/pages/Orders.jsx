import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import api from "../lib/api";

const Orders = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Orders Page</h2>
      <p>This is the orders page where you can manage customer orders.</p>
    </div>
  );
};

export default Orders;
