// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "../../../../../lib/prisma";
// import { auth } from "@clerk/nextjs/server";

// export const dynamic = "force-dynamic";

// // ✅ Updated: Next.js 15 requires Promise-wrapped params
// type Context = {
//   params: Promise<{ id: string }>;
// };

// export async function PATCH(req: NextRequest, context: Context) {
//   const { id: taskId } = await context.params;
//   const { userId } = await auth();

//   if (!taskId || !userId) {
//     return NextResponse.json({ error: "Unauthorized or missing task ID" }, { status: 400 });
//   }

//   try {
//     const { title, status, customFields } = await req.json();
//     const updated = await prisma.task.update({
//       where: { id: taskId },
//       data: {
//         ...(title && { title }),
//         ...(status && { status }),
//         ...(customFields && { customFields }),
//         updatedAt: new Date(),
//       },
//     });

//     return NextResponse.json({ success: true, task: updated }, { status: 200 });
//   } catch (err) {
//     console.error("❌ Failed to update:", err);
//     return NextResponse.json({ error: "Update failed" }, { status: 500 });
//   }
// }

// export async function DELETE(req: NextRequest, context: Context) {
//   const { id: taskId } = await context.params;
//   const { userId } = await auth();

//   if (!taskId || !userId) {
//     return NextResponse.json({ error: "Unauthorized or missing task ID" }, { status: 400 });
//   }

//   try {
//     await prisma.subtask.deleteMany({ where: { taskId } });
//     await prisma.task.delete({ where: { id: taskId } });
//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (err) {
//     console.error("❌ Delete failed:", err);
//     return NextResponse.json({ error: "Delete failed" }, { status: 500 });
//   }
// }

// export async function GET(req: NextRequest, context: Context) {
//   const { id: taskId } = await context.params;
//   const { userId } = await auth();

//   if (!taskId || !userId) {
//     return NextResponse.json({ error: "Unauthorized or missing task ID" }, { status: 400 });
//   }

//   try {
//     const task = await prisma.task.findUnique({
//       where: { id: taskId },
//       include: { subtasks: true },
//     });

//     if (!task) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     return NextResponse.json(task, { status: 200 });
//   } catch (err) {
//     console.error("❌ Get task failed:", err);
//     return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
//   }
// }















//     const task = await prisma.task.create({
//       data: {
//         title: body.title,
//         status,
//         assigneeIds: Array.isArray(body.assigneeIds)
//           ? body.assigneeIds
//           : [body.assigneeId], // fallback for backward compatibility

//         assignerEmail,
//         assignerName,
//         createdByClerkId: userId,
//         createdAt: new Date(),
//         updatedAt: new Date(),

//         customFields: {
//           phone: toNullableString(phone),
//           email: toNullableString(email),
//           shopName: toNullableString(shopName),
//           outletName: toNullableString(outletName),
//           location: toNullableString(location),
//           accountNumber: toNullableString(accountNumber),
//           ifscCode: toNullableString(ifscCode),
//           customerName: toNullableString(customerName),
//           restId: toNullableString(restId),
//           packageAmount: toNullableString(packageAmount),
//           startDate: toNullableString(startDate),
//           endDate: toNullableString(endDate),
//           timeline: toNullableString(timeline),
//           fields: safeFields,
//         },

//         attachments: safeAttachments,
//         tags: Array.isArray(body.tags) ? body.tags : [],
//         priority: body.priority ?? null,
//         dueDate: body.dueDate ? new Date(body.dueDate) : null,

//         phone: toNullableString(phone),
//         email: toNullableString(email),
//         shopName: toNullableString(shopName),
//         location: toNullableString(location),
//         accountNumber: toNullableString(accountNumber),
//         ifscCode: toNullableString(ifscCode),
//         restId: toNullableString(restId),
//         customerName: toNullableString(customerName),
//         packageAmount: toNullableString(packageAmount),
//         startDate: toNullableString(startDate),
//         endDate: toNullableString(endDate),
//         timeline: toNullableString(timeline),

//         aadhaarUrl: toNullableString(aadhaarUrl),
//         panUrl: toNullableString(panUrl),
//         selfieUrl: toNullableString(selfieUrl),
//         chequeUrl: toNullableString(chequeUrl),
//         menuCardUrls: Array.isArray(menuCardUrls)
//           ? menuCardUrls.filter((url) => typeof url === "string" && url.trim() !== "")
//           : [],
//       },
//     });


//     console.log("✅ Task created:", task.id);
//     return NextResponse.json({ success: true, task }, { status: 201 });

//   } catch (err: unknown) {
//     const error = err instanceof Error ? err.message : "Unknown error";
//     console.error("❌ POST /api/tasks error:", err);
//     return NextResponse.json(
//       { error: "Server error", details: error },
//       { status: 500 }
//     );
//   }
// }


// // getUserRole function is correctly defined and used.
// async function getUserRole(userId: string): Promise<string | null> {
//   try {
//     const user = await users.getUser(userId);
//     // ✅ Fix: Cast publicMetadata and privateMetadata to the defined interfaces
//     return (
//       (user.publicMetadata as UserPublicMetadata)?.role ||
//       (user.privateMetadata as UserPrivateMetadata)?.role ||
//       null
//     );
//   } catch {
//     return null;
//   }
// }


// export async function GET(req: NextRequest) {
//   try {
//     const { userId } = await getAuth(req);
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const role = await getUserRole(userId);

//     const userIsPrivileged = role === "admin" || role === "master";

//     // ✅ Start of the updated block for including paymentHistory
//     const url = new URL(req.url);
//     const taskId = url.searchParams.get('id'); // Get the optional task ID from query params

//     let tasks;

//     if (taskId) {
//       // If a specific taskId is provided, fetch only that task
//       const task = await prisma.task.findUnique({
//         where: { id: taskId },
//         include: {
//           paymentHistory: {
//             orderBy: { updatedAt: "desc" }, // Optional: order history
//           },
//           // Add other relations if needed, like subtasks, notes, etc.
//           subtasks: true,
//           notes: true,
//         },
//       });
//       tasks = task ? [task] : []; // Wrap in an array for consistency
//     } else {
//       // Otherwise, fetch all tasks based on user privilege
//       tasks = await prisma.task.findMany({
//         where: userIsPrivileged
//           ? {}
//           : {
//               OR: [
//                 { createdByClerkId: userId },
//                 { assigneeIds: { has: userId } },
//               ],
//             },
//         orderBy: { createdAt: "desc" },
//         include: {
//           paymentHistory: {
//             orderBy: { updatedAt: "desc" }, // optional: keep most recent on top
//           },
//           // Add other relations you commonly need here (e.g., subtasks, notes)
//           subtasks: true,
//           notes: true,
//         },
//       });
//     }
//     // ✅ End of the updated block

//     // ✅ Collect all unique user identifiers
//     const userIdentifiers = new Set<string>();
//     for (const task of tasks) {
//       if (task.assignerEmail) userIdentifiers.add(task.assignerEmail);
//       if (Array.isArray(task.assigneeIds)) {
//         task.assigneeIds.forEach((id) => userIdentifiers.add(id));
//       }
//     }

//     // ✅ Batch Clerk lookups (email vs ID)
//     const userLookups = await Promise.all(
//       Array.from(userIdentifiers).map((val) =>
//         val.includes("@")
//           ? users.getUserList({ emailAddress: [val] }).then((res) => res[0]).catch(() => null)
//           : users.getUser(val).catch(() => null)
//       )
//     );

//     // ✅ Build user map by ID and email
//     const userMap: Record<string, { id: string; name: string; email: string }> = {};
//     userLookups.forEach((u) => {
//       if (u) {
//         const email = u.emailAddresses?.[0]?.emailAddress || "";
//         const name = `${u.firstName || ""} ${u.lastName || ""}`.trim() || u.username || "Unnamed";
//         userMap[u.id] = { id: u.id, name, email };
//         if (email) userMap[email] = { id: u.id, name, email };
//       }
//     });

//     // ✅ Enrich tasks with assigner + assignees


//     const enrichedTasks = tasks.map((task) => {
//       const assigner = userMap[task.assignerEmail ?? ""] || {
//         id: "",
//         name: task.assignerName || "—",
//         email: task.assignerEmail || "",
//       };

//       const assignees = Array.isArray(task.assigneeIds)
//         ? task.assigneeIds.map((id) => {
//             const u = userMap[id];
//             return {
//               id,
//               name: u?.name || "—",
//               email: u?.email || "",
//             };
//           })
//         : [];

