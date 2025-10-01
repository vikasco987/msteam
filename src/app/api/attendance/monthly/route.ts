// import { NextResponse } from "next/server";
// import { prisma } from "../../../../../lib/prisma";
// import { clerkClient } from "@clerk/nextjs/server";

// // GET /api/attendance/monthly?month=2025-09
// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const month = searchParams.get("month"); // YYYY-MM
//     if (!month) {
//       return NextResponse.json({ error: "Month is required" }, { status: 400 });
//     }

//     const [year, monthNum] = month.split("-").map(Number);
//     const startDate = new Date(year, monthNum - 1, 1);
//     const endDate = new Date(year, monthNum, 0); // last day of month

//     // fetch attendance records for that month
//     const records = await prisma.attendance.findMany({
//       where: {
//         date: { gte: startDate, lte: endDate },
//       },
//       orderBy: { date: "asc" },
//     });

//     if (records.length === 0) {
//       return NextResponse.json({
//         headers: ["Employee"],
//         rows: [],
//       });
//     }

//     // unique employees
//     const userIds = [...new Set(records.map(r => r.userId))];

//     // fetch names from Clerk or fallback to DB
//     const userMap = new Map<string, string>();
//     for (const id of userIds) {
//       try {
//         const user = await clerkClient.users.getUser(id);
//         userMap.set(
//           id,
//           `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
//             records.find(r => r.userId === id)?.employeeName ||
//             "Unknown"
//         );
//       } catch {
//         const fallback =
//           records.find(r => r.userId === id)?.employeeName || "Unknown";
//         userMap.set(id, fallback);
//       }
//     }

//     // build headers: Employee + days + Total Hours
//     const daysInMonth = endDate.getDate();
//     const headers = [
//       "Employee",
//       ...Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`),
//       "Total Hours",
//     ];

//     // group by employee
//     const rows = userIds.map(userId => {
//       const empRecords = records.filter(r => r.userId === userId);
//       const row: Record<string, string> = {
//         Employee: userMap.get(userId) || "Unknown",
//       };
//       let totalMinutes = 0;

//       for (let d = 1; d <= daysInMonth; d++) {
//         const day = new Date(year, monthNum - 1, d).toISOString().split("T")[0];
//         const rec = empRecords.find(
//           r => r.date.toISOString().split("T")[0] === day
//         );

//         if (rec) {
//           if (rec.checkIn && rec.checkOut) {
//             row[d.toString()] = "✅";
//           } else {
//             row[d.toString()] = "⏳";
//           }
//           totalMinutes += rec.workingHours || 0;
//         } else {
//           row[d.toString()] = "❌";
//         }
//       }

//       // format hours
//       const hrs = Math.floor(totalMinutes / 60);
//       const mins = totalMinutes % 60;
//       row["Total Hours"] =
//         hrs && mins ? `${hrs} hr ${mins} min` : hrs ? `${hrs} hr` : `${mins} min`;

//       return row;
//     });

//     return NextResponse.json({ headers, rows });
//   } catch (error) {
//     console.error("💥 Monthly attendance failed:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch monthly attendance" },
//       { status: 500 }
//     );
//   }
// }













// import { NextResponse } from "next/server";
// import { prisma } from "../../../../../lib/prisma";
// import { clerkClient } from "@clerk/nextjs/server";

// // GET /api/attendance/monthly?month=2025-09
// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const month = searchParams.get("month"); // YYYY-MM
//     if (!month) {
//       return NextResponse.json({ error: "Month is required" }, { status: 400 });
//     }

//     const [year, monthNum] = month.split("-").map(Number);
//     const startDate = new Date(year, monthNum - 1, 1);
//     const endDate = new Date(year, monthNum, 0); // last day of month

//     // ✅ fetch attendance records
//     const records = await prisma.attendance.findMany({
//       where: {
//         date: { gte: startDate, lte: endDate },
//       },
//       orderBy: { date: "asc" },
//     });

//     // ✅ fetch ALL users from Clerk (with pagination)
//     const allUsers: any[] = [];
//     let page = 1;
//     while (true) {
//       const res = await clerkClient.users.getUserList({ limit: 100, page });
//       allUsers.push(...res.data);
//       if (!res.hasNextPage) break;
//       page++;
//     }

