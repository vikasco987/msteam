import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params; // ✅ Correct: Use context.params.id

    const { content, authorName, authorEmail } = await req.json();

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
  } catch (err: any) {
    console.error("Note creation error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
