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
        if (Array.isArray(data)) setInvoices(data);
        else console.error("Unexpected response:", data);
      })
      .catch((err) => console.error("Error fetching invoices:", err));
  }, []);

  const filtered = invoices.filter(
    (inv) =>
      inv.vendor?.name?.toLowerCase().includes(search.toLowerCase()) ||
      inv.invoiceNumber?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Invoices</h2>

      <input
        type="text"
        placeholder="Search by vendor or invoice..."
        className="border border-gray-300 px-3 py-2 rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.length === 0 ? (
        <p className="text-gray-500">No invoices found or data unavailable.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-3 py-2 text-gray-700">Vendor</th>
                <th className="px-3 py-2 text-gray-700">Date</th>
                <th className="px-3 py-2 text-gray-700">Invoice #</th>
                <th className="px-3 py-2 text-gray-700">Amount</th>
                <th className="px-3 py-2 text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv, i) => (
                <tr
                  key={i}
                  className="border-t hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-3 py-2">{inv.vendor?.name || "—"}</td>
                  <td className="px-3 py-2">
                    {inv.invoiceDate
                      ? new Date(inv.invoiceDate).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-3 py-2">{inv.invoiceNumber || "—"}</td>
                  <td className="px-3 py-2 text-gray-900 font-medium">
                    ${inv.invoiceTotal?.toFixed(2) || "0.00"}
                  </td>
                  <td
                    className={`px-3 py-2 font-medium ${
                      inv.status === "validated"
                        ? "text-green-600"
                        : "text-gray-700"
                    }`}
                  >
                    {inv.status || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
