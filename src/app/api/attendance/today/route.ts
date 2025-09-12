// // src/app/api/attendance/today/route.ts
// import { NextResponse } from "next/server";
// import { prisma } from "../../../../../lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";

// // Helper: get start & end of today in UTC corresponding to local day
// function getUTCDayRange(date: Date) {
//   // Local year, month, day
//   const year = date.getFullYear();
//   const month = date.getMonth();
//   const day = date.getDate();

//   // Start of day in local time
//   const startLocal = new Date(year, month, day, 0, 0, 0, 0);
//   const endLocal = new Date(year, month, day, 23, 59, 59, 999);

//   // Convert to UTC for DB query
//   const startUTC = new Date(startLocal.getTime() - startLocal.getTimezoneOffset() * 60000);
//   const endUTC = new Date(endLocal.getTime() - endLocal.getTimezoneOffset() * 60000);

//   return { startUTC, endUTC };
// }

// export async function GET(req: Request) {
//   try {
//     const { userId } = getAuth(req as any);
//     if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const now = new Date();
//     const { startUTC, endUTC } = getUTCDayRange(now);

//     const attendance = await prisma.attendance.findFirst({
//       where: {
//         userId,
//         date: { gte: startUTC, lte: endUTC },
//       },
//       orderBy: { createdAt: "desc" },
//     });

//     if (!attendance) {
//       return NextResponse.json({ attendance: null });
//     }

//     return NextResponse.json({
//       attendance: {
//         ...attendance,
//         checkIn: attendance.checkIn || null,
//         checkOut: attendance.checkOut || null,
//         workingHours: attendance.workingHours || 0,
//         overtimeHours: attendance.overtimeHours || 0,
//         status: attendance.status || null,
//         verified: attendance.verified || false,
//         remarks: attendance.remarks || null,
//       },
//     });
//   } catch (err: any) {
//     console.error("Failed to fetch today's attendance:", err);
//     return NextResponse.json(
//       { error: "Failed to fetch attendance", details: err.message },
//       { status: 500 }
//     );
//   }
// }




// src/app/api/attendance/today/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import moment from "moment-timezone";

// Helper: get today's start & end in IST, then convert to UTC for DB query
function getISTDayRange() {
  const now = moment().tz("Asia/Kolkata");
  const startIST = now.clone().startOf("day");
  const endIST = now.clone().endOf("day");

  return {
    startUTC: startIST.clone().utc().toDate(),
    endUTC: endIST.clone().utc().toDate(),
  };
}

// ✅ Fetch today's attendance
export async function GET(req: Request) {
  try {
    const { userId } = getAuth(req as any);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { startUTC, endUTC } = getISTDayRange();

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

// ✅ Mark attendance (Check-in / Check-out)
export async function POST(req: Request) {
  try {
    const { userId } = getAuth(req as any);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const nowIST = moment().tz("Asia/Kolkata");
    const hours = nowIST.hour();

    // ⏰ Allow only between 7 AM and 7 PM IST
    if (hours < 7 || hours >= 19) {
      return NextResponse.json(
        { error: "Check-in allowed only between 7 AM and 7 PM" },
        { status: 400 }
      );
    }

    const { startUTC, endUTC } = getISTDayRange();

    // Check if user already has an attendance record today
    let attendance = await prisma.attendance.findFirst({
      where: {
        userId,
        date: { gte: startUTC, lte: endUTC },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!attendance) {
      // First check-in
      attendance = await prisma.attendance.create({
        data: {
          userId,
          date: nowIST.startOf("day").utc().toDate(),
          checkIn: nowIST.toDate(),
        },
      });
    } else if (!attendance.checkOut) {
      // Mark check-out
      attendance = await prisma.attendance.update({
        where: { id: attendance.id },
        data: {
          checkOut: nowIST.toDate(),
        },
      });
    }

    return NextResponse.json({ success: true, attendance });
  } catch (err: any) {
    console.error("Failed to mark attendance:", err);
    return NextResponse.json(
      { error: "Failed to mark attendance", details: err.message },
      { status: 500 }
    );
  }
}
