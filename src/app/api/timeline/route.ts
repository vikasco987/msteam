// Fix: Add real pagination to your /api/timeline endpoint
// Create src/app/api/timeline/route.ts

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "../../../../lib/prisma"; // adjust path as per project

export async function GET(req) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") || "10");
  const page = parseInt(searchParams.get("page") || "1");

  const skip = (page - 1) * limit;

  try {
    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        include: {
          subtasks: true,
          notes: true,
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.task.count(),
    ]);

    const formattedTasks = tasks.map((task) => ({
      id: task.id,
      name: task.title,
      shop: task.shopName || task.outletName || "",
      customer: task.customerName || "",
      start: task.startDate || new Date().toISOString().split("T")[0],
      end: task.endDate || new Date().toISOString().split("T")[0],
      progress: task.timeline ? parseInt(task.timeline) : 0,
      assigneeIds: task.assigneeIds,
      subtasks: task.subtasks.map((s) => ({ id: s.id, title: s.title, completed: s.completed })),
      notes: task.notes.map((n) => ({ id: n.id, content: n.content, authorName: n.authorName, authorEmail: n.authorEmail })),
      attachments: task.attachments,
    }));

    return NextResponse.json({
      tasks: formattedTasks,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("❌ Timeline Fetch Error:", err);
    return NextResponse.json({ error: "Failed to load tasks" }, { status: 500 });
  }
}















// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import {prisma} from "../../../../lib/prisma"; // Adjust if needed

// export async function GET(req: NextRequest) {
//   try {
//     const { userId } = auth();

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const searchParams = req.nextUrl.searchParams;
//     const page = parseInt(searchParams.get("page") || "1");
//     const limit = parseInt(searchParams.get("limit") || "10");
//     const skip = (page - 1) * limit;

//     // Fetch user role and email from your Users table
//     const currentUser = await prisma.user.findUnique({
//       where: { userId }, // Assuming userId from Clerk maps to userId in your DB
//     });

//     if (!currentUser) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     const { role, email } = currentUser;

//     let whereClause = {};

//     if (role === "admin" || role === "master") {
//       // Admin and Master get all tasks
//       whereClause = {};
//     } else if (role === "seller") {
//       // Sellers get only assigned by them or assigned to them
//       whereClause = {
//         OR: [
//           { assignerEmail: email },
//           { assigneeIds: { has: userId } }, // Prisma `has` checks if array includes value
//         ],
//       };
//     } else {
//       // Other roles see nothing
//       whereClause = {
//         id: "", // No task will match this
//       };
//     }

//     const tasks = await prisma.task.findMany({
//       where: whereClause,
//       orderBy: { createdAt: "desc" },
//       skip,
//       take: limit,
//     });

//     const totalCount = await prisma.task.count({ where: whereClause });

//     return NextResponse.json({ tasks, totalCount });
//   } catch (error) {
//     console.error("Timeline error:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

















// import { NextRequest, NextResponse } from "next/server";
// import { getAuth } from "@clerk/nextjs/server";
// import {prisma} from "../../../../lib/prisma";

// export async function GET(req: NextRequest) {
//   try {
//     const { userId, sessionClaims } = getAuth(req);

//     if (!userId || !sessionClaims?.email || !sessionClaims?.role) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const email = sessionClaims.email as string;
//     const role = sessionClaims.role as string;

//     const { searchParams } = new URL(req.url);
//     const page = parseInt(searchParams.get("page") || "1");
//     const limit = parseInt(searchParams.get("limit") || "10");
//     const skip = (page - 1) * limit;

//     let whereClause = {};

//     if (role === "seller") {
//       whereClause = {
//         OR: [
//           { assignerEmail: email },
//           { assigneeIds: { has: userId } } // ✅ Prisma `has` for arrays
//         ]
//       };
//     }

//     // For admin and master, show all tasks (no filter)