//       return {
//         ...task,
//         assignerName: assigner.name,
//         assignees,
//       };
//     });

//     console.log(
//       `📄 GET /api/tasks – Role: ${role || "unknown"} – fetched ${enrichedTasks.length} tasks`
//     );

//     return NextResponse.json({ tasks: enrichedTasks }, { status: 200 });

//   } catch (err: unknown) {
//     const error = err instanceof Error ? err.message : "Unknown error";
//     console.error("❌ GET /api/tasks error:", err);
//     return NextResponse.json(
//       { error: "Failed to fetch tasks", details: error },
//       { status: 500 }
//     );
//   }
// }


// export async function OPTIONS() {
//   return NextResponse.json({ ok: true });
// }





















// // C:\Users\VIKASH\clickup-clone\src\app\api\tasks\[id]\route.ts
// 'use server';

// import { NextRequest, NextResponse } from 


// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "../../../../../lib/prisma";
// import { auth } from "@clerk/nextjs/server";

// export const dynamic = "force-dynamic";

// // ✅ Updated: Next.js 15 requires Promise-wrapped params
// type Context = {
//   params: Promise<{ id: string }>;
// };

// export async function PATCH(req: NextRequest, context: Context) {
//   const { id: taskId } = await context.params;
//   const { userId } = await auth();

//   if (!taskId || !userId) {
//     return NextResponse.json({ error: "Unauthorized or missing task ID" }, { status: 400 });
//   }

//   try {
//     const { title, status, customFields } = await req.json();
//     const updated = await prisma.task.update({
//       where: { id: taskId },
//       data: {
//         ...(title && { title }),
//         ...(status && { status }),
//         ...(customFields && { customFields }),
//         updatedAt: new Date(),
//       },
//     });

//     return NextResponse.json({ success: true, task: updated }, { status: 200 });
//   } catch (err) {
//     console.error("❌ Failed to update:", err);
//     return NextResponse.json({ error: "Update failed" }, { status: 500 });
//   }
// }

// export async function DELETE(req: NextRequest, context: Context) {
//   const { id: taskId } = await context.params;
//   const { userId } = await auth();

//   if (!taskId || !userId) {
//     return NextResponse.json({ error: "Unauthorized or missing task ID" }, { status: 400 });
//   }

//   try {
//     await prisma.subtask.deleteMany({ where: { taskId } });
//     await prisma.task.delete({ where: { id: taskId } });
//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (err) {
//     console.error("❌ Delete failed:", err);
//     return NextResponse.json({ error: "Delete failed" }, { status: 500 });
//   }
// }

// export async function GET(req: NextRequest, context: Context) {
//   const { id: taskId } = await context.params;
//   const { userId } = await auth();

//   if (!taskId || !userId) {
//     return NextResponse.json({ error: "Unauthorized or missing task ID" }, { status: 400 });
//   }

//   try {
//     const task = await prisma.task.findUnique({
//       where: { id: taskId },
//       include: { subtasks: true },
//     });

//     if (!task) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     return NextResponse.json(task, { status: 200 });
//   } catch (err) {
//     console.error("❌ Get task failed:", err);
//     return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
//   }
// }















// // use server';
// import { NextRequest, NextResponse } from "next/server";
// import { getAuth } from "@clerk/nextjs/server";
// import { users } from "@clerk/clerk-sdk-node";
// // import { prisma } from "../../../../lib/prisma";
// import { prisma } from "../../../../../lib/prisma";
// // Define an interface for the metadata that contains the role
// interface UserPublicMetadata {
//   role?: string; // Role can be a string or undefined
//   // Add other properties if they exist in your public metadata
// }

// interface UserPrivateMetadata {
//   role?: string; // Role can be a string or undefined
//   // Add other properties if they exist in your private metadata
// }

// // Define the interface for the 'Field' object within customFields
// interface Field {
//   label?: string;
//   value?: string;
//   files?: unknown[]; // Use unknown[] as the files array can contain anything before filtering
// }

// // ✅ Add this helper function below imports
// function toNullableString(val: unknown): string | null {
//   return typeof val === "string" && val.trim() !== "" ? val.trim() : null;
// }

// export async function POST(req: NextRequest) {
//   try {
//     const { userId } = await getAuth(req);
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const body = await req.json();

//     console.log("📦 Raw request body:", JSON.stringify(body, null, 2));


//     if (!body.title || !body.assigneeId) {
//       return NextResponse.json(
//         { error: "Missing title or assigneeId" },
//         { status: 400 }
//       );
//     }

//     const clerkUser = await users.getUser(userId);
//     const assignerEmail = clerkUser.emailAddresses?.[0]?.emailAddress || "unknown";
//     const assignerName = clerkUser.firstName || clerkUser.username || "Unknown";

//     const status = "todo" as const;


//     const {
//       phone,
//       email,
//       shopName,
//       outletName,
//       location,
//       accountNumber,
//       ifscCode,
//       customerName,
//       restId,
//       packageAmount,
//       startDate,
//       endDate,
//       timeline,
//       fields = [], // This 'fields' array needs proper typing
//     } = body.customFields ?? {};

//     const {
//       aadhaarUrl,
//       panUrl,
//       selfieUrl,
//       chequeUrl,
//       menuCardUrls,
//     } = body.customFields ?? {};


//     const safeAttachments = body.attachments ?? [];


//     // ✅ Fix: Replace 'any' with 'Field' and add type guard for 'url'
//     const safeFields = Array.isArray(fields)
//       ? (fields as Field[]).map((f) => ({ // Cast 'fields' to 'Field[]'
//           label: f.label || "",
//           value: f.value || "",
//           files: Array.isArray(f.files)
//             ? f.files.filter((url): url is string => typeof url === "string") // Use type guard for 'url'
//             : [],
//         }))
//       : [];
"next/server";
// import { prisma } from "../../../../../lib/prisma"; // Adjust path to your Prisma client
// import { getAuth } from "@clerk/nextjs/server"; 
// import { auth } from "@clerk/nextjs/server";
// // For getting the current user's authentication details.
// import { users } from "@clerk/clerk-sdk-node";  // Import 'auth' and 'users' for user context and details
// // Ensures this route is always dynamically rendered

// // Define an interface for the metadata that contains the role
// interface UserPublicMetadata {
//   role?: string;
// }

// interface UserPrivateMetadata {
//   role?: string;
// }

// // ✅ Helper function to get user role from Clerk
// async function getUserRole(userId: string): Promise<string | null> {
//   try {
//     const user = await users.getUser(userId);
//     return (
//       (user.publicMetadata as UserPublicMetadata)?.role ||
//       (user.privateMetadata as UserPrivateMetadata)?.role ||
//       null
//     );
//   } catch (error) {
//     console.error(`Error fetching user role for ${userId}:`, error);
//     return null;
//   }
// }

// // ✅ Type definition for Next.js 15 route parameters
// type Context = {
//   params: { id: string }; // 'id' will be a string directly here
// };

// /**
//  * Handles PATCH requests to update an existing task.
//  */
// export async function PATCH(req: NextRequest, context: Context) {
//   const { id: taskId } = await context.params;
//  // Access taskId directly from context.params
//   const { userId } = await auth();

//   if (!taskId || !userId) {
//     return NextResponse.json({ error: "Unauthorized or missing task ID" }, { status: 400 });
//   }

//   try {
//     const body = await req.json();
//     console.log(`📦 PATCH /api/tasks/${taskId} request body:`, body);

//     // Filter out undefined values to avoid updating fields unintentionally
//     const updateData: { [key: string]: any } = { updatedAt: new Date() };

//     if (body.title !== undefined) updateData.title = body.title;
//     if (body.status !== undefined) updateData.status = body.status;
//     if (body.progress !== undefined) updateData.progress = body.progress;
//     if (body.assigneeIds !== undefined) updateData.assigneeIds = body.assigneeIds;
//     if (body.attachments !== undefined) updateData.attachments = body.attachments;
//     if (body.tags !== undefined) updateData.tags = body.tags;
//     if (body.priority !== undefined) updateData.priority = body.priority;
//     if (body.dueDate !== undefined) updateData.dueDate = body.dueDate ? new Date(body.dueDate) : null;

//     // Handle payment updates specifically
//     if (body.amount !== undefined) updateData.amount = parseFloat(body.amount);
//     if (body.received !== undefined) updateData.received = parseFloat(body.received);

//     // If new payment history entry is provided, append it to the existing array
//     if (body.newPaymentEntry) {
//         const existingTask = await prisma.task.findUnique({
//             where: { id: taskId },
//             select: { paymentHistory: true } // Only fetch paymentHistory
//         });

