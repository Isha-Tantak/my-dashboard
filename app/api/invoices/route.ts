import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");

    const skip = (page - 1) * pageSize;

    const where: any = {
      AND: [
        search
          ? {
              OR: [
                { invoiceId: { contains: search, mode: "insensitive" } },
                { vendor: { vendorName: { contains: search, mode: "insensitive" } } },
              ],
            }
          : {},
        startDate && endDate
          ? {
              invoiceDate: {
                gte: new Date(startDate),
                lte: new Date(endDate),
              },
            }
          : {},
      ],
    };

    const [invoices, totalCount] = await Promise.all([
      prisma.invoice.findMany({
        where,
        include: {
          vendor: true,
          payments: true,
        },
        skip,
        take: pageSize,
        orderBy: { invoiceDate: "desc" },
      }),
      prisma.invoice.count({ where }),
    ]);

    return NextResponse.json({
      data: invoices,
      pagination: {
        total: totalCount,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 });
  }
}
