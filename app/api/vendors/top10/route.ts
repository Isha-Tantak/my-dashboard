import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    // Get top 10 vendors by total invoice spend
    const vendors = await prisma.invoice.groupBy({
      by: ["vendorId"],
      _sum: { invoiceTotal: true },
      orderBy: { _sum: { invoiceTotal: "desc" } },
      take: 10,
    });

    // Add vendor names
    const result = await Promise.all(
      vendors.map(async (v) => {
        const vendor = await prisma.vendor.findUnique({
          where: { id: v.vendorId },
          select: { name: true },
        });
        return {
          vendorName: vendor?.name || "Unknown Vendor",
          totalSpend: v._sum.invoiceTotal || 0,
        };
      })
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching top vendors:", error);
    return NextResponse.json({ error: "Failed to fetch top vendors" }, { status: 500 });
  }
}
