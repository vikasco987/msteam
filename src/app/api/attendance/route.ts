// import { NextResponse } from "next/server";
// import { prisma } from "../../../../lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";

// const OFFICE_START = 10; // 10 AM
// const OFFICE_END = 19;   // 7 PM

// export async function POST(req: Request) {
//   try {
//     const { userId } = getAuth(req as any);
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { type, reason, remarks } = await req.json();
//     const now = new Date();
//     const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

//     const ip =
//       req.headers.get("x-forwarded-for") ||
//       req.headers.get("x-real-ip") ||
//       "unknown";

//     const deviceInfo = req.headers.get("user-agent") || "unknown device";

//     let attendance = await prisma.attendance.findFirst({
//       where: { userId, date: today },
//     });

//     if (!attendance) {
//       attendance = await prisma.attendance.create({
//         data: { userId, date: today },
//       });
//     }

//     const locationJson = { ip }; // store location as JSON

//     if (type === "checkIn") {
//       const hour = now.getHours();
//       const status = hour >= OFFICE_START ? "Late" : "On Time";

//       if (hour >= OFFICE_START && !reason) {
//         return NextResponse.json(
//           { error: "Late check-in requires a reason" },
//           { status: 400 }
//         );
//       }

//       attendance = await prisma.attendance.update({
//         where: { id: attendance.id },
//         data: {
//           checkIn: now,
//           checkInReason: reason || null,
//           status,
//           location: locationJson,
//           deviceInfo,
//           remarks: remarks || null,
//         },
//       });
//     }

//     if (type === "checkOut") {
//       const hour = now.getHours();
//       let overtime = 0;
//       let workingHours = 0;
//       let status = attendance.status;

//       if (hour < OFFICE_END && !reason) {
//         return NextResponse.json(
//           { error: "Early check-out requires a reason" },
//           { status: 400 }
//         );
//       }

//       if (attendance.checkIn) {
//         workingHours =
//           (now.getTime() - attendance.checkIn.getTime()) / (1000 * 60 * 60);

//         if (hour > OFFICE_END) {
//           overtime = hour - OFFICE_END;
//         }

//         if (hour < OFFICE_END) {
//           status = "Early Leave";
//         } else if (status !== "Late") {
//           status = "On Time";
//         }
//       }

//       attendance = await prisma.attendance.update({
//         where: { id: attendance.id },
//         data: {
//           checkOut: now,
//           checkOutReason: reason || null,
//           workingHours,
//           overtimeHours: overtime,
//           status,
//           location: locationJson,
//           deviceInfo,
//           remarks: remarks || null,
//         },
//       });
//     }

//     return NextResponse.json({ success: true, attendance });
//   } catch (error) {
//     console.error("Attendance error:", error);
//     return NextResponse.json(
//       { error: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }






// // src/app/api/attendance/route.ts
// import { NextResponse } from "next/server";
// import { prisma } from "../../../../lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";

// const OFFICE_LAT = 28.5163558;
// const OFFICE_LNG = 77.1035919;
// const MAX_DISTANCE_METERS = 100; // allow 100m radius

// const OFFICE_START = 10; // 10 AM
// const OFFICE_END = 19;   // 7 PM

// // ✅ Haversine formula to calculate distance in meters
// function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
//   const R = 6371e3; // Earth radius in meters
//   const toRad = (x: number) => (x * Math.PI) / 180;
//   const dLat = toRad(lat2 - lat1);
//   const dLng = toRad(lng2 - lng1);

//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(toRad(lat1)) *
//       Math.cos(toRad(lat2)) *
//       Math.sin(dLng / 2) *
//       Math.sin(dLng / 2);

//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c; // in meters
// }

// export async function POST(req: Request) {
//   try {
//     const { userId } = getAuth(req as any);
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { type, reason, remarks, lat, lng } = await req.json();
//     const now = new Date();
//     const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

//     const ip =
//       req.headers.get("x-forwarded-for") ||
//       req.headers.get("x-real-ip") ||
//       "unknown";
//     const deviceInfo = req.headers.get("user-agent") || "unknown device";

//     let attendance = await prisma.attendance.findFirst({
//       where: { userId, date: today },
//     });

