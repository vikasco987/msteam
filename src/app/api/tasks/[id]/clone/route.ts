// // src/app/api/tasks/[id]/clone/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import {prisma} from "../../../../../../lib/prisma"; // Make sure this matches your actual prisma import
// import { getAuth } from "@clerk/nextjs/server";
// import { clerkClient } from "@clerk/nextjs/server"; // To fetch user details

// export async function POST(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const { id: taskId } = params;
//   const { userId } = getAuth(req); // Clerk user ID of the cloner

//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     // 🔹 Get the cloner's details from Clerk
//     const user = await clerkClient.users.getUser(userId);
//     const userName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
//     const userEmail = user.emailAddresses?.[0]?.emailAddress || null;

//     // 1️⃣ Find the original task
//     const original = await prisma.task.findUnique({
//       where: { id: taskId },
//       include: { subtasks: true, notes: true },
//     });

//     if (!original) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     // 2️⃣ Create a new cloned task (assign cloner's details)
//     const cloned = await prisma.task.create({
//       data: {
//         title: `${original.title} (Copy)`,
//         status: original.status,
//         description: original.description,
//         highlightColor: original.highlightColor,
//         customFields: original.customFields,
//         amount: original.amount,
//         received: original.received,
//         assignerEmail: original.assignerEmail,
//         assigneeEmail: original.assigneeEmail,
//         assignerName: original.assignerName,
//         assigneeName: original.assigneeName,
//         assigneeId: original.assigneeId,
//         assigneeIds: original.assigneeIds,
//         tags: original.tags,
//         priority: original.priority,
//         attachments: original.attachments,
//         aadhaarUrl: original.aadhaarUrl,
//         panUrl: original.panUrl,
//         selfieUrl: original.selfieUrl,
//         chequeUrl: original.chequeUrl,
//         menuCardUrls: original.menuCardUrls,

//         // 🔹 Who cloned it
//         createdByClerkId: userId,
//         createdByName: userName || null,
//         createdByEmail: userEmail || null,
//       },
//     });

//     // 3️⃣ Clone subtasks if any
//     if (original.subtasks.length > 0) {
//       await prisma.subtask.createMany({
//         data: original.subtasks.map((st) => ({
//           taskId: cloned.id,
//           title: st.title,
//           completed: st.completed,
//         })),
//       });
//     }

//     // 4️⃣ Clone notes if any
//     if (original.notes.length > 0) {
//       await prisma.note.createMany({
//         data: original.notes.map((n) => ({
//           taskId: cloned.id,
//           content: n.content,
//           authorName: n.authorName,
//           authorEmail: n.authorEmail,
//         })),
//       });
//     }

//     return NextResponse.json({ task: cloned }, { status: 201 });
//   } catch (err) {
//     console.error("❌ Clone failed:", err);
//     return NextResponse.json(
//       { error: "Failed to clone task", details: String(err) },
//       { status: 500 }
//     );
//   }
// }















// src/app/api/tasks/[id]/clone/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import {prisma} from "../../../../../../lib/prisma"; 
















// // src/app/api/tasks/[id]/clone/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import {prisma} from "../../../../../../lib/prisma"; 
// import { getAuth } from "@clerk/nextjs/server";
// import { clerkClient } from "@clerk/clerk-sdk-node"; // ✅ FIXED

// export async function POST(
//   req: NextRequest,
//   context: { params: Promise<{ id: string }> }
// ) {
//   // ✅ Await params
//   const { id: taskId } = await context.params;

//   // ✅ Get Clerk user ID
//   const { userId } = getAuth(req);

//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     // ✅ Fetch cloner's details from Clerk
//     const user = await clerkClient.users.getUser(userId);
//     const userName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
//     const userEmail = user.emailAddresses?.[0]?.emailAddress || null;

//     // 1️⃣ Find the original task
//     const original = await prisma.task.findUnique({
//       where: { id: taskId },
//       include: { subtasks: true, notes: true },
//     });

