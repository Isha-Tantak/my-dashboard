import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const payments = await prisma.payment.findMany({
      select: {
        dueDate: true,
        amount: true,
      },
    });

    // Group by due date
    const grouped = payments.reduce((acc: any, curr) => {
      const date = curr.dueDate ? new Date(curr.dueDate).toISOString().split("T")[0] : "Unknown";
      acc[date] = (acc[date] || 0) + (curr.amount || 0);
      return acc;
    }, {});

    const data = Object.entries(grouped).map(([dueDate, total]) => ({
      dueDate,
      total,
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching cash outflow:", error);
    return NextResponse.json({ error: "Failed to fetch cash outflow" }, { status: 500 });
  }
}
