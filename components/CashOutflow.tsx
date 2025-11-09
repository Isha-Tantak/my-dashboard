"use client";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function CashOutflow() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/cash-outflow")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Cash Outflow Forecast</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dueDate" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amountDue" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