//     const [tasks, totalCount] = await Promise.all([
//       prisma.task.findMany({
//         where: whereClause,
//         orderBy: { createdAt: "desc" },
//         skip,
//         take: limit
//       }),
//       prisma.task.count({ where: whereClause })
//     ]);

//     return NextResponse.json({
//       tasks,
//       totalCount,
//       page,
//       totalPages: Math.ceil(totalCount / limit)
//     });

//   } catch (error) {
//     console.error("Timeline fetch error:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }






















// // pages/api/timeline.ts
// import { NextRequest, NextResponse } from "next/server";
// import { getAuth } from "@clerk/nextjs/server";
// import { prisma } from "../../../../lib/prisma";

// export async function GET(req: NextRequest) {
//   try {
//     const { userId, sessionClaims } = getAuth(req);

//     if (!userId || !sessionClaims?.email || !sessionClaims?.role) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const email = sessionClaims.email as string;
//     const role = sessionClaims.role as string;

//     const { searchParams } = new URL(req.url);
//     const page = parseInt(searchParams.get("page") || "1");
//     const limit = parseInt(searchParams.get("limit") || "10");
//     const id = searchParams.get("id"); // Get specific ID if present
//     const skip = (page - 1) * limit;

//     let whereClause: any = {}; // Using any for flexibility with OR condition

//     if (id) {
//       // If an ID is provided, fetch only that specific task
//       whereClause = { id: id };
//     } else if (role === "seller") {
//       // For sellers, filter by assigned tasks or tasks created by them
//       whereClause = {
//         OR: [
//           { assignerEmail: email },
//           { assigneeIds: { has: userId } } // Prisma `has` for arrays
//         ]
//       };
//     }
//     // For admin and master, no additional whereClause is needed, meaning they see all tasks.

//     const [tasks, totalCount] = await Promise.all([
//       prisma.task.findMany({
//         where: whereClause,
//         orderBy: { createdAt: "desc" },
//         skip: id ? undefined : skip, // Skip pagination if fetching a single task by ID
//         take: id ? undefined : limit // Take pagination limit if not fetching by ID
//       }),
//       prisma.task.count({ where: whereClause })
//     ]);

//     return NextResponse.json({
//       tasks,
//       totalCount,
//       page,
//       totalPages: Math.ceil(totalCount / limit)
//     });

//   } catch (error) {
//     console.error("Timeline fetch error:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }






// src/app/api/timelin









// // src/app/api/timeline/route.ts (for Next.js App Router)

// import { NextResponse } from "next/server";
// // ✅ CORRECT IMPORTS for App Router API routes
// import { auth, clerkClient } from "@clerk/nextjs/server";
// import { prisma } from "../../../../lib/prisma"; // Adjust path if your prisma client is elsewhere

// export async function GET(req: Request) {
//   try {
//     const { userId, sessionClaims } = auth(); // Use auth() directly for App Router

//     // --- IMPORTANT DEBUGGING CONSOLE LOGS ---
//     console.log(`[${new Date().toISOString()}] Backend API (App Router): Incoming request to /api/timeline`);
//     console.log(`[${new Date().toISOString()}] Backend API (App Router): Clerk userId:`, userId);
//     console.log(`[${new Date().toISOString()}] Backend API (App Router): Clerk sessionClaims:`, sessionClaims);
//     // --- END DEBUGGING CONSOLE LOGS ---

//     // 1. Initial check for Clerk authentication
//     if (!userId) {
//       console.log(`[${new Date().toISOString()}] Backend API (App Router): ❌ Unauthorized - userId is null.`);
//       return NextResponse.json({ error: "Unauthorized: User not authenticated" }, { status: 401 });
//     }

//     // 2. Attempt to find user in your local database
//     let dbUser = await prisma.user.findUnique({
//       where: { clerkId: userId }, // 'clerkId' must exist in your User model
//     });

//     console.log(`[${new Date().toISOString()}] Backend API (App Router): 🔎 DB user found for clerkId ${userId}:`, !!dbUser);

