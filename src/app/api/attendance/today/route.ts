// src/app/api/attendance/today/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

// Helper: get start & end of today in UTC corresponding to local day
function getUTCDayRange(date: Date) {
  // Local year, month, day
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  // Start of day in local time
  const startLocal = new Date(year, month, day, 0, 0, 0, 0);
  const endLocal = new Date(year, month, day, 23, 59, 59, 999);

  // Convert to UTC for DB query
  const startUTC = new Date(startLocal.getTime() - startLocal.getTimezoneOffset() * 60000);
  const endUTC = new Date(endLocal.getTime() - endLocal.getTimezoneOffset() * 60000);

  return { startUTC, endUTC };
}

export async function GET(req: Request) {
  try {
    const { userId } = getAuth(req as any);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const now = new Date();
    const { startUTC, endUTC } = getUTCDayRange(now);

    const attendance = await prisma.attendance.findFirst({
      where: {
        userId,
        date: { gte: startUTC, lte: endUTC },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!attendance) {
      return NextResponse.json({ attendance: null });
    }

    return NextResponse.json({
      attendance: {
        ...attendance,
        checkIn: attendance.checkIn || null,
        checkOut: attendance.checkOut || null,
        workingHours: attendance.workingHours || 0,
        overtimeHours: attendance.overtimeHours || 0,
        status: attendance.status || null,
        verified: attendance.verified || false,
        remarks: attendance.remarks || null,
      },
    });
  } catch (err: any) {
    console.error("Failed to fetch today's attendance:", err);
    return NextResponse.json(
      { error: "Failed to fetch attendance", details: err.message },
      { status: 500 }
    );
  }
}
