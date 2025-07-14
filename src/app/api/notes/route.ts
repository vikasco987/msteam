import { prisma } from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const taskId = searchParams.get("taskId");

  if (!taskId) {
    return NextResponse.json({ error: "Missing taskId" }, { status: 400 });
  }

  const notes = await prisma.note.findMany({
    where: {
      taskId: new ObjectId(taskId).toString(),
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(notes);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { taskId, content, authorName, authorEmail } = body;

  if (!taskId || !content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const note = await prisma.note.create({
    data: {
      taskId: new ObjectId(taskId).toString(),
      content,
      authorName,
      authorEmail,
    },
  });

  return NextResponse.json(note);
}