//     if (!attendance) {
//       attendance = await prisma.attendance.create({
//         data: { userId, date: today },
//       });
//     }

//     // ✅ Check geo-fencing
//     let distance = null;
//     let verified = true;
//     if (lat && lng) {
//       distance = getDistance(lat, lng, OFFICE_LAT, OFFICE_LNG);
//       if (distance > MAX_DISTANCE_METERS) {
//         verified = false; // mark unverified if outside office radius
//       }
//     }

//     if (type === "checkIn") {
//       const hour = now.getHours();
//       let status = hour >= OFFICE_START ? "Late" : "On Time";
//       if (!verified) status = "Unverified";

//       if (hour >= OFFICE_START && !reason && verified) {
//         return NextResponse.json(
//           { error: "Late check-in requires a reason" },
//           { status: 400 }
//         );
//       }

//       attendance = await prisma.attendance.update({
//         where: { id: attendance.id },
//         data: {
//           checkIn: now,
//           checkInReason: reason || null,
//           status,
//           location: { ip, lat, lng, distance },
//           deviceInfo,
//           remarks: remarks || null,
//         },
//       });
//     }

//     if (type === "checkOut") {
//       const hour = now.getHours();
//       let overtime = 0;
//       let workingHours = 0;
//       let status = attendance.status;

//       if (!verified) status = "Unverified";

//       if (hour < OFFICE_END && !reason && verified) {
//         return NextResponse.json(
//           { error: "Early check-out requires a reason" },
//           { status: 400 }
//         );
//       }

//       if (attendance.checkIn) {
//         workingHours =
//           (now.getTime() - attendance.checkIn.getTime()) / (1000 * 60 * 60);

//         if (hour > OFFICE_END) overtime = hour - OFFICE_END;
//         if (hour < OFFICE_END && verified) status = "Early Leave";
//         else if (status !== "Late" && verified) status = "On Time";
//       }

//       attendance = await prisma.attendance.update({
//         where: { id: attendance.id },
//         data: {
//           checkOut: now,
//           checkOutReason: reason || null,
//           workingHours,
//           overtimeHours: overtime,
//           status,
//           location: { ip, lat, lng, distance },
//           deviceInfo,
//           remarks: remarks || null,
//         },
//       });
//     }

//     return NextResponse.json({ success: true, attendance });
//   } catch (error) {
//     console.error("Attendance error:", error);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }









// // src/app/api/attendance/route.ts
// import { NextResponse } from "next/server";
// import { prisma } from "../../../../lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";

// const OFFICE_LAT = 28.5163558;
// const OFFICE_LNG = 77.1035919;
// const MAX_DISTANCE_METERS = 250; // ✅ expanded to 250m

// const OFFICE_START = 10; // 10 AM
// const OFFICE_END = 19;   // 7 PM

// // ✅ Haversine formula to calculate distance in meters
// function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
//   const R = 6371e3; // Earth radius in meters
//   const toRad = (x: number) => (x * Math.PI) / 180;
//   const dLat = toRad(lat2 - lat1);
//   const dLng = toRad(lng2 - lng1);

//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
//     Math.sin(dLng / 2) ** 2;

//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c; // in meters
// }

// export async function POST(req: Request) {
//   try {
//     const { userId } = getAuth(req as any);
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { type, reason, remarks, lat, lng } = await req.json();
//     const now = new Date();
//     const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

//     const ip =
//       req.headers.get("x-forwarded-for") ||
//       req.headers.get("x-real-ip") ||
//       "unknown";
//     const deviceInfo = req.headers.get("user-agent") || "unknown device";

//     let attendance = await prisma.attendance.findFirst({
//       where: { userId, date: today },
//     });

//     if (!attendance) {
//       attendance = await prisma.attendance.create({
//         data: { userId, date: today },
//       });
//     }

//     // ✅ Check geo-fencing
//     let distance: number | null = null;
//     let verified = true;
//     if (lat && lng) {
//       distance = getDistance(lat, lng, OFFICE_LAT, OFFICE_LNG);
//       verified = distance <= MAX_DISTANCE_METERS;
//     }

//     if (type === "checkIn") {
//       const hour = now.getHours();
//       let status = hour >= OFFICE_START ? "Late" : "On Time";
//       if (!verified) status = "Unverified";

