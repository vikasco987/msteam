// import { NextRequest, NextResponse } from "next/server";
// import { getAuth } from "@clerk/nextjs/server";
// import { users } from "@clerk/clerk-sdk-node";
// import { prisma } from "../../../../lib/prisma";

// // 🔁 Convert tab to board status column
// function convertTabToStatus(tab: string): "todo" | "inprogress" | "done" {
//   if (tab === "license") return "todo";
//   if (tab === "swiggy") return "inprogress";
//   if (tab === "zomato") return "done";
//   return "todo";
// }

// // 🔐 Dynamic role check from Clerk metadata
// async function isAdmin(userId: string): Promise<boolean> {
//   try {
//     const user = await users.getUser(userId);
//     const role =
//       user?.publicMetadata?.role || user?.privateMetadata?.role || null;
//     return role === "admin";
//   } catch (err) {
//     console.error("❌ Failed to check role from Clerk:", err);
//     return false;
//   }
// }

// // ✅ POST: Create a new task
// export async function POST(req: NextRequest) {
//   try {
//     const { userId } = await getAuth(req);
//     if (!userId) {
//       console.warn("❌ Unauthorized: No Clerk user ID found.");
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const body = await req.json();

//     if (!body.title || !body.assigneeId) {
//       return NextResponse.json(
//         { error: "Missing required fields: title or assigneeId" },
//         { status: 400 }
//       );
//     }

//     let clerkUser;
//     try {
//       clerkUser = await users.getUser(userId);
//     } catch (err) {
//       console.error("❌ Failed to fetch Clerk user:", err);
//       return NextResponse.json({ error: "Failed to fetch user profile" }, { status: 500 });
//     }

//     const assignerEmail = clerkUser.emailAddresses?.[0]?.emailAddress || "unknown";
//     const assignerName = clerkUser.firstName || clerkUser.username || "Unknown";
//     const status = convertTabToStatus(body.activeTab);

//     const task = await prisma.task.create({
//       data: {
//         title: body.title,
//         status,
//         assigneeId: body.assigneeId,
//         assignerEmail: body.assignerEmail || assignerEmail,
//         assignerName: body.assignerName || assignerName,
//         customFields: body.customFields ?? [],
//         attachments: body.attachments ?? [],
//         tags: body.tags ?? [],
//         priority: body.priority ?? null,
//         dueDate: body.dueDate ? new Date(body.dueDate) : null,
//         createdByClerkId: userId,
//       },
//     });

//     console.log("✅ Task created:", task.id);

//     return NextResponse.json({ success: true, task }, { status: 201 });
//   } catch (err: any) {
//     console.error("❌ Unexpected error in POST /api/tasks:", err);
//     return NextResponse.json(
//       {
//         error: "Unexpected server error",
//         details: err.message || "Internal error",
//       },
//       { status: 500 }
//     );
//   }
// }

// // ✅ GET: Fetch tasks (admins get all, others get assigned)
// export async function GET(req: NextRequest) {
//   try {
//     const { userId } = await getAuth(req);
//     if (!userId) {
//       console.warn("❌ Unauthorized GET /api/tasks request.");
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const userIsAdmin = await isAdmin(userId);

//     const tasks = await prisma.task.findMany({
//       where: userIsAdmin ? {} : { assigneeId: userId },
//       include: { subtasks: true },
//       orderBy: { createdAt: "desc" },
//     });

//     console.log(
//       `📄 GET /api/tasks – ${userIsAdmin ? "Admin" : "User"} ${userId} fetched ${tasks.length} tasks`
//     );

//     return NextResponse.json({ tasks }, { status: 200 });
//   } catch (err: any) {
//     console.error("❌ Error in GET /api/tasks:", err);
//     return NextResponse.json(
//       { error: "Failed to fetch tasks", details: err.message || err },
//       { status: 500 }
//     );
//   }
// }

// // ✅ OPTIONS for CORS preflight
// export async function OPTIONS() {
//   return NextResponse.json({ ok: true });
// }











// import { NextRequest, NextResponse } from "next/server";
// import { getAuth } from "@clerk/nextjs/server";
// import { users } from "@clerk/clerk-sdk-node";
// import { prisma } from "../../../../lib/prisma";

// // 🔁 Convert tab to board status column
// function convertTabToStatus(tab: string): "todo" | "inprogress" | "done" {
//   if (tab === "license") return "todo";
//   if (tab === "swiggy") return "inprogress";
//   if (tab === "zomato") return "done";
//   return "todo";
// }

