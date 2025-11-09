"use client";
import { useEffect, useState } from "react";

export default function InvoicesTable() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/invoices")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        // Ensure it's an array before setting
        if (Array.isArray(data)) setInvoices(data);
        else console.error("Unexpected response:", data);
      })
      .catch((err) => console.error("Error fetching invoices:", err));
  }, []);

  const filtered = invoices.filter(
    (inv) =>
      inv.vendorName?.toLowerCase().includes(search.toLowerCase()) ||
      inv.invoiceNumber?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Invoices</h2>

      <input
        type="text"
        placeholder="Search by vendor or invoice..."
        className="border px-3 py-2 rounded mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {!Array.isArray(invoices) || invoices.length === 0 ? (
        <p>No invoices found or data unavailable.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b font-medium">
              <tr>
                <th className="px-3 py-2">Vendor</th>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Invoice #</th>
                <th className="px-3 py-2">Amount</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv, i) => (
                <tr key={i} className="border-t">
                  <td className="px-3 py-2">{inv.vendorName}</td>
                  <td className="px-3 py-2">{inv.date}</td>
                  <td className="px-3 py-2">{inv.invoiceNumber}</td>
                  <td className="px-3 py-2">${inv.amount}</td>
                  <td className="px-3 py-2">{inv.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
