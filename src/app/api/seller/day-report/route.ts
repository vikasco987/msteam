// import { NextResponse } from "next/server";
// import { prisma } from "../../../../../lib/prisma";
// import { auth } from "@clerk/nextjs/server";

// export async function GET(req: Request) {
//   try {
//     const { userId } = await auth();
//     if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const { searchParams } = new URL(req.url);
//     const month = searchParams.get("month"); // YYYY-MM
//     if (!month) return NextResponse.json({ error: "Month query param required" }, { status: 400 });

//     const startDate = new Date(`${month}-01T00:00:00.000Z`);
//     const endDate = new Date(startDate);
//     endDate.setMonth(endDate.getMonth() + 1);

//     const tasks = await prisma.task.findMany({
//       where: {
//         createdByClerkId: userId,
//         createdAt: { gte: startDate, lt: endDate },
//       },
//       select: { createdAt: true, amount: true, received: true },
//     });

//     // Group by day
//     const grouped: { [key: string]: { leads: number; revenue: number; received: number } } = {};
//     tasks.forEach((task) => {
//       const day = new Date(task.createdAt).toISOString().split("T")[0]; // YYYY-MM-DD
//       if (!grouped[day]) grouped[day] = { leads: 0, revenue: 0, received: 0 };
//       grouped[day].leads += 1;
//       grouped[day].revenue += task.amount ?? 0;
//       grouped[day].received += task.received ?? 0;
//     });

//     const report = Object.entries(grouped)
//       .map(([date, stats]) => ({ date, ...stats }))
//       .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

//     return NextResponse.json(report);
//   } catch (error: any) {
//     console.error("Error fetching day report:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }















// import { NextResponse } from "next/server";
// import { prisma } from "../../../../../lib/prisma";
// import { auth } from "@clerk/nextjs/server";

// export async function GET(req: Request) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { searchParams } = new URL(req.url);
//     const month = searchParams.get("month"); // YYYY-MM

//     // Validate month
//     if (!month) {
//       return NextResponse.json({ error: "Month query param required (YYYY-MM)" }, { status: 400 });
//     }
//     if (!/^\d{4}-\d{2}$/.test(month)) {
//       return NextResponse.json({ error: "Invalid month format. Use YYYY-MM" }, { status: 400 });
//     }

//     const startDate = new Date(`${month}-01T00:00:00.000Z`);
//     if (isNaN(startDate.getTime())) {
//       return NextResponse.json({ error: "Invalid start date generated" }, { status: 400 });
//     }

//     const endDate = new Date(startDate);
//     endDate.setMonth(endDate.getMonth() + 1);

//     const tasks = await prisma.task.findMany({
//       where: {
//         createdByClerkId: userId,
//         createdAt: { gte: startDate, lt: endDate },
//       },
//       select: {
//         createdAt: true,
//         amount: true,
//         received: true,
//       },
//     });

//     // Group by day
//     const grouped: Record<string, { leads: number; revenue: number; received: number }> = {};

//     tasks.forEach((task) => {
//       const day = new Date(task.createdAt).toISOString().split("T")[0]; // YYYY-MM-DD
//       if (!grouped[day]) grouped[day] = { leads: 0, revenue: 0, received: 0 };

//       grouped[day].leads += 1;
//       grouped[day].revenue += task.amount ?? 0;
//       grouped[day].received += task.received ?? 0;
//     });

//     const report = Object.entries(grouped)
//       .map(([date, stats]) => ({
//         date,
//         ...stats,
//       }))
//       .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

//     return NextResponse.json(report);
//   } catch (error: any) {
//     console.error("Error fetching day report:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error", details: error.message },
//       { status: 500 }
//     );
//   }
// }












// import { NextResponse } from "next/server";
// import { prisma } from "../../../../../lib/prisma";
// import { auth } from "@clerk/nextjs/server";

// export async function GET(req: Request) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { searchParams } = new URL(req.url);
//     const month = searchParams.get("month"); // YYYY-MM