// // 🔐 Dynamic role check from Clerk metadata
// async function isAdmin(userId: string): Promise<boolean> {
//   try {
//     const user = await users.getUser(userId);
//     const role =
//       user?.publicMetadata?.role || user?.privateMetadata?.role || null;
//     return role === "admin";
//   } catch (err) {
//     console.error("❌ Failed to check role from Clerk:", err);
//     return false;
//   }
// }

// // ✅ POST: Create a new task
// export async function POST(req: NextRequest) {
//   try {
//     const { userId } = await getAuth(req);
//     if (!userId) {
//       console.warn("❌ Unauthorized: No Clerk user ID found.");
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const body = await req.json();

//     if (!body.title || !body.assigneeId) {
//       return NextResponse.json(
//         { error: "Missing required fields: title or assigneeId" },
//         { status: 400 }
//       );
//     }

//     let clerkUser;
//     try {
//       clerkUser = await users.getUser(userId);
//     } catch (err) {
//       console.error("❌ Failed to fetch Clerk user:", err);
//       return NextResponse.json({ error: "Failed to fetch user profile" }, { status: 500 });
//     }

//     const assignerEmail = clerkUser.emailAddresses?.[0]?.emailAddress || "unknown";
//     const assignerName = clerkUser.firstName || clerkUser.username || "Unknown";
//     const status = convertTabToStatus(body.activeTab);

//   //   const task = await prisma.task.create({
//   //     data: {
//   //       title: body.title,
//   //       status,
//   //       assigneeId: body.assigneeId,
//   //       assignerEmail: body.assignerEmail || assignerEmail,
//   //       assignerName: body.assignerName || assignerName,
//   //       assigneeEmail: body.assigneeEmail || null,
//   //      customFields: typeof body.customFields === "object" && body.customFields !== null
//   // ? body.customFields
//   // : {},
//   //        attachments: body.attachments ?? [],
//   //       tags: body.tags ?? [],
//   //       priority: body.priority ?? null,
//   //       dueDate: body.dueDate ? new Date(body.dueDate) : null,
//   //       createdByClerkId: userId,
//   //       createdAt: new Date(),
//   //       updatedAt: new Date(),
//   //     },
//   //   });

//   console.log("📦 body.customFields:", body.customFields);


// const task = await prisma.task.create({
//   data: {
//     title: body.title,
//     status,
//     assigneeId: body.assigneeId,
//     assignerEmail: body.assignerEmail || assignerEmail,
//     assignerName: body.assignerName || assignerName,
//     assigneeEmail: body.assigneeEmail || null,
//     customFields:
//       typeof body.customFields === "object" && body.customFields !== null
//         ? body.customFields
//         : {},
//     attachments: Array.isArray(body.attachments) ? body.attachments : [],
//     tags: Array.isArray(body.tags) ? body.tags : [],
//     priority: body.priority ?? null,
//     dueDate: body.dueDate ? new Date(body.dueDate) : null,
//     createdByClerkId: userId,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// });




//     console.log("✅ Task created:", task.id);

//     return NextResponse.json({ success: true, task }, { status: 201 });
//   } catch (err: any) {
//     console.error("❌ Unexpected error in POST /api/tasks:", err);
//     return NextResponse.json(
//       {
//         error: "Unexpected server error",
//         details: err.message || "Internal error",
//       },
//       { status: 500 }
//     );
//   }
// }

// // ✅ GET: Fetch tasks (admins get all, others get assigned)
// export async function GET(req: NextRequest) {
//   try {
//     const { userId } = await getAuth(req);
//     if (!userId) {
//       console.warn("❌ Unauthorized GET /api/tasks request.");
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const userIsAdmin = await isAdmin(userId);

//     const tasks = await prisma.task.findMany({
//       where: userIsAdmin ? {} : { assigneeId: userId },
//       include: { subtasks: true },
//       orderBy: { createdAt: "desc" },
//     });

//     console.log(
//       `📄 GET /api/tasks – ${userIsAdmin ? "Admin" : "User"} ${userId} fetched ${tasks.length} tasks`
//     );

//     return NextResponse.json({ tasks }, { status: 200 });
//   } catch (err: any) {
//     console.error("❌ Error in GET /api/tasks:", err);
//     return NextResponse.json(
//       { error: "Failed to fetch tasks", details: err.message || err },
//       { status: 500 }
//     );
//   }
// }

// // ✅ OPTIONS for CORS preflight
// export async function OPTIONS() {
//   return NextResponse.json({ ok: true });
// }















