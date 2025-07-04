

// // File: src/app/api/tasks/[id]/route.ts

// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "../../../../../lib/prisma";
// import { auth, clerkClient } from "@clerk/nextjs/server";


// // ✅ Use this type for dynamic routes
// type Params = { params: { id: string } };

// // PATCH: Update a task
// export async function PATCH(req: NextRequest, { params }: Params) {
//   const taskId = params.id;

//   if (!taskId) {
//     return NextResponse.json(
//       { success: false, message: "Task ID is missing" },
//       { status: 400 }
//     );
//   }

//   const { userId } = auth();
//   if (!userId) {
//     return NextResponse.json(
//       { success: false, message: "Unauthorized" },
//       { status: 401 }
//     );
//   }

//   try {
//     const body = await req.json();
//     const { title, status, customFields } = body;

//     const updatedTask = await prisma.task.update({
//       where: { id: taskId },
//       data: {
//         ...(title && { title }),
//         ...(status && { status }),
//         ...(customFields && { customFields }),
//         updatedAt: new Date(),
//       },
//     });

//     return NextResponse.json(
//       { success: true, task: updatedTask },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("❌ Failed to update task:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to update task",
//         error: String(error),
//       },
//       { status: 500 }
//     );
//   }
// }

// // DELETE: Delete a task and its subtasks
// export async function DELETE(req: NextRequest, { params }: Params) {
//   const taskId = params.id;

//   if (!taskId) {
//     return NextResponse.json({ error: "Task ID missing" }, { status: 400 });
//   }

//   const { userId } = auth();
//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const task = await prisma.task.findUnique({ where: { id: taskId } });

//     if (!task) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     // Delete subtasks first
//     await prisma.subtask.deleteMany({ where: { taskId } });