//     // Validate month
//     if (!month) {
//       return NextResponse.json(
//         { error: "Month query param required (YYYY-MM)" },
//         { status: 400 }
//       );
//     }
//     if (!/^\d{4}-\d{2}$/.test(month)) {
//       return NextResponse.json(
//         { error: "Invalid month format. Use YYYY-MM" },
//         { status: 400 }
//       );
//     }

//     const startDate = new Date(`${month}-01T00:00:00.000Z`);
//     if (isNaN(startDate.getTime())) {
//       return NextResponse.json(
//         { error: "Invalid start date generated" },
//         { status: 400 }
//       );
//     }

//     const endDate = new Date(startDate);
//     endDate.setMonth(endDate.getMonth() + 1);

//     // Fetch tasks with related shop
//     const tasks = await prisma.task.findMany({
//       where: {
//         createdByClerkId: userId,
//         createdAt: { gte: startDate, lt: endDate },
//       },
//       select: {
//         createdAt: true,
//         amount: true,
//         received: true,
//         shop: { select: { id: true, name: true } },
//       },
//     });

//     // Group by shop
//     const grouped: Record<
//       string,
//       {
//         shopName: string;
//         totalRevenue: number;
//         totalReceived: number;
//         pending: number;
//         firstCreatedAt: Date;
//       }
//     > = {};

//     tasks.forEach((task) => {
//       const shopId = task.shop?.id ?? "unknown";
//       if (!grouped[shopId]) {
//         grouped[shopId] = {
//           shopName: task.shop?.name ?? "Unknown Shop",
//           totalRevenue: 0,
//           totalReceived: 0,
//           pending: 0,
//           firstCreatedAt: task.createdAt,
//         };
//       }

//       grouped[shopId].totalRevenue += task.amount ?? 0;
//       grouped[shopId].totalReceived += task.received ?? 0;
//       grouped[shopId].pending =
//         grouped[shopId].totalRevenue - grouped[shopId].totalReceived;

//       if (task.createdAt < grouped[shopId].firstCreatedAt) {
//         grouped[shopId].firstCreatedAt = task.createdAt;
//       }
//     });

//     const report = Object.values(grouped).sort(
//       (a, b) => a.firstCreatedAt.getTime() - b.firstCreatedAt.getTime()
//     );

//     return NextResponse.json(report);
//   } catch (error: any) {
//     console.error("Error fetching day-to-day shop report:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error", details: error.message },
//       { status: 500 }
//     );
//   }
// }











// import { NextResponse } from "next/server";
// import { prisma } from "../../../../../lib/prisma";
// import { auth } from "@clerk/nextjs/server";

// export async function GET(req: Request) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { searchParams } = new URL(req.url);
//     const month = searchParams.get("month"); // YYYY-MM

//     if (!month) {
//       return NextResponse.json({ error: "Month query param required (YYYY-MM)" }, { status: 400 });
//     }
//     if (!/^\d{4}-\d{2}$/.test(month)) {
//       return NextResponse.json({ error: "Invalid month format. Use YYYY-MM" }, { status: 400 });
//     }

//     const startDate = new Date(`${month}-01T00:00:00.000Z`);
//     if (isNaN(startDate.getTime())) {
//       return NextResponse.json({ error: "Invalid start date generated" }, { status: 400 });
//     }

//     const endDate = new Date(startDate);
//     endDate.setMonth(endDate.getMonth() + 1);

//     // Fetch tasks
//     const tasks = await prisma.task.findMany({
//       where: {
//         createdByClerkId: userId,
//         createdAt: { gte: startDate, lt: endDate },
//       },
//       select: {
//         createdAt: true,
//         amount: true,
//         received: true,
//         shopName: true, // ✅ Use existing column instead of relation
//       },
//     });

//     if (tasks.length === 0) {
//       return NextResponse.json([]);
//     }

//     // Group by shopName
//     const grouped: Record<
//       string,
//       { firstCreatedAt: Date; totalRevenue: number; totalReceived: number }
//     > = {};