//     // 3. If user not found in DB, auto-create it
//     if (!dbUser) {
//       console.log(`[${new Date().toISOString()}] Backend API (App Router): User not found in DB for ${userId}, attempting to auto-create...`);
//       try {
//         const clerkUser = await clerkClient.users.getUser(userId);

//         const userEmail = clerkUser.emailAddresses?.[0]?.email_address;
//         if (!userEmail) {
//           console.error(`[${new Date().toISOString()}] Backend API (App Router): Clerk user ${userId} has no primary email address. Cannot auto-create in DB.`);
//           return NextResponse.json({ error: "Unauthorized: User email not found for auto-creation" }, { status: 401 });
//         }

//         // Determine the role for the new user.
//         // It's best practice to get this from Clerk's publicMetadata or custom claims.
//         // If not available or for development, use a sensible default.
//         const defaultRole = (sessionClaims?.role as string) || "SELLER"; // Ensure 'role' is in your Clerk JWT Template

//         dbUser = await prisma.user.create({
//           data: {
//             clerkId: userId,
//             email: userEmail,
//             role: defaultRole,
//             name: `${clerkUser.first_name || ''} ${clerkUser.last_name || ''}`.trim() || null,
//           },
//         });
//         console.log(`[${new Date().toISOString()}] Backend API (App Router): ✅ User auto-created in DB for ${userId}.`);
//       } catch (clerkError) {
//         console.error(`[${new Date().toISOString()}] Backend API (App Router): Error fetching Clerk user or auto-creating in DB for ${userId}:`, clerkError);
//         return NextResponse.json(
//           { error: "Unauthorized: Failed to retrieve Clerk user data or create DB entry" },
//           { status: 401 }
//         );
//       }
//     }

//     // Now 'dbUser' is guaranteed to exist in your database
//     const userRole = dbUser.role; // Use role from your DB user object
//     const userEmail = dbUser.email; // Use email from your DB user object

//     console.log(`[${new Date().toISOString()}] Backend API (App Router): User Email for logic: ${userEmail}`);
//     console.log(`[${new Date().toISOString()}] Backend API (App Router): User Role for logic: ${userRole}`);

//     // Extract query parameters for pagination/filtering
//     const { searchParams } = new URL(req.url);
//     const page = parseInt(searchParams.get("page") || "1");
//     const limit = parseInt(searchParams.get("limit") || "10");
//     const id = searchParams.get("id");
//     const skip = (page - 1) * limit;

//     let whereClause: any = {};

//     if (id) {
//       whereClause = { id: id };
//     } else if (userRole === "seller") {
//       whereClause = {
//         OR: [
//           { assignerEmail: userEmail },
//           { assigneeIds: { has: userId } } // IMPORTANT: Use Clerk's userId here, not dbUser.id
//         ]
//       };
//     }
//     // For admin/master, no additional whereClause is needed, meaning they see all tasks.

//     const [tasks, totalCount] = await Promise.all([
//       prisma.task.findMany({
//         where: whereClause,
//         orderBy: { createdAt: "desc" },
//         skip: id ? undefined : skip,
//         take: id ? undefined : limit
//       }),
//       prisma.task.count({ where: whereClause })
//     ]);

//     return NextResponse.json({
//       tasks,
//       totalCount,
//       page,
//       totalPages: Math.ceil(totalCount / limit)
//     });

//   } catch (error) {
//     console.error(`[${new Date().toISOString()}] Backend API (App Router): Timeline fetch failed:`, error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }








// // src/app/api/timeline/route.ts

// import { NextRequest, NextResponse } from "next/server";
// import { getAuth } from "@clerk/nextjs/server"; // ✅ Correct for App Router API routes
// import { clerkClient } from "@clerk/nextjs/server";
// import { prisma } from "../../../../lib/prisma";

// export async function GET(req: NextRequest) {
//   const requestTime = new Date().toISOString();
//   console.log(`[${requestTime}] 🔍 Request to /api/timeline`);