// import { NextRequest, NextResponse } from "next/server";
// import { getAuth } from "@clerk/nextjs/server";
// import { users } from "@clerk/clerk-sdk-node";
// import { prisma } from "../../../../lib/prisma";

// // Convert tab type to status
// // function convertTabToStatus(tab: string): "todo" | "inprogress" | "done" {
// //   if (tab === "license") return "todo";
// //   if (tab === "swiggy") return "inprogress";
// //   if (tab === "zomato") return "done";
// //   return "todo";
// // }

// // Clerk admin check
// async function isAdmin(userId: string): Promise<boolean> {
//   try {
//     const user = await users.getUser(userId);
//     const role = user?.publicMetadata?.role || user?.privateMetadata?.role || null;
//     return role === "admin";
//   } catch (err) {
//     console.error("❌ Clerk role check failed:", err);
//     return false;
//   }
// }

// // ✅ POST: Create new task
// // export async function POST(req: NextRequest) {
// //   try {
// //     const { userId } = await getAuth(req);
// //     if (!userId) {
// //       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// //     }

// //     const body = await req.json();

// //     if (!body.title || !body.assigneeId) {
// //       return NextResponse.json(
// //         { error: "Missing title or assigneeId" },
// //         { status: 400 }
// //       );
// //     }

// //     const clerkUser = await users.getUser(userId);
// //     const assignerEmail = clerkUser.emailAddresses?.[0]?.emailAddress || "unknown";
// //     const assignerName = clerkUser.firstName || clerkUser.username || "Unknown";
// //     const status = convertTabToStatus(body.activeTab);

// //     const {
// //       phone = "",
// //       email = "",
// //       shopName = "",
// //       outletName = "",
// //       location = "",
// //       accountNumber = "",
// //       ifscCode = "",
// //       fields = [],
// //     } = body.customFields || {};

// //     const task = await prisma.task.create({
// //       data: {
// //         title: body.title,
// //         status,
// //         assigneeId: body.assigneeId,
// //         assignerEmail: body.assignerEmail || assignerEmail,
// //         assignerName: body.assignerName || assignerName,
// //         assigneeEmail: body.assigneeEmail || null,
// //         customFields: {
// //           phone,
// //           email,
// //           shopName,
// //           outletName,
// //           location,
// //           accountNumber,
// //           ifscCode,
// //           fields,
// //         },
// //         attachments: Array.isArray(body.attachments) ? body.attachments : [],
// //         tags: Array.isArray(body.tags) ? body.tags : [],
// //         priority: body.priority ?? null,
// //         dueDate: body.dueDate ? new Date(body.dueDate) : null,
// //         createdByClerkId: userId,
// //         createdAt: new Date(),
// //         updatedAt: new Date(),
// //       },
// //     });

// //     console.log("✅ Task created:", task.id);
// //     return NextResponse.json({ success: true, task }, { status: 201 });

// //   } catch (err: any) {
// //     console.error("❌ POST /api/tasks error:", err);
// //     return NextResponse.json(
// //       { error: "Server error", details: err.message || "Unknown error" },
// //       { status: 500 }
// //     );
// //   }
// // }



// // ✅ POST: Create new task
// export async function POST(req: NextRequest) {
//   try {
//     const { userId } = await getAuth(req);
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const body = await req.json();

//     if (!body.title || !body.assigneeId) {
//       return NextResponse.json(
//         { error: "Missing title or assigneeId" },
//         { status: 400 }
//       );
//     }

//     const clerkUser = await users.getUser(userId);
//     const assignerEmail = clerkUser.emailAddresses?.[0]?.emailAddress || "unknown";
//     const assignerName = clerkUser.firstName || clerkUser.username || "Unknown";

//     // ✅ Always create tasks with "todo" status regardless of tab
//     const status: "todo" = "todo";

//     const {
//       phone = "",
//       email = "",
//       shopName = "",
//       outletName = "",
//       location = "",
//       accountNumber = "",
//       ifscCode = "",
//       fields = [],
//     } = body.customFields || {};

//     const task = await prisma.task.create({
//       data: {
//         title: body.title,
//         status, // ✅ force "todo"
//         assigneeId: body.assigneeId,
//         assignerEmail: body.assignerEmail || assignerEmail,
//         assignerName: body.assignerName || assignerName,
//         assigneeEmail: body.assigneeEmail || null,
//         customFields: {
//           phone,
//           email,
//           shopName,
//           outletName,
//           location,
//           accountNumber,
//           ifscCode,
//           fields,
//         },
//         attachments: Array.isArray(body.attachments) ? body.attachments : [],
//         tags: Array.isArray(body.tags) ? body.tags : [],
//         priority: body.priority ?? null,
//         dueDate: body.dueDate ? new Date(body.dueDate) : null,
//         createdByClerkId: userId,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//     });

