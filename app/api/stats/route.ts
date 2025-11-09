// app/api/stats/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET() {
  try {
    const totalInvoices = await prisma.invoice.count();
    const totalSpend = await prisma.invoice.aggregate({
      _sum: { invoiceTotal: true },
    });
    const totalDocs = await prisma.document.count();
    const avgInvoiceValue = await prisma.invoice.aggregate({
      _avg: { invoiceTotal: true },
    });

    return NextResponse.json({
      totalInvoices,
      totalSpend: totalSpend._sum.invoiceTotal || 0,
      totalDocuments: totalDocs,
      avgInvoiceValue: avgInvoiceValue._avg.invoiceTotal || 0,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
