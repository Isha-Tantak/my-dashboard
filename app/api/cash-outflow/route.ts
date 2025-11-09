import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET() {
  try {
    const payments = await prisma.payment.groupBy({
      by: ["dueDate"],
      _sum: { amount: true },
      orderBy: { dueDate: "asc" },
    });

    // Format data for chart
    const forecast = payments
      .filter((p) => p.dueDate)
      .map((p) => ({
        dueDate: new Date(p.dueDate as Date).toISOString().split("T")[0],
        amountDue: p._sum.amount || 0,
      }));

    return NextResponse.json(forecast);
  } catch (error) {
    console.error("Error fetching cash outflow:", error);
    return NextResponse.json({ error: "Failed to fetch cash outflow" }, { status: 500 });
  }
}
