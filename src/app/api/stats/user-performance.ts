// import { NextResponse } from "next/server";
// import { prisma as db } from "../../../../lib/prisma";
//  // Adjust to your Prisma or DB client
// // import { auth } from "@clerk/nextjs/server";

// export async function GET() {
//   try {
//     const usersWithCounts = await db.user.findMany({
//       include: {
//         tasks: true,
//       },
//     });

//     const stats = usersWithCounts.map((user) => ({
//       userName: user.name || user.email,
//       email: user.email,
//       taskCount: user.tasks.length,
//     }));

//     return NextResponse.json(stats);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Failed to fetch user performance" }, { status: 500 });
//   }
// }