//   try {
//     // --- DEBUG: Log request headers & cookies ---
//     console.log(`[${requestTime}] Request headers:`, Object.fromEntries(req.headers));
//     console.log(`[${requestTime}] Request cookies:`, req.cookies.getAll());

//     // ✅ Correct Clerk auth for App Router API routes
//     const { userId, sessionId, sessionClaims } = getAuth(req);

//     console.log(`[${requestTime}] Clerk userId:`, userId);
//     console.log(`[${requestTime}] Clerk sessionId:`, sessionId);
//     console.log(`[${requestTime}] Clerk sessionClaims:`, sessionClaims);

//     if (!userId) {
//       console.error(`[${requestTime}] ❌ Unauthorized - userId is null.`);
//       return NextResponse.json(
//         { error: "Unauthorized: No active session" },
//         { status: 401 }
//       );
//     }

//     // --- Get or create user in DB ---
//     let dbUser = await prisma.user.findUnique({
//       where: { clerkId: userId },
//     });

//     console.log(`[${requestTime}] DB user exists?`, !!dbUser);

//     if (!dbUser) {
//       console.warn(`[${requestTime}] No DB user found, attempting auto-create...`);
//       try {
//         const clerkUser = await clerkClient.users.getUser(userId);
//         const email = clerkUser.emailAddresses?.[0]?.email_address;

//         if (!email) {
//           console.error(`[${requestTime}] Clerk user has no primary email.`);
//           return NextResponse.json(
//             { error: "Unauthorized: Missing email in Clerk profile" },
//             { status: 401 }
//           );
//         }

//         const defaultRole =
//           (sessionClaims?.role as string) || "SELLER";

//         dbUser = await prisma.user.create({
//           data: {
//             clerkId: userId,
//             email,
//             role: defaultRole,
//             name: `${clerkUser.first_name || ""} ${clerkUser.last_name || ""}`.trim() || null,
//           },
//         });

//         console.log(`[${requestTime}] ✅ User auto-created in DB`);
//       } catch (err) {
//         console.error(`[${requestTime}] ❌ Failed to create user in DB:`, err);
//         return NextResponse.json(
//           { error: "Unauthorized: Clerk fetch or DB insert failed" },
//           { status: 401 }
//         );
//       }
//     }

//     // --- Role & Email ---
//     const userRole = dbUser.role;
//     const userEmail = dbUser.email;

//     console.log(`[${requestTime}] User Email: ${userEmail}`);
//     console.log(`[${requestTime}] User Role: ${userRole}`);

//     // --- Pagination params ---
//     const { searchParams } = new URL(req.url);
//     const page = parseInt(searchParams.get("page") || "1");
//     const limit = parseInt(searchParams.get("limit") || "10");
//     const id = searchParams.get("id");
//     const skip = (page - 1) * limit;

//     let whereClause: any = {};

//     if (id) {
//       whereClause = { id };
//     } else if (userRole === "seller") {
//       whereClause = {
//         OR: [
//           { assignerEmail: userEmail },
//           { assigneeIds: { has: userId } },
//         ],
//       };
//     }
//     // Admin/master see all tasks

//     // --- Fetch tasks ---
//     const [tasks, totalCount] = await Promise.all([
//       prisma.task.findMany({
//         where: whereClause,
//         orderBy: { createdAt: "desc" },
//         skip: id ? undefined : skip,
//         take: id ? undefined : limit,
//       }),
//       prisma.task.count({ where: whereClause }),
//     ]);

//     console.log(`[${requestTime}] ✅ Found ${tasks.length} tasks`);

//     return NextResponse.json({
//       tasks,
//       totalCount,
//       page,
//       totalPages: Math.ceil(totalCount / limit),
//     });
//   } catch (error) {
//     console.error(`[${requestTime}] ❌ Timeline fetch failed:`, error);
//     return NextResponse.json(
//       { error: "Internal Server Error", details: error instanceof Error ? error.message : String(error) },
//       { status: 500 }
//     );
//   }
// }
