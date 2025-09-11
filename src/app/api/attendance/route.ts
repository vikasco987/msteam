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




// // src/app/api/attendance/route.ts
// import { NextResponse } from "next/server";
// import { prisma } from "../../../../lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";
// import { users } from "@clerk/clerk-sdk-node";

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

//     // ✅ Fetch Clerk user details (like your tish code)
//     let employeeName = "Unknown";
//     try {
//       const clerkUser = await users.getUser(userId);
//       employeeName =
//         `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
//         clerkUser.username ||
//         clerkUser.emailAddresses[0]?.emailAddress ||
//         clerkUser.id;
//     } catch (err) {
//       console.error("Clerk fetch error:", err);
//     }

//     // Find or create today's attendance
//     let attendance = await prisma.attendance.findFirst({
//       where: { userId, date: today },
//     });

//     if (!attendance) {
//       attendance = await prisma.attendance.create({
//         data: { userId, employeeName, date: today },
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
//           employeeName, // ✅ save name
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
//           employeeName, // ✅ save name
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












// // src/app/api/attendance/route.ts
// import { NextResponse } from "next/server";
// import { prisma } from "../../../../lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";
// import { users } from "@clerk/clerk-sdk-node";

// const TISH_LAT = 28.5163558;
// const TISH_LNG = 77.1035919;
// const MAX_DISTANCE_METERS = 100;
// const OFFICE_START = 7;   // ✅ start 7 AM
// const OFFICE_END = 19;    // ✅ end 7 PM

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

//     const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
//     const deviceInfo = req.headers.get("user-agent") || "unknown device";

//     // ✅ Fetch Clerk user details
//     let employeeName = "Unknown";
//     try {
//       const clerkUser = await users.getUser(userId);
//       employeeName =
//         `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
//         clerkUser.username ||
//         clerkUser.emailAddresses[0]?.emailAddress ||
//         clerkUser.id;
//     } catch (err) {
//       console.error("Clerk fetch error:", err);
//     }

//     // ✅ Location check
//     let distance: number | null = null;
//     let verified = false;
//     if (lat && lng) {
//       distance = getDistance(lat, lng, TISH_LAT, TISH_LNG);
//       verified = distance <= MAX_DISTANCE_METERS;
//     }

//     let attendance;

//     if (type === "checkIn") {
//       const hour = now.getHours();

//       // ✅ Only between 7 AM – 7 PM
//       if (hour < OFFICE_START || hour > OFFICE_END) {
//         return NextResponse.json(
//           { error: "Check-in allowed only between 7 AM and 7 PM" },
//           { status: 400 }
//         );
//       }

//       // ✅ Prevent multiple check-ins in one day
//       const startDate = new Date(now);
//       startDate.setHours(0, 0, 0, 0);

//       const endDate = new Date(now);
//       endDate.setHours(23, 59, 59, 999);

//       const existing = await prisma.attendance.findFirst({
//         where: { userId, checkIn: { gte: startDate, lte: endDate } },
//       });

//       if (existing) {
//         return NextResponse.json(
//           { error: "Already checked in today" },
//           { status: 400 }
//         );
//       }

//       // ✅ Status calculation
//       let status = !verified ? "Unverified" : "On Time";
//       if (hour > 10 && verified) status = "Late"; // Late after 10AM
//       if (hour > 10 && !reason && verified) {
//         return NextResponse.json(
//           { error: "Late check-in requires a reason" },
//           { status: 400 }
//         );
//       }

//       // ✅ Create record
//       attendance = await prisma.attendance.create({
//         data: {
//           userId,
//           employeeName,
//           date: now,
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
//       // ✅ Get today’s check-in
//       const startDate = new Date(now);
//       startDate.setHours(0, 0, 0, 0);

//       const endDate = new Date(now);
//       endDate.setHours(23, 59, 59, 999);

//       const record = await prisma.attendance.findFirst({
//         where: { userId, checkIn: { gte: startDate, lte: endDate } },
//         orderBy: { checkIn: "desc" },
//       });

