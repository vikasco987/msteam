import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const type = searchParams.get("type") || "day";
    const start = searchParams.get("start");
    const end = searchParams.get("end");
    const limit = Number(searchParams.get("limit") || 10);
    const page = Number(searchParams.get("page") || 1);

    if (!start || !end) {
      return NextResponse.json(
        { message: "Start and end dates are required." },
        { status: 400 }
      );
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    // Fetch tasks in date range
    const tasks = await prisma.task.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        createdAt: true,
        amount: true,
      },
    });

    // Grouping logic
    const groupBy: Record<string, { totalSales: number; totalRevenue: number }> = {};

    tasks.forEach((task) => {
      let key = "";

      const dateObj = new Date(task.createdAt);

      if (type === "day") {
        key = dateObj.toISOString().split("T")[0];
      } else if (type === "week") {
        const year = dateObj.getUTCFullYear();
        const week = getWeekNumber(dateObj);
        key = `${year}-W${week}`;
      } else if (type === "month") {
        key = `${dateObj.getUTCFullYear()}-${(dateObj.getUTCMonth() + 1)
          .toString()
          .padStart(2, "0")}`;
      } else {
        return NextResponse.json(
          { message: "Invalid type (use day, week, month)" },
          { status: 400 }
        );
      }

      if (!groupBy[key]) {
        groupBy[key] = { totalSales: 0, totalRevenue: 0 };
      }

      groupBy[key].totalSales += 1;
      groupBy[key].totalRevenue += task.amount || 0;
    });

    // Convert to array & sort
    const resultArray = Object.entries(groupBy)
      .map(([period, data]) => ({
        period,
        totalSales: data.totalSales,
        totalRevenue: data.totalRevenue,
      }))
      .sort((a, b) => (a.period > b.period ? 1 : -1));

    // Pagination
    const totalRecords = resultArray.length;
    const totalPages = Math.ceil(totalRecords / limit);
    const paginatedData = resultArray.slice(
      (page - 1) * limit,
      page * limit
    );

    return NextResponse.json({ data: paginatedData, totalPages });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Server Error", error: String(err) },
      { status: 500 }
    );
  }
}

// Helper: Get week number of the year
function getWeekNumber(d: Date) {
  const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((+date - +yearStart) / 86400000 + 1) / 7);
}