//     if (!original) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     // 2️⃣ Create cloned task with cloner info
//     const cloned = await prisma.task.create({
//       data: {
//         title: `${original.title} (Copy)`,
//         status: original.status,
//         description: original.description,
//         highlightColor: original.highlightColor,
//         customFields: original.customFields,
//         amount: original.amount,
//         received: original.received,
//         assignerEmail: original.assignerEmail,
//         assigneeEmail: original.assigneeEmail,
//         assignerName: original.assignerName,
//         assigneeName: original.assigneeName,
//         assigneeId: original.assigneeId,
//         assigneeIds: original.assigneeIds,
//         tags: original.tags,
//         priority: original.priority,
//         attachments: original.attachments,
//         aadhaarUrl: original.aadhaarUrl,
//         panUrl: original.panUrl,
//         selfieUrl: original.selfieUrl,
//         chequeUrl: original.chequeUrl,
//         menuCardUrls: original.menuCardUrls,

//         // 🔹 Store cloner info
//         createdByClerkId: userId,
//         createdByName: userName || null,
//         createdByEmail: userEmail || null,
//       },
//     });

//     // 3️⃣ Clone subtasks
//     if (original.subtasks.length > 0) {
//       await prisma.subtask.createMany({
//         data: original.subtasks.map((st) => ({
//           taskId: cloned.id,
//           title: st.title,
//           completed: st.completed,
//         })),
//       });
//     }

//     // 4️⃣ Clone notes
//     if (original.notes.length > 0) {
//       await prisma.note.createMany({
//         data: original.notes.map((n) => ({
//           taskId: cloned.id,
//           content: n.content,
//           authorName: n.authorName,
//           authorEmail: n.authorEmail,
//         })),
//       });
//     }

//     return NextResponse.json({ task: cloned }, { status: 201 });
//   } catch (err) {
//     console.error("❌ Clone failed:", err);
//     return NextResponse.json(
//       { error: "Failed to clone task", details: String(err) },
//       { status: 500 }
//     );
//   }
// }

















// src/app/api/tasks/[id]/clone/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: taskId } = await context.params;

  // ✅ Get Clerk user ID
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // ✅ Get custom title from request body
    const { title } = await req.json();

    // ✅ Fetch cloner's details from Clerk
    const user = await clerkClient.users.getUser(userId);
    const userName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
    const userEmail =
      user.emailAddresses?.[0]?.emailAddress || null;

    // 1️⃣ Find the original task
    const original = await prisma.task.findUnique({
      where: { id: taskId },
      include: { subtasks: true, notes: true },
    });

    if (!original) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // 2️⃣ Create cloned task with either custom title or default "(Copy)"
    const cloned = await prisma.task.create({
      data: {
        title: title || `${original.title} (Copy)`, // ✅ Use provided title
        status: original.status,
        description: original.description,
        highlightColor: original.highlightColor,
        customFields: original.customFields,
        amount: original.amount,
        received: original.received,
        assignerEmail: original.assignerEmail,
        assigneeEmail: original.assigneeEmail,
        assignerName: original.assignerName,
        assigneeName: original.assigneeName,
        assigneeId: original.assigneeId,
        assigneeIds: original.assigneeIds,
        tags: original.tags,
        priority: original.priority,
        attachments: original.attachments,
        aadhaarUrl: original.aadhaarUrl,
        panUrl: original.panUrl,
        selfieUrl: original.selfieUrl,
        chequeUrl: original.chequeUrl,
        menuCardUrls: original.menuCardUrls,

        // 🔹 Store cloner info
        createdByClerkId: userId,
        createdByName: userName || null,
        createdByEmail: userEmail || null,
      },
    });

    // 3️⃣ Clone subtasks
    if (original.subtasks.length > 0) {
      await prisma.subtask.createMany({
        data: original.subtasks.map((st) => ({
          taskId: cloned.id,
          title: st.title,
          completed: st.completed,
        })),
      });
    }

    // 4️⃣ Clone notes
    if (original.notes.length > 0) {
      await prisma.note.createMany({
        data: original.notes.map((n) => ({
          taskId: cloned.id,
          content: n.content,
          authorName: n.authorName,
          authorEmail: n.authorEmail,
        })),
      });
    }

    return NextResponse.json({ task: cloned }, { status: 201 });
  } catch (err) {
    console.error("❌ Clone failed:", err);
    return NextResponse.json(
      { error: "Failed to clone task", details: String(err) },
      { status: 500 }
    );
  }
}