//       if (hour >= OFFICE_START && !reason && verified) {
//         return NextResponse.json(
//           { error: "Late check-in requires a reason" },
//           { status: 400 }
//         );
//       }

//       attendance = await prisma.attendance.update({
//         where: { id: attendance.id },
//         data: {
//           checkIn: now,
//           checkInReason: reason || null,
//           status,
//           verified,
//           location: { ip, lat, lng, distance },
//           deviceInfo,
//           remarks: remarks || null,
//         },
//       });
//     }

//     if (type === "checkOut") {
//       const hour = now.getHours();
//       let overtime = 0;
//       let workingHours = 0;
//       let status = attendance.status;
//       if (!verified) status = "Unverified";

//       if (hour < OFFICE_END && !reason && verified) {
//         return NextResponse.json(
//           { error: "Early check-out requires a reason" },
//           { status: 400 }
//         );
//       }

//       if (attendance.checkIn) {
//         workingHours =
//           (now.getTime() - attendance.checkIn.getTime()) / (1000 * 60 * 60);

//         if (hour > OFFICE_END) overtime = hour - OFFICE_END;
//         if (hour < OFFICE_END && verified) status = "Early Leave";
//         else if (status !== "Late" && verified) status = "On Time";
//       }

//       attendance = await prisma.attendance.update({
//         where: { id: attendance.id },
//         data: {
//           checkOut: now,
//           checkOutReason: reason || null,
//           workingHours,
//           overtimeHours: overtime,
//           status,
//           verified,
//           location: { ip, lat, lng, distance },
//           deviceInfo,
//           remarks: remarks || null,
//         },
//       });
//     }

//     return NextResponse.json({ success: true, attendance });
//   } catch (error) {
//     console.error("Attendance error:", error);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }











// // src/app/api/attendance/route.ts
// import { NextResponse } from "next/server";
// import { prisma } from "../../../../lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";

// const OFFICE_LAT = 28.5163558;
// const OFFICE_LNG = 77.1035919;
// const MAX_DISTANCE_METERS = 250; // ✅ expanded to 250m

// const OFFICE_START = 10; // 10 AM
// const OFFICE_END = 19;   // 7 PM

// // ✅ Haversine formula to calculate distance in meters
// function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
//   const R = 6371e3; // Earth radius in meters
//   const toRad = (x: number) => (x * Math.PI) / 180;
//   const dLat = toRad(lat2 - lat1);
//   const dLng = toRad(lng2 - lng1);

//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
//     Math.sin(dLng / 2) ** 2;

//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c; // in meters
// }

// // ✅ helper to update AttendanceSummary
// async function updateSummary(userId: string, update: any) {
//   return prisma.attendanceSummary.upsert({
//     where: { userId },
//     update,
//     create: { userId, ...update },
//   });
// }

// export async function POST(req: Request) {
//   try {
//     const { userId } = getAuth(req as any);
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { type, reason, remarks, lat, lng } = await req.json();
//     const now = new Date();
//     const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

//     const ip =
//       req.headers.get("x-forwarded-for") ||
//       req.headers.get("x-real-ip") ||
//       "unknown";
//     const deviceInfo = req.headers.get("user-agent") || "unknown device";

//     let attendance = await prisma.attendance.findFirst({
//       where: { userId, date: today },
//     });

//     if (!attendance) {
//       attendance = await prisma.attendance.create({
//         data: { userId, date: today },
//       });
//     }

//     // ✅ Check geo-fencing
//     let distance: number | null = null;
//     let verified = true;
//     if (lat && lng) {
//       distance = getDistance(lat, lng, OFFICE_LAT, OFFICE_LNG);
//       verified = distance <= MAX_DISTANCE_METERS;
//     }

//     if (type === "checkIn") {
//       const hour = now.getHours();
//       let status = hour >= OFFICE_START ? "Late" : "On Time";
//       if (!verified) status = "Unverified";

//       if (hour >= OFFICE_START && !reason && verified) {
//         return NextResponse.json(
//           { error: "Late check-in requires a reason" },
//           { status: 400 }
//         );
//       }

