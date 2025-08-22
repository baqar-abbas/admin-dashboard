import React, { useState, useEffect, useMemo } from "react";
import api from "../../lib/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const monthName = (yyyyMm) => {
  const m = Number(yyyyMm.slice(5));
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (m < 1 || m > 12) return "Invalid Month";

  return months[m - 1];
};

const RevenueLineChart = () => {
  const [data, setData] = useState(null);
  const [err, setError] = useState(null);

  useEffect(() => {
    api
      .get("/revenueByMonth")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => setError(err));
  }, []);

  const chartData = useMemo(() => {
    return (data || []).map((d) => ({
      ...d,
      label: monthName(d.month),
    }));
  }, [data]);

  if (err)
    return <div className="text-sm text-red-500">Failed to load Revenue.</div>;
  if (!data) return <div className="text-gray-500">Loading revenue…</div>;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Revenue (Last Months)
        </h2>
        <p className="text-sm text-gray-500">from /revenueByMonth</p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis tickFormatter={(v) => `$${v.toLocaleString()}`} />
            <Tooltip
              formatter={(val) => [
                `$${Number(val).toLocaleString()}`,
                "Revenue",
              ]}
              labelFormatter={(label, payload) =>
                payload?.[0]?.payload?.month || label
              }
            />
            <Line type="monotone" dataKey="value" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueLineChart;
