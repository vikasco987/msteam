// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "../../../../../lib/prisma"; // Adjust path if needed based on your project structure
// import { auth } from "@clerk/nextjs/server"; // Using Clerk's auth
// import { Prisma } from "@prisma/client"; // Import Prisma for types like JsonObject, TaskUpdateInput

// export const dynamic = "force-dynamic";

// // Define the expected structure for the PATCH request body
// interface PatchRequestBody {
//   title?: string;
//   status?: string;
//   amount?: number | string | null; // Allow string as it might come from form data, and null for clearing
//   received?: number | string | null; // Allow string as it might come from form data, and null for clearing
//   description?: string;
//   highlightColor?: string | null;
//   // customFields can be a partial object that will be merged,
//   // it should align with what Prisma expects for JsonObject
//   customFields?: { [key: string]: any };
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
//   } catch (err: unknown) {
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
//     const body: PatchRequestBody = await req.json();

//     // ✅ FIX: Initialize updateData with Prisma.TaskUpdateInput for type safety.
//     // Ensure all properties added match what Prisma expects.
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
//       if (body[field as keyof PatchRequestBody] !== undefined) {
//         if (field === "amount" || field === "received") {
//           const value = body[field as 'amount' | 'received'];
//           if (typeof value === 'number') {
//             updateData[field] = value;
//           } else if (typeof value === 'string' && !isNaN(parseFloat(value))) {
//             updateData[field] = parseFloat(value);
//           } else if (value === null) {
//             updateData[field] = null; // Ensure your schema allows null for these fields
//           }
//           // If you want to explicitly handle invalid string inputs (e.g., "abc"),
//           // you could return an error here or set to null/undefined based on logic.
//         } else {
//           // ✅ FIX: Directly assign to updateData. TypeScript infers the correct type
//           // because updateData is already typed as Prisma.TaskUpdateInput.
//           // No need for `(updateData as any)[field]`.
//           // We assume 'title', 'status', 'description', 'highlightColor'
//           // from PatchRequestBody are directly compatible with TaskUpdateInput.
//           updateData[field as Exclude<keyof PatchRequestBody, 'amount' | 'received' | 'customFields'>] = body[field as Exclude<keyof PatchRequestBody, 'amount' | 'received' | 'customFields'>];
//         }
//       }
//     }

//     if (body.customFields !== undefined) {
//       const currentTask = await prisma.task.findUnique({
//         where: { id: taskId },
//         select: { customFields: true },
//       });

//       // ✅ FIX: Ensure existingCustomFields is properly typed and initialized as Prisma.JsonValue.
//       // Use Prisma.JsonValue for more robust handling of JSON fields.
//       // If customFields is `Json?` in your schema, it can be `null`.
//       const existingCustomFields: Prisma.JsonValue = currentTask?.customFields || {};

//       // Ensure the merge operation results in a Prisma.JsonValue compatible object.
//       // Prisma.JsonObject is a more specific type for object JSON values.
//       if (typeof existingCustomFields === 'object' && existingCustomFields !== null &&
//           typeof body.customFields === 'object' && body.customFields !== null) {
//           updateData.customFields = {
//               ...(existingCustomFields as Prisma.JsonObject),
//               ...(body.customFields as Prisma.JsonObject),
//           } as Prisma.JsonObject; // Cast the final merged object to Prisma.JsonObject
//       } else {
//           // Handle cases where existingCustomFields or body.customFields are not objects
//           // This might indicate a malformed payload or initial state.
//           // For simplicity, we'll just use the new customFields if existing isn't an object
//           updateData.customFields = body.customFields as Prisma.JsonObject;
//       }
//     }

//     // Check if any actual fields are being updated other than `updatedAt`
//     const hasOtherUpdates = Object.keys(updateData).some(key => key !== 'updatedAt' && key !== 'customFields');
//     const hasCustomFieldUpdates = Object.keys(updateData).includes('customFields');


//     if (!hasOtherUpdates && !hasCustomFieldUpdates) {
//       return NextResponse.json({ error: "No valid fields provided for update" }, { status: 400 });
//     }

//     const updated = await prisma.task.update({
//       where: { id: taskId },
//       data: updateData,
//     });

//     return NextResponse.json({ success: true, task: updated }, { status: 200 });
//   } catch (err: unknown) {
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
//   } catch (err: unknown) {
//     console.error("❌ Delete failed:", err);
//     return NextResponse.json({ error: "Delete failed", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
//   }
// }























// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "../../../../../lib/prisma"; // Adjust path if needed based on your project structure
// import { auth, clerkClient } from "@clerk/nextjs/server"; // Using Clerk's auth and clerkClient for App Router
// import { Prisma } from "@prisma/client"; // Import Prisma for types like JsonObject, TaskUpdateInput

// export const dynamic = "force-dynamic";

// // Define the expected structure for the PATCH request body
// interface PatchRequestBody {
//   title?: string;
//   status?: string;
//   amount?: number | string | null; // Allow string as it might come from form data, and null for clearing
//   received?: number | string | null; // Allow string as it might come from form data, and null for clearing
//   description?: string;
//   highlightColor?: string | null;
//   customFields?: { [key: string]: any };
//   // ✅ Added assignment-related fields
//   assignerEmail?: string | null;
//   assigneeEmail?: string | null;
//   assignerName?: string | null;
//   assigneeName?: string | null;
//   assigneeId?: string | null; // Note: This might be redundant if using assigneeIds array
//   assigneeIds?: string[]; // Array of assignee IDs
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
//   } catch (err: unknown) {
//     console.error("❌ Get task failed:", err);
//     return NextResponse.json({ error: "Fetch failed", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
//   }
// }

// // --- PATCH Task (Update) ---
// export async function PATCH(
//   req: NextRequest,
//   // ✅ FIX 1: Await params in the function signature
//   context: { params: { id: string } } // No need for Promise<...> here, Next.js handles it directly for App Router
// ) {
//   const { id: taskId } = context.params; // ✅ Access params directly

//   const { userId } = auth(); // Get userId from Clerk authentication

//   if (!taskId) {
//     return NextResponse.json({ error: "Missing task ID in URL" }, { status: 400 });
//   }
//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const body: PatchRequestBody = await req.json();

//     // ✅ Initialize updateData with Prisma.TaskUpdateInput for type safety.
//     const updateData: Prisma.TaskUpdateInput = { updatedAt: new Date() };

//     // ✅ FIX 2: Add assignment fields to allowedFields
//     const allowedFields = [
//       "title",
//       "status",
//       "amount",
//       "received",
//       "description",
//       "highlightColor",
//       "assignerEmail",
//       "assigneeEmail",
//       "assignerName",
//       "assigneeName",
//       "assigneeId",
//       "assigneeIds" // This will be handled specifically
//     ];

//     for (const field of allowedFields) {
//       // Check if the field exists in the body and is not undefined
//       if (Object.prototype.hasOwnProperty.call(body, field)) {
//         const value = body[field as keyof PatchRequestBody];

//         if (field === "amount" || field === "received") {
//           if (typeof value === 'number') {
//             updateData[field] = value;
//           } else if (typeof value === 'string' && !isNaN(parseFloat(value))) {
//             updateData[field] = parseFloat(value);
//           } else if (value === null) {
//             updateData[field] = null; // Ensure your schema allows null for these fields
//           }
//         }
//         // ✅ FIX 3: Handle assigneeIds array separately
//         else if (field === "assigneeIds") {
//           if (Array.isArray(value)) {
//             updateData.assigneeIds = value;
//           } else if (value === null || value === undefined) {
//              updateData.assigneeIds = []; // Or null, depending on your schema and desired behavior
//           } else {
//              console.warn(`Attempted to set assigneeIds with non-array value: ${value}`);
//              // Optionally throw an error or ignore malformed input
//           }
//         }
//         else {
//           // Directly assign other allowed fields
//           // Type assertion to ensure compatibility with Prisma.TaskUpdateInput
//           updateData[field as Exclude<keyof PatchRequestBody, 'amount' | 'received' | '' | 'customFields' | 'assigneeIds'>] = value as any;
//         }
//       }
//     }

//     if (body.customFields !== undefined) {
//       const currentTask = await prisma.task.findUnique({
//         where: { id: taskId },
//         select: { customFields: true },
//       });

//       const existingCustomFields: Prisma.JsonValue = currentTask?.customFields || {};