//       attendance = await prisma.attendance.update({
//         where: { id: attendance.id },
//         data: {
//           checkIn: now,
//           checkInReason: reason || null,
//           status,
//           verified,
//           location: { ip, lat, lng, distance },
//           deviceInfo,
//           remarks: remarks || null,
//         },
//       });

//       // ✅ update summary (totalDays & presentDays)
//       await updateSummary(userId, {
//         totalDays: { increment: 1 },
//         presentDays: { increment: 1 },
//       });
//     }

//     if (type === "checkOut") {
//       const hour = now.getHours();
//       let overtime = 0;
//       let workingHours = 0;
//       let status = attendance.status;
//       if (!verified) status = "Unverified";

//       if (hour < OFFICE_END && !reason && verified) {
//         return NextResponse.json(
//           { error: "Early check-out requires a reason" },
//           { status: 400 }
//         );
//       }

//       if (attendance.checkIn) {
//         workingHours =
//           (now.getTime() - attendance.checkIn.getTime()) / (1000 * 60 * 60);

//         if (hour > OFFICE_END) overtime = hour - OFFICE_END;
//         if (hour < OFFICE_END && verified) status = "Early Leave";
//         else if (status !== "Late" && verified) status = "On Time";
//       }

//       attendance = await prisma.attendance.update({
//         where: { id: attendance.id },
//         data: {
//           checkOut: now,
//           checkOutReason: reason || null,
//           workingHours,
//           overtimeHours: overtime,
//           status,
//           verified,
//           location: { ip, lat, lng, distance },
//           deviceInfo,
//           remarks: remarks || null,
//         },
//       });

//       // ✅ update summary (overtime)
//       if (overtime > 0) {
//         await updateSummary(userId, {
//           overtimeHours: { increment: overtime },
//         });
//       }
//     }

//     return NextResponse.json({ success: true, attendance });
//   } catch (error) {
//     console.error("Attendance error:", error);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }









// // src/app/api/attendance/route.ts
// iimport { prisma } from "../../../../lib/prisma";
// mport { NextResponse } from "next/server";
// import { getAuth } from "@clerk/nextjs/server";

// const OFFICE_LAT = 28.5163558;
// const OFFICE_LNG = 77.1035919;
// const MAX_DISTANCE_METERS = 250; // ✅ expanded to 250m

// const OFFICE_START = 10; // 10 AM
// const OFFICE_END = 19;   // 7 PM

// // ✅ Haversine formula to calculate distance in meters
// function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
//   const R = 6371e3; // Earth radius in meters
//   const toRad = (x: number) => (x * Math.PI) / 180;
//   const dLat = toRad(lat2 - lat1);
//   const dLng = toRad(lng2 - lng1);

//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
//     Math.sin(dLng / 2) ** 2;

//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c; // in meters
// }

// // ✅ helper to update AttendanceSummary
// async function updateSummary(
//   userId: string,
//   update: { totalDays?: { increment: number }; presentDays?: { increment: number }; overtimeHours?: { increment: number } }
// ) {
//   return prisma.attendanceSummary.upsert({
//     where: { userId },
//     update,
//     create: {
//       userId,
//       totalDays: update.totalDays ? update.totalDays.increment : 0,
//       presentDays: update.presentDays ? update.presentDays.increment : 0,
//       overtimeHours: update.overtimeHours ? update.overtimeHours.increment : 0,
//     },
//   });
// }

// export async function POST(req: Request) {
//   try {
//     const { userId } = getAuth(req as any);
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { type, reason, remarks, lat, lng } = await req.json();
//     const now = new Date();
//     const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

//     const ip =
//       req.headers.get("x-forwarded-for") ||
//       req.headers.get("x-real-ip") ||
//       "unknown";
//     const deviceInfo = req.headers.get("user-agent") || "unknown device";

//     let attendance = await prisma.attendance.findFirst({
//       where: { userId, date: today },
//     });

//     if (!attendance) {
//       attendance = await prisma.attendance.create({
//         data: { userId, date: today },
//       });
//     }

//     // ✅ Check geo-fencing
//     let distance: number | null = null;
//     let verified = true;
//     if (lat && lng) {
//       distance = getDistance(lat, lng, OFFICE_LAT, OFFICE_LNG);
//       verified = distance <= MAX_DISTANCE_METERS;
//     }