//       if (!record) {
//         return NextResponse.json(
//           { error: "No check-in found for today" },
//           { status: 400 }
//         );
//       }

//       // ✅ Calculate working hours
//       let workingHours = 0;
//       let overtime = 0;
//       let status = !verified ? "Unverified" : record.status;

//       if (record.checkIn) {
//         workingHours =
//           (now.getTime() - record.checkIn.getTime()) / (1000 * 60 * 60);

//         const hour = now.getHours();
//         if (hour < OFFICE_END && verified) status = "Early Leave";
//         else if (status !== "Late" && verified) status = "On Time";
//         if (hour > OFFICE_END) overtime = hour - OFFICE_END;
//       }

//       attendance = await prisma.attendance.update({
//         where: { id: record.id },
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
//   } catch (err) {
//     console.error("Attendance error:", err);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }











// // src/app/api/attendance/route.ts
// import { NextResponse } from "next/server";
// import { prisma } from "../../../../lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";
// import { users } from "@clerk/clerk-sdk-node";

// const TISH_LAT = 28.5163558;
// const TISH_LNG = 77.1035919;
// const MAX_DISTANCE_METERS = 100;
// const OFFICE_START = 7;   // ✅ 7 AM
// const OFFICE_END = 19;    // ✅ 7 PM

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

// // ✅ GET: fetch today’s record
// export async function GET(req: Request) {
//   try {
//     const { userId } = getAuth(req as any);
//     if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const now = new Date();
//     const startDate = new Date(now);
//     startDate.setHours(0, 0, 0, 0);
//     const endDate = new Date(now);
//     endDate.setHours(23, 59, 59, 999);

//     const record = await prisma.attendance.findFirst({
//       where: { userId, checkIn: { gte: startDate, lte: endDate } },
//       orderBy: { checkIn: "desc" },
//     });

//     return NextResponse.json({ record });
//   } catch (err) {
//     console.error("Attendance fetch error:", err);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }

// // ✅ POST: checkIn / checkOut
// export async function POST(req: Request) {
//   try {
//     const { userId } = getAuth(req as any);
//     if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const { type, reason, remarks, lat, lng } = await req.json();
//     const now = new Date();

//     const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
//     const deviceInfo = req.headers.get("user-agent") || "unknown device";

//     // ✅ Fetch Clerk user details
//     let employeeName = "Unknown";
//     try {
//       const clerkUser = await users.getUser(userId);
//       employeeName =
//         `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
//         clerkUser.username ||
//         clerkUser.emailAddresses[0]?.emailAddress ||
//         clerkUser.id;
//     } catch (err) {
//       console.error("Clerk fetch error:", err);
//     }

//     // ✅ Location check
//     let distance: number | null = null;
//     let verified = false;
//     if (lat && lng) {
//       distance = getDistance(lat, lng, TISH_LAT, TISH_LNG);
//       verified = distance <= MAX_DISTANCE_METERS;
//     }

//     let attendance;

//     if (type === "checkIn") {
//       const hour = now.getHours();

//       // ✅ Only between 7 AM – 7 PM
//       if (hour < OFFICE_START || hour > OFFICE_END) {
//         return NextResponse.json(
//           { error: "Check-in allowed only between 7 AM and 7 PM" },
//           { status: 400 }
//         );
//       }

//       // ✅ Prevent multiple check-ins in one day
//       const startDate = new Date(now);
//       startDate.setHours(0, 0, 0, 0);
//       const endDate = new Date(now);
//       endDate.setHours(23, 59, 59, 999);

//       const existing = await prisma.attendance.findFirst({
//         where: { userId, checkIn: { gte: startDate, lte: endDate } },
//       });

//       if (existing) {
//         return NextResponse.json(
//           { error: "Already checked in today" },
//           { status: 400 }
//         );
//       }

//       // ✅ Status calculation
//       let status = !verified ? "Unverified" : "On Time";
//       if (hour > 10 && verified) status = "Late"; // Late after 10 AM
//       if (hour > 10 && !reason && verified) {
//         return NextResponse.json(
//           { error: "Late check-in requires a reason" },
//           { status: 400 }
//         );
//       }

