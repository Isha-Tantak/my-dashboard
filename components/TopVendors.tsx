"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function TopVendorsChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/vendors/top10")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((vendors) => {
        // Filter invalid or negative data
        const cleaned = vendors
          .filter((v: any) => v.totalSpend > 0)
          .map((v: any) => ({
            name: v.vendorName || "Unknown Vendor",
            totalSpend: Math.round(v.totalSpend),
          }));

        setData(cleaned);
      })
      .catch((err) => console.error("Error loading vendor chart:", err));
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Top 10 Vendors by Spend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            domain={[0, "dataMax"]}
            tickFormatter={(value) => `$${value}`}
          />
          <YAxis
            dataKey="name"
            type="category"
            width={150}
            tick={{ fontSize: 12 }}
          />
          <Tooltip formatter={(value) => `$${value}`} />
          <Bar dataKey="totalSpend" fill="#3b82f6" barSize={20} radius={[4, 4, 4, 4]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