//     if (type === "checkIn") {
//       const hour = now.getHours();
//       let status = hour >= OFFICE_START ? "Late" : "On Time";
//       if (!verified) status = "Unverified";

//       if (hour >= OFFICE_START && !reason && verified) {
//         return NextResponse.json(
//           { error: "Late check-in requires a reason" },
//           { status: 400 }
//         );
//       }

//       attendance = await prisma.attendance.update({
//         where: { id: attendance.id },
//         data: {
//           checkIn: now,
//           checkInReason: reason || null,
//           status,
//           verified,
//           location: { ip, lat, lng, distance },
//           deviceInfo,
//           remarks: remarks || null,
//         },
//       });

//       // ✅ update summary (totalDays & presentDays)
//       await updateSummary(userId, {
//         totalDays: { increment: 1 },
//         presentDays: { increment: 1 },
//       });
//     }

//     if (type === "checkOut") {
//       const hour = now.getHours();
//       let overtime = 0;
//       let workingHours = 0;
//       let status = attendance.status;
//       if (!verified) status = "Unverified";

//       if (hour < OFFICE_END && !reason && verified) {
//         return NextResponse.json(
//           { error: "Early check-out requires a reason" },
//           { status: 400 }
//         );
//       }

//       if (attendance.checkIn) {
//         workingHours =
//           (now.getTime() - attendance.checkIn.getTime()) / (1000 * 60 * 60);

//         if (hour > OFFICE_END) overtime = hour - OFFICE_END;
//         if (hour < OFFICE_END && verified) status = "Early Leave";
//         else if (status !== "Late" && verified) status = "On Time";
//       }

//       attendance = await prisma.attendance.update({
//         where: { id: attendance.id },
//         data: {
//           checkOut: now,
//           checkOutReason: reason || null,
//           workingHours,
//           overtimeHours: overtime,
//           status,
//           verified,
//           location: { ip, lat, lng, distance },
//           deviceInfo,
//           remarks: remarks || null,
//         },
//       });

//       // ✅ update summary (overtime)
//       if (overtime > 0) {
//         await updateSummary(userId, {
//           overtimeHours: { increment: overtime },
//         });
//       }
//     }

//     return NextResponse.json({ success: true, attendance });
//   } catch (error) {
//     console.error("Attendance error:", error);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }






// // src/app/api/attendance/route.ts
// import { NextResponse } from "next/server";
// import { prisma } from "../../../../lib/prisma";
// import { getAuth, clerkClient } from "@clerk/nextjs/server";

// const TISH_LAT = 28.5163558;
// const TISH_LNG = 77.1035919;
// const MAX_DISTANCE_METERS = 100;
// const OFFICE_START = 10;
// const OFFICE_END = 19;

// function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
//   const R = 6371e3;
//   const toRad = (x: number) => (x * Math.PI) / 180;
//   const dLat = toRad(lat2 - lat1);
//   const dLng = toRad(lng2 - lng1);

//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// }

// export async function POST(req: Request) {
//   try {
//     const { userId } = getAuth(req as any);
//     if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const { type, reason, remarks, lat, lng } = await req.json();
//     const now = new Date();
//     const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

//     const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
//     const deviceInfo = req.headers.get("user-agent") || "unknown device";

//     // Find or create today's attendance
//     let attendance = await prisma.attendance.findFirst({ where: { userId, date: today } });
//     if (!attendance) attendance = await prisma.attendance.create({ data: { userId, date: today } });

//     let distance: number | null = null;
//     let verified = false;
//     if (lat && lng) {
//       distance = getDistance(lat, lng, TISH_LAT, TISH_LNG);
//       verified = distance <= MAX_DISTANCE_METERS;
//     }

//     let status = attendance.status;

//     if (type === "checkIn") {
//       const hour = now.getHours();
//       status = !verified ? "Unverified" : hour >= OFFICE_START ? "Late" : "On Time";

//       if (hour >= OFFICE_START && !reason && verified)
//         return NextResponse.json({ error: "Late check-in requires a reason" }, { status: 400 });

//       attendance = await prisma.attendance.update({
//         where: { id: attendance.id },
//         data: { checkIn: now, checkInReason: reason || null, status, verified, location: { ip, lat, lng, distance }, deviceInfo, remarks: remarks || null },
//       });
//     }