//       // ✅ Create record
//       attendance = await prisma.attendance.create({
//         data: {
//           userId,
//           employeeName,
//           date: now,
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
//       // ✅ Get today’s check-in
//       const startDate = new Date(now);
//       startDate.setHours(0, 0, 0, 0);
//       const endDate = new Date(now);
//       endDate.setHours(23, 59, 59, 999);

//       const record = await prisma.attendance.findFirst({
//         where: { userId, checkIn: { gte: startDate, lte: endDate } },
//         orderBy: { checkIn: "desc" },
//       });

//       if (!record) {
//         return NextResponse.json(
//           { error: "No check-in found for today" },
//           { status: 400 }
//         );
//       }

//       if (record.checkOut) {
//         return NextResponse.json(
//           { error: "Already checked out today" },
//           { status: 400 }
//         );
//       }

//       // ✅ Calculate working hours
//       let workingHours = 0;
//       let overtime = 0;
//       let status = !verified ? "Unverified" : record.status;

//       if (record.checkIn) {
//         workingHours =
//           (now.getTime() - record.checkIn.getTime()) / (1000 * 60 * 60);

//         const hour = now.getHours();
//         if (hour < OFFICE_END && verified) status = "Early Leave";
//         else if (status !== "Late" && verified) status = "On Time";
//         if (hour > OFFICE_END) overtime = hour - OFFICE_END;
//       }

//       attendance = await prisma.attendance.update({
//         where: { id: record.id },
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
//   } catch (err) {
//     console.error("Attendance error:", err);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }


// // src/app/api/attendance/route.ts
// import { NextResponse } from "next/server";
// import { prisma } from "../../../../lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";
// import { users } from "@clerk/clerk-sdk-node";

// const TISH_LAT = 28.5163558;
// const TISH_LNG = 77.1035919;
// const MAX_DISTANCE_METERS = 100;
// const OFFICE_START = 7; // 7 AM
// const OFFICE_END = 19; // 7 PM

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

// function getDayRange(date: Date) {
//   const start = new Date(date);
//   start.setHours(0, 0, 0, 0);

//   const end = new Date(date);
//   end.setHours(23, 59, 59, 999);

//   return { start, end };
// }

// export async function POST(req: Request) {
//   try {
//     const { userId } = getAuth(req as any);
//     if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const { type, reason, remarks, lat, lng } = await req.json();
//     const now = new Date();
//     const { start, end } = getDayRange(now);

//     const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
//     const deviceInfo = req.headers.get("user-agent") || "unknown device";

//     // ✅ Fetch Clerk user details
//     let employeeName = "Unknown";
//     try {
//       const clerkUser = await users.getUser(userId);
//       employeeName =
//         `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
//         clerkUser.username ||
//         clerkUser.emailAddresses[0]?.emailAddress ||
//         clerkUser.id;
//     } catch (err) {
//       console.error("Clerk fetch error:", err);
//     }

//     // ✅ Location check
//     let distance: number | null = null;
//     let verified = false;
//     if (lat && lng) {
//       distance = getDistance(lat, lng, TISH_LAT, TISH_LNG);
//       verified = distance <= MAX_DISTANCE_METERS;
//     }

//     let attendance;

//     if (type === "checkIn") {
//       const hour = now.getHours();

//       if (hour < OFFICE_START || hour > OFFICE_END) {
//         return NextResponse.json(
//           { error: "Check-in allowed only between 7 AM and 7 PM" },
//           { status: 400 }
//         );
//       }

//       // ✅ Look for latest *today’s* record
//       const lastRecord = await prisma.attendance.findFirst({
//         where: { userId, date: start },
//         orderBy: { createdAt: "desc" },
//       });

//       if (lastRecord && lastRecord.checkIn && !lastRecord.checkOut) {
//         return NextResponse.json({ error: "Already checked in, please check out first" }, { status: 400 });
//       }

//       let status = !verified ? "Unverified" : "On Time";
//       if (hour > 10 && verified) status = "Late";
//       if (hour > 10 && !reason && verified) {
//         return NextResponse.json(
//           { error: "Late check-in requires a reason" },
//           { status: 400 }
//         );
//       }