//     console.log("✅ Task created in TODO:", task.id);
//     return NextResponse.json({ success: true, task }, { status: 201 });

//   } catch (err: any) {
//     console.error("❌ POST /api/tasks error:", err);
//     return NextResponse.json(
//       { error: "Server error", details: err.message || "Unknown error" },
//       { status: 500 }
//     );
//   }
// }








// // ✅ GET: Fetch tasks
// export async function GET(req: NextRequest) {
//   try {
//     const { userId } = await getAuth(req);
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const userIsAdmin = await isAdmin(userId);

//     const tasks = await prisma.task.findMany({
//       where: userIsAdmin ? {} : { assigneeId: userId },
//       include: { subtasks: true },
//       orderBy: { createdAt: "desc" },
//     });

//     console.log(`📄 GET /api/tasks – ${userIsAdmin ? "Admin" : "User"} fetched ${tasks.length} tasks`);
//     return NextResponse.json({ tasks }, { status: 200 });

//   } catch (err: any) {
//     console.error("❌ GET /api/tasks error:", err);
//     return NextResponse.json(
//       { error: "Failed to fetch tasks", details: err.message || err },
//       { status: 500 }
//     );
//   }
// }

// // ✅ OPTIONS
// export async function OPTIONS() {
//   return NextResponse.json({ ok: true });
// }





















import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { users } from "@clerk/clerk-sdk-node";
import { prisma } from "../../../../lib/prisma";

// ✅ Clerk admin check
async function isAdmin(userId: string): Promise<boolean> {
  try {
    const user = await users.getUser(userId);
    const role = user?.publicMetadata?.role || user?.privateMetadata?.role || null;
    return role === "admin";
  } catch (err) {
    console.error("❌ Clerk role check failed:", err);
    return false;
  }
}

// ✅ POST: Create new task
export async function POST(req: NextRequest) {
  try {
    const { userId } = await getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    if (!body.title || !body.assigneeId) {
      return NextResponse.json(
        { error: "Missing title or assigneeId" },
        { status: 400 }
      );
    }

    const clerkUser = await users.getUser(userId);
    const assignerEmail = clerkUser.emailAddresses?.[0]?.emailAddress || "unknown";
    const assignerName = clerkUser.firstName || clerkUser.username || "Unknown";

    // ✅ Default task status to "todo"
    const status = "todo" as const;

    const {
      phone = "",
      email = "",
      shopName = "",
      outletName = "",
      location = "",
      accountNumber = "",
      ifscCode = "",
      fields = [],
    } = body.customFields || {};

    const task = await prisma.task.create({
      data: {
        title: body.title,
        status,
        assigneeId: body.assigneeId,
        assignerEmail: body.assignerEmail || assignerEmail,
        assignerName: body.assignerName || assignerName,
        assigneeEmail: body.assigneeEmail || null,
        customFields: {
          phone,
          email,
          shopName,
          outletName,
          location,
          accountNumber,
          ifscCode,
          fields,
        },
        attachments: Array.isArray(body.attachments) ? body.attachments : [],
        tags: Array.isArray(body.tags) ? body.tags : [],
        priority: body.priority ?? null,
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        createdByClerkId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    console.log("✅ Task created:", task.id);
    return NextResponse.json({ success: true, task }, { status: 201 });

  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : "Unknown error";
    console.error("❌ POST /api/tasks error:", err);
    return NextResponse.json(
      { error: "Server error", details: error },
      { status: 500 }
    );
  }
}

// ✅ GET: Fetch tasks
export async function GET(req: NextRequest) {
  try {
    const { userId } = await getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userIsAdmin = await isAdmin(userId);

    const tasks = await prisma.task.findMany({
      where: userIsAdmin ? {} : { assigneeId: userId },
      include: { subtasks: true },
      orderBy: { createdAt: "desc" },
    });

    console.log(`📄 GET /api/tasks – ${userIsAdmin ? "Admin" : "User"} fetched ${tasks.length} tasks`);
    return NextResponse.json({ tasks }, { status: 200 });

  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : "Unknown error";
    console.error("❌ GET /api/tasks error:", err);
    return NextResponse.json(
      { error: "Failed to fetch tasks", details: error },
      { status: 500 }
    );
  }
}

// ✅ OPTIONS (for CORS preflight)
export async function OPTIONS() {
  return NextResponse.json({ ok: true });
}
