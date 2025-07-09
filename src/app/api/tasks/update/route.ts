// import { NextRequest, NextResponse } from "next/server";
// import { getAuth } from "@clerk/nextjs/server";
// import { users } from "@clerk/clerk-sdk-node";
// import { prisma } from "../../../../../lib/prisma"; // 5 levels up


// // ✅ Check if user is admin
// async function isAdmin(userId: string): Promise<boolean> {
//   try {
//     const user = await users.getUser(userId);
//     const role = user?.publicMetadata?.role || user?.privateMetadata?.role || null;
//     return role === "admin";
//   } catch (err) {
//     console.error("❌ Clerk role check failed:", err);
//     return false;
//   }
// }

// export async function POST(req: NextRequest) {
//   try {
//     const { userId } = await getAuth(req);
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { taskId, field, value } = await req.json();

//     if (!taskId || !["amount", "amountReceived"].includes(field) || typeof value !== "number") {
//       return NextResponse.json({ error: "Invalid input" }, { status: 400 });
//     }

//     const userIsAdmin = await isAdmin(userId);

//     const task = await prisma.task.findUnique({
//       where: { id: taskId },
//     });

//     if (!task) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     const existingFields = task.customFields || {};

//     if (!userIsAdmin && existingFields[field] !== undefined) {
//       return NextResponse.json({ error: "You can only edit this once." }, { status: 403 });
//     }

//     const updatedFields = {
//       ...existingFields,
//       [field]: value,
//     };

//     await prisma.task.update({
//       where: { id: taskId },
//       data: {
//         customFields: updatedFields,
//         updatedAt: new Date(),
//       },
//     });

//     return NextResponse.json({ success: true });
//   } catch (err: any) {
//     console.error("❌ Error updating task:", err);
//     return NextResponse.json({ error: "Server error", details: err.message }, { status: 500 });
//   }
// }

// export async function OPTIONS() {
//   return NextResponse.json({ ok: true });
// }














// import { NextRequest, NextResponse } from "next/server";
// import { getAuth } from "@clerk/nextjs/server";
// import { users } from "@clerk/clerk-sdk-node";
// import { prisma } from "../../../../../lib/prisma";

// // ✅ Type-safe error
// type ClerkUserRole = "admin" | "user" | string;

// // ✅ Check if user is admin
// async function isAdmin(userId: string): Promise<boolean> {
//   try {
//     const user = await users.getUser(userId);
//     const role: ClerkUserRole =
//       (user?.publicMetadata?.role as string) ||
//       (user?.privateMetadata?.role as string) ||
//       "";

//     return role === "admin";
//   } catch (error) {
//     console.error("❌ Clerk role check failed:", error);
//     return false;
//   }
// }

// export async function POST(req: NextRequest) {
//   try {
//     const { userId } = await getAuth(req);
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const body = await req.json();
//     const { taskId, field, value } = body as {
//       taskId: string;
//       field: string;
//       value: number;
//     };

//     if (
//       !taskId ||
//       !["amount", "amountReceived"].includes(field) ||
//       typeof value !== "number"
//     ) {
//       return NextResponse.json({ error: "Invalid input" }, { status: 400 });
//     }

//     const userIsAdmin = await isAdmin(userId);

//     const task = await prisma.task.findUnique({
//       where: { id: taskId },
//     });

//     if (!task) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     const existingFields = task.customFields || {};

//     if (!userIsAdmin && existingFields[field] !== undefined) {
//       return NextResponse.json(
//         { error: "You can only edit this once." },
//         { status: 403 }
//       );
//     }

//     const updatedFields = {
//       ...existingFields,
//       [field]: value,
//     };

//     await prisma.task.update({
//       where: { id: taskId },
//       data: {
//         customFields: updatedFields,
//         updatedAt: new Date(),
//       },
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     const err = error as Error;
//     console.error("❌ Error updating task:", err);
//     return NextResponse.json(
//       { error: "Server error", details: err.message },
//       { status: 500 }
//     );
//   }
// }

// export async function OPTIONS() {
//   return NextResponse.json({ ok: true });
// }











import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { users } from "@clerk/clerk-sdk-node";
import { prisma } from "../../../../../lib/prisma";

// ✅ Type-safe Clerk role
type ClerkUserRole = "admin" | "user" | string;

// ✅ Optional: stricter typing for customFields if you want
type CustomFieldValue = string | number | boolean | null | undefined;
type CustomFields = { [key: string]: CustomFieldValue };

// ✅ Check if user is admin
async function isAdmin(userId: string): Promise<boolean> {
  try {
    const user = await users.getUser(userId);
    const role: ClerkUserRole =
      (user?.publicMetadata?.role as string) ||
      (user?.privateMetadata?.role as string) ||
      "";

    return role === "admin";
  } catch (error) {
    console.error("❌ Clerk role check failed:", error);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { taskId, field, value } = body as {
      taskId: string;
      field: string;
      value: number;
    };

    if (
      !taskId ||
      !["amount", "amountReceived"].includes(field) ||
      typeof value !== "number"
    ) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const userIsAdmin = await isAdmin(userId);

    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // ✅ Narrow customFields to safe object type
    const existingFields = (task.customFields ?? {}) as CustomFields;

    // ✅ Prevent overwriting if user is not admin
    if (!userIsAdmin && existingFields[field] !== undefined) {
      return NextResponse.json(
        { error: "You can only edit this once." },
        { status: 403 }
      );
    }

    const updatedFields: CustomFields = {
      ...existingFields,
      [field]: value,
    };

    await prisma.task.update({
      where: { id: taskId },
      data: {
        customFields: updatedFields,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const err = error as Error;
    console.error("❌ Error updating task:", err);
    return NextResponse.json(
      { error: "Server error", details: err.message },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({ ok: true });
}
