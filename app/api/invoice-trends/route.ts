import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET() {
  try {
    // Group invoices by month and sum totals
    const trends = await prisma.invoice.groupBy({
      by: ["invoiceDate"],
      _sum: { invoiceTotal: true },
      _count: { id: true },
      orderBy: { invoiceDate: "asc" },
    });

    // Convert dates to "YYYY-MM" and aggregate monthly
    const monthly: Record<string, { count: number; total: number }> = {};

    for (const t of trends) {
      if (!t.invoiceDate) continue;
      const month = t.invoiceDate.toISOString().slice(0, 7);
      if (!monthly[month]) monthly[month] = { count: 0, total: 0 };
      monthly[month].count += t._count.id;
      monthly[month].total += t._sum.invoiceTotal || 0;
    }

    const result = Object.entries(monthly).map(([month, data]) => ({
      month,
      invoiceCount: data.count,
      totalValue: data.total,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching invoice trends:", error);
    return NextResponse.json({ error: "Failed to fetch invoice trends" }, { status: 500 });
  }
}