//     tasks.forEach((task) => {
//       const shopKey = task.shopName || "Unknown Shop";
//       if (!grouped[shopKey]) {
//         grouped[shopKey] = {
//           firstCreatedAt: task.createdAt,
//           totalRevenue: 0,
//           totalReceived: 0,
//         };
//       }

//       // update earliest created date
//       if (task.createdAt < grouped[shopKey].firstCreatedAt) {
//         grouped[shopKey].firstCreatedAt = task.createdAt;
//       }

//       grouped[shopKey].totalRevenue += task.amount ?? 0;
//       grouped[shopKey].totalReceived += task.received ?? 0;
//     });

//     const report = Object.entries(grouped)
//       .map(([shopName, stats]) => ({
//         shopName,
//         firstCreatedAt: stats.firstCreatedAt,
//         totalRevenue: stats.totalRevenue,
//         totalReceived: stats.totalReceived,
//         pending: stats.totalRevenue - stats.totalReceived,
//       }))
//       .sort(
//         (a, b) => new Date(a.firstCreatedAt).getTime() - new Date(b.firstCreatedAt).getTime()
//       );

//     return NextResponse.json(report);
//   } catch (error: any) {
//     console.error("Error fetching shop report:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error", details: error.message },
//       { status: 500 }
//     );
//   }
// }
















// import { NextResponse } from "next/server";
// import { prisma } from "../../../../../lib/prisma";
// import { auth } from "@clerk/nextjs/server";

// export async function GET(req: Request) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { searchParams } = new URL(req.url);
//     const month = searchParams.get("month"); // YYYY-MM

//     if (!month) {
//       return NextResponse.json({ error: "Month query param required (YYYY-MM)" }, { status: 400 });
//     }
//     if (!/^\d{4}-\d{2}$/.test(month)) {
//       return NextResponse.json({ error: "Invalid month format. Use YYYY-MM" }, { status: 400 });
//     }

//     const startDate = new Date(`${month}-01T00:00:00.000Z`);
//     if (isNaN(startDate.getTime())) {
//       return NextResponse.json({ error: "Invalid start date generated" }, { status: 400 });
//     }

//     const endDate = new Date(startDate);
//     endDate.setMonth(endDate.getMonth() + 1);

//     // Fetch tasks
//     const tasks = await prisma.task.findMany({
//       where: {
//         createdByClerkId: userId,
//         createdAt: { gte: startDate, lt: endDate },
//       },
//       select: {
//         createdAt: true,
//         amount: true,
//         received: true,
//         shopName: true, // ✅ Use existing column instead of relation
//       },
//     });

//     if (tasks.length === 0) {
//       return NextResponse.json([]);
//     }

//     // Group by shopName
//     const grouped: Record<
//       string,
//       { firstCreatedAt: Date; totalRevenue: number; totalReceived: number }
//     > = {};

//     tasks.forEach((task) => {
//       const shopKey = task.shopName || "Unknown Shop";
//       if (!grouped[shopKey]) {
//         grouped[shopKey] = {
//           firstCreatedAt: task.createdAt,
//           totalRevenue: 0,
//           totalReceived: 0,
//         };
//       }

//       // update earliest created date
//       if (task.createdAt < grouped[shopKey].firstCreatedAt) {
//         grouped[shopKey].firstCreatedAt = task.createdAt;
//       }

//       grouped[shopKey].totalRevenue += task.amount ?? 0;
//       grouped[shopKey].totalReceived += task.received ?? 0;
//     });

//     // Add taskNumber (serial index)
//     const report = Object.entries(grouped)
//       .map(([shopName, stats]) => ({
//         shopName,
//         firstCreatedAt: stats.firstCreatedAt,
//         totalRevenue: stats.totalRevenue,
//         totalReceived: stats.totalReceived,
//         pending: stats.totalRevenue - stats.totalReceived,
//       }))
//       .sort(
//         (a, b) => new Date(a.firstCreatedAt).getTime() - new Date(b.firstCreatedAt).getTime()
//       )
//       .map((item, index) => ({
//         taskNumber: index + 1, // ✅ serial number for each row
//         ...item,
//       }));

