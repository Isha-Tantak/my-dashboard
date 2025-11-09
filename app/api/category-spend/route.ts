import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET() {
  try {
    // Get all vendors + spend
    const invoices = await prisma.invoice.findMany({
      include: { vendor: true },
    });

    // Basic category classification
    const categories: Record<string, number> = {};

    invoices.forEach((inv) => {
      const vendorName = inv.vendor?.name?.toLowerCase() || "uncategorized";
      let category = "Others";

      if (vendorName.includes("software") || vendorName.includes("tech"))
        category = "Software & IT";
      else if (vendorName.includes("consult") || vendorName.includes("advisory"))
        category = "Consulting";
      else if (vendorName.includes("food") || vendorName.includes("cafe"))
        category = "Food & Beverages";
      else if (vendorName.includes("supplies") || vendorName.includes("stationery"))
        category = "Office Supplies";
      else if (vendorName.includes("gmbh") || vendorName.includes("firma"))
        category = "Vendors (Germany)";

      categories[category] = (categories[category] || 0) + (inv.invoiceTotal || 0);
    });

    // Convert to array
    const result = Object.entries(categories).map(([category, spend]) => ({
      category,
      spend,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching category spend:", error);
    return NextResponse.json({ error: "Failed to fetch category spend" }, { status: 500 });
  }
}