//     // Delete the task
//     await prisma.task.delete({ where: { id: taskId } });

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (error) {
//     console.error("❌ DELETE /tasks/:id failed:", error);
//     return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
//   }
// }

// // GET: Fetch a task by ID
// export async function GET(req: NextRequest, { params }: Params) {
//   try {
//     const taskId = params.id;

//     const task = await prisma.task.findUnique({
//       where: { id: taskId },
//       include: { subtasks: true },
//     });

//     if (!task) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     return NextResponse.json(task, { status: 200 });
//   } catch (error) {
//     console.error("❌ GET /tasks/:id failed:", error);
//     return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 });
//   }
// }










// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "../../../../../lib/prisma";
// import { auth } from "@clerk/nextjs/server";

// type Params = { params: { id: string } };

// // PATCH: Update a task
// export async function PATCH(
//   req: NextRequest,
//   { params }: Params
// ): Promise<NextResponse> {
//   const taskId = params.id;
//   if (!taskId) {
//     return NextResponse.json({ success: false, message: "Task ID is missing" }, { status: 400 });
//   }

//   const { userId } = auth();
//   if (!userId) {
//     return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const { title, status, customFields } = await req.json();

//     const updatedTask = await prisma.task.update({
//       where: { id: taskId },
//       data: {
//         ...(title && { title }),
//         ...(status && { status }),
//         ...(customFields && { customFields }),
//         updatedAt: new Date(),
//       },
//     });

//     return NextResponse.json({ success: true, task: updatedTask }, { status: 200 });
//   } catch (error) {
//     console.error("❌ Failed to update task:", error);
//     return NextResponse.json({ success: false, message: "Failed to update task", error: String(error) }, { status: 500 });
//   }
// }

// // DELETE: Delete a task
// export async function DELETE(
//   req: NextRequest,
//   { params }: Params
// ): Promise<NextResponse> {
//   const taskId = params.id;

//   if (!taskId) {
//     return NextResponse.json({ error: "Task ID missing" }, { status: 400 });
//   }

//   const { userId } = auth();
//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const task = await prisma.task.findUnique({ where: { id: taskId } });
//     if (!task) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     await prisma.subtask.deleteMany({ where: { taskId } });
//     await prisma.task.delete({ where: { id: taskId } });

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (error) {
//     console.error("❌ DELETE /tasks/:id failed:", error);
//     return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
//   }
// }

// // GET: Fetch a task by ID
// export async function GET(
//   req: NextRequest,
//   { params }: Params
// ): Promise<NextResponse> {
//   try {
//     const taskId = params.id;

//     const task = await prisma.task.findUnique({
//       where: { id: taskId },
//       include: { subtasks: true },
//     });

//     if (!task) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     return NextResponse.json(task, { status: 200 });
//   } catch (error) {
//     console.error("❌ GET /tasks/:id failed:", error);
//     return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 });
//   }
// }











// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "../../../../../lib/prisma";
// import { auth } from "@clerk/nextjs/server";

// // ✅ In Next.js 15+, params is now a Promise
// type Params = { params: Promise<{ id: string }> };

// // PATCH: Update a task
// export async function PATCH(
//   req: NextRequest,
//   { params }: Params
// ): Promise<NextResponse> {
//   const { id: taskId } = await params;

//   if (!taskId) {
//     return NextResponse.json(
//       { success: false, message: "Task ID is missing" },
//       { status: 400 }
//     );
//   }

//   const { userId } = auth();
//   if (!userId) {
//     return NextResponse.json(
//       { success: false, message: "Unauthorized" },
//       { status: 401 }
//     );
//   }

//   try {
//     const body = await req.json();
//     const { title, status, customFields } = body;

//     const updatedTask = await prisma.task.update({
//       where: { id: taskId },
//       data: {
//         ...(title && { title }),
//         ...(status && { status }),
//         ...(customFields && { customFields }),
//         updatedAt: new Date(),
//       },
//     });

//     return NextResponse.json(
//       { success: true, task: updatedTask },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("❌ Failed to update task:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to update task",
//         error: String(error),
//       },
//       { status: 500 }
//     );
//   }
// }

// // DELETE: Delete a task and its subtasks
// export async function DELETE(
//   req: NextRequest,
//   { params }: Params
// ): Promise<NextResponse> {
//   const { id: taskId } = await params;

//   if (!taskId) {
//     return NextResponse.json({ error: "Task ID missing" }, { status: 400 });
//   }

//   const { userId } = auth();
//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const task = await prisma.task.findUnique({ where: { id: taskId } });

//     if (!task) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     await prisma.subtask.deleteMany({ where: { taskId } });
//     await prisma.task.delete({ where: { id: taskId } });

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (error) {
//     console.error("❌ DELETE /tasks/:id failed:", error);
//     return NextResponse.json(
//       { error: "Failed to delete task" },
//       { status: 500 }
//     );
//   }
// }

// // GET: Fetch a task by ID
// export async function GET(
//   req: NextRequest,
//   { params }: Params
// ): Promise<NextResponse> {
//   const { id: taskId } = await params;

//   try {
//     const task = await prisma.task.findUnique({
//       where: { id: taskId },
//       include: { subtasks: true },
//     });

//     if (!task) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     return NextResponse.json(task, { status: 200 });
//   } catch (error) {
//     console.error("❌ GET /tasks/:id failed:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch task" },
//       { status: 500 }
//     );
//   }
// }





















import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { auth } from "@clerk/nextjs/server";

// Next.js 15: params is now Promise<{ id: string }>
type Params = { params: Promise<{ id: string }> };

export async function PATCH(
  req: NextRequest,
  { params }: Params
): Promise<NextResponse> {
  const { id: taskId } = await params;

  if (!taskId) return NextResponse.json({ success: false, message: "Task ID is missing" }, { status: 400 });

  const { userId } = await auth();
  if (!userId) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  try {
    const { title, status, customFields } = await req.json();
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        ...(title && { title }),
        ...(status && { status }),
        ...(customFields && { customFields }),
        updatedAt: new Date(),
      },
    });
    return NextResponse.json({ success: true, task: updatedTask }, { status: 200 });
  } catch (error) {
    console.error("❌ Failed to update task:", error);
    return NextResponse.json({ success: false, message: "Failed to update task", error: String(error) }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: Params
): Promise<NextResponse> {
  const { id: taskId } = await params;
  if (!taskId) return NextResponse.json({ error: "Task ID missing" }, { status: 400 });

  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 });

    await prisma.subtask.deleteMany({ where: { taskId } });
    await prisma.task.delete({ where: { id: taskId } });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("❌ DELETE /tasks/:id failed:", error);
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: Params
): Promise<NextResponse> {
  const { id: taskId } = await params;

  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: { subtasks: true },
    });
    if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 });
    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.error("❌ GET /tasks/:id failed:", error);
    return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 });
  }
}