//     // ✅ create user map
//     const userMap = new Map<string, string>();
//     for (const u of allUsers) {
//       userMap.set(
//         u.id,
//         `${u.firstName || ""} ${u.lastName || ""}`.trim() ||
//           u.emailAddresses[0]?.emailAddress ||
//           "Unknown"
//       );
//     }

//     // ✅ build headers: Employee + days + Total Hours
//     const daysInMonth = endDate.getDate();
//     const headers = [
//       "Employee",
//       ...Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`),
//       "Total Hours",
//     ];

//     // ✅ build rows for *all users*
//     const rows = allUsers.map((user) => {
//       const empRecords = records.filter((r) => r.userId === user.id);
//       const row: Record<string, string> = {
//         Employee: userMap.get(user.id) || "Unknown",
//       };
//       let totalMinutes = 0;

//       for (let d = 1; d <= daysInMonth; d++) {
//         const day = new Date(year, monthNum - 1, d).toISOString().split("T")[0];
//         const rec = empRecords.find(
//           (r) => r.date.toISOString().split("T")[0] === day
//         );

//         if (rec) {
//           if (rec.checkIn && rec.checkOut) {
//             row[d.toString()] = "✅"; // full attendance
//           } else {
//             row[d.toString()] = "⏳"; // partial
//           }
//           totalMinutes += rec.workingHours || 0;
//         } else {
//           row[d.toString()] = "❌"; // absent
//         }
//       }

//       // ✅ format hours
//       const hrs = Math.floor(totalMinutes / 60);
//       const mins = totalMinutes % 60;
//       row["Total Hours"] =
//         hrs && mins
//           ? `${hrs} hr ${mins} min`
//           : hrs
//           ? `${hrs} hr`
//           : `${mins} min`;

//       return row;
//     });

//     return NextResponse.json({ headers, rows });
//   } catch (error) {
//     console.error("💥 Monthly attendance failed:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch monthly attendance" },
//       { status: 500 }
//     );
//   }
// }
















// import { NextResponse } from "next/server";
// import { prisma } from "../../../../../lib/prisma";
// import { clerkClient } from "@clerk/nextjs/server";

// // GET /api/attendance/monthly?month=2025-09
// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const month = searchParams.get("month"); // YYYY-MM
//     if (!month) {
//       return NextResponse.json({ error: "Month is required" }, { status: 400 });
//     }

//     const [year, monthNum] = month.split("-").map(Number);
//     const startDate = new Date(year, monthNum - 1, 1);
//     const endDate = new Date(year, monthNum, 0); // last day of month

//     // fetch attendance records for that month
//     const records = await prisma.attendance.findMany({
//       where: {
//         date: { gte: startDate, lte: endDate },
//       },
//       orderBy: { date: "asc" },
//     });

//     if (records.length === 0) {
//       return NextResponse.json({
//         headers: ["Employee"],
//         rows: [],
//       });
//     }

//     // unique employees
//     const userIds = [...new Set(records.map(r => r.userId))];

//     // fetch names from Clerk or fallback to DB
//     const userMap = new Map<string, string>();
//     for (const id of userIds) {
//       try {
//         const user = await clerkClient.users.getUser(id);
//         userMap.set(
//           id,
//           `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
//             records.find(r => r.userId === id)?.employeeName ||
//             "Unknown"
//         );
//       } catch {
//         const fallback =
//           records.find(r => r.userId === id)?.employeeName || "Unknown";
//         userMap.set(id, fallback);
//       }
//     }

//     // build headers: Employee + days + Total Hours
//     const daysInMonth = endDate.getDate();
//     const headers = [
//       "Employee",
//       ...Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`),
//       "Total Hours",
//     ];

//     // group by employee
//     const rows = userIds.map(userId => {
//       const empRecords = records.filter(r => r.userId === userId);
//       const row: Record<string, string> = {
//         Employee: userMap.get(userId) || "Unknown",
//       };
//       let totalMinutes = 0;

