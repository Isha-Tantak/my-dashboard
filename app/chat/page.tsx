"use client";
import { useState } from "react";

export default function ChatWithData() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api/chat-with-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setResponse(data);
    setLoading(false);
  };

  return (
    <div className="p-10 bg-white shadow rounded-2xl">
      <h1 className="text-2xl font-semibold mb-4">💬 Chat with Data</h1>

      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask something like: Top 5 vendors by spend..."
        className="border border-gray-300 w-full p-3 rounded mb-4"
      />

      <button
        onClick={handleSubmit}
        disabled={!query || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Ask"}
      </button>

      {response && (
        <div className="mt-6">
          <h2 className="font-semibold text-gray-800 mb-2">Generated SQL:</h2>
          <pre className="bg-gray-100 p-3 rounded text-sm text-gray-700">
            {response.generatedSQL}
          </pre>

          <h2 className="font-semibold text-gray-800 mt-4 mb-2">Results:</h2>
          <table className="min-w-full text-left border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Vendor</th>
                <th className="p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {response.results.map((r: any, i: number) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{r.vendor}</td>
                  <td className="p-2">${r.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
