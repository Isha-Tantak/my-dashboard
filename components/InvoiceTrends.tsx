"use client";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function InvoiceTrends() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/invoice-trends")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Invoice Volume & Value Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="invoiceCount" stroke="#2563eb" />
          <Line type="monotone" dataKey="totalAmount" stroke="#10b981" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