//       if (typeof existingCustomFields === 'object' && existingCustomFields !== null &&
//           typeof body.customFields === 'object' && body.customFields !== null) {
//           updateData.customFields = {
//               ...(existingCustomFields as Prisma.JsonObject),
//               ...(body.customFields as Prisma.JsonObject),
//           } as Prisma.JsonObject;
//       } else {
//           updateData.customFields = body.customFields as Prisma.JsonObject;
//       }
//     }

//     // ✅ FIX 4: Keep "No valid fields provided for update" check
//     const hasOtherUpdates = Object.keys(updateData).some(key => key !== 'updatedAt' && key !== 'customFields');
//     const hasCustomFieldUpdates = Object.keys(updateData).includes('customFields');

//     if (!hasOtherUpdates && !hasCustomFieldUpdates) {
//       return NextResponse.json({ error: "No valid fields provided for update" }, { status: 400 });
//     }

//     const updated = await prisma.task.update({
//       where: { id: taskId },
//       data: updateData,
//     });

//     return NextResponse.json({ success: true, task: updated }, { status: 200 });
//   } catch (err: unknown) {
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
//   } catch (err: unknown) {
//     console.error("❌ Delete failed:", err);
//     return NextResponse.json({ error: "Delete failed", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
//   }
// }













// // src/app/api/tasks/[id]/route.ts (for Next.js App Router)

// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "../../../../../lib/prisma"; // Adjust path if needed based on your project structure
// // ✅ CORRECT IMPORTS for App Router API routes, using getAuth for consistency with your working routes
// import { getAuth, clerkClient } from "@clerk/nextjs/server";
// import { Prisma } from "@prisma/client"; // Import Prisma for types like JsonObject, TaskUpdateInput

// export const dynamic = "force-dynamic";

// // Define the expected structure for the PATCH request body
// interface PatchRequestBody {
//   title?: string;
//   status?: string;
//   amount?: number | string | null; // Allow string as it might come from form data, and null for clearing
//   received?: number | string | null; // Allow string as it might come from form data, and null for clearing
//   description?: string;
//   highlightColor?: string | null;
//   customFields?: { [key: string]: any };
//   assignerEmail?: string | null;
//   assigneeEmail?: string | null;
//   assignerName?: string | null;
//   assigneeName?: string | null;
//   assigneeId?: string | null;
//   assigneeIds?: string[]; // Array of assignee IDs
// }

// // --- GET Task by ID ---
// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const { id: taskId } = params;
//   // ✅ FIX: Use await getAuth(req) for consistency with your working routes
//   const { userId } = await getAuth(req);

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
//   } catch (err: unknown) {
//     console.error("❌ Get task failed:", err);
//     return NextResponse.json({ error: "Fetch failed", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
//   }
// }

// // --- PATCH Task (Update) ---
// export async function PATCH(
//   req: NextRequest,
//   // ✅ FIX: Access params directly, no 'await' needed for App Router API routes
//   { params }: { params: { id: string } }
// ) {
//   const { id: taskId } = params; // ✅ Access params directly

//   // ✅ FIX: Use await getAuth(req) for consistency with your working routes
//   const { userId, sessionClaims } = await getAuth(req);

//   if (!taskId) {
//     return NextResponse.json({ error: "Missing task ID in URL" }, { status: 400 });
//   }
//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const body: PatchRequestBody = await req.json();

//     const updateData: Prisma.TaskUpdateInput = { updatedAt: new Date() };

//     const allowedFields = [
//       "title",
//       "status",
//       "amount",
//       "received",
//       "description",
//       "highlightColor",
//       "assignerEmail",
//       "assigneeEmail",
//       "assignerName",
//       "assigneeName",
//       "assigneeId",
//       "assigneeIds"
//     ];

//     for (const field of allowedFields) {
//       if (Object.prototype.hasOwnProperty.call(body, field)) {
//         const value = body[field as keyof PatchRequestBody];

//         if (field === "amount" || field === "received") {
//           if (typeof value === 'number') {
//             updateData[field] = value;
//           } else if (typeof value === 'string' && !isNaN(parseFloat(value))) {
//             updateData[field] = parseFloat(value);
//           } else if (value === null) {
//             updateData[field] = null;
//           }
//         } else if (field === "assigneeIds") {
//           if (Array.isArray(value)) {
//             updateData.assigneeIds = value;
//           } else if (value === null || value === undefined) {
//              updateData.assigneeIds = [];
//           } else {
//              console.warn(`Attempted to set assigneeIds with non-array value: ${value}`);
//           }
//         }
//         else {
//           updateData[field as Exclude<keyof PatchRequestBody, 'amount' | 'received' | 'customFields' | 'assigneeIds'>] = value as any;
//         }
//       }
//     }