//       for (let d = 1; d <= daysInMonth; d++) {
//         const day = new Date(year, monthNum - 1, d).toISOString().split("T")[0];
//         const rec = empRecords.find(
//           r => r.date.toISOString().split("T")[0] === day
//         );

//         if (rec) {
//           if (rec.checkIn && rec.checkOut) {
//             row[d.toString()] = "✅";
//           } else {
//             row[d.toString()] = "⏳";
//           }
//           totalMinutes += rec.workingHours || 0;
//         } else {
//           row[d.toString()] = "❌";
//         }
//       }

//       // format hours
//       const hrs = Math.floor(totalMinutes / 60);
//       const mins = totalMinutes % 60;
//       row["Total Hours"] =
//         hrs && mins ? `${hrs} hr ${mins} min` : hrs ? `${hrs} hr` : `${mins} min`;

//       return row;
//     });

//     return NextResponse.json({ headers, rows });
//   } catch (error) {
//     console.error("💥 Monthly attendance failed:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch monthly attendance" },
//       { status: 500 }
//     );
//   }
// }










// import { NextResponse } from "next/server";
// import { prisma } from "../../../../../lib/prisma";
// import { users } from "@clerk/clerk-sdk-node"; // ✅ use correct import

// // GET /api/attendance/monthly?month=YYYY-MM
// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const month = searchParams.get("month");
//     if (!month) return NextResponse.json({ error: "Month is required" }, { status: 400 });

//     const [year, monthNum] = month.split("-").map(Number);
//     const startDate = new Date(year, monthNum - 1, 1);
//     const endDate = new Date(year, monthNum, 0);

//     // fetch attendance records
//     const records = await prisma.attendance.findMany({
//       where: { date: { gte: startDate, lte: endDate } },
//       orderBy: { date: "asc" },
//     });

//     if (records.length === 0) {
//       return NextResponse.json({ headers: ["Employee"], rows: [] });
//     }

//     // unique userIds
//     const userIds = [...new Set(records.map(r => r.userId))];

//     // fetch names from Clerk
//     const userMap = new Map<string, string>();
//     for (const id of userIds) {
//       try {
//         const user = await users.getUser(id); // ✅ use users.getUser
//         userMap.set(
//           id,
//           `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
//             records.find(r => r.userId === id)?.employeeName ||
//             "Unknown"
//         );
//       } catch {
//         const fallback = records.find(r => r.userId === id)?.employeeName || "Unknown";
//         userMap.set(id, fallback);
//       }
//     }

//     const daysInMonth = endDate.getDate();
//     const headers = ["Employee", ...Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`), "Total Hours"];

//     const rows = userIds.map(userId => {
//       const empRecords = records.filter(r => r.userId === userId);
//       const row: Record<string, string> = { Employee: userMap.get(userId) || "Unknown" };
//       let totalMinutes = 0;

//       for (let d = 1; d <= daysInMonth; d++) {
//         const day = new Date(year, monthNum - 1, d).toISOString().split("T")[0];
//         const rec = empRecords.find(r => r.date.toISOString().split("T")[0] === day);

//         if (rec) {
//           row[d.toString()] = rec.checkIn && rec.checkOut ? "✅" : "⏳";
//           totalMinutes += rec.workingHours || 0;
//         } else {
//           row[d.toString()] = "❌";
//         }
//       }

//       const hrs = Math.floor(totalMinutes / 60);
//       const mins = totalMinutes % 60;
//       row["Total Hours"] = hrs && mins ? `${hrs} hr ${mins} min` : hrs ? `${hrs} hr` : `${mins} min`;

//       return row;
//     });

//     return NextResponse.json({ headers, rows });
//   } catch (error) {
//     console.error("💥 Monthly attendance failed:", error);
//     return NextResponse.json({ error: "Failed to fetch monthly attendance" }, { status: 500 });
//   }
// }





// import { NextResponse } from "next/server";
// import { prisma } from "../../../../../lib/prisma";
// import { users } from "@clerk/clerk-sdk-node";

// // Helper: format date in IST as YYYY-MM-DD
// function formatDateIST(date: Date) {
//   return date.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
// }

