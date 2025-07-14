




// import { prisma } from "../../../../../lib/prisma";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const { taskId, field, value } = await req.json();

//     if (!taskId || !["amount", "amountReceived"].includes(field)) {
//       return NextResponse.json({ error: "Invalid input" }, { status: 400 });
//     }

//     // Get the existing task
//     const existing = await prisma.task.findUnique({
//       where: { id: taskId },
//     });

//     if (!existing) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     // Handle if customFields is null
//     const customFields = existing.customFields || {};

//     // Update the relevant field
//     customFields[field] = value;

//     const updated = await prisma.task.update({
//       where: { id: taskId },
//       data: {
//         customFields: customFields,
//         updatedAt: new Date(),
//       },
//     });

//     return NextResponse.json({ success: true, task: updated });
//   } catch (err) {
//     console.error("❌ Update failed:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

















import { prisma } from "../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client"; // Import Prisma for JsonValue type

export async function POST(req: NextRequest) {
  try {
    const { taskId, field, value } = await req.json();

    if (!taskId || !["amount", "amountReceived"].includes(field)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Get the existing task
    const existing = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!existing) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // ✅ Fix: Safely initialize and update customFields
    // Ensure customFields is a safe object before modifying it.
    // We cast it to Record<string, unknown> to allow dynamic property assignment.
    const customFieldsObj: Record<string, unknown> =
      typeof existing.customFields === "object" &&
      existing.customFields !== null &&
      !Array.isArray(existing.customFields)
        ? { ...(existing.customFields as Record<string, unknown>) } // Spread to create a new mutable object
        : {};

    // Apply the update to the safe object
    customFieldsObj[field] = value;

    const updated = await prisma.task.update({
      where: { id: taskId },
      data: {
        customFields: customFieldsObj as Prisma.InputJsonValue, // Cast back to Prisma.InputJsonValue for saving
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, task: updated });
  } catch (err) {
    console.error("❌ Update failed:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}