//     if (body.customFields !== undefined) {
//       const currentTask = await prisma.task.findUnique({
//         where: { id: taskId },
//         select: { customFields: true },
//       });

//       const existingCustomFields: Prisma.JsonValue = currentTask?.customFields || {};

//       if (typeof existingCustomFields === 'object' && existingCustomFields !== null &&
//           typeof body.customFields === 'object' && body.customFields !== null) {
//           updateData.customFields = {
//               ...(existingCustomFields as Prisma.JsonObject),
//               ...(body.customFields as Prisma.JsonObject),
//           } as Prisma.JsonObject;
//       } else {
//           updateData.customFields = body.customFields as Prisma.JsonObject;
//       }
//     }

//     // Auto-create user in DB if not found (important for 401 resolution)
//     let dbUser = await prisma.user.findUnique({
//       where: { clerkId: userId },
//     });

//     if (!dbUser) {
//       console.log(`[${new Date().toISOString()}] Backend API (App Router): User not found in DB for ${userId}, attempting to auto-create...`);
//       try {
//         const clerkUser = await clerkClient.users.getUser(userId);
//         const userEmail = clerkUser.emailAddresses?.[0]?.email_address;
//         if (!userEmail) {
//           console.error(`[${new Date().toISOString()}] Backend API (App Router): Clerk user ${userId} has no primary email address. Cannot auto-create in DB.`);
//           return NextResponse.json({ error: "Unauthorized: User email not found for auto-creation" }, { status: 401 });
//         }
//         const defaultRole = (sessionClaims?.role as string) || "SELLER";
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


//     const hasOtherUpdates = Object.keys(updateData).some(key => key !== 'updatedAt' && key !== 'customFields');
//     const hasCustomFieldUpdates = Object.keys(updateData).includes('customFields');

//     if (!hasOtherUpdates && !hasCustomFieldUpdates) {
//       return NextResponse.json({ error: "No valid fields provided for update" }, { status: 400 });
//     }

//     const updated = await prisma.task.update({
//       where: { id: taskId },
//       data: updateData,
//     });

//     return NextResponse.json({ success: true, task: updated }, { status: 200 });
//   } catch (err: unknown) {
//     console.error("❌ Update failed:", err);
//     return NextResponse.json({ error: "Failed to update task", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
//   }
// }

// // --- DELETE Task ---
// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const { id: taskId } = params;
//   // ✅ FIX: Use await getAuth(req) for consistency with your working routes
//   const { userId } = await getAuth(req);

//   if (!taskId || !userId) {
//     return NextResponse.json(
//       { error: "Unauthorized or missing task ID" },
//       { status: 400 }
//     );
//   }

