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
