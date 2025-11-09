"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CashOutflow() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cash-outflow")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((chartData) => {
        console.log("Fetched chart data:", chartData);

        if (Array.isArray(chartData)) {
          const validData = chartData
            .filter((item) => item.dueDate && item.total !== undefined)
            .map((item) => ({
              dueDate: new Date(item.dueDate).toLocaleDateString(),
              total: Number(item.total),
            }));
          setData(validData);
        } else {
          console.error("Unexpected chart data:", chartData);
        }
      })
      .catch((err) => console.error("Error fetching cash outflow:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading chart...</p>;

  if (!data.length)
    return <p className="text-gray-500">No payment data available.</p>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">
        Cash Outflow Forecast
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dueDate" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#3B82F6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