// // GET /api/attendance/monthly?month=YYYY-MM
// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const month = searchParams.get("month");
//     if (!month) return NextResponse.json({ error: "Month is required" }, { status: 400 });

//     const [year, monthNum] = month.split("-").map(Number);
//     const startDate = new Date(year, monthNum - 1, 1);
//     const endDate = new Date(year, monthNum, 0);

//     // fetch attendance records
//     const records = await prisma.attendance.findMany({
//       where: { date: { gte: startDate, lte: endDate } },
//       orderBy: { date: "asc" },
//     });

//     if (records.length === 0) {
//       return NextResponse.json({ headers: ["Employee"], rows: [] });
//     }

//     // unique userIds
//     const userIds = [...new Set(records.map(r => r.userId))];

//     // fetch names from Clerk
//     const userMap = new Map<string, string>();
//     for (const id of userIds) {
//       try {
//         const user = await users.getUser(id);
//         userMap.set(
//           id,
//           `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
//             records.find(r => r.userId === id)?.employeeName ||
//             "Unknown"
//         );
//       } catch {
//         const fallback = records.find(r => r.userId === id)?.employeeName || "Unknown";
//         userMap.set(id, fallback);
//       }
//     }

//     const daysInMonth = endDate.getDate();
//     const headers = ["Employee", ...Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`), "Total Hours"];

//     const rows = userIds.map(userId => {
//       const empRecords = records.filter(r => r.userId === userId);
//       const row: Record<string, string> = { Employee: userMap.get(userId) || "Unknown" };
//       let totalMinutes = 0;

//       for (let d = 1; d <= daysInMonth; d++) {
//         const day = formatDateIST(new Date(year, monthNum - 1, d));

//         const rec = empRecords.find(r => formatDateIST(r.date) === day);

//         if (rec) {
//           row[d.toString()] = rec.checkIn && rec.checkOut ? "✅" : "⏳";
//           totalMinutes += rec.workingHours || 0;
//         } else {
//           row[d.toString()] = "❌";
//         }
//       }

//       const hrs = Math.floor(totalMinutes / 60);
//       const mins = totalMinutes % 60;
//       row["Total Hours"] = hrs && mins ? `${hrs} hr ${mins} min` : hrs ? `${hrs} hr` : `${mins} min`;

//       return row;
//     });

//     return NextResponse.json({ headers, rows });
//   } catch (error) {
//     console.error("💥 Monthly attendance failed:", error);
//     return NextResponse.json({ error: "Failed to fetch monthly attendance" }, { status: 500 });
//   }
// }



// import { NextResponse } from "next/server";
// import { prisma } from "../../../../../lib/prisma";
// import { users } from "@clerk/clerk-sdk-node"; // ✅ correct import

// // GET /api/attendance/monthly?month=YYYY-MM
// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const month = searchParams.get("month");
//     if (!month)
//       return NextResponse.json({ error: "Month is required" }, { status: 400 });

//     const [year, monthNum] = month.split("-").map(Number);
//     const startDate = new Date(year, monthNum - 1, 1);
//     const endDate = new Date(year, monthNum, 0);

//     // fetch attendance records
//     const records = await prisma.attendance.findMany({
//       where: { date: { gte: startDate, lte: endDate } },
//       orderBy: { date: "asc" },
//     });

//     if (records.length === 0) {
//       return NextResponse.json({ headers: ["Employee"], rows: [] });
//     }

//     // unique userIds
//     const userIds = [...new Set(records.map((r) => r.userId))];

//     // fetch names from Clerk
//     const userMap = new Map<string, string>();
//     for (const id of userIds) {
//       try {
//         const user = await users.getUser(id);
//         userMap.set(
//           id,
//           `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
//             records.find((r) => r.userId === id)?.employeeName ||
//             "Unknown"
//         );
//       } catch {
//         const fallback =
//           records.find((r) => r.userId === id)?.employeeName || "Unknown";
//         userMap.set(id, fallback);
//       }
//     }

//     const daysInMonth = endDate.getDate();
//     const headers = [
//       "Employee",
//       ...Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`),
//       "Total Hours",
//     ];