//   try {
//     await prisma.subtask.deleteMany({ where: { taskId } });
//     await prisma.note.deleteMany({ where: { taskId } });
//     await prisma.task.delete({ where: { id: taskId } });

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (err: unknown) {
//     console.error("❌ Delete failed:", err);
//     return NextResponse.json({ error: "Delete failed", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
//   }
// }










// // src/app/api/tasks/[id]/route.ts

// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "../../../../../lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";
// import { clerkClient } from "@clerk/clerk-sdk-node";
// import { Prisma } from "@prisma/client";

// export const dynamic = "force-dynamic";

// interface PatchRequestBody {
//   title?: string;
//   status?: string;
//   amount?: number | string | null;
//   received?: number | string | null;
//   description?: string;
//   highlightColor?: string | null;
//   customFields?: { [key: string]: any };
//   assignerEmail?: string | null;
//   assigneeEmail?: string | null;
//   assignerName?: string | null;
//   assigneeName?: string | null;
//   assigneeId?: string | null;
//   assigneeIds?: string[] | string | null; // can be string or array from frontend
// }

// // --- GET Task ---
// export async function GET(req: NextRequest, context: { params: { id: string } }) {
//   const { id: taskId } = context.params;
//   const { userId } = await getAuth(req);

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

// // --- PATCH Task ---
// export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
//   const { id: taskId } = context.params;
//   const { userId, sessionClaims } = await getAuth(req);

//   if (!taskId) {
//     return NextResponse.json({ error: "Missing task ID" }, { status: 400 });
//   }
//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const body: PatchRequestBody = await req.json();
//     const updateData: Prisma.TaskUpdateInput = { updatedAt: new Date() };

//     const allowedFields = [
//       "title",
//       "status",
//       "amount",
//       "received",
//       "description",
//       "highlightColor",
//       "assignerEmail",
//       "assigneeEmail",
//       "assignerName",
//       "assigneeName",
//       "assigneeId",
//       "assigneeIds",
//     ];

//     for (const field of allowedFields) {
//       if (Object.prototype.hasOwnProperty.call(body, field)) {
//         const value = body[field as keyof PatchRequestBody];

//         if (field === "amount" || field === "received") {
//           if (typeof value === "number") {
//             updateData[field] = value;
//           } else if (typeof value === "string" && !isNaN(parseFloat(value))) {
//             updateData[field] = parseFloat(value);
//           } else if (value === null) {
//             updateData[field] = null;
//           }
//         } else if (field === "assigneeIds") {
//           if (Array.isArray(value)) {
//             updateData.assigneeIds = value.map(String);
//           } else if (typeof value === "string") {
//             updateData.assigneeIds = [value]; // ensure array
//           } else if (value == null) {
//             updateData.assigneeIds = [];
//           }
//         } else {
//           updateData[field as Exclude<keyof PatchRequestBody, "amount" | "received" | "customFields" | "assigneeIds">] = value as any;
//         }
//       }
//     }

//     // Handle customFields merging
//     if (body.customFields !== undefined) {
//       const currentTask = await prisma.task.findUnique({
//         where: { id: taskId },
//         select: { customFields: true },
//       });

//       const existingCustomFields: Prisma.JsonValue = currentTask?.customFields || {};

//       if (typeof existingCustomFields === "object" && existingCustomFields !== null &&
//           typeof body.customFields === "object" && body.customFields !== null) {
//         updateData.customFields = {
//           ...(existingCustomFields as Prisma.JsonObject),
//           ...(body.customFields as Prisma.JsonObject),
//         };
//       } else {
//         updateData.customFields = body.customFields as Prisma.JsonObject;
//       }
//     }

//     // Ensure user exists in DB
//     let dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });

//     if (!dbUser) {
//       console.log(`[${new Date().toISOString()}] Auto-creating user in DB for ${userId}...`);
//       try {
//         const clerkUser = await clerkClient.users.getUser(userId);
//         const userEmail = clerkUser.emailAddresses?.[0]?.emailAddress;
//         if (!userEmail) {
//           return NextResponse.json({ error: "Unauthorized: No email found" }, { status: 401 });
//         }
//         const defaultRole = (sessionClaims?.role as string) || "SELLER";
//         dbUser = await prisma.user.create({
//           data: {
//             clerkId: userId,
//             email: userEmail,
//             role: defaultRole,
//           },
//         });
//         console.log(`✅ User ${userId} created in DB`);
//       } catch (clerkError) {
//         console.error("❌ Clerk user fetch/create failed:", clerkError);
//         return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//       }
//     }

//     // Run update
//     const updated = await prisma.task.update({
//       where: { id: taskId },
//       data: updateData,
//     });

//     return NextResponse.json({ success: true, task: updated }, { status: 200 });
//   } catch (err) {
//     console.error("❌ Update failed:", err);
//     return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
//   }
// }

// // --- DELETE Task ---
// export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
//   const { id: taskId } = context.params;
//   const { userId } = await getAuth(req);

//   if (!taskId || !userId) {
//     return NextResponse.json({ error: "Unauthorized or missing task ID" }, { status: 400 });
//   }

//   try {
//     await prisma.subtask.deleteMany({ where: { taskId } });
//     await prisma.note.deleteMany({ where: { taskId } });
//     await prisma.task.delete({ where: { id: taskId } });

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (err) {
//     console.error("❌ Delete failed:", err);
//     return NextResponse.json({ error: "Delete failed" }, { status: 500 });
//   }
// }





















// src/app/api/tasks/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

interface PatchRequestBody {
  title?: string;
  status?: string;
  amount?: number | string | null;
  received?: number | string | null;
  description?: string;
  highlightColor?: string | null;
  customFields?: { [key: string]: any };
  assignerEmail?: string | null;
  assigneeEmail?: string | null;
  assignerName?: string | null;
  assigneeName?: string | null;
  assigneeId?: string | null;
  assigneeIds?: string[] | string | null; // can be string or array from frontend
}

// --- GET Task ---
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id: taskId } = context.params;
  const { userId } = await getAuth(req);

  if (!taskId || !userId) {
    return NextResponse.json({ error: "Unauthorized or missing task ID" }, { status: 400 });
  }

  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: { subtasks: true },
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task, { status: 200 });
  } catch (err) {
    console.error("❌ Get task failed:", err);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}

