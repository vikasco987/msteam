import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

// ✅ Updated: Next.js 15 requires Promise-wrapped params
type Context = {
  params: Promise<{ id: string }>;
};

export async function PATCH(req: NextRequest, context: Context) {
  const { id: taskId } = await context.params;
  const { userId } = await auth();

  if (!taskId || !userId) {
    return NextResponse.json({ error: "Unauthorized or missing task ID" }, { status: 400 });
  }

  try {
    const { title, status, customFields } = await req.json();
    const updated = await prisma.task.update({
      where: { id: taskId },
      data: {
        ...(title && { title }),
        ...(status && { status }),
        ...(customFields && { customFields }),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, task: updated }, { status: 200 });
  } catch (err) {
    console.error("❌ Failed to update:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: Context) {
  const { id: taskId } = await context.params;
  const { userId } = await auth();

  if (!taskId || !userId) {
    return NextResponse.json({ error: "Unauthorized or missing task ID" }, { status: 400 });
  }

  try {
    await prisma.subtask.deleteMany({ where: { taskId } });
    await prisma.task.delete({ where: { id: taskId } });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("❌ Delete failed:", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

export async function GET(req: NextRequest, context: Context) {
  const { id: taskId } = await context.params;
  const { userId } = await auth();

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