//     const rows = userIds.map((userId) => {
//       const empRecords = records.filter((r) => r.userId === userId);
//       const row: Record<string, string> = {
//         Employee: userMap.get(userId) || "Unknown",
//       };
//       let totalMinutes = 0;

//       for (let d = 1; d <= daysInMonth; d++) {
//         const targetDay = new Date(year, monthNum - 1, d);
//         targetDay.setHours(0, 0, 0, 0); // normalize target day (local midnight)

//         const rec = empRecords.find((r) => {
//           const localDay = new Date(r.date);
//           // ✅ convert DB UTC date into local IST date
//           localDay.setMinutes(
//             localDay.getMinutes() - localDay.getTimezoneOffset()
//           );
//           localDay.setHours(0, 0, 0, 0);
//           return localDay.getTime() === targetDay.getTime();
//         });

//         if (rec) {
//           row[d.toString()] =
//             rec.checkIn && rec.checkOut ? "✅" : "⏳";
//           totalMinutes += rec.workingHours || 0;
//         } else {
//           row[d.toString()] = "❌";
//         }
//       }

//       const hrs = Math.floor(totalMinutes / 60);
//       const mins = totalMinutes % 60;
//       row["Total Hours"] =
//         hrs && mins
//           ? `${hrs} hr ${mins} min`
//           : hrs
//           ? `${hrs} hr`
//           : `${mins} min`;

//       return row;
//     });

//     return NextResponse.json({ headers, rows });
//   } catch (error) {
//     console.error("💥 Monthly attendance failed:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch monthly attendance" },
//       { status: 500 }
//     );
//   }
// }






// import { NextResponse } from "next/server";
// import { prisma } from "../../../../../lib/prisma";
// import { users } from "@clerk/clerk-sdk-node";

// // Helper: convert UTC date to IST date (YYYY-MM-DD)
// function getISTDate(date: Date) {
//   const utc = date.getTime();
//   const istOffset = 5.5 * 60 * 60 * 1000; // IST = UTC+5:30
//   const istTime = new Date(utc + istOffset);
//   istTime.setHours(0, 0, 0, 0); // normalize to midnight
//   return istTime.getTime();
// }

// // GET /api/attendance/monthly?month=YYYY-MM
// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const month = searchParams.get("month");
//     if (!month)
//       return NextResponse.json({ error: "Month is required" }, { status: 400 });

//     const [year, monthNum] = month.split("-").map(Number);
//     const startDate = new Date(year, monthNum - 1, 1);
//     const endDate = new Date(year, monthNum, 0);

//     // fetch attendance records
//     const records = await prisma.attendance.findMany({
//       where: { date: { gte: startDate, lte: endDate } },
//       orderBy: { date: "asc" },
//     });

//     if (records.length === 0) {
//       return NextResponse.json({ headers: ["Employee"], rows: [] });
//     }

//     // unique userIds
//     const userIds = [...new Set(records.map((r) => r.userId))];

//     // fetch names from Clerk
//     const userMap = new Map<string, string>();
//     for (const id of userIds) {
//       try {
//         const user = await users.getUser(id);
//         userMap.set(
//           id,
//           `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
//             records.find((r) => r.userId === id)?.employeeName ||
//             "Unknown"
//         );
//       } catch {
//         const fallback =
//           records.find((r) => r.userId === id)?.employeeName || "Unknown";
//         userMap.set(id, fallback);
//       }
//     }

//     const daysInMonth = endDate.getDate();
//     const headers = [
//       "Employee",
//       ...Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`),
//       "Total Hours",
//     ];

//     const rows = userIds.map((userId) => {
//       const empRecords = records.filter((r) => r.userId === userId);
//       const row: Record<string, string> = {
//         Employee: userMap.get(userId) || "Unknown",
//       };
//       let totalMinutes = 0;

//       for (let d = 1; d <= daysInMonth; d++) {
//         const targetDay = new Date(year, monthNum - 1, d);
//         targetDay.setHours(0, 0, 0, 0); // normalize target day
//         const targetTime = targetDay.getTime();

