import React, { useState, useEffect } from "react";
import api from "../lib/api";
import {
  FaDollarSign,
  FaUsers,
  FaBolt,
  FaShoppingCart,
  FaChartPie,
} from "react-icons/fa";
import { MdInventory } from "react-icons/md"; // for Orders

const KpiCards = () => {
  const [kpis, setKpis] = useState(null);

  useEffect(() => {
    api
      .get("/kpis")
      .then((response) => {
        if (!response.data) {
          throw new Error("No KPIS data found");
        }
        setKpis(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!kpis) {
    return <p className="text-gray-500">Loading KPIS data ...</p>;
  }

  const cards = [
    {
      label: "Revenue",
      value: `$ ${kpis.revenue.toLocaleString()}`,
      icon: <FaDollarSign />,
      color: "bg-blue-100 text-blue-700",
    },
    {
      label: "Orders",
      value: kpis.orders,
      icon: <MdInventory />,
      color: "bg-green-100 text-green-700",
    },
    {
      label: "Customers",
      value: kpis.customers,
      icon: <FaUsers />,
      color: "bg-purple-100 text-purple-700",
    },
    {
      label: "Conversion",
      value: `${kpis.conversion}%`,
      icon: <FaBolt />,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      label: "Avg Order Value",
      value: `$${kpis.avgOrderValue}`,
      icon: <FaShoppingCart />,
      color: "bg-pink-100 text-pink-700",
    },
    {
      label: "Profit Margin",
      value: `${kpis.profitMargin}%`,
      icon: <FaChartPie />,
      color: "bg-indigo-100 text-indigo-700",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-lg transition-transform transform hover:translate-y-1"
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${card.color} text-xl`}
          >
            {card.icon}
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mt-3">
            {card.value}
          </h3>
          <p className="text-gray-500 text-sm">{card.label}</p>
        </div>
      ))}
    </div>
  );
};

export default KpiCards;
