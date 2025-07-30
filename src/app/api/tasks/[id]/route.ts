import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma"; // Adjust path if needed based on your project structure
import { auth } from "@clerk/nextjs/server"; // Using Clerk's auth
import { Prisma } from "@prisma/client"; // Import Prisma for types like JsonObject, TaskUpdateInput

export const dynamic = "force-dynamic";

// Define the expected structure for the PATCH request body
interface PatchRequestBody {
  title?: string;
  status?: string;
  amount?: number | string | null; // Allow string as it might come from form data, and null for clearing
  received?: number | string | null; // Allow string as it might come from form data, and null for clearing
  description?: string;
  highlightColor?: string | null;
  // customFields can be a partial object that will be merged,
  // it should align with what Prisma expects for JsonObject
  customFields?: { [key: string]: any };
}

// --- GET Task by ID (No changes needed here from your provided code) ---
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: taskId } = params;
  const { userId } = auth(); // Get userId from Clerk authentication

  if (!taskId || !userId) {
    return NextResponse.json(
      { error: "Unauthorized or missing task ID" },
      { status: 400 }
    );
  }

  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: { subtasks: true }, // Include subtasks if relevant
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // You might want to add a check here to ensure the user is authorized to view this specific task
    // e.g., if (task.userId !== userId) { return NextResponse.json({ error: "Forbidden" }, { status: 403 }); }

    return NextResponse.json(task, { status: 200 });
  } catch (err: unknown) {
    console.error("❌ Get task failed:", err);
    return NextResponse.json({ error: "Fetch failed", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}

// --- PATCH Task (Update) ---
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: taskId } = params;
  const { userId } = await auth();

  if (!taskId) {
    return NextResponse.json({ error: "Missing task ID in URL" }, { status: 400 });
  }
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: PatchRequestBody = await req.json();

    // ✅ FIX: Initialize updateData with Prisma.TaskUpdateInput for type safety.
    // Ensure all properties added match what Prisma expects.
    const updateData: Prisma.TaskUpdateInput = { updatedAt: new Date() };

    const allowedFields = [
      "title",
      "status",
      "amount",
      "received",
      "description",
      "highlightColor",
    ];

    for (const field of allowedFields) {
      if (body[field as keyof PatchRequestBody] !== undefined) {
        if (field === "amount" || field === "received") {
          const value = body[field as 'amount' | 'received'];
          if (typeof value === 'number') {
            updateData[field] = value;
          } else if (typeof value === 'string' && !isNaN(parseFloat(value))) {
            updateData[field] = parseFloat(value);
          } else if (value === null) {
            updateData[field] = null; // Ensure your schema allows null for these fields
          }
          // If you want to explicitly handle invalid string inputs (e.g., "abc"),
          // you could return an error here or set to null/undefined based on logic.
        } else {
          // ✅ FIX: Directly assign to updateData. TypeScript infers the correct type
          // because updateData is already typed as Prisma.TaskUpdateInput.
          // No need for `(updateData as any)[field]`.
          // We assume 'title', 'status', 'description', 'highlightColor'
          // from PatchRequestBody are directly compatible with TaskUpdateInput.
          updateData[field as Exclude<keyof PatchRequestBody, 'amount' | 'received' | 'customFields'>] = body[field as Exclude<keyof PatchRequestBody, 'amount' | 'received' | 'customFields'>];
        }
      }
    }

    if (body.customFields !== undefined) {
      const currentTask = await prisma.task.findUnique({
        where: { id: taskId },
        select: { customFields: true },
      });

      // ✅ FIX: Ensure existingCustomFields is properly typed and initialized as Prisma.JsonValue.
      // Use Prisma.JsonValue for more robust handling of JSON fields.
      // If customFields is `Json?` in your schema, it can be `null`.
      const existingCustomFields: Prisma.JsonValue = currentTask?.customFields || {};

      // Ensure the merge operation results in a Prisma.JsonValue compatible object.
      // Prisma.JsonObject is a more specific type for object JSON values.
      if (typeof existingCustomFields === 'object' && existingCustomFields !== null &&
          typeof body.customFields === 'object' && body.customFields !== null) {
          updateData.customFields = {
              ...(existingCustomFields as Prisma.JsonObject),
              ...(body.customFields as Prisma.JsonObject),
          } as Prisma.JsonObject; // Cast the final merged object to Prisma.JsonObject
      } else {
          // Handle cases where existingCustomFields or body.customFields are not objects
          // This might indicate a malformed payload or initial state.
          // For simplicity, we'll just use the new customFields if existing isn't an object
          updateData.customFields = body.customFields as Prisma.JsonObject;
      }
    }

    // Check if any actual fields are being updated other than `updatedAt`
    const hasOtherUpdates = Object.keys(updateData).some(key => key !== 'updatedAt' && key !== 'customFields');
    const hasCustomFieldUpdates = Object.keys(updateData).includes('customFields');


    if (!hasOtherUpdates && !hasCustomFieldUpdates) {
      return NextResponse.json({ error: "No valid fields provided for update" }, { status: 400 });
    }

    const updated = await prisma.task.update({
      where: { id: taskId },
      data: updateData,
    });

    return NextResponse.json({ success: true, task: updated }, { status: 200 });
  } catch (err: unknown) {
    console.error("❌ Update failed:", err);
    return NextResponse.json({ error: "Failed to update task", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}

// --- DELETE Task (No changes needed here from your provided code) ---
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: taskId } = params;
  const { userId } = auth(); // Get userId from Clerk authentication

  if (!taskId || !userId) {
    return NextResponse.json(
      { error: "Unauthorized or missing task ID" },
      { status: 400 }
    );
  }

  try {
    // Delete related subtasks first to maintain referential integrity
    await prisma.subtask.deleteMany({ where: { taskId } });
    await prisma.note.deleteMany({ where: { taskId } }); // Assuming notes also have a taskId field
    await prisma.task.delete({ where: { id: taskId } });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    console.error("❌ Delete failed:", err);
    return NextResponse.json({ error: "Delete failed", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}