//         const currentHistory = (existingTask?.paymentHistory || []) as any[]; // Type assertion for safety
//         const newHistory = [...currentHistory, body.newPaymentEntry];
//         updateData.paymentHistory = newHistory;
//         console.log("Updated payment history:", newHistory);
//     }

//     // Handle customFields updates carefully (merge or overwrite as per requirement)
//     if (body.customFields !== undefined) {
//         // If you want to merge, fetch existing customFields first
//         const existingTask = await prisma.task.findUnique({
//             where: { id: taskId },
//             select: { customFields: true }
//         });
//         const currentCustomFields = (existingTask?.customFields || {}) as any;
//         updateData.customFields = { ...currentCustomFields, ...body.customFields };
//     }


//     const updatedTask = await prisma.task.update({
//       where: { id: taskId },
//       data: updateData,
//       // ✅ Ensure paymentHistory is included in the response after update
//       select: {
//         id: true,
//         name: true,
//         shop: true,
//         customer: true,
//         start: true,
//         end: true,
//         progress: true,
//         assigneeIds: true,
//         amount: true,
//         received: true,
//         createdByClerkId: true,
//         assignerEmail: true,
//         assignerName: true,
//         createdAt: true,
//         updatedAt: true,
//         customFields: true,
//         attachments: true,
//         tags: true,
//         priority: true,
//         dueDate: true,
//         phone: true,
//         email: true,
//         location: true,
//         accountNumber: true,
//         ifscCode: true,
//         restId: true,
//         aadhaarUrl: true,
//         panUrl: true,
//         selfieUrl: true,
//         chequeUrl: true,
//         menuCardUrls: true,
//         paymentHistory: true, // ✅ Include paymentHistory here for the response
//         subtasks: true, // Include subtasks if relevant for the client
//         notes: true, // Include notes if relevant for the client
//       },
//     });

//     console.log(`✅ Task ${taskId} updated successfully.`);
//     return NextResponse.json({ success: true, task: updatedTask }, { status: 200 });
//   } catch (err) {
//     console.error(`❌ Failed to update task ${taskId}:`, err);
//     return NextResponse.json({ error: "Update failed", details: (err as Error).message }, { status: 500 });
//   }
// }

// /**
//  * Handles DELETE requests to delete a task.
//  */
// export async function DELETE(req: NextRequest, context: Context) {
//   const taskId = context.params.id; // Access taskId directly
//   const { userId } = await auth();

//   if (!taskId || !userId) {
//     return NextResponse.json({ error: "Unauthorized or missing task ID" }, { status: 400 });
//   }

//   try {
//     // Optional: Add authorization check here (e.g., only creator or admin can delete)
//     const taskToDelete = await prisma.task.findUnique({
//         where: { id: taskId },
//         select: { createdByClerkId: true }
//     });

//     const role = await getUserRole(userId);
//     const userIsPrivileged = role === "admin" || role === "master";

//     if (!taskToDelete || (!userIsPrivileged && taskToDelete.createdByClerkId !== userId)) {
//         return NextResponse.json({ error: "Forbidden: You do not have permission to delete this task" }, { status: 403 });
//     }

//     // Delete related subtasks first to avoid foreign key constraints
//     await prisma.subtask.deleteMany({ where: { taskId } });
//     await prisma.note.deleteMany({ where: { taskId } }); // Delete related notes if you have a Note model

//     await prisma.task.delete({ where: { id: taskId } });
//     console.log(`✅ Task ${taskId} and its subtasks/notes deleted successfully.`);
//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (err) {
//     console.error(`❌ Delete failed for task ${taskId}:`, err);
//     return NextResponse.json({ error: "Delete failed", details: (err as Error).message }, { status: 500 });
//   }
// }

// /**
//  * Handles GET requests to fetch a single task by ID.
//  */
// export async function GET(req: NextRequest, context: Context) {
//   const taskId = context.params.id; // Access taskId directly
//   const { userId } = await auth();

//   if (!taskId || !userId) {
//     return NextResponse.json({ error: "Unauthorized or missing task ID" }, { status: 400 });
//   }

//   try {
//     const role = await getUserRole(userId);
//     const userIsPrivileged = role === "admin" || role === "master";

//     const task = await prisma.task.findUnique({
//       where: { id: taskId },
//       // ✅ Explicitly select all fields you need, including paymentHistory (JSON field)
//       // and other relations like subtasks and notes.
//       select: {
//         id: true,
//         name: true,
//         shop: true,
//         customer: true,
//         start: true,
//         end: true,
//         progress: true,
//         assigneeIds: true,
//         amount: true,
//         received: true,
//         createdByClerkId: true,
//         assignerEmail: true,
//         assignerName: true,
//         createdAt: true,
//         updatedAt: true,
//         customFields: true,
//         attachments: true,
//         tags: true,
//         priority: true,
//         dueDate: true,
//         phone: true,
//         email: true,
//         location: true,
//         accountNumber: true,
//         ifscCode: true,
//         restId: true,
//         aadhaarUrl: true,
//         panUrl: true,
//         selfieUrl: true,
//         chequeUrl: true,
//         menuCardUrls: true,
//         // ✅ Include paymentHistory as a direct field selection for JSON types
//         paymentHistory: true, // This is correct for JSON fields
//         // Include relations:
//         subtasks: true,
//         notes: true,
//       },
//     });

//     if (!task) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     // Authorization check: Only privileged users or those involved in the task can view it
//     const isAuthorized = userIsPrivileged ||
//                          task.createdByClerkId === userId ||
//                          (Array.isArray(task.assigneeIds) && task.assigneeIds.includes(userId));

//     if (!isAuthorized) {
//       return NextResponse.json({ error: "Forbidden: You do not have access to this task" }, { status: 403 });
//     }

//     console.log(`📄 GET /api/tasks/${taskId} – Fetched task successfully, including paymentHistory JSON.`);
//     return NextResponse.json(task, { status: 200 }); // Return the task object directly
//   } catch (err) {
//     console.error(`❌ Get task ${taskId} failed:`, err);
//     return NextResponse.json({ error: "Fetch failed", details: (err as Error).message }, { status: 500 });
//   }
// }














































































// 'use server';

// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "../../../../../lib/prisma"; // Adjust path to your Prisma client
// import { getAuth } from "@clerk/nextjs/server"; 
// import { auth } from "@clerk/nextjs/server";
// // For getting the current user's authentication details.
// import { users } from "@clerk/clerk-sdk-node";  // Import 'auth' and 'users' for user context and details
// // Ensures this route is always dynamically rendered

// // Define interfaces for user metadata
// interface UserPublicMetadata {
//   role?: string;
// }
// interface UserPrivateMetadata {
//   role?: string;
// }

// // Get user role
// async function getUserRole(userId: string): Promise<string | null> {
//   try {
//     const user = await users.getUser(userId);
//     return (
//       (user.publicMetadata as UserPublicMetadata)?.role ||
//       (user.privateMetadata as UserPrivateMetadata)?.role ||
//       null
//     );
//   } catch (error) {
//     console.error(`Error fetching user role for ${userId}:`, error);
//     return null;
//   }
// }

// type Context = {
//   params: { id: string };
// };

// // PATCH: Update Task
// export async function PATCH(req: NextRequest, context: Context) {
//   const { id: taskId } = context.params; // ✅ FIXED: no 'await' here
//   const { userId } = await auth();

//   if (!taskId || !userId) {
//     return NextResponse.json({ error: "Unauthorized or missing task ID" }, { status: 400 });
//   }

//   try {
//     const body = await req.json();
//     const updateData: { [key: string]: any } = { updatedAt: new Date() };

//     if (body.title !== undefined) updateData.title = body.title;
//     if (body.status !== undefined) updateData.status = body.status;
//     if (body.progress !== undefined) updateData.progress = body.progress;
//     if (body.assigneeIds !== undefined) updateData.assigneeIds = body.assigneeIds;
//     if (body.attachments !== undefined) updateData.attachments = body.attachments;
//     if (body.tags !== undefined) updateData.tags = body.tags;
//     if (body.priority !== undefined) updateData.priority = body.priority;
//     if (body.dueDate !== undefined) updateData.dueDate = body.dueDate ? new Date(body.dueDate) : null;
//     if (body.amount !== undefined) updateData.amount = parseFloat(body.amount);
//     if (body.received !== undefined) updateData.received = parseFloat(body.received);

