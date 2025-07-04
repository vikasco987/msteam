// // File: src/app/api/users/route.ts

// import { NextResponse } from "next/server";
// import { clerkClient } from "@clerk/nextjs/server"; // server SDK

// export async function GET() {
//   try {
//     const allUsers = [];
//     let offset = 0;
//     const limit = 100;

//     while (true) {
//       const usersPage = await clerkClient.users.getUserList({ limit, offset });

//       if (!usersPage || usersPage.length === 0) break;

//       allUsers.push(...usersPage);
//       offset += limit;
//     }

//     // Format the data if needed
//     const formatted = allUsers.map((user) => ({
//       id: user.id,
//       email: user.emailAddresses?.[0]?.emailAddress || "",
//       name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
//       avatar: user.imageUrl,
//       createdAt: user.createdAt,
//     }));

//     return NextResponse.json(formatted, { status: 200 });
//   } catch (error) {
//     console.error("❌ Failed to fetch users:", error);
//     return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
//   }
// }










// // File: src/app/api/users/route.ts

// import { NextResponse } from "next/server";
// import { clerkClient } from "@clerk/nextjs/server"; // ✅ Correct server SDK import

// export async function GET() {
//   try {
//     const allUsers = [];
//     let offset = 0;
//     const limit = 100;

//     while (true) {
//       const usersPage = await clerkClient.users.getUserList({ limit, offset });

//       if (!usersPage || usersPage.length === 0) break;

//       allUsers.push(...usersPage);
//       offset += limit;
//     }

//     // Format the users
//     const formatted = allUsers.map((user) => ({
//       id: user.id,
//       email: user.emailAddresses?.[0]?.emailAddress || "",
//       name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
//       avatar: user.imageUrl,
//       createdAt: user.createdAt,
//     }));

//     return NextResponse.json(formatted, { status: 200 });
//   } catch (error) {
//     console.error("❌ Failed to fetch users:", error);
//     return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
//   }
// }












// import { NextRequest, NextResponse } from "next/server";
// import { getAuth } from "@clerk/nextjs/server";
// import { users } from "@clerk/clerk-sdk-node";
// import { prisma } from "../../../../lib/prisma";
// import { InputJsonValue } from "@prisma/client"; // ✅ import correct type

// type JsonTaskBody = {
//   title: string;
//   status?: string;
//   tags?: string[];
//   dueDate?: string;
//   priority?: string | null;
//   assigneeId?: string;
//   projectId?: string;
//   assignerEmail?: string;
//   assignerName?: string;
//   customFields?: InputJsonValue; // ✅ correct type
// };

// // ✅ GET: Fetch tasks for a user
// export async function GET(req: NextRequest) {
//   try {
//     const { userId } = await getAuth(req);
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const tasks = await prisma.task.findMany({
//       where: {
//         OR: [{ assigneeId: userId }, { createdByClerkId: userId }],
//       },
//       include: { subtasks: true },
//       orderBy: { createdAt: "desc" },
//     });

//     return NextResponse.json(tasks, { status: 200 });
//   } catch (err) {
//     console.error("❌ GET /api/tasks error:", err);
//     return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
//   }
// }

// // ✅ POST: Create task
// export async function POST(req: NextRequest) {
//   try {
//     const { userId } = await getAuth(req);
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const data: JsonTaskBody = await req.json();
//     const clerkUser = await users.getUser(userId);

//     const assignerEmail = clerkUser.emailAddresses?.[0]?.emailAddress || "";
//     const assignerName = clerkUser.firstName || clerkUser.username || "Unknown";

//     if (!data.title) {
//       return NextResponse.json({ error: "Missing `title` field" }, { status: 400 });
//     }

//     const task = await prisma.task.create({
//       data: {
//         title: data.title,
//         status: data.status || "todo",
//         tags: Array.isArray(data.tags) ? data.tags : [],
//         dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
//         priority: data.priority || undefined,
//         assigneeId: data.assigneeId || undefined,
//         projectId: data.projectId || undefined,
//         assignerEmail: data.assignerEmail || assignerEmail,
//         assignerName: data.assignerName || assignerName,
//         customFields: data.customFields ?? {}, // ✅ no `any`
//         createdByClerkId: userId,
//       },
//     });

//     return NextResponse.json({ success: true, task }, { status: 201 });
//   } catch (err) {
//     console.error("❌ POST /api/tasks error:", err);
//     return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
//   }
// }

// export async function OPTIONS() {
//   return NextResponse.json({ ok: true });
// }






import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { users } from "@clerk/clerk-sdk-node";
import { prisma } from "../../../../lib/prisma";
import { Prisma } from "@prisma/client"; // ✅ correct import

type JsonTaskBody = {
  title: string;
  status?: string;
  tags?: string[];
  dueDate?: string;
  priority?: string | null;
  assigneeId?: string;
  projectId?: string;
  assignerEmail?: string;
  assignerName?: string;
  customFields?: Prisma.JsonObject; // ✅ valid type
};

// ✅ GET: Fetch tasks for a user
export async function GET(req: NextRequest) {
  try {
    const { userId } = await getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tasks = await prisma.task.findMany({
      where: {
        OR: [{ assigneeId: userId }, { createdByClerkId: userId }],
      },
      include: { subtasks: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tasks, { status: 200 });
  } catch (err) {
    console.error("❌ GET /api/tasks error:", err);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

// ✅ POST: Create task
export async function POST(req: NextRequest) {
  try {
    const { userId } = await getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data: JsonTaskBody = await req.json();
    const clerkUser = await users.getUser(userId);

    const assignerEmail = clerkUser.emailAddresses?.[0]?.emailAddress || "";
    const assignerName = clerkUser.firstName || clerkUser.username || "Unknown";

    if (!data.title) {
      return NextResponse.json({ error: "Missing `title` field" }, { status: 400 });
    }

    const task = await prisma.task.create({
      data: {
        title: data.title,
        status: data.status || "todo",
        tags: Array.isArray(data.tags) ? data.tags : [],
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
        priority: data.priority || undefined,
        assigneeId: data.assigneeId || undefined,
        projectId: data.projectId || undefined,
        assignerEmail: data.assignerEmail || assignerEmail,
        assignerName: data.assignerName || assignerName,
        customFields: data.customFields ?? {},
        createdByClerkId: userId,
      },
    });

    return NextResponse.json({ success: true, task }, { status: 201 });
  } catch (err) {
    console.error("❌ POST /api/tasks error:", err);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ ok: true });
}
