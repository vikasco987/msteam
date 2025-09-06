




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

















// import { prisma } from "../../../../../lib/prisma";
// import { NextRequest, NextResponse } from "next/server";
// import { Prisma } from "@prisma/client"; // Import Prisma for JsonValue type

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

//     // ✅ Fix: Safely initialize and update customFields
//     // Ensure customFields is a safe object before modifying it.
//     // We cast it to Record<string, unknown> to allow dynamic property assignment.
//     const customFieldsObj: Record<string, unknown> =
//       typeof existing.customFields === "object" &&
//       existing.customFields !== null &&
//       !Array.isArray(existing.customFields)
//         ? { ...(existing.customFields as Record<string, unknown>) } // Spread to create a new mutable object
//         : {};

//     // Apply the update to the safe object
//     customFieldsObj[field] = value;

//     const updated = await prisma.task.update({
//       where: { id: taskId },
//       data: {
//         customFields: customFieldsObj as Prisma.InputJsonValue, // Cast back to Prisma.InputJsonValue for saving
//         updatedAt: new Date(),
//       },
//     });

//     return NextResponse.json({ success: true, task: updated });
//   } catch (err) {
//     console.error("❌ Update failed:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }












// // src/app/api/tasks/update/route.ts
// import { prisma } from "../../../../../lib/prisma";
// import { NextRequest, NextResponse } from "next/server";
// import { Prisma } from "@prisma/client";

// export async function POST(req: NextRequest) {
//   try {
//     const { taskId, field, value } = await req.json();

//     // 1. Input Validation
//     // Ensure taskId is provided and field is one of the allowed fields.
//     if (!taskId || !["amount", "amountReceived"].includes(field)) {
//       console.warn("Invalid input received for task update:", { taskId, field, value });
//       return NextResponse.json({ error: "Invalid input: Missing task ID or unsupported field." }, { status: 400 });
//     }

//     // Optional: Add more specific value validations here if needed (e.g., ensure value is a number)
//     if (typeof value !== 'number' && value !== null) { // Allow null to clear the field if needed, otherwise must be number
//         return NextResponse.json({ error: "Invalid value type for amount/amountReceived. Must be a number." }, { status: 400 });
//     }

//     // 2. Fetch Existing Task to Safely Update customFields
//     const existingTask = await prisma.task.findUnique({
//       where: { id: taskId },
//       select: { customFields: true, id: true, title: true } // Select only necessary fields
//     });

//     if (!existingTask) {
//       return NextResponse.json({ error: "Task not found." }, { status: 404 });
//     }

//     // Safely initialize and update customFields
//     // Ensure existing.customFields is an object. If null/undefined, start with an empty object.
//     const currentCustomFields = existingTask.customFields as Prisma.JsonObject || {}; // Use Prisma.JsonObject for safer type assertion

//     // Create a new object to avoid direct mutation and ensure immutability with updates
//     const updatedCustomFields: Prisma.JsonObject = {
//       ...currentCustomFields,
//       [field]: value,
//     };

//     // Optional: Server-side validation (e.g., received amount <= total amount)
//     // Only apply if both 'amount' and 'amountReceived' are present or being updated.
//     if (field === "amountReceived" && updatedCustomFields.amount !== undefined) {
//       const totalAmount = Number(updatedCustomFields.amount);
//       const receivedAmount = Number(value); // This is the new received amount

//       if (!isNaN(totalAmount) && !isNaN(receivedAmount) && receivedAmount > totalAmount) {
//         return NextResponse.json(
//           { error: "Received amount cannot exceed the total amount." },
//           { status: 400 }
//         );
//       }
//     }

//     // 3. Perform the Update
//     const updatedTask = await prisma.task.update({
//       where: { id: taskId },
//       data: {
//         customFields: updatedCustomFields, // Assign the safely updated object
//         updatedAt: new Date(),
//       },
//     });

//     // 4. Success Response
//     return NextResponse.json({ success: true, task: updatedTask }, { status: 200 });

//   } catch (err: any) { // Catch more specific errors if Prisma throws them
//     console.error("❌ API Task Update failed:", err);

//     // Provide more specific error messages for common Prisma errors if helpful
//     if (err instanceof Prisma.PrismaClientKnownRequestError) {
//       if (err.code === 'P2025') { // Example: Record to update not found (though already handled by !existingTask)
//         return NextResponse.json({ error: "Task not found (Prisma error)." }, { status: 404 });
//       }
//       // Add other Prisma error codes if needed for specific handling
//     }