//     if (body.newPaymentEntry) {
//       const existingTask = await prisma.task.findUnique({
//         where: { id: taskId },
//         select: { paymentHistory: true },
//       });
//       const currentHistory = (existingTask?.paymentHistory || []) as any[];
//       updateData.paymentHistory = [...currentHistory, body.newPaymentEntry];
//     }

//     if (body.customFields !== undefined) {
//       const existingTask = await prisma.task.findUnique({
//         where: { id: taskId },
//         select: { customFields: true },
//       });
//       const currentFields = (existingTask?.customFields || {}) as any;
//       updateData.customFields = { ...currentFields, ...body.customFields };
//     }

//     const updatedTask = await prisma.task.update({
//       where: { id: taskId },
//       data: updateData,
//       select: {
//         id: true,
//         name: true,
//         shop: true,
//         customer: true,
//         start: true,
//         end: true,
//         progress: true,
//         assigneeIds: true,
//         amount: true,
//         received: true,
//         createdByClerkId: true,
//         assignerEmail: true,
//         assignerName: true,
//         createdAt: true,
//         updatedAt: true,
//         customFields: true,
//         attachments: true,
//         tags: true,
//         priority: true,
//         dueDate: true,
//         phone: true,
//         email: true,
//         location: true,
//         accountNumber: true,
//         ifscCode: true,
//         restId: true,
//         aadhaarUrl: true,
//         panUrl: true,
//         selfieUrl: true,
//         chequeUrl: true,
//         menuCardUrls: true,
//         paymentHistory: true,
//         subtasks: true,
//         notes: true,
//       },
//     });

//     return NextResponse.json({ success: true, task: updatedTask }, { status: 200 });
//   } catch (err) {
//     return NextResponse.json({ error: "Update failed", details: (err as Error).message }, { status: 500 });
//   }
// }

// // DELETE: Delete Task
// export async function DELETE(req: NextRequest, context: Context) {
//   const taskId = context.params.id;
//   const { userId } = await auth();

//   if (!taskId || !userId) {
//     return NextResponse.json({ error: "Unauthorized or missing task ID" }, { status: 400 });
//   }

//   try {
//     const taskToDelete = await prisma.task.findUnique({
//       where: { id: taskId },
//       select: { createdByClerkId: true },
//     });

//     const role = await getUserRole(userId);
//     const userIsPrivileged = role === "admin" || role === "master";

