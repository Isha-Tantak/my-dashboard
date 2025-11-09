import { NextResponse } from "next/server";

const VANNA_API_BASE_URL = process.env.VANNA_API_BASE_URL || "http://localhost:8000";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const response = await fetch(`${VANNA_API_BASE_URL}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Vanna API error: ${errorText}`);
    }

    const result = await response.json();

    // Expected format from Vanna:
    // {
    //   "sql": "SELECT vendor_name, SUM(amount) AS total_spend FROM invoices GROUP BY vendor_name ORDER BY total_spend DESC LIMIT 5;",
    //   "data": [
    //     { "vendor_name": "Amazon", "total_spend": 12000 },
    //     { "vendor_name": "Google", "total_spend": 8500 }
    //   ]
    // }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in /chat-with-data:", error);
    return NextResponse.json(
      { error: "Failed to process chat query" },
      { status: 500 }
    );
  }
}
