// src/app/api/tasks/[id]/notes/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params; // ✅ Correct: Use context.params.id

    // FIX (Line 25 equivalent): Replace 'any' with a proper type
    const { content, authorName, authorEmail }: { content: string; authorName?: string; authorEmail?: string } = await req.json();

    if (!content) {
      return NextResponse.json({ error: "Missing content" }, { status: 400 });
    }

    const note = await prisma.note.create({
      data: {
        content,
        taskId: new ObjectId(id).toString(),
        authorName: authorName || "Anonymous",
        authorEmail: authorEmail || "unknown@example.com",
      },
    });

    return NextResponse.json(note);
  } catch (err: unknown) { // FIX: Type caught error as unknown for better type safety
    console.error("Note creation error:", err);
    return NextResponse.json({ error: "Server error", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}