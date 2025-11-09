"use client";
import { useEffect, useState } from "react";

export default function OverviewCards() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(console.error);
  }, []);

  if (!stats) return <p>Loading overview...</p>;

  const cards = [
    { title: "Total Spend (YTD)", value: `$${stats.totalSpend.toLocaleString()}` },
    { title: "Invoices Processed", value: stats.totalInvoices },
    { title: "Documents Uploaded", value: stats.documentsUploaded },
    { title: "Average Invoice Value", value: `$${stats.avgInvoiceValue.toFixed(2)}` },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl shadow text-center">
          <h2 className="text-gray-600 font-semibold">{card.title}</h2>
          <p className="text-2xl font-bold mt-2">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
