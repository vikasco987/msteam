import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

// GET /api/attendance/monthly?month=2025-09
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const month = searchParams.get("month"); // YYYY-MM
    if (!month) {
      return NextResponse.json({ error: "Month is required" }, { status: 400 });
    }

    const [year, monthNum] = month.split("-").map(Number);
    const startDate = new Date(year, monthNum - 1, 1);
    const endDate = new Date(year, monthNum, 0); // last day of month

    // fetch attendance records for that month
    const records = await prisma.attendance.findMany({
      where: {
        date: { gte: startDate, lte: endDate },
      },
      orderBy: { date: "asc" },
    });

    if (records.length === 0) {
      return NextResponse.json({
        headers: ["Employee"],
        rows: [],
      });
    }

    // unique employees
    const userIds = [...new Set(records.map(r => r.userId))];

    // fetch names from Clerk
    const userMap = new Map<string, string>();
    for (const id of userIds) {
      try {
        const user = await clerkClient.users.getUser(id);
        userMap.set(id, `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Unknown");
      } catch {
        userMap.set(id, "Unknown");
      }
    }

    // build headers: Employee + days + Total Hours
    const daysInMonth = endDate.getDate();
    const headers = ["Employee", ...Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`), "Total Hours"];

    // group by employee
    const rows = userIds.map(userId => {
      const empRecords = records.filter(r => r.userId === userId);
      const row: Record<string, string> = { Employee: userMap.get(userId) || "Unknown" };
      let totalHours = 0;

      for (let d = 1; d <= daysInMonth; d++) {
        const day = new Date(year, monthNum - 1, d).toISOString().split("T")[0];
        const rec = empRecords.find(r => r.date.toISOString().split("T")[0] === day);

        if (rec) {
          row[d.toString()] = `${rec.checkIn || "-"} / ${rec.checkOut || "-"}`;
          totalHours += rec.workingHours || 0;
        } else {
          row[d.toString()] = "Absent";
        }
      }

      row["Total Hours"] = `${totalHours} hr`;
      return row;
    });

    return NextResponse.json({ headers, rows });
  } catch (error) {
    console.error("💥 Monthly attendance failed:", error);
    return NextResponse.json({ error: "Failed to fetch monthly attendance" }, { status: 500 });
  }
}
