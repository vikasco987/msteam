import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma"; // ← based on your pattern
import { getAuth } from "@clerk/nextjs/server";

export async function PATCH(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { taskId, highlightColor } = body;

    if (!taskId || highlightColor === undefined) {
      return NextResponse.json({ error: "Missing taskId or highlightColor" }, { status: 400 });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { highlightColor },
    });

    return NextResponse.json({ success: true, data: updatedTask });
  } catch (err: any) {
    console.error("Error updating highlight:", err);
    return NextResponse.json({ error: "Update failed", details: err.message }, { status: 500 });
  }
}