//       attendance = await prisma.attendance.create({
//         data: {
//           userId,
//           employeeName,
//           date: start, // ✅ normalized midnight
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
//       const record = await prisma.attendance.findFirst({
//         where: { userId, date: start },
//         orderBy: { createdAt: "desc" },
//       });

//       if (!record || !record.checkIn) {
//         return NextResponse.json(
//           { error: "No check-in found for today" },
//           { status: 400 }
//         );
//       }

//       if (record.checkOut) {
//         return NextResponse.json(
//           { error: "Already checked out today" },
//           { status: 400 }
//         );
//       }

//       let workingHours = 0;
//       let overtime = 0;
//       let status = !verified ? "Unverified" : record.status;

//       if (record.checkIn) {
//         workingHours = (now.getTime() - record.checkIn.getTime()) / (1000 * 60 * 60);

//         const hour = now.getHours();
//         if (hour < OFFICE_END && verified) status = "Early Leave";
//         else if (status !== "Late" && verified) status = "On Time";
//         if (hour > OFFICE_END) overtime = hour - OFFICE_END;
//       }

//       attendance = await prisma.attendance.update({
//         where: { id: record.id },
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
//   } catch (err: any) {
//     console.error("Attendance error:", err);
//     return NextResponse.json(
//       { error: "Something went wrong", details: err.message },
//       { status: 500 }
//     );
//   }
// }











// // src/app/api/attendance/route.ts
// import { NextResponse } from "next/server";
// import { prisma } from "../../../../lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";
// import { users } from "@clerk/clerk-sdk-node";

// const TISH_LAT = 28.5163558;
// const TISH_LNG = 77.1035919;
// const MAX_DISTANCE_METERS = 100;
// const OFFICE_START = 7; // 7 AM
// const OFFICE_END = 19; // 7 PM

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

// function getDayRange(date: Date) {
//   const start = new Date(date);
//   start.setHours(0, 0, 0, 0);

//   const end = new Date(date);
//   end.setHours(23, 59, 59, 999);

//   return { start, end };
// }

// export async function POST(req: Request) {
//   try {
//     const { userId } = getAuth(req as any);
//     if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const { type, reason, remarks, lat, lng } = await req.json();
//     const now = new Date();
//     const { start, end } = getDayRange(now);

//     const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
//     const deviceInfo = req.headers.get("user-agent") || "unknown device";

//     // Fetch Clerk user details
//     let employeeName = "Unknown";
//     try {
//       const clerkUser = await users.getUser(userId);
//       employeeName =
//         `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
//         clerkUser.username ||
//         clerkUser.emailAddresses[0]?.emailAddress ||
//         clerkUser.id;
//     } catch (err) {
//       console.error("Clerk fetch error:", err);
//     }

//     // Location check
//     let distance: number | null = null;
//     let verified = false;
//     if (lat && lng) {
//       distance = getDistance(lat, lng, TISH_LAT, TISH_LNG);
//       verified = distance <= MAX_DISTANCE_METERS;
//     }

//     let attendance;

//     // ✅ Fetch today’s record if exists
//     const todayRecord = await prisma.attendance.findFirst({
//       where: { userId, date: start },
//       orderBy: { createdAt: "desc" },
//     });

//     // Prevent new attendance if already marked today
//     if (todayRecord) {
//       return NextResponse.json(
//         { error: "Attendance already marked for today" },
//         { status: 400 }
//       );
//     }

//     if (type === "checkIn") {
//       const hour = now.getHours();

//       if (hour < OFFICE_START || hour > OFFICE_END) {
//         return NextResponse.json(
//           { error: "Check-in allowed only between 7 AM and 7 PM" },
//           { status: 400 }
//         );
//       }

//       let status = !verified ? "Unverified" : "On Time";
//       if (hour > 10 && verified) status = "Late";
//       if (hour > 10 && !reason && verified) {
//         return NextResponse.json(
//           { error: "Late check-in requires a reason" },
//           { status: 400 }
//         );
//       }