//     if (type === "checkOut") {
//       const hour = now.getHours();
//       let overtime = 0;
//       let workingHours = 0;
//       status = !verified ? "Unverified" : attendance.status;

//       if (hour < OFFICE_END && !reason && verified)
//         return NextResponse.json({ error: "Early check-out requires a reason" }, { status: 400 });

//       if (attendance.checkIn) {
//         workingHours = (now.getTime() - attendance.checkIn.getTime()) / (1000 * 60 * 60);
//         if (hour > OFFICE_END) overtime = hour - OFFICE_END;
//         if (hour < OFFICE_END && verified) status = "Early Leave";
//         else if (status !== "Late" && verified) status = "On Time";
//       }

//       attendance = await prisma.attendance.update({
//         where: { id: attendance.id },
//         data: { checkOut: now, checkOutReason: reason || null, workingHours, overtimeHours: overtime, status, verified, location: { ip, lat, lng, distance }, deviceInfo, remarks: remarks || null },
//       });
//     }

//     // Fetch user's name
//     let userName = "Unknown";
//     try {
//       const user = await clerkClient.users.getUser(userId);
//       userName = user.firstName || user.username || "Unknown";
//     } catch {}

//     return NextResponse.json({ success: true, attendance: { ...attendance, userName } });
//   } catch (err) {
//     console.error("Attendance error:", err);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }







// // src/app/api/attendance/route.ts
// import { NextResponse } from "next/server";
// import { prisma } from "../../../../lib/prisma";
// import { getAuth, clerkClient } from "@clerk/nextjs/server";

// const TISH_LAT = 28.5163558;
// const TISH_LNG = 77.1035919;
// const MAX_DISTANCE_METERS = 100;
// const OFFICE_START = 10;
// const OFFICE_END = 19;

// function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
//   const R = 6371e3;
//   const toRad = (x: number) => (x * Math.PI) / 180;
//   const dLat = toRad(lat2 - lat1);
//   const dLng = toRad(lng2 - lng1);

//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// }

// export async function POST(req: Request) {
//   try {
//     const { userId } = getAuth(req as any);
//     if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const { type, reason, remarks, lat, lng } = await req.json();
//     const now = new Date();
//     const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

//     const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
//     const deviceInfo = req.headers.get("user-agent") || "unknown device";

//     // ✅ Fetch Clerk user details
//     let userName = "Unknown";
//     try {
//       const clerkUser = await clerkClient.users.getUser(userId);
//       userName =
//         `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
//         clerkUser.username ||
//         clerkUser.emailAddresses[0]?.emailAddress ||
//         "Unknown";
//     } catch (err) {
//       console.error("Clerk fetch error:", err);
//     }

//     // Find or create today's attendance
//     let attendance = await prisma.attendance.findFirst({
//       where: { userId, date: today },
//     });

//     if (!attendance) {
//       attendance = await prisma.attendance.create({
//         data: { userId, userName, date: today },
//       });
//     }

//     let distance: number | null = null;
//     let verified = false;
//     if (lat && lng) {
//       distance = getDistance(lat, lng, TISH_LAT, TISH_LNG);
//       verified = distance <= MAX_DISTANCE_METERS;
//     }

//     let status = attendance.status;

//     if (type === "checkIn") {
//       const hour = now.getHours();
//       status = !verified ? "Unverified" : hour >= OFFICE_START ? "Late" : "On Time";

//       if (hour >= OFFICE_START && !reason && verified) {
//         return NextResponse.json({ error: "Late check-in requires a reason" }, { status: 400 });
//       }

//       attendance = await prisma.attendance.update({
//         where: { id: attendance.id },
//         data: {
//           userName, // ✅ always keep Clerk name
//           checkIn: now,
//           checkInReason: reason || null,
//           status,
//           verified,
//           location: { ip, lat, lng, distance },
//           deviceInfo,
//           remarks: remarks || null,
//         },
//       });
//     }

//     if (type === "checkOut") {
//       const hour = now.getHours();
//       let overtime = 0;
//       let workingHours = 0;
//       status = !verified ? "Unverified" : attendance.status;

