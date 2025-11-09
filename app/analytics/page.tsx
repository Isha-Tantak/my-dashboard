"use client";

import { useEffect, useState } from "react";
import OverviewCards from "@/components/OverviewCards";
import InvoiceTrends from "@/components/InvoiceTrends";
import TopVendors from "@/components/TopVendors";
import CategorySpend from "@/components/CategorySpend";
import CashOutflow from "@/components/CashOutflow";
import InvoicesTable from "@/components/InvoicesTable";


export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Analytics Dashboard</h1>

      <OverviewCards />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InvoiceTrends />
        <TopVendors />
        <CategorySpend />
      </div>

      <CashOutflow />
      <InvoicesTable />
    </div>
  );
}