//       attendance = await prisma.attendance.create({
//         data: {
//           userId,
//           employeeName,
//           date: start, // normalized day
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

//     // Optional: Support check-out if needed (not allowed if strict 1 attendance per day)
//     if (type === "checkOut") {
//       return NextResponse.json(
//         { error: "Check-out not allowed. Attendance is already finalized for today." },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json({ success: true, attendance });
//   } catch (err: any) {
//     console.error("Attendance error:", err);
//     return NextResponse.json(
//       { error: "Something went wrong", details: err.message },
//       { status: 500 }
//     );
//   }
// }








// // src/app/api/attendance/route.ts
// import { NextResponse } from "next/server";
// import { prisma } from "../../../../lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";
// import { users } from "@clerk/clerk-sdk-node";

// const TISH_LAT = 28.5163558;
// const TISH_LNG = 77.1035919;
// const MAX_DISTANCE_METERS = 100;
// const OFFICE_START = 7; // 7 AM
// const OFFICE_END = 19; // 7 PM

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

// function getDayRange(date: Date) {
//   const start = new Date(date);
//   start.setHours(0, 0, 0, 0);

//   const end = new Date(date);
//   end.setHours(23, 59, 59, 999);

//   return { start, end };
// }

// export async function POST(req: Request) {
//   try {
//     const { userId } = getAuth(req as any);
//     if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const { type, reason, remarks, lat, lng } = await req.json();
//     const now = new Date();
//     const { start, end } = getDayRange(now);

//     const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
//     const deviceInfo = req.headers.get("user-agent") || "unknown device";

//     // Fetch Clerk user details
//     let employeeName = "Unknown";
//     try {
//       const clerkUser = await users.getUser(userId);
//       employeeName =
//         `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
//         clerkUser.username ||
//         clerkUser.emailAddresses[0]?.emailAddress ||
//         clerkUser.id;
//     } catch (err) {
//       console.error("Clerk fetch error:", err);
//     }

//     // Location check
//     let distance: number | null = null;
//     let verified = false;
//     if (lat && lng) {
//       distance = getDistance(lat, lng, TISH_LAT, TISH_LNG);
//       verified = distance <= MAX_DISTANCE_METERS;
//     }

//     // Fetch today's attendance if exists
//     let todayRecord = await prisma.attendance.findFirst({
//       where: { userId, date: start },
//       orderBy: { createdAt: "desc" },
//     });

//     let attendance;

//     if (type === "checkIn") {
//       if (todayRecord?.checkIn) {
//         return NextResponse.json({ error: "Already checked in today" }, { status: 400 });
//       }

//       const hour = now.getHours();
//       if (hour < OFFICE_START || hour > OFFICE_END) {
//         return NextResponse.json(
//           { error: "Check-in allowed only between 7 AM and 7 PM" },
//           { status: 400 }
//         );
//       }

//       let status = !verified ? "Unverified" : "On Time";
//       if (hour > 10 && verified) status = "Late";
//       if (hour > 10 && !reason && verified) {
//         return NextResponse.json(
//           { error: "Late check-in requires a reason" },
//           { status: 400 }
//         );
//       }

//       attendance = await prisma.attendance.create({
//         data: {
//           userId,
//           employeeName,
//           date: start,
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
//       if (!todayRecord?.checkIn) {
//         return NextResponse.json({ error: "No check-in found for today" }, { status: 400 });
//       }
//       if (todayRecord.checkOut) {
//         return NextResponse.json({ error: "Already checked out today" }, { status: 400 });
//       }

//       const checkInTime = todayRecord.checkIn!;
//       const checkOutTime = now;

//       // Calculate working hours
//       const diffMs = checkOutTime.getTime() - checkInTime.getTime();
//       const workingHours = diffMs / (1000 * 60 * 60);
//       const overtimeHours = Math.max(0, workingHours - 8);

