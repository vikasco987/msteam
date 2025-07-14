// timeline/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { users } from "@clerk/clerk-sdk-node";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  const { userId } = await auth(); // ✅ CORRECT: await the Promise

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const tasks = await prisma.task.findMany({
      where: {
        startDate: { not: null },
        endDate: { not: null },
      },
      orderBy: { createdAt: "desc" },
    });

    const enrichedTasks = await Promise.all(
      tasks.map(async (task) => {
        let avatarUrl = null;

        try {
          if (task.assigneeId) {
            const user = await users.getUser(task.assigneeId);
            avatarUrl =
              user.imageUrl ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                // ✅ FIX: Replaced user.fullName with manual construction
                `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || user.username || "User"
              )}`;
          }
        } catch {
          avatarUrl = `https://ui-avatars.com/api/?name=Unknown`;
        }

        return {
          id: task.id,
          name: task.title,
          start: task.startDate,
          end: task.endDate,
 
          avatarUrl,
        };
      })
    );

    return NextResponse.json({ tasks: enrichedTasks });
  } catch (error) {
    console.error("❌ Timeline Fetch Error:", error);
    return NextResponse.json(
      { error: "Failed to load tasks" },
      { status: 500 }
    );
  }
}