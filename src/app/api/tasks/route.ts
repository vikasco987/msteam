'use server';
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { users } from "@clerk/clerk-sdk-node";
import { prisma } from "../../../../lib/prisma";

// Define an interface for the metadata that contains the role
interface UserPublicMetadata {
  role?: string; // Role can be a string or undefined
  // Add other properties if they exist in your public metadata
}

interface UserPrivateMetadata {
  role?: string; // Role can be a string or undefined
  // Add other properties if they exist in your private metadata
}

// Define the interface for the 'Field' object within customFields
interface Field {
  label?: string;
  value?: string;
  files?: unknown[]; // Use unknown[] as the files array can contain anything before filtering
}

// ✅ Add this helper function below imports
function toNullableString(val: unknown): string | null {
  return typeof val === "string" && val.trim() !== "" ? val.trim() : null;
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    console.log("📦 Raw request body:", JSON.stringify(body, null, 2));


    if (!body.title || !body.assigneeId) {
      return NextResponse.json(
        { error: "Missing title or assigneeId" },
        { status: 400 }
      );
    }

    const clerkUser = await users.getUser(userId);
    const assignerEmail = clerkUser.emailAddresses?.[0]?.emailAddress || "unknown";
    const assignerName = clerkUser.firstName || clerkUser.username || "Unknown";

    const status = "todo" as const;


    const {
      phone,
      email,
      shopName,
      outletName,
      location,
      accountNumber,
      ifscCode,
      customerName,
      restId,
      packageAmount,
      startDate,
      endDate,
      timeline,
      fields = [], // This 'fields' array needs proper typing
    } = body.customFields ?? {};

    const {
      aadhaarUrl,
      panUrl,
      selfieUrl,
      chequeUrl,
      menuCardUrls,
    } = body.customFields ?? {};


    const safeAttachments = body.attachments ?? [];


    // ✅ Fix: Replace 'any' with 'Field' and add type guard for 'url'
    const safeFields = Array.isArray(fields)
      ? (fields as Field[]).map((f) => ({ // Cast 'fields' to 'Field[]'
        label: f.label || "",
        value: f.value || "",
        files: Array.isArray(f.files)
          ? f.files.filter((url): url is string => typeof url === "string") // Use type guard for 'url'
          : [],
      }))
      : [];


    const task = await prisma.task.create({
      data: {
        title: body.title,
        status,
        assigneeIds: Array.isArray(body.assigneeIds)
          ? body.assigneeIds
          : [body.assigneeId], // fallback for backward compatibility

        assignerEmail,
        assignerName,
        createdByClerkId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),

        customFields: {
          phone: toNullableString(phone),
          email: toNullableString(email),
          shopName: toNullableString(shopName),
          outletName: toNullableString(outletName),
          location: toNullableString(location),
          accountNumber: toNullableString(accountNumber),
          ifscCode: toNullableString(ifscCode),
          customerName: toNullableString(customerName),
          restId: toNullableString(restId),
          packageAmount: toNullableString(packageAmount),
          startDate: toNullableString(startDate),
          endDate: toNullableString(endDate),
          timeline: toNullableString(timeline),
          fields: safeFields,
        },

        attachments: safeAttachments,
        tags: Array.isArray(body.tags) ? body.tags : [],
        priority: body.priority ?? null,
        dueDate: body.dueDate ? new Date(body.dueDate) : null,

        phone: toNullableString(phone),
        email: toNullableString(email),
        shopName: toNullableString(shopName),
        location: toNullableString(location),
        accountNumber: toNullableString(accountNumber),
        ifscCode: toNullableString(ifscCode),
        restId: toNullableString(restId),
        customerName: toNullableString(customerName),
        packageAmount: toNullableString(packageAmount),
        startDate: toNullableString(startDate),
        endDate: toNullableString(endDate),
        timeline: toNullableString(timeline),

        aadhaarUrl: toNullableString(aadhaarUrl),
        panUrl: toNullableString(panUrl),
        selfieUrl: toNullableString(selfieUrl),
        chequeUrl: toNullableString(chequeUrl),
        menuCardUrls: Array.isArray(menuCardUrls)
          ? menuCardUrls.filter((url) => typeof url === "string" && url.trim() !== "")
          : [],
      },
    });


    console.log("✅ Task created:", task.id);
    return NextResponse.json({ success: true, task }, { status: 201 });

  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : "Unknown error";
    console.error("❌ POST /api/tasks error:", err);
    return NextResponse.json(
      { error: "Server error", details: error },
      { status: 500 }
    );
  }
}


// getUserRole function is correctly defined and used.
async function getUserRole(userId: string): Promise<string | null> {
  try {
    const user = await users.getUser(userId);
    // ✅ Fix: Cast publicMetadata and privateMetadata to the defined interfaces
    return (
      (user.publicMetadata as UserPublicMetadata)?.role ||
      (user.privateMetadata as UserPrivateMetadata)?.role ||
      null
    );
  } catch {
    return null;
  }
}


export async function GET(req: NextRequest) {
  try {
    const { userId } = await getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = await getUserRole(userId);

    const userIsPrivileged = role === "admin" || role === "master";

    const tasks = await prisma.task.findMany({
      where: userIsPrivileged
        ? {}
        : {
          OR: [
            { createdByClerkId: userId },
            { assigneeIds: { has: userId } },
          ],
        },
      orderBy: { createdAt: "desc" },
    });


    // ✅ Collect all unique user identifiers
    const userIdentifiers = new Set<string>();
    for (const task of tasks) {
      if (task.assignerEmail) userIdentifiers.add(task.assignerEmail);
      if (Array.isArray(task.assigneeIds)) {
        task.assigneeIds.forEach((id) => userIdentifiers.add(id));
      }
    }

    // ✅ Batch Clerk lookups (email vs ID)
    const userLookups = await Promise.all(
      Array.from(userIdentifiers).map((val) =>
        val.includes("@")
          ? users.getUserList({ emailAddress: [val] }).then((res) => res[0]).catch(() => null)
          : users.getUser(val).catch(() => null)
      )
    );

    // ✅ Build user map by ID and email
    const userMap: Record<string, { id: string; name: string; email: string }> = {};
    userLookups.forEach((u) => {
      if (u) {
        const email = u.emailAddresses?.[0]?.emailAddress || "";
        const name = `${u.firstName || ""} ${u.lastName || ""}`.trim() || u.username || "Unnamed";
        userMap[u.id] = { id: u.id, name, email };
        if (email) userMap[email] = { id: u.id, name, email };
      }
    });

    // ✅ Enrich tasks with assigner + assignees


    const enrichedTasks = tasks.map((task) => {
      const assigner = userMap[task.assignerEmail ?? ""] || {
        id: "",
        name: task.assignerName || "—",
        email: task.assignerEmail || "",
      };

      const assignees = Array.isArray(task.assigneeIds)
        ? task.assigneeIds.map((id) => {
          const u = userMap[id];
          return {
            id,
            name: u?.name || "—",
            email: u?.email || "",
          };
        })
        : [];

      return {
        ...task,
        assignerName: assigner.name,
        assignees,
      };
    });

    console.log(
      `📄 GET /api/tasks – Role: ${role || "unknown"} – fetched ${enrichedTasks.length} tasks`
    );

    return NextResponse.json({ tasks: enrichedTasks }, { status: 200 });

  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : "Unknown error";
    console.error("❌ GET /api/tasks error:", err);
    return NextResponse.json(
      { error: "Failed to fetch tasks", details: error },
      { status: 500 }
    );
  }
}


export async function OPTIONS() {
  return NextResponse.json({ ok: true });
}