//       // Update record
//       attendance = await prisma.attendance.update({
//         where: { id: todayRecord.id },
//         data: {
//           checkOut: checkOutTime,
//           checkOutReason: reason || null,
//           workingHours,
//           overtimeHours,
//           verified,
//           location: { ip, lat, lng, distance },
//           deviceInfo,
//           remarks: remarks || null,
//         },
//       });
//     }

//     return NextResponse.json({ success: true, attendance });
//   } catch (err: any) {
//     console.error("Attendance error:", err);
//     return NextResponse.json(
//       { error: "Something went wrong", details: err.message },
//       { status: 500 }
//     );
//   }
// }











// // src/app/api/attendance/route.ts
// import { NextResponse } from "next/server";
// import { prisma } from "../../../../lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";
// import { users } from "@clerk/clerk-sdk-node";

// const TISH_LAT = 28.5163558;
// const TISH_LNG = 77.1035919;
// const MAX_DISTANCE_METERS = 100;
// const OFFICE_START = 7; // 7 AM
// const OFFICE_END = 19; // 7 PM

// // Calculate distance in meters between two coordinates
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

// // Get local day range (start and end of today in local time)
// function getLocalDayRange(date: Date) {
//   const start = new Date(date);
//   start.setHours(0, 0, 0, 0);

//   const end = new Date(date);
//   end.setHours(23, 59, 59, 999);

//   return { start, end };
// }

// export async function POST(req: Request) {
//   try {
//     const { userId } = getAuth(req as any);
//     if (!userId)
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const { type, reason, remarks, lat, lng } = await req.json();
//     const now = new Date();
//     const { start: localStart, end: localEnd } = getLocalDayRange(now);

//     const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
//     const deviceInfo = req.headers.get("user-agent") || "unknown device";

//     // Fetch Clerk user details
//     let employeeName = "Unknown";
//     try {
//       const clerkUser = await users.getUser(userId);
//       employeeName =
//         `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
//         clerkUser.username ||
//         clerkUser.emailAddresses[0]?.emailAddress ||
//         clerkUser.id;
//     } catch (err) {
//       console.error("Clerk fetch error:", err);
//     }

//     // Location check
//     let distance: number | null = null;
//     let verified = false;
//     if (lat && lng) {
//       distance = getDistance(lat, lng, TISH_LAT, TISH_LNG);
//       verified = distance <= MAX_DISTANCE_METERS;
//     }

//     // Fetch today's attendance
//     let todayRecord = await prisma.attendance.findFirst({
//       where: { userId, date: { gte: localStart, lte: localEnd } },
//       orderBy: { createdAt: "desc" },
//     });

//     let attendance;

//     // -------------------- Check-in --------------------
//     if (type === "checkIn") {
//       if (todayRecord?.checkIn) {
//         return NextResponse.json({ error: "Already checked in today" }, { status: 400 });
//       }

//       const hour = now.getHours();
//       if (hour < OFFICE_START || hour > OFFICE_END) {
//         return NextResponse.json(
//           { error: "Check-in allowed only between 7 AM and 7 PM" },
//           { status: 400 }
//         );
//       }

//       let status = !verified ? "Unverified" : "On Time";
//       if (hour > 10 && verified) status = "Late";
//       if (hour > 10 && !reason && verified) {
//         return NextResponse.json(
//           { error: "Late check-in requires a reason" },
//           { status: 400 }
//         );
//       }

//       attendance = await prisma.attendance.create({
//         data: {
//           userId,
//           employeeName,
//           date: localStart, // ✅ store local day
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

//     // -------------------- Check-out --------------------
//     if (type === "checkOut") {
//       if (!todayRecord?.checkIn) {
//         return NextResponse.json({ error: "No check-in found for today" }, { status: 400 });
//       }
//       if (todayRecord.checkOut) {
//         return NextResponse.json({ error: "Already checked out today" }, { status: 400 });
//       }

//       const checkInTime = new Date(todayRecord.checkIn);
//       const checkOutTime = now;

//       // Calculate working hours
//       const diffMs = checkOutTime.getTime() - checkInTime.getTime();
//       const workingHours = diffMs / (1000 * 60 * 60); // in hours
//       const overtimeHours = Math.max(0, workingHours - 8);

