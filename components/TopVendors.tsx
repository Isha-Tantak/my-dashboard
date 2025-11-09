"use client";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function TopVendors() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/vendors/top10")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Top 10 Vendors by Spend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" />
          <YAxis dataKey="vendorName" type="category" width={120} />
          <Tooltip />
          <Bar dataKey="totalSpend" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