//       if (hour < OFFICE_END && !reason && verified) {
//         return NextResponse.json({ error: "Early check-out requires a reason" }, { status: 400 });
//       }

//       if (attendance.checkIn) {
//         workingHours = (now.getTime() - attendance.checkIn.getTime()) / (1000 * 60 * 60);
//         if (hour > OFFICE_END) overtime = hour - OFFICE_END;
//         if (hour < OFFICE_END && verified) status = "Early Leave";
//         else if (status !== "Late" && verified) status = "On Time";
//       }

//       attendance = await prisma.attendance.update({
//         where: { id: attendance.id },
//         data: {
//           userName, // ✅ store name also on checkout
//           checkOut: now,
//           checkOutReason: reason || null,
//           workingHours,
//           overtimeHours: overtime,
//           status,
//           verified,
//           location: { ip, lat, lng, distance },
//           deviceInfo,
//           remarks: remarks || null,
//         },
//       });
//     }

//     return NextResponse.json({ success: true, attendance });
//   } catch (err) {
//     console.error("Attendance error:", err);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }




// src/app/api/attendance/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { users } from "@clerk/clerk-sdk-node";

const TISH_LAT = 28.5163558;
const TISH_LNG = 77.1035919;
const MAX_DISTANCE_METERS = 100;
const OFFICE_START = 10;
const OFFICE_END = 19;

function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371e3;
  const toRad = (x: number) => (x * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function POST(req: Request) {
  try {
    const { userId } = getAuth(req as any);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { type, reason, remarks, lat, lng } = await req.json();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const deviceInfo = req.headers.get("user-agent") || "unknown device";

    // ✅ Fetch Clerk user details (like your tish code)
    let employeeName = "Unknown";
    try {
      const clerkUser = await users.getUser(userId);
      employeeName =
        `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
        clerkUser.username ||
        clerkUser.emailAddresses[0]?.emailAddress ||
        clerkUser.id;
    } catch (err) {
      console.error("Clerk fetch error:", err);
    }

    // Find or create today's attendance
    let attendance = await prisma.attendance.findFirst({
      where: { userId, date: today },
    });

    if (!attendance) {
      attendance = await prisma.attendance.create({
        data: { userId, employeeName, date: today },
      });
    }

    let distance: number | null = null;
    let verified = false;
    if (lat && lng) {
      distance = getDistance(lat, lng, TISH_LAT, TISH_LNG);
      verified = distance <= MAX_DISTANCE_METERS;
    }

    let status = attendance.status;

    if (type === "checkIn") {
      const hour = now.getHours();
      status = !verified ? "Unverified" : hour >= OFFICE_START ? "Late" : "On Time";

      if (hour >= OFFICE_START && !reason && verified) {
        return NextResponse.json({ error: "Late check-in requires a reason" }, { status: 400 });
      }

      attendance = await prisma.attendance.update({
        where: { id: attendance.id },
        data: {
          employeeName, // ✅ save name
          checkIn: now,
          checkInReason: reason || null,
          status,
          verified,
          location: { ip, lat, lng, distance },
          deviceInfo,
          remarks: remarks || null,
        },
      });
    }

    if (type === "checkOut") {
      const hour = now.getHours();
      let overtime = 0;
      let workingHours = 0;
      status = !verified ? "Unverified" : attendance.status;

      if (hour < OFFICE_END && !reason && verified) {
        return NextResponse.json({ error: "Early check-out requires a reason" }, { status: 400 });
      }

      if (attendance.checkIn) {
        workingHours = (now.getTime() - attendance.checkIn.getTime()) / (1000 * 60 * 60);
        if (hour > OFFICE_END) overtime = hour - OFFICE_END;
        if (hour < OFFICE_END && verified) status = "Early Leave";
        else if (status !== "Late" && verified) status = "On Time";
      }

      attendance = await prisma.attendance.update({
        where: { id: attendance.id },
        data: {
          employeeName, // ✅ save name
          checkOut: now,
          checkOutReason: reason || null,
          workingHours,
          overtimeHours: overtime,
          status,
          verified,
          location: { ip, lat, lng, distance },
          deviceInfo,
          
          remarks: remarks || null,
        },
      });
    }

    return NextResponse.json({ success: true, attendance });
  } catch (err) {
    console.error("Attendance error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
