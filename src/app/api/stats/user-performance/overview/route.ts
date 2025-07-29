import { NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";

export async function GET() {
  try {
    const tasks = await prisma.task.findMany();

    const totalRevenue = tasks.reduce((sum, t) => sum + (t.amount || 0), 0);
    const amountReceived = tasks.reduce((sum, t) => sum + (t.received || 0), 0);
    const pendingAmount = totalRevenue - amountReceived;
    const totalSales = tasks.length;

    return NextResponse.json({
      totalRevenue,
      amountReceived,
      pendingAmount,
      totalSales,
    });
  } catch (err) {
    console.error("Error fetching overview stats:", err);
    return NextResponse.json({ error: "Failed to load overview stats" }, { status: 500 });
  }
}