//     // Generic Internal Server Error
//     return NextResponse.json({ error: "Internal server error during task update." }, { status: 500 });
//   }
// }


















// import { prisma } from "../../../../../lib/prisma";
// import { NextRequest, NextResponse } from "next/server";
// import { Prisma } from "@prisma/client";

// export async function POST(req: NextRequest) {
//   try {
//     const { taskId, field, value } = await req.json();

//     if (!taskId || !["amount", "received"].includes(field)) {
//       return NextResponse.json(
//         { error: "Invalid input: Missing task ID or unsupported field." },
//         { status: 400 }
//       );
//     }

//     if (typeof value !== 'number' && value !== null) {
//       return NextResponse.json(
//         { error: "Invalid value type. Must be a number or null." },
//         { status: 400 }
//       );
//     }

//     // Optional validation: received should not exceed amount
//     if (field === "received") {
//       const existingTask = await prisma.task.findUnique({
//         where: { id: taskId },
//         select: { amount: true }
//       });

//       if (!existingTask) {
//         return NextResponse.json({ error: "Task not found." }, { status: 404 });
//       }

//       const total = existingTask.amount ?? 0;
//       const received = Number(value);

//       if (!isNaN(total) && received > total) {
//         return NextResponse.json(
//           { error: "Received amount cannot exceed total amount." },
//           { status: 400 }
//         );
//       }
//     }

//     // ✅ Build update object dynamically
//     const dataToUpdate: Prisma.TaskUpdateInput = {
//       updatedAt: new Date(),
//       [field]: value, // ✅ This directly updates `amount` or `received`
//     };

//     const updatedTask = await prisma.task.update({
//       where: { id: taskId },
//       data: dataToUpdate,
//     });

//     return NextResponse.json({ success: true, task: updatedTask }, { status: 200 });

//   } catch (err: unknown) { // FIX: Changed 'any' to 'unknown'
//     console.error("❌ API Task Update failed:", err);

//     // Provide more specific error messages for common Prisma errors if helpful
//     if (err instanceof Prisma.PrismaClientKnownRequestError) {
//       // You can add more specific error handling based on Prisma error codes here
//       // For example:
//       // if (err.code === 'P2025') { // Record not found
//       //   return NextResponse.json({ error: "Task not found." }, { status: 404 });
//       // }
//     }

//     return NextResponse.json(
//       { error: "Internal server error during task update." },
//       { status: 500 }
//     );
//   }
// }











import { prisma } from "../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import Pusher from "pusher";

// ✅ Configure Pusher
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

export async function POST(req: NextRequest) {
  try {
    const { taskId, field, value } = await req.json();

    if (!taskId || !["amount", "received"].includes(field)) {
      return NextResponse.json(
        { error: "Invalid input: Missing task ID or unsupported field." },
        { status: 400 }
      );
    }

    if (typeof value !== "number" && value !== null) {
      return NextResponse.json(
        { error: "Invalid value type. Must be a number or null." },
        { status: 400 }
      );
    }

    // ✅ Validation: received cannot exceed amount
    if (field === "received") {
      const existingTask = await prisma.task.findUnique({
        where: { id: taskId },
        select: { amount: true },
      });

      if (!existingTask) {
        return NextResponse.json({ error: "Task not found." }, { status: 404 });
      }

      const total = existingTask.amount ?? 0;
      const received = Number(value);

      if (!isNaN(total) && received > total) {
        return NextResponse.json(
          { error: "Received amount cannot exceed total amount." },
          { status: 400 }
        );
      }
    }

    // ✅ Build update object dynamically
    const dataToUpdate: Prisma.TaskUpdateInput = {
      updatedAt: new Date(),
      [field]: value, // will update either `amount` or `received`
    };

    // ✅ Update task in DB
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: dataToUpdate,
    });

    // ✅ Trigger realtime event via Pusher
    await pusher.trigger("tasks-channel", "task-updated", updatedTask);

    return NextResponse.json(
      { success: true, task: updatedTask },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("❌ API Task Update failed:", err);

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        return NextResponse.json({ error: "Task not found." }, { status: 404 });
      }
    }

    return NextResponse.json(
      { error: "Internal server error during task update." },
      { status: 500 }
    );
  }
}
