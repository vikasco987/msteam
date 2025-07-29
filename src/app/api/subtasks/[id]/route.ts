import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import type { RouteContext } from "next"; // Optional, but for clarity

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } } // ✅ Correct shape for context
) {
  try {
    const subtaskId = context.params.id;

    if (!subtaskId) {
      return NextResponse.json({ error: "Missing subtask ID" }, { status: 400 });
    }

    const subtask = await prisma.subtask.findUnique({
      where: { id: subtaskId },
    });

    if (!subtask) {
      return NextResponse.json({ error: "Subtask not found" }, { status: 404 });
    }

    const updatedSubtask = await prisma.subtask.update({
      where: { id: subtaskId },
      data: { completed: !subtask.completed },
    });

    return NextResponse.json(updatedSubtask);
  } catch (err) {
    console.error("Subtask Update Error:", err);
    return NextResponse.json({ error: "Failed to update subtask" }, { status: 500 });
  }
}