//       // Update record
//       attendance = await prisma.attendance.update({
//         where: { id: todayRecord.id },
//         data: {
//           checkOut: checkOutTime,
//           checkOutReason: reason || null,
//           workingHours,
//           overtimeHours,
//           verified,
//           location: { ip, lat, lng, distance },
//           deviceInfo,
//           remarks: remarks || null,
//         },
//       });
//     }

//     return NextResponse.json({ success: true, attendance });
//   } catch (err: any) {
//     console.error("Attendance error:", err);
//     return NextResponse.json(
//       { error: "Something went wrong", details: err.message },
//       { status: 500 }
//     );
//   }
// }









import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { users } from "@clerk/clerk-sdk-node";

const TISH_LAT = 28.5163558;
const TISH_LNG = 77.1035919;
const MAX_DISTANCE_METERS = 100;
const OFFICE_START = 7; // 7 AM
const OFFICE_END = 19; // 7 PM

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

// ✅ Convert local day to UTC for storing in Mongo
function getLocalDateUTC(date: Date) {
  const localDate = new Date(date);
  localDate.setHours(0, 0, 0, 0); // local midnight
  const offset = localDate.getTimezoneOffset(); // minutes
  localDate.setMinutes(localDate.getMinutes() - offset); // convert to UTC midnight
  return localDate;
}

export async function POST(req: Request) {
  try {
    const { userId } = getAuth(req as any);
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { type, reason, remarks, lat, lng } = await req.json();
    const now = new Date();

    const todayStart = getLocalDateUTC(now);
    const todayEnd = new Date(todayStart);
    todayEnd.setUTCHours(23, 59, 59, 999);

    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const deviceInfo = req.headers.get("user-agent") || "unknown device";

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

    let distance: number | null = null;
    let verified = false;
    if (lat && lng) {
      distance = getDistance(lat, lng, TISH_LAT, TISH_LNG);
      verified = distance <= MAX_DISTANCE_METERS;
    }

    let todayRecord = await prisma.attendance.findFirst({
      where: { userId, date: { gte: todayStart, lte: todayEnd } },
      orderBy: { createdAt: "desc" },
    });

    let attendance;

    if (type === "checkIn") {
      if (todayRecord?.checkIn) {
        return NextResponse.json({ error: "Already checked in today" }, { status: 400 });
      }

      const hour = now.getHours();
      if (hour < OFFICE_START || hour > OFFICE_END) {
        return NextResponse.json(
          { error: "Check-in allowed only between 7 AM and 7 PM" },
          { status: 400 }
        );
      }

      let status = !verified ? "Unverified" : "On Time";
      if (hour > 10 && verified) status = "Late";
      if (hour > 10 && !reason && verified) {
        return NextResponse.json(
          { error: "Late check-in requires a reason" },
          { status: 400 }
        );
      }

      attendance = await prisma.attendance.create({
        data: {
          userId,
          employeeName,
          date: todayStart,
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
      if (!todayRecord?.checkIn) {
        return NextResponse.json({ error: "No check-in found for today" }, { status: 400 });
      }
      if (todayRecord.checkOut) {
        return NextResponse.json({ error: "Already checked out today" }, { status: 400 });
      }

      const checkInTime = new Date(todayRecord.checkIn);
      const checkOutTime = now;

      const diffMs = checkOutTime.getTime() - checkInTime.getTime();
      const workingHours = diffMs / (1000 * 60 * 60);
      const overtimeHours = Math.max(0, workingHours - 8);

      attendance = await prisma.attendance.update({
        where: { id: todayRecord.id },
        data: {
          checkOut: checkOutTime,
          checkOutReason: reason || null,
          workingHours,
          overtimeHours,
          verified,
          location: { ip, lat, lng, distance },
          deviceInfo,
          remarks: remarks || null,
        },
      });
    }

    return NextResponse.json({ success: true, attendance });
  } catch (err: any) {
    console.error("Attendance error:", err);
    return NextResponse.json(
      { error: "Something went wrong", details: err.message },
      { status: 500 }
    );
  }
}