//         const rec = empRecords.find((r) => {
//           const istTime = getISTDate(r.date);
//           return istTime === targetTime;
//         });

//         if (rec) {
//           row[d.toString()] =
//             rec.checkIn && rec.checkOut ? "✅" : "⏳";
//           totalMinutes += rec.workingHours || 0;
//         } else {
//           row[d.toString()] = "❌";
//         }
//       }

//       const hrs = Math.floor(totalMinutes / 60);
//       const mins = totalMinutes % 60;
//       row["Total Hours"] =
//         hrs && mins
//           ? `${hrs} hr ${mins} min`
//           : hrs
//           ? `${hrs} hr`
//           : `${mins} min`;

//       return row;
//     });

//     return NextResponse.json({ headers, rows });
//   } catch (error) {
//     console.error("💥 Monthly attendance failed:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch monthly attendance" },
//       { status: 500 }
//     );
//   }
// }





import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { users } from "@clerk/clerk-sdk-node";

// -------------------- Helpers --------------------
// Hardcoded shift: subtract 1 day from a date
function shiftDateBackOneDay(date: Date) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() - 1);
  return newDate;
}

// Convert UTC date to IST calendar day object
function getISTDateParts(date: Date) {
  // Apply hardcoded 1-day shift
  const shifted = shiftDateBackOneDay(date);

  const istDate = new Date(shifted.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  return {
    year: istDate.getFullYear(),
    month: istDate.getMonth() + 1,
    day: istDate.getDate(),
  };
}

// Compare two IST dates by Y/M/D
function isSameISTDay(date: Date, year: number, month: number, day: number) {
  const parts = getISTDateParts(date);
  return parts.year === year && parts.month === month && parts.day === day;
}

// -------------------- API --------------------
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const month = searchParams.get("month");
    if (!month) return NextResponse.json({ error: "Month is required" }, { status: 400 });

    const [year, monthNum] = month.split("-").map(Number);

    // fetch attendance
    const records = await prisma.attendance.findMany({
      where: {
        date: {
          gte: new Date(Date.UTC(year, monthNum - 1, 1)),
          lte: new Date(Date.UTC(year, monthNum, 0, 23, 59, 59)),
        },
      },
      orderBy: { date: "asc" },
    });

    if (!records.length) return NextResponse.json({ headers: ["Employee"], rows: [] });

    // unique userIds
    const userIds = [...new Set(records.map((r) => r.userId))];

    // fetch names from Clerk
    const userMap = new Map<string, string>();
    for (const id of userIds) {
      try {
        const user = await users.getUser(id);
        userMap.set(
          id,
          `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
            records.find((r) => r.userId === id)?.employeeName ||
            "Unknown"
        );
      } catch {
        const fallback = records.find((r) => r.userId === id)?.employeeName || "Unknown";
        userMap.set(id, fallback);
      }
    }

    const daysInMonth = new Date(year, monthNum, 0).getDate();
    const headers = ["Employee", ...Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`), "Total Hours"];

    const rows = userIds.map((userId) => {
      const empRecords = records.filter((r) => r.userId === userId);
      const row: Record<string, any> = { Employee: userMap.get(userId) || "Unknown" };
      let totalMinutes = 0;

      for (let d = 1; d <= daysInMonth; d++) {
        const rec = empRecords.find((r) => isSameISTDay(r.date, year, monthNum, d));

        if (rec) {
          row[d.toString()] = rec.checkIn && rec.checkOut ? "✅" : "⏳";
          totalMinutes += rec.workingHours || 0;
        } else {
          row[d.toString()] = "❌";
        }
      }

      const hrs = Math.floor(totalMinutes / 60);
      const mins = Math.floor(totalMinutes % 60);
      row["Total Hours"] = hrs && mins ? `${hrs} hr ${mins} min` : hrs ? `${hrs} hr` : `${mins} min`;

      return row;
    });

    return NextResponse.json({ headers, rows });
  } catch (error) {
    console.error("💥 Monthly attendance failed:", error);
    return NextResponse.json({ error: "Failed to fetch monthly attendance" }, { status: 500 });
  }
}
