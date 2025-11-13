











// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import { prisma } from "../../../../lib/prisma";

// export async function GET(req: Request) {
//   const { userId } = await auth();

//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const { searchParams } = new URL(req.url);
//   const limit = parseInt(searchParams.get("limit") || "10");
//   const page = parseInt(searchParams.get("page") || "1");
//   const skip = (page - 1) * limit;

//   try {
//     const [tasks, total] = await Promise.all([
//       prisma.task.findMany({
//         where: {
//           createdByClerkId: userId, // ✅ Only tasks YOU created
//         },
//         include: {
//           subtasks: true,
//           notes: true,
//         },
//         orderBy: { createdAt: "desc" },
//         skip,
//         take: limit,
//       }),
//       prisma.task.count({
//         where: {
//           createdByClerkId: userId, // ✅ Count only your created tasks
//         },
//       }),
//     ]);

//     const formattedTasks = tasks.map((task) => ({
//       id: task.id,
//       name: task.title,
//       shop: task.shopName || task.outletName || "",
//       customer: task.customerName || "",
//       start: task.startDate || new Date().toISOString().split("T")[0],
//       end: task.endDate || new Date().toISOString().split("T")[0],
//       progress: task.timeline ? parseInt(task.timeline) : 0,
//       assigneeIds: task.assigneeIds,
//       subtasks: task.subtasks.map((s) => ({
//         id: s.id,
//         title: s.title,
//         completed: s.completed,
//       })),
//       notes: task.notes.map((n) => ({
//         id: n.id,
//         content: n.content,
//         authorName: n.authorName,
//         authorEmail: n.authorEmail,
//       })),
//       attachments: task.attachments,
//     }));

//     return NextResponse.json({
//       tasks: formattedTasks,
//       total,
//       page,
//       limit,
//       totalPages: Math.ceil(total / limit),
//     });
//   } catch (err) {
//     console.error("❌ Timeline Fetch Error:", err);
//     return NextResponse.json({ error: "Failed to load tasks" }, { status: 500 });
//   }
// }




// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const limit = searchParams.get("limit") || "10";
//   const page = searchParams.get("page") || "1";

//   try {
//     // Forward the same auth header from the original request
//     const authHeader = req.headers.get("authorization");

//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/tasks/paginated?limit=${limit}&page=${page}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           ...(authHeader ? { Authorization: authHeader } : {}),
//         },
//       }
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       return NextResponse.json({ error: data.error || "Failed to fetch tasks" }, { status: 500 });
//     }

//     return NextResponse.json(data);
//   } catch (err) {
//     console.error("❌ Timeline Fetch Error:", err);
//     return NextResponse.json({ error: "Failed to load tasks" }, { status: 500 });
//   }
// }










// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const limit = searchParams.get("limit") || "10";
//   const page = searchParams.get("page") || "1";

//   try {
//     const authHeader = req.headers.get("authorization");

//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/tasks/paginated?limit=${limit}&page=${page}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           ...(authHeader ? { Authorization: authHeader } : {}),
//         },
//       }
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       return NextResponse.json({ error: data.error || "Failed to fetch tasks" }, { status: 500 });
//     }

//     const tasksWithFallbacks = (data.tasks || []).map((task: any) => {
//       // Safely parse dates
//       const startDate = task.start ? new Date(task.start) : null;
//       const endDate = task.end ? new Date(task.end) : null;

//       return {
//         name: task.name || task.title || "Unnamed Task",
//         shop: task.shop?.name || task.shop || "Unknown Shop",
//         customer: task.customer?.name || task.customer || "Unknown Customer",
//         customerPhone: task.customer?.phone || task.customerPhone || "N/A",
//         start: startDate && !isNaN(startDate.getTime()) ? startDate.toLocaleString() : "N/A",
//         end: endDate && !isNaN(endDate.getTime()) ? endDate.toLocaleString() : "N/A",
//         progress: typeof task.progress === "number" ? task.progress : 0,
//         ...task,
//       };
//     });

//     return NextResponse.json({
//       ...data,
//       tasks: tasksWithFallbacks,
//     });
//   } catch (err) {
//     console.error("❌ Timeline Fetch Error:", err);
//     return NextResponse.json({ error: "Failed to load tasks" }, { status: 500 });
//   }
// }





import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit") || "10";
  const page = searchParams.get("page") || "1";

  try {
    const authHeader = req.headers.get("authorization");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/tasks/paginated?limit=${limit}&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(authHeader ? { Authorization: authHeader } : {}),
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error || "Failed to fetch tasks" }, { status: 500 });
    }

    // Map tasks with safe fallbacks
    const tasksWithFallbacks = (data.tasks || []).map((task: any) => {
      // Safely parse start and end dates
      const parseDate = (d: any) => {
        if (!d) return null;
        const date = new Date(d);
        return isNaN(date.getTime()) ? null : date.toISOString(); // use ISO string for frontend
      };

      return {
        id: task.id || task._id || null,
        name: task.name || task.title || "Unnamed Task",
        shop: task.shopName || task.shop?.name || task.shop || "Unknown Shop",
        customer: task.customerName || task.customer?.name || task.customer || "Unknown Customer",
        customerPhone: task.phone || task.customer?.phone || task.customerPhone || "N/A",
        start: parseDate(task.startDate || task.start || task.dueDate),
        end: parseDate(task.endDate || task.end),
        progress: typeof task.progress === "number" ? task.progress : 0,
        // include any other fields as-is
        ...task,
      };
    });

    return NextResponse.json({
      ...data,
      tasks: tasksWithFallbacks,
    });
  } catch (err) {
    console.error("❌ Timeline Fetch Error:", err);
    return NextResponse.json({ error: "Failed to load tasks" }, { status: 500 });
  }
}