//     if (!taskToDelete || (!userIsPrivileged && taskToDelete.createdByClerkId !== userId)) {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     await prisma.subtask.deleteMany({ where: { taskId } });
//     await prisma.note.deleteMany({ where: { taskId } });
//     await prisma.task.delete({ where: { id: taskId } });

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (err) {
//     return NextResponse.json({ error: "Delete failed", details: (err as Error).message }, { status: 500 });
//   }
// }

// // GET: Fetch Task by ID
// export async function GET(req: NextRequest, context: Context) {
//   const taskId = context.params.id;
//   const { userId } = await auth();

//   if (!taskId || !userId) {
//     return NextResponse.json({ error: "Unauthorized or missing task ID" }, { status: 400 });
//   }

//   try {
//     const role = await getUserRole(userId);
//     const userIsPrivileged = role === "admin" || role === "master";

//     const task = await prisma.task.findUnique({
//       where: { id: taskId },
//       select: {
//         id: true,
//         name: true,
//         shop: true,
//         customer: true,
//         start: true,
//         end: true,
//         progress: true,
//         assigneeIds: true,
//         amount: true,
//         received: true,
//         createdByClerkId: true,
//         assignerEmail: true,
//         assignerName: true,
//         createdAt: true,
//         updatedAt: true,
//         customFields: true,
//         attachments: true,
//         tags: true,
//         priority: true,
//         dueDate: true,
//         phone: true,
//         email: true,
//         location: true,
//         accountNumber: true,
//         ifscCode: true,
//         restId: true,
//         aadhaarUrl: true,
//         panUrl: true,
//         selfieUrl: true,
//         chequeUrl: true,
//         menuCardUrls: true,
//         paymentHistory: true,
//         subtasks: true,
//         notes: true,
//       },
//     });

//     if (!task) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     const isAuthorized = userIsPrivileged ||
//       task.createdByClerkId === userId ||
//       (Array.isArray(task.assigneeIds) && task.assigneeIds.includes(userId));

//     if (!isAuthorized) {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     return NextResponse.json(task, { status: 200 });
//   } catch (err) {
//     return NextResponse.json({ error: "Fetch failed", details: (err as Error).message }, { status: 500 });
//   }
// }
























// // C:\Users\VIKASH\clickup-clone\src\app\api\tasks\[id]\route.ts
// 'use server';

// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "../../../../../lib/prisma"; // Adjust path to your Prisma client
// // ✅ FIX: Import getAuth for API routes, and users for Clerk SDK functions
// import { getAuth } from "@clerk/nextjs/server";
// import { users } from "@clerk/clerk-sdk-node";



// // Define interfaces for user metadata (for role checks)
// interface UserPublicMetadata {
//   role?: string;
// }
// interface UserPrivateMetadata {
//   role?: string;
// }

// // Get user role
// async function getUserRole(userId: string): Promise<string | null> {
//   try {
//     const user = await users.getUser(userId);
//     return (
//       (user.publicMetadata as UserPublicMetadata)?.role ||
//       (user.privateMetadata as UserPrivateMetadata)?.role ||
//       null
//     );
//   } catch (error) {
//     console.error(`Error fetching user role for ${userId}:`, error);
//     return null;
//   }
// }

// // Type definition for route parameters
// type Context = {
//   params: { id: string };
// };

// /**
//  * Handles PATCH requests to update an existing task.
//  */
// export async function PATCH(req: NextRequest, context: Context) {
//   const { id: taskId } = context.params;
//   // ✅ FIX: Use getAuth(req) for API routes
//   const { userId } = getAuth(req);

//   if (!taskId || !userId) {
//     return NextResponse.json({ error: "Unauthorized or missing task ID" }, { status: 400 });
//   }

//   try {
//     const body = await req.json();
//     console.log(`📦 PATCH /api/tasks/${taskId} request body:`, body); // Added for debugging

//     const updateData: { [key: string]: any } = { updatedAt: new Date() };

//     // Update individual fields if they are provided in the body
//     if (body.title !== undefined) updateData.title = body.title;
//     if (body.status !== undefined) updateData.status = body.status;
//     if (body.progress !== undefined) updateData.progress = body.progress;
//     if (body.assigneeIds !== undefined) updateData.assigneeIds = body.assigneeIds;
//     if (body.attachments !== undefined) updateData.attachments = body.attachments;
//     if (body.tags !== undefined) updateData.tags = body.tags;
//     if (body.priority !== undefined) updateData.priority = body.priority;
//     if (body.dueDate !== undefined) updateData.dueDate = body.dueDate ? new Date(body.dueDate) : null;
//     if (body.amount !== undefined) updateData.amount = parseFloat(body.amount);
//     if (body.received !== undefined) updateData.received = parseFloat(body.received);

//     // Append new payment history entry if provided
//     if (body.newPaymentEntry) {
//       const existingTask = await prisma.task.findUnique({
//         where: { id: taskId },
//         select: { paymentHistory: true },
//       });
//       const currentHistory = (existingTask?.paymentHistory || []) as any[];
//       updateData.paymentHistory = [...currentHistory, body.newPaymentEntry];
//     }

//     // Merge customFields (assuming partial updates for customFields)
//     if (body.customFields !== undefined) {
//       const existingTask = await prisma.task.findUnique({
//         where: { id: taskId },
//         select: { customFields: true },
//       });
//       const currentFields = (existingTask?.customFields || {}) as any;
//       updateData.customFields = { ...currentFields, ...body.customFields };
//     }

//     const updatedTask = await prisma.task.update({
//       where: { id: taskId },
//       data: updateData,
//       select: { // Ensure all necessary fields are returned
//         id: true, name: true, shop: true, customer: true, start: true, end: true,
//         progress: true, assigneeIds: true, amount: true, received: true,
//         createdByClerkId: true, assignerEmail: true, assignerName: true,
//         createdAt: true, updatedAt: true, customFields: true, attachments: true,
//         tags: true, priority: true, dueDate: true, phone: true, email: true,
//         location: true, accountNumber: true, ifscCode: true, restId: true,
//         aadhaarUrl: true, panUrl: true, selfieUrl: true, chequeUrl: true,
//         menuCardUrls: true, paymentHistory: true, subtasks: true, notes: true,
//       },
//     });

//     console.log(`✅ Task ${taskId} updated successfully.`); // Added for debugging
//     return NextResponse.json({ success: true, task: updatedTask }, { status: 200 });
//   } catch (err) {
//     console.error(`❌ Failed to update task ${taskId}:`, err); // Added for debugging
//     return NextResponse.json({ error: "Update failed", details: (err as Error).message }, { status: 500 });
//   }
// }

// - - -

// /**
//  * Handles DELETE requests to delete a task.
//  */
// export async function DELETE(req: NextRequest, context: Context) {
//   const taskId = context.params.id;
//   // ✅ FIX: Use getAuth(req) for API routes
//   const { userId } = getAuth(req);

//   if (!taskId || !userId) {
//     return NextResponse.json({ error: "Unauthorized or missing task ID" }, { status: 400 });
//   }

//   try {
//     const taskToDelete = await prisma.task.findUnique({
//       where: { id: taskId },
//       select: { createdByClerkId: true },
//     });

//     const role = await getUserRole(userId);
//     const userIsPrivileged = role === "admin" || role === "master";

//     if (!taskToDelete || (!userIsPrivileged && taskToDelete.createdByClerkId !== userId)) {
//       return NextResponse.json({ error: "Forbidden: You do not have permission to delete this task" }, { status: 403 }); // More descriptive error
//     }

//     await prisma.subtask.deleteMany({ where: { taskId } });
//     await prisma.note.deleteMany({ where: { taskId } });
//     await prisma.task.delete({ where: { id: taskId } });

//     console.log(`✅ Task ${taskId} and its related data deleted successfully.`); // Added for debugging
//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (err) {
//     console.error(`❌ Delete failed for task ${taskId}:`, err); // Added for debugging
//     return NextResponse.json({ error: "Delete failed", details: (err as Error).message }, { status: 500 });
//   }
// }

// - - -

// /**
//  * Handles GET requests to fetch a single task by ID.
//  */
// export async function GET(req: NextRequest, context: Context) {
//   const taskId = context.params.id;
//   // ✅ FIX: Use getAuth(req) for API routes
//   const { userId } = getAuth(req);

//   if (!taskId || !userId) {
//     return NextResponse.json({ error: "Unauthorized or missing task ID" }, { status: 400 });
//   }

//   try {
//     const role = await getUserRole(userId);
//     const userIsPrivileged = role === "admin" || role === "master";

//     const task = await prisma.task.findUnique({
//       where: { id: taskId },
//       select: { // Explicitly select all required fields
//         id: true, name: true, shop: true, customer: true, start: true, end: true,
//         progress: true, assigneeIds: true, amount: true, received: true,
//         createdByClerkId: true, assignerEmail: true, assignerName: true,
//         createdAt: true, updatedAt: true, customFields: true, attachments: true,
//         tags: true, priority: true, dueDate: true, phone: true, email: true,
//         location: true, accountNumber: true, ifscCode: true, restId: true,
//         aadhaarUrl: true, panUrl: true, selfieUrl: true, chequeUrl: true,
//         menuCardUrls: true,
//         paymentHistory: true, // Correct way to include JSON field
//         subtasks: true,
//         notes: true,
//       },
//     });

//     if (!task) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     // Authorization check
//     const isAuthorized = userIsPrivileged ||
//                          task.createdByClerkId === userId ||
//                          (Array.isArray(task.assigneeIds) && task.assigneeIds.includes(userId));

//     if (!isAuthorized) {
//       return NextResponse.json({ error: "Forbidden: You do not have access to this task" }, { status: 403 }); // More descriptive error
//     }

//     console.log(`📄 GET /api/tasks/${taskId} – Fetched task successfully, including paymentHistory JSON.`);
//     return NextResponse.json(task, { status: 200 });
//   } catch (error) {
//     console.error(`❌ Get task ${taskId} failed:`, error);
//     return NextResponse.json({ error: "Failed to fetch task", details: (error as Error).message }, { status: 500 });
//   }
// }


















// // C:\Users\VIKASH\clickup-clone\src\app\api\tasks\[id]\route.ts
// 'use server';

// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "../../../../../lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";
// import { users } from "@clerk/clerk-sdk-node";

// interface UserPublicMetadata {
//   role?: string;
// }
// interface UserPrivateMetadata {
//   role?: string;
// }

// async function getUserRole(userId: string): Promise<string | null> {
//   try {
//     const user = await users.getUser(userId);
//     return (
//       (user.publicMetadata as UserPublicMetadata)?.role ||
//       (user.privateMetadata as UserPrivateMetadata)?.role ||
//       null
//     );
//   } catch (error) {
//     console.error(`Error fetching user role for ${userId}:`, error);
//     return null;
//   }
// }

// type Context = {
//   params: { id: string };
// };

// // PATCH – Update task
// export async function PATCH(req: NextRequest, context: Context) {
//   const params = context.params;
//   const taskId = params.id;
//   const { userId } = getAuth(req);

//   if (!taskId || !userId) {
//     return NextResponse.json({ message: "Unauthorized or invalid ID" }, { status: 401 });
//   }

//   try {
//     const body = await req.json();
//     console.log(`📦 PATCH /api/tasks/${taskId} request body:`, body);

//     const updateData: { [key: string]: any } = { updatedAt: new Date() };

//     if (body.title !== undefined) updateData.title = body.title;
//     if (body.status !== undefined) updateData.status = body.status;
//     if (body.progress !== undefined) updateData.progress = body.progress;
//     if (body.assigneeIds !== undefined) updateData.assigneeIds = body.assigneeIds;
//     if (body.attachments !== undefined) updateData.attachments = body.attachments;
//     if (body.tags !== undefined) updateData.tags = body.tags;
//     if (body.priority !== undefined) updateData.priority = body.priority;
//     if (body.dueDate !== undefined) updateData.dueDate = body.dueDate ? new Date(body.dueDate) : null;
//     if (body.amount !== undefined) updateData.amount = parseFloat(body.amount);
//     if (body.received !== undefined) updateData.received = parseFloat(body.received);
//     if (body.highlightColor !== undefined) updateData.highlightColor = body.highlightColor;

//     if (body.newPaymentEntry) {
//       const existingTask = await prisma.task.findUnique({
//         where: { id: taskId },
//         select: { paymentHistory: true },
//       });
//       const currentHistory = (existingTask?.paymentHistory || []) as any[];
//       updateData.paymentHistory = [...currentHistory, body.newPaymentEntry];
//     }

//     if (body.customFields !== undefined) {
//       const existingTask = await prisma.task.findUnique({
//         where: { id: taskId },
//         select: { customFields: true },
//       });
//       const currentFields = (existingTask?.customFields || {}) as any;
//       updateData.customFields = { ...currentFields, ...body.customFields };
//     }

//     const updatedTask = await prisma.task.update({
//       where: { id: taskId },
//       data: updateData,
//       select: {
//         id: true,
//         title: true, // ✅ Changed 'name' to 'title'
//         shop: true,
//         customer: true,
//         start: true,
//         end: true,
//         progress: true,
//         assigneeIds: true,
//         amount: true,
//         received: true,
//         createdByClerkId: true,
//         assignerEmail: true,
//         assignerName: true,
//         createdAt: true,
//         updatedAt: true,
//         customFields: true,
//         attachments: true,
//         tags: true,
//         priority: true,
//         dueDate: true,
//         phone: true,
//         email: true,
//         location: true,
//         accountNumber: true,
//         ifscCode: true,
//         restId: true,
//         aadhaarUrl: true,
//         panUrl: true,
//         selfieUrl: true,
//         chequeUrl: true,
//         menuCardUrls: true,
//         paymentHistory: true,
//         subtasks: true,
//         notes: true,
//         highlightColor: true,
//       },
//     });

//     console.log(`✅ Task ${taskId} updated successfully.`);
//     return NextResponse.json({ success: true, task: updatedTask }, { status: 200 });
//   } catch (err) {
//     console.error(`❌ Failed to update task ${taskId}:`, err);
//     return NextResponse.json({ error: "Update failed", details: (err as Error).message }, { status: 500 });
//   }
// }

// // DELETE – Delete task
// export async function DELETE(req: NextRequest, context: Context) {
//   const params = context.params;
//   const taskId = params.id;
//   const { userId } = getAuth(req);

//   if (!taskId || !userId) {
//     return NextResponse.json({ error: "Unauthorized or missing task ID" }, { status: 400 });
//   }

//   try {
//     const taskToDelete = await prisma.task.findUnique({
//       where: { id: taskId },
//       select: { createdByClerkId: true },
//     });

//     const role = await getUserRole(userId);
//     const userIsPrivileged = role === "admin" || role === "master";

//     if (!taskToDelete || (!userIsPrivileged && taskToDelete.createdByClerkId !== userId)) {
//       return NextResponse.json({ error: "Forbidden: You do not have permission to delete this task" }, { status: 403 });
//     }

//     await prisma.subtask.deleteMany({ where: { taskId } });
//     await prisma.note.deleteMany({ where: { taskId } });
//     await prisma.task.delete({ where: { id: taskId } });

//     console.log(`✅ Task ${taskId} and its related data deleted successfully.`);
//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (err) {
//     console.error(`❌ Delete failed for task ${taskId}:`, err);
//     return NextResponse.json({ error: "Delete failed", details: (err as Error).message }, { status: 500 });
//   }
// }

// // GET – Fetch task by ID
// export async function GET(req: NextRequest, context: Context) {
//   const params = context.params;
//   const taskId = params.id;
//   const { userId } = getAuth(req);

//   if (!taskId || !userId) {
//     return NextResponse.json({ error: "Unauthorized or missing task ID" }, { status: 400 });
//   }

//   try {
//     const role = await getUserRole(userId);
//     const userIsPrivileged = role === "admin" || role === "master";

//     const task = await prisma.task.findUnique({
//       where: { id: taskId },
//       select: {
//         id: true,
//         title: true, // ✅ Changed 'name' to 'title'
//         shop: true,
//         customer: true,
//         start: true,
//         end: true,
//         progress: true,
//         assigneeIds: true,
//         amount: true,
//         received: true,
//         createdByClerkId: true,
//         assignerEmail: true,
//         assignerName: true,
//         createdAt: true,
//         updatedAt: true,
//         customFields: true,
//         attachments: true,
//         tags: true,
//         priority: true,
//         dueDate: true,
//         phone: true,
//         email: true,
//         location: true,
//         accountNumber: true,
//         ifscCode: true,
//         restId: true,
//         aadhaarUrl: true,
//         panUrl: true,
//         selfieUrl: true,
//         chequeUrl: true,
//         menuCardUrls: true,
//         paymentHistory: true,
//         subtasks: true,
//         notes: true,
//         highlightColor: true,
//       },
//     });

//     if (!task) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     const isAuthorized =
//       userIsPrivileged ||
//       task.createdByClerkId === userId ||
//       (Array.isArray(task.assigneeIds) && task.assigneeIds.includes(userId));

//     if (!isAuthorized) {
//       return NextResponse.json({ error: "Forbidden: You do not have access to this task" }, { status: 403 });
//     }

//     console.log(`📄 GET /api/tasks/${taskId} – Fetched task successfully.`);
//     return NextResponse.json(task, { status: 200 });
//   } catch (error) {
//     console.error(`❌ Get task ${taskId} failed:`, error);
//     return NextResponse.json({ error: "Failed to fetch task", details: (error as Error).message }, { status: 500 });
//   }
// // }












// // C:\Users\VIKASH\clickup-clone\src\app\api\tasks\[id]\route.ts
// 'use server';

// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "../../../../../lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";
// import { users } from "@clerk/clerk-sdk-node";

// interface UserPublicMetadata {
//   role?: string;
// }
// interface UserPrivateMetadata {
//   role?: string;
// }

// async function getUserRole(userId: string): Promise<string | null> {
//   try {
//     const user = await users.getUser(userId);
//     return (
//       (user.publicMetadata as UserPublicMetadata)?.role ||
//       (user.privateMetadata as UserPrivateMetadata)?.role ||
//       null
//     );
//   } catch (error) {
//     console.error(`Error fetching user role for ${userId}:`, error);
//     return null;
//   }
// }

// type Context = {
//   params: { id: string };
// };

// // --- PATCH – Update task ---
// export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
//   const taskId = params.id;
//   const { userId } = getAuth(req);

//   if (!taskId || !userId) {
//     return NextResponse.json({ message: "Unauthorized or invalid ID" }, { status: 401 });
//   }

//   try {
//     const body = await req.json();
//     console.log(`📦 PATCH /api/tasks/${taskId} request body:`, body);

//     // Prepare update data, starting with updatedAt
//     const updateData: { [key: string]: any } = { updatedAt: new Date() };

//     // Dynamically add fields from the request body to updateData
//     // This allows updating any field sent in the request body
//     if (body.title !== undefined) updateData.title = body.title;
//     if (body.status !== undefined) updateData.status = body.status;
//     if (body.progress !== undefined) updateData.progress = body.progress;
//     if (body.assigneeIds !== undefined) updateData.assigneeIds = body.assigneeIds;
//     if (body.attachments !== undefined) updateData.attachments = body.attachments;
//     if (body.tags !== undefined) updateData.tags = body.tags;
//     if (body.priority !== undefined) updateData.priority = body.priority;
//     if (body.dueDate !== undefined) updateData.dueDate = body.dueDate ? new Date(body.dueDate) : null;
//     if (body.amount !== undefined) updateData.amount = parseFloat(body.amount);
//     if (body.received !== undefined) updateData.received = parseFloat(body.received);
//     // ✅ Specifically handle highlightColor
//     if (body.highlightColor !== undefined) updateData.highlightColor = body.highlightColor;

//     if (body.newPaymentEntry) {
//       const existingTask = await prisma.task.findUnique({
//         where: { id: taskId },
//         select: { paymentHistory: true },
//       });
//       const currentHistory = (existingTask?.paymentHistory || []) as any[];
//       updateData.paymentHistory = [...currentHistory, body.newPaymentEntry];
//     }

//     if (body.customFields !== undefined) {
//       const existingTask = await prisma.task.findUnique({
//         where: { id: taskId },
//         select: { customFields: true },
//       });
//       const currentFields = (existingTask?.customFields || {}) as any;
//       updateData.customFields = { ...currentFields, ...body.customFields };
//     }

//     const updatedTask = await prisma.task.update({
//       where: { id: taskId },
//       data: updateData,
//       select: {
//         id: true,
//         title: true, // Assuming 'title' is the correct field for the task name
//         shop: true,
//         customer: true,
//         start: true,
//         end: true,
//         progress: true,
//         assigneeIds: true,
//         amount: true,
//         received: true,
//         createdByClerkId: true,
//         assignerEmail: true,
//         assignerName: true,
//         createdAt: true,
//         updatedAt: true,
//         customFields: true,
//         attachments: true,
//         tags: true,
//         priority: true,
//         dueDate: true,
//         phone: true,
//         email: true,
//         location: true,
//         accountNumber: true,
//         ifscCode: true,
//         restId: true,
//         aadhaarUrl: true,
//         panUrl: true,
//         selfieUrl: true,
//         chequeUrl: true,
//         menuCardUrls: true,
//         paymentHistory: true,
//         subtasks: true,
//         notes: true,
//         highlightColor: true, // ✅ Ensure highlightColor is returned
//       },
//     });

//     console.log(`✅ Task ${taskId} updated successfully.`);
//     return NextResponse.json({ success: true, task: updatedTask }, { status: 200 }); // Return 'task' as the key
//   } catch (err: any) {
//     console.error(`❌ Failed to update task ${taskId}:`, err);
//     return NextResponse.json({ error: "Update failed", details: err.message }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// // --- DELETE – Delete task (Keep your existing DELETE logic) ---
// export async function DELETE(req: NextRequest, context: Context) {
//   const params = context.params;
//   const taskId = params.id;
//   const { userId } = getAuth(req);

//   if (!taskId || !userId) {
//     return NextResponse.json({ error: "Unauthorized or missing task ID" }, { status: 400 });
//   }

//   try {
//     const taskToDelete = await prisma.task.findUnique({
//       where: { id: taskId },
//       select: { createdByClerkId: true },
//     });

//     const role = await getUserRole(userId);
//     const userIsPrivileged = role === "admin" || role === "master";

//     if (!taskToDelete || (!userIsPrivileged && taskToDelete.createdByClerkId !== userId)) {
//       return NextResponse.json({ error: "Forbidden: You do not have permission to delete this task" }, { status: 403 });
//     }

//     await prisma.subtask.deleteMany({ where: { taskId } });
//     await prisma.note.deleteMany({ where: { taskId } });
//     await prisma.task.delete({ where: { id: taskId } });

//     console.log(`✅ Task ${taskId} and its related data deleted successfully.`);
//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (err) {
//     console.error(`❌ Delete failed for task ${taskId}:`, err);
//     return NextResponse.json({ error: "Delete failed", details: (err as Error).message }, { status: 500 });
//   }
// }

// // --- GET – Fetch task by ID (Keep your existing GET logic) ---
// export async function GET(req: NextRequest, context: Context) {
//   const params = context.params;
//   const taskId = params.id;
//   const { userId } = getAuth(req);

//   if (!taskId || !userId) {
//     return NextResponse.json({ error: "Unauthorized or missing task ID" }, { status: 400 });
//   }

//   try {
//     const role = await getUserRole(userId);
//     const userIsPrivileged = role === "admin" || role === "master";

//     const task = await prisma.task.findUnique({
//       where: { id: taskId },
//       select: {
//         id: true,
//         title: true, // Assuming 'title' is the correct field for the task name
//         shop: true,
//         customer: true,
//         start: true,
//         end: true,
//         progress: true,
//         assigneeIds: true,
//         amount: true,
//         received: true,
//         createdByClerkId: true,
//         assignerEmail: true,
//         assignerName: true,
//         createdAt: true,
//         updatedAt: true,
//         customFields: true,
//         attachments: true,
//         tags: true,
//         priority: true,
//         dueDate: true,
//         phone: true,
//         email: true,
//         location: true,
//         accountNumber: true,
//         ifscCode: true,
//         restId: true,
//         aadhaarUrl: true,
//         panUrl: true,
//         selfieUrl: true,
//         chequeUrl: true,
//         menuCardUrls: true,
//         paymentHistory: true,
//         subtasks: true,
//         notes: true,
//         highlightColor: true,
//       },
//     });

//     if (!task) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     const isAuthorized =
//       userIsPrivileged ||
//       task.createdByClerkId === userId ||
//       (Array.isArray(task.assigneeIds) && task.assigneeIds.includes(userId));

//     if (!isAuthorized) {
//       return NextResponse.json({ error: "Forbidden: You do not have access to this task" }, { status: 403 });
//     }

//     console.log(`📄 GET /api/tasks/${taskId} – Fetched task successfully.`);
//     return NextResponse.json(task, { status: 200 });
//   } catch (error) {
//     console.error(`❌ Get task ${taskId} failed:`, error);
//     return NextResponse.json({ error: "Failed to fetch task", details: (error as Error).message }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// }













// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "../../../../../lib/prisma";
// import { auth } from "@clerk/nextjs/server";

// export const dynamic = "force-dynamic";

// // ✅ Updated: Next.js 15 requires Promise-wrapped params
// type Context = {
//   params: Promise<{ id: string }>;
// };

// export async function PATCH(req: NextRequest, context: Context) {
//   const { id: taskId } = await context.params;
//   const { userId } = await auth();

//   if (!taskId || !userId) {
//     return NextResponse.json({ error: "Unauthorized or missing task ID" }, { status: 400 });
//   }

//   try {
//     const { title, status, customFields } = await req.json();
//     const updated = await prisma.task.update({
//       where: { id: taskId },
//       data: {
//         ...(title && { title }),
//         ...(status && { status }),
//         ...(customFields && { customFields }),
//         updatedAt: new Date(),
//       },
//     });

//     return NextResponse.json({ success: true, task: updated }, { status: 200 });
//   } catch (err) {
//     console.error("❌ Failed to update:", err);
//     return NextResponse.json({ error: "Update failed" }, { status: 500 });
//   }
// }

// export async function DELETE(req: NextRequest, context: Context) {
//   const { id: taskId } = await context.params;
//   const { userId } = await auth();

//   if (!taskId || !userId) {
//     return NextResponse.json({ error: "Unauthorized or missing task ID" }, { status: 400 });
//   }

//   try {
//     await prisma.subtask.deleteMany({ where: { taskId } });
//     await prisma.task.delete({ where: { id: taskId } });
//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (err) {
//     console.error("❌ Delete failed:", err);
//     return NextResponse.json({ error: "Delete failed" }, { status: 500 });
//   }
// }

// export async function GET(req: NextRequest, context: Context) {
//   const { id: taskId } = await context.params;
//   const { userId } = await auth();

//   if (!taskId || !userId) {
//     return NextResponse.json({ error: "Unauthorized or missing task ID" }, { status: 400 });
//   }

//   try {
//     const task = await prisma.task.findUnique({
//       where: { id: taskId },
//       include: { subtasks: true },
//     });

//     if (!task) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     return NextResponse.json(task, { status: 200 });
//   } catch (err) {
//     console.error("❌ Get task failed:", err);
//     return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
//   }
// }































// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "../../../../../lib/prisma"; // ✅ Adjust path as needed
// import { auth } from "@clerk/nextjs/server";

// export const dynamic = "force-dynamic";

// // ✅ GET Task by ID
// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const { id: taskId } = params;
//   const { userId } = await auth();

//   if (!taskId || !userId) {
//     return NextResponse.json(
//       { error: "Unauthorized or missing task ID" },
//       { status: 400 }
//     );
//   }

//   try {
//     const task = await prisma.task.findUnique({
//       where: { id: taskId },
//       include: { subtasks: true },
//     });

//     if (!task) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     return NextResponse.json(task, { status: 200 });
//   } catch (err) {
//     console.error("❌ Get task failed:", err);
//     return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
//   }
// }

// // ✅ PATCH Task (Update)
// export async function PATCH(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const { id: taskId } = params;
//   const { userId } = await auth();

//   if (!taskId || !userId) {
//     return NextResponse.json(
//       { error: "Unauthorized or missing task ID" },
//       { status: 400 }
//     );
//   }

//   try {
//     const {
//       title,
//       status,
//       customFields,
//       amount,
//       received,
//       highlightColor,
//     } = await req.json();

//     const updated = await prisma.task.update({
//       where: { id: taskId },
//       data: {
//         ...(title && { title }),
//         ...(status && { status }),
//         ...(customFields && { customFields }),
//         ...(amount !== undefined && { amount }), // ✅ Update amount if provided
//         ...(received !== undefined && { received }), // ✅ Update received if provided
//         ...(highlightColor && { highlightColor }),
//         updatedAt: new Date(),
//       },
//     });

//     return NextResponse.json({ success: true, task: updated }, { status: 200 });
//   } catch (err) {
//     console.error("❌ Update failed:", err);
//     return NextResponse.json({ error: "Update failed" }, { status: 500 });
//   }
// }

// // ✅ DELETE Task
// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const { id: taskId } = params;
//   const { userId } = await auth();

//   if (!taskId || !userId) {
//     return NextResponse.json(
//       { error: "Unauthorized or missing task ID" },
//       { status: 400 }
//     );
//   }

//   try {
//     await prisma.subtask.deleteMany({ where: { taskId } });
//     await prisma.task.delete({ where: { id: taskId } });

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (err) {
//     console.error("❌ Delete failed:", err);
//     return NextResponse.json({ error: "Delete failed" }, { status: 500 });
//   }
// }
























// // FILE: src/app/api/tasks/[id]/route.ts

// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "../../../../../lib/prisma"; // Adjust path if needed based on your project structure
// import { auth } from "@clerk/nextjs/server"; // Using Clerk's auth
// import { Prisma } from "@prisma/client"; // Import Prisma for types like JsonObject, TaskUpdateInput

// export const dynamic = "force-dynamic";

// // Define the expected structure for the PATCH request body
// // This is an example, adjust based on your actual fields and their types
// interface PatchRequestBody {
//   title?: string;
//   status?: string;
//   amount?: number;
//   received?: number;
//   description?: string;
//   highlightColor?: string | null;
//   customFields?: Record<string, any>; // This can be refined further if customFields has a strict schema
// }

// // --- GET Task by ID (No changes needed here from your provided code) ---
// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const { id: taskId } = params;
//   const { userId } = auth(); // Get userId from Clerk authentication

//   if (!taskId || !userId) {
//     return NextResponse.json(
//       { error: "Unauthorized or missing task ID" },
//       { status: 400 }
//     );
//   }

//   try {
//     const task = await prisma.task.findUnique({
//       where: { id: taskId },
//       include: { subtasks: true }, // Include subtasks if relevant
//     });

//     if (!task) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     // You might want to add a check here to ensure the user is authorized to view this specific task
//     // e.g., if (task.userId !== userId) { return NextResponse.json({ error: "Forbidden" }, { status: 403 }); }

//     return NextResponse.json(task, { status: 200 });
//   } catch (err: unknown) { // FIX: Type caught error as unknown
//     console.error("❌ Get task failed:", err);
//     return NextResponse.json({ error: "Fetch failed", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
//   }
// }

// // --- PATCH Task (Update) ---
// export async function PATCH(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const { id: taskId } = params;
//   const { userId } = await auth();

//   if (!taskId) {
//     return NextResponse.json({ error: "Missing task ID in URL" }, { status: 400 });
//   }
//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     // FIX: Type the request body
//     const body: PatchRequestBody = await req.json();
//     // FIX (Line 2152 equivalent): Use Prisma.TaskUpdateInput for type safety
//     const updateData: Prisma.TaskUpdateInput = { updatedAt: new Date() };

//     const allowedFields = [
//       "title",
//       "status",
//       "amount",
//       "received",
//       "description",
//       "highlightColor",
//     ];

//     for (const field of allowedFields) {
//       if (body[field as keyof PatchRequestBody] !== undefined) { // Cast to keyof PatchRequestBody
//         // Ensure amount and received are numbers or null if applicable
//         if ((field === "amount" || field === "received")) {
//             const value = body[field as 'amount' | 'received']; // Safely access
//             if (typeof value === 'number' || value === null) { // Allow null if your schema supports it
//                 updateData[field as 'amount' | 'received'] = value;
//             } else if (typeof value === 'string' && !isNaN(parseFloat(value))) {
//                 updateData[field as 'amount' | 'received'] = parseFloat(value);
//             }
//             // else: handle invalid type, maybe skip or return error
//         } else {
//           updateData[field as keyof Prisma.TaskUpdateInput] = body[field as keyof PatchRequestBody];
//         }
//       }
//     }

//     if (body.customFields !== undefined) {
//       const currentTask = await prisma.task.findUnique({
//         where: { id: taskId },
//         select: { customFields: true },
//       });
//       // FIX (Line 2178 equivalent): Use Prisma.JsonObject for safer type assertion
//       const existingCustomFields = (currentTask?.customFields as Prisma.JsonObject) || {};
//       updateData.customFields = {
//         ...existingCustomFields,
//         ...(body.customFields as Prisma.JsonObject), // Ensure body.customFields is also cast
//       };
//     }

//     // Check if any actual fields are being updated other than `updatedAt`
//     if (Object.keys(updateData).length <= 1 && !body.customFields) {
//       return NextResponse.json({ error: "No valid fields provided for update" }, { status: 400 });
//     }

//     const updated = await prisma.task.update({
//       where: { id: taskId },
//       data: updateData,
//     });

//     return NextResponse.json({ success: true, task: updated }, { status: 200 });
//   } catch (err: unknown) { // FIX: Type caught error as unknown
//     console.error("❌ Update failed:", err);
//     return NextResponse.json({ error: "Failed to update task", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
//   }
// }

// // --- DELETE Task (No changes needed here from your provided code) ---
// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const { id: taskId } = params;
//   const { userId } = auth(); // Get userId from Clerk authentication

//   if (!taskId || !userId) {
//     return NextResponse.json(
//       { error: "Unauthorized or missing task ID" },
//       { status: 400 }
//     );
//   }

//   try {
//     // Delete related subtasks first to maintain referential integrity
//     await prisma.subtask.deleteMany({ where: { taskId } });
//     await prisma.note.deleteMany({ where: { taskId } }); // Assuming notes also have a taskId field
//     await prisma.task.delete({ where: { id: taskId } });

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (err: unknown) { // FIX: Type caught error as unknown
//     console.error("❌ Delete failed:", err);
//     return NextResponse.json({ error: "Delete failed", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
//   }
// }




















// FILE: src/app/api/tasks/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma"; // Adjust path if needed based on your project structure
import { auth } from "@clerk/nextjs/server"; // Using Clerk's auth
import { Prisma } from "@prisma/client"; // Import Prisma for types like JsonObject, TaskUpdateInput

export const dynamic = "force-dynamic";

// Define the expected structure for the PATCH request body
// This is an example, adjust based on your actual fields and their types
interface PatchRequestBody {
  title?: string;
  status?: string;
  amount?: number | string | null; // Allow string as it might come from form data, and null for clearing
  received?: number | string | null; // Allow string as it might come from form data, and null for clearing
  description?: string;
  highlightColor?: string | null;
  customFields?: Record<string, any>; // This can be refined further if customFields has a strict schema
}

// --- GET Task by ID (No changes needed here from your provided code) ---
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: taskId } = params;
  const { userId } = auth(); // Get userId from Clerk authentication

  if (!taskId || !userId) {
    return NextResponse.json(
      { error: "Unauthorized or missing task ID" },
      { status: 400 }
    );
  }

  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: { subtasks: true }, // Include subtasks if relevant
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // You might want to add a check here to ensure the user is authorized to view this specific task
    // e.g., if (task.userId !== userId) { return NextResponse.json({ error: "Forbidden" }, { status: 403 }); }

    return NextResponse.json(task, { status: 200 });
  } catch (err: unknown) { // FIX: Type caught error as unknown
    console.error("❌ Get task failed:", err);
    return NextResponse.json({ error: "Fetch failed", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}

// --- PATCH Task (Update) ---
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: taskId } = params;
  const { userId } = await auth();

  if (!taskId) {
    return NextResponse.json({ error: "Missing task ID in URL" }, { status: 400 });
  }
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // FIX: Type the request body to allow more flexible input for numbers
    const body: PatchRequestBody = await req.json();

    // FIX (Line 2120 equivalent, assuming this is where `updateData` is initialized):
    // Use Prisma.TaskUpdateInput for type safety.
    const updateData: Prisma.TaskUpdateInput = { updatedAt: new Date() };

    const allowedFields = [
      "title",
      "status",
      "amount",
      "received",
      "description",
      "highlightColor",
    ];

    for (const field of allowedFields) {
      if (body[field as keyof PatchRequestBody] !== undefined) { // Cast to keyof PatchRequestBody
        // Handle amount and received which might come as string from forms or be null
        if (field === "amount" || field === "received") {
          const value = body[field as 'amount' | 'received'];
          if (typeof value === 'number') {
            updateData[field] = value;
          } else if (typeof value === 'string' && !isNaN(parseFloat(value))) {
            updateData[field] = parseFloat(value);
          } else if (value === null) {
            updateData[field] = null; // Allow setting to null if your schema supports it
          }
          // Optionally, add a case to handle invalid input types for these fields
        } else {
          // For other fields, directly assign the value
          // We need to ensure the type from body is compatible with Prisma.TaskUpdateInput
          // A safer approach might be a switch or a more specific map if types are very diverse
          (updateData as any)[field] = body[field as keyof PatchRequestBody];
        }
      }
    }

    if (body.customFields !== undefined) {
      const currentTask = await prisma.task.findUnique({
        where: { id: taskId },
        select: { customFields: true },
      });
      // FIX (Line 2178 equivalent): Use Prisma.JsonObject for safer type assertion
      // Ensure existingCustomFields is treated as an object to spread
      const existingCustomFields = (currentTask?.customFields || {}) as Prisma.JsonObject;
      updateData.customFields = {
        ...existingCustomFields,
        ...(body.customFields as Prisma.JsonObject), // Ensure body.customFields is also cast
      };
    }

    // Check if any actual fields are being updated other than `updatedAt`
    // This check needs to be careful if `customFields` is the *only* update.
    const hasOtherUpdates = Object.keys(updateData).some(key => key !== 'updatedAt');

    if (!hasOtherUpdates && !body.customFields) { // Check for customFields separately
      return NextResponse.json({ error: "No valid fields provided for update" }, { status: 400 });
    }

    const updated = await prisma.task.update({
      where: { id: taskId },
      data: updateData,
    });

    return NextResponse.json({ success: true, task: updated }, { status: 200 });
  } catch (err: unknown) { // FIX: Type caught error as unknown
    console.error("❌ Update failed:", err);
    return NextResponse.json({ error: "Failed to update task", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}

// --- DELETE Task (No changes needed here from your provided code) ---
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: taskId } = params;
  const { userId } = auth(); // Get userId from Clerk authentication

  if (!taskId || !userId) {
    return NextResponse.json(
      { error: "Unauthorized or missing task ID" },
      { status: 400 }
    );
  }

  try {
    // Delete related subtasks first to maintain referential integrity
    await prisma.subtask.deleteMany({ where: { taskId } });
    await prisma.note.deleteMany({ where: { taskId } }); // Assuming notes also have a taskId field
    await prisma.task.delete({ where: { id: taskId } });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) { // FIX: Type caught error as unknown
    console.error("❌ Delete failed:", err);
    return NextResponse.json({ error: "Delete failed", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}