// --- PATCH Task ---
export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  const { id: taskId } = context.params;
  const { userId, sessionClaims } = await getAuth(req);

  if (!taskId) {
    return NextResponse.json({ error: "Missing task ID" }, { status: 400 });
  }
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: PatchRequestBody = await req.json();
    const updateData: Prisma.TaskUpdateInput = { updatedAt: new Date() };

    const allowedFields = [
      "title",
      "status",
      "amount",
      "received",
      "description",
      "highlightColor",
      "assignerEmail",
      "assigneeEmail",
      "assignerName",
      "assigneeName",
      "assigneeId",
      "assigneeIds",
    ];

    for (const field of allowedFields) {
      if (Object.prototype.hasOwnProperty.call(body, field)) {
        const value = body[field as keyof PatchRequestBody];

        if (field === "amount" || field === "received") {
          if (typeof value === "number") {
            updateData[field] = value;
          } else if (typeof value === "string" && !isNaN(parseFloat(value))) {
            updateData[field] = parseFloat(value);
          } else if (value === null) {
            updateData[field] = null;
          }
        } else if (field === "assigneeIds") {
          if (Array.isArray(value)) {
            updateData.assigneeIds = value.map(String);
          } else if (typeof value === "string") {
            updateData.assigneeIds = [value]; // ensure array
          } else if (value == null) {
            updateData.assigneeIds = [];
          }
        } else {
          updateData[field as Exclude<keyof PatchRequestBody, "amount" | "received" | "customFields" | "assigneeIds">] = value as any;
        }
      }
    }

    // Handle customFields merging
    if (body.customFields !== undefined) {
      const currentTask = await prisma.task.findUnique({
        where: { id: taskId },
        select: { customFields: true },
      });

      const existingCustomFields: Prisma.JsonValue = currentTask?.customFields || {};

      if (typeof existingCustomFields === "object" && existingCustomFields !== null &&
          typeof body.customFields === "object" && body.customFields !== null) {
        updateData.customFields = {
          ...(existingCustomFields as Prisma.JsonObject),
          ...(body.customFields as Prisma.JsonObject),
        };
      } else {
        updateData.customFields = body.customFields as Prisma.JsonObject;
      }
    }

    // Ensure user exists in DB
    let dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });

    if (!dbUser) {
      console.log(`[${new Date().toISOString()}] Auto-creating user in DB for ${userId}...`);
      try {
        const clerkUser = await clerkClient.users.getUser(userId);
        const userEmail = clerkUser.emailAddresses?.[0]?.emailAddress;
        if (!userEmail) {
          return NextResponse.json({ error: "Unauthorized: No email found" }, { status: 401 });
        }
        const defaultRole = (sessionClaims?.role as string) || "SELLER";
        dbUser = await prisma.user.create({
          data: {
            clerkId: userId,
            email: userEmail,
            role: defaultRole,
          },
        });
        console.log(`✅ User ${userId} created in DB`);
      } catch (clerkError) {
        console.error("❌ Clerk user fetch/create failed:", clerkError);
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    // Run update
    const updated = await prisma.task.update({
      where: { id: taskId },
      data: updateData,
    });

    return NextResponse.json({ success: true, task: updated }, { status: 200 });
  } catch (err) {
    console.error("❌ Update failed:", err);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

// --- DELETE Task ---
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const { id: taskId } = context.params;
  const { userId } = await getAuth(req);

  if (!taskId || !userId) {
    return NextResponse.json({ error: "Unauthorized or missing task ID" }, { status: 400 });
  }

  try {
    await prisma.subtask.deleteMany({ where: { taskId } });
    await prisma.note.deleteMany({ where: { taskId } });
    await prisma.task.delete({ where: { id: taskId } });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("❌ Delete failed:", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