//     return NextResponse.json(report);
//   } catch (error: any) {
//     console.error("Error fetching shop report:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error", details: error.message },
//       { status: 500 }
//     );
//   }
// }



















// import { NextResponse } from "next/server";
// import { prisma } from "../../../../../lib/prisma";
// import { auth } from "@clerk/nextjs/server";

// export async function GET(req: Request) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { searchParams } = new URL(req.url);
//     const month = searchParams.get("month");

//     if (!month) {
//       return NextResponse.json({ error: "Month query param required" }, { status: 400 });
//     }

//     const startDate = new Date(`${month}-01T00:00:00.000Z`);
//     const endDate = new Date(startDate);
//     endDate.setMonth(endDate.getMonth() + 1);

//     const tasks = await prisma.task.findMany({
//       where: { createdByClerkId: userId, createdAt: { gte: startDate, lt: endDate } },
//       select: { createdAt: true, amount: true, received: true, shopName: true },
//     });

//     if (tasks.length === 0) return NextResponse.json([]);

//     const grouped: Record<string, { firstCreatedAt: Date; totalRevenue: number; totalReceived: number }> = {};
//     tasks.forEach((task) => {
//       const key = task.shopName || "Unknown Shop";
//       if (!grouped[key]) grouped[key] = { firstCreatedAt: task.createdAt, totalRevenue: 0, totalReceived: 0 };
//       if (task.createdAt < grouped[key].firstCreatedAt) grouped[key].firstCreatedAt = task.createdAt;
//       grouped[key].totalRevenue += task.amount ?? 0;
//       grouped[key].totalReceived += task.received ?? 0;
//     });

//     const report = Object.entries(grouped)
//       .map(([shopName, stats], i) => ({
//         taskNumber: i + 1,
//         shopName,
//         firstCreatedAt: stats.firstCreatedAt,
//         totalRevenue: stats.totalRevenue,
//         totalReceived: stats.totalReceived,
//         pending: stats.totalRevenue - stats.totalReceived,
//       }))
//       .sort((a, b) => new Date(a.firstCreatedAt).getTime() - new Date(b.firstCreatedAt).getTime());

//     return NextResponse.json(report);
//   } catch (error: any) {
//     console.error("Error fetching shop report:", error);
//     return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const month = searchParams.get("month"); // YYYY-MM
    if (!month || !/^\d{4}-\d{2}$/.test(month)) {
      return NextResponse.json({ error: "Invalid month format. Use YYYY-MM" }, { status: 400 });
    }

    const startDate = new Date(`${month}-01T00:00:00.000Z`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const tasks = await prisma.task.findMany({
      where: { createdByClerkId: userId, createdAt: { gte: startDate, lt: endDate } },
      select: { createdAt: true, amount: true, received: true, shopName: true },
    });

    const grouped: any = {};
    tasks.forEach((t) => {
      const key = t.shopName || "Unknown";
      if (!grouped[key]) grouped[key] = { revenue: 0, received: 0, firstCreatedAt: t.createdAt };
      grouped[key].revenue += t.amount ?? 0;
      grouped[key].received += t.received ?? 0;
      if (t.createdAt < grouped[key].firstCreatedAt) grouped[key].firstCreatedAt = t.createdAt;
    });

    const report = Object.entries(grouped).map(([shopName, stats]: any, i) => ({
      taskNumber: i + 1,
      shopName,
      firstCreatedAt: stats.firstCreatedAt,
      totalRevenue: stats.revenue,
      totalReceived: stats.received,
      pending: stats.revenue - stats.received,
    }));

    return NextResponse.json(report);
  } catch (e: any) {
    return NextResponse.json({ error: "Internal Error", details: e.message }, { status: 500 });
  }
}
