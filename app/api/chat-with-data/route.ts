import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { query } = await req.json();

  // Mock response that simulates AI + SQL
  const fakeSQL =
    "SELECT vendor, SUM(invoice_total) FROM invoices GROUP BY vendor;";
  const mockResults = [
    { vendor: "ABC Corp", total: 24000 },
    { vendor: "XYZ Pvt Ltd", total: 18000 },
  ];

  return NextResponse.json({
    message: `You asked: "${query}"`,
    generatedSQL: fakeSQL,
    results: mockResults,
  });
}
