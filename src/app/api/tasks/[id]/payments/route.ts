// // FILE: src/app/api/tasks/[id]/payments/route.ts

// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "../../../../../../lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";
// import cloudinary from "cloudinary";
// import { Readable } from "stream";
// import { Prisma } from "@prisma/client"; // Import Prisma for JsonValue

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//   api_key: process.env.CLOUDINARY_API_KEY!,
//   api_secret: process.env.CLOUDINARY_API_SECRET!,
// });

// // Define a type for the payment history entry
// interface PaymentHistoryEntry {
//   amount: number;
//   received: number;
//   fileUrl: string | null;
//   updatedAt: Date;
//   updatedBy: string;
// }

// // Define the structure of the Task object as returned by Prisma,
// // focusing on the fields accessed in this route.
// // Adjust this to match your actual Prisma Task model if needed.
// interface TaskWithPaymentInfo {
//   id: string; // Assuming id exists
//   amount: number | null;
//   received: number | null;
//   paymentProofs: Prisma.JsonValue; // Assuming paymentProofs is Json or Json[]
//   paymentHistory: Prisma.JsonValue; // Assuming paymentHistory is Json or Json[]
//   // Add other fields that might be present on your Task model if they are relevant
//   // e.g., title: string;
// }

// function getUserDetails(req: NextRequest) {
//   const { userId, sessionClaims } = getAuth(req);
//   if (!userId) return { error: "Unauthorized" };
//   const userEmail = (sessionClaims?.email as string) || "Unknown User";
//   const userName = (sessionClaims?.firstName as string) || "Unknown User";
//   return { userId, userEmail, userName };
// }

// export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
//   const auth = getUserDetails(req);
//   if (auth.error) return NextResponse.json({ error: auth.error }, { status: 401 });
//   const { userEmail, userName } = auth;

//   const taskId = params.id;

//   try {
//     const formData = await req.formData();
//     const amountStr = formData.get("amount") as string;
//     const receivedStr = formData.get("received") as string;
//     const file = formData.get("file") as File;

//     const newAmount = amountStr ? parseFloat(amountStr) : undefined;
//     const newReceived = receivedStr ? parseFloat(receivedStr) : undefined;

//     // Type the result of findUnique
//     const existingTask: TaskWithPaymentInfo | null = await prisma.task.findUnique({
//       where: { id: taskId },
//       select: { amount: true, received: true, paymentProofs: true, paymentHistory: true },
//     });

//     if (!existingTask) return NextResponse.json({ error: "Task not found" }, { status: 404 });

//     let uploadedFileUrl: string | undefined;

//     if (file && file.size > 0) {
//       const arrayBuffer = await file.arrayBuffer();
//       const buffer = Buffer.from(arrayBuffer);

//       const uploadRes = await new Promise<cloudinary.UploadApiResponse>((resolve, reject) => {
//         const uploadStream = cloudinary.v2.uploader.upload_stream(
//           { resource_type: "auto", folder: "payment_proofs" },
//           (err, result) => {
//             if (err) return reject(err);
//             resolve(result);
//           }
//         );
//         Readable.from(buffer).pipe(uploadStream);
//       });

//       uploadedFileUrl = uploadRes.secure_url;
//     }

//     const currentAmount = existingTask.amount || 0;
//     const currentReceived = existingTask.received || 0;

//     // The line corresponding to the fix request for 'updatedAmountToSave' in POST
//     // This was already 'const', but keeping it for context if the line number was misaligned
//     const updatedAmountToSave = !isNaN(newAmount!) ? newAmount! : currentAmount;
//     let updatedReceivedToSave = !isNaN(newReceived!) ? newReceived! : currentReceived; // This can remain 'let' if it's conditionally modified below
//     if (updatedReceivedToSave > updatedAmountToSave) updatedReceivedToSave = updatedAmountToSave;

//     // FIX (Line 72 equivalent, from previous fix): Replaced 'any' with 'Prisma.TaskUpdateInput'
//     const updateData: Prisma.TaskUpdateInput = { updatedAt: new Date() };
//     if (!isNaN(newAmount!)) updateData.amount = newAmount;
//     if (!isNaN(newReceived!)) updateData.received = newReceived;

//     if (uploadedFileUrl) {
//       // Ensure paymentProofs is an array before pushing
//       const currentPaymentProofs = Array.isArray(existingTask.paymentProofs)
//         ? (existingTask.paymentProofs as string[]) // Cast to string[] assuming it stores URLs
//         : [];
//       updateData.paymentProofs = [...currentPaymentProofs, uploadedFileUrl];
//     }

//     // FIX: Typed paymentEntry
//     const paymentEntry: PaymentHistoryEntry = {
//       amount: updatedAmountToSave,
//       received: updatedReceivedToSave,
//       fileUrl: uploadedFileUrl || null,
//       updatedAt: new Date(),
//       updatedBy: userName || userEmail,
//     };

//     // Safely cast existingTask.paymentHistory to an array of PaymentHistoryEntry
//     const existingHistory = Array.isArray(existingTask.paymentHistory)
//       ? (existingTask.paymentHistory as PaymentHistoryEntry[])
//       : [];
//     updateData.paymentHistory = [...existingHistory, paymentEntry] as Prisma.InputJsonValue;

//     const updatedTask = await prisma.task.update({ where: { id: taskId }, data: updateData });
//     return NextResponse.json({ success: true, task: updatedTask, fileUrl: uploadedFileUrl });
//   } catch (err: unknown) { // FIX: Changed 'any' to 'unknown' for error handling
//     console.error("Payment Upload Error (POST):", err);
//     return NextResponse.json({ error: "Upload failed", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
//   }
// }

// export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
//   const auth = getUserDetails(req);
//   if (auth.error) return NextResponse.json({ error: auth.error }, { status: 401 });
//   const { userEmail, userName } = auth;
//   const taskId = params.id;

//   try {
//     const { amount, received } = await req.json();
//     const newAmount = typeof amount === 'number' ? amount : undefined;
//     const newReceived = typeof received === 'number' ? received : undefined;

//     const existingTask: Pick<TaskWithPaymentInfo, 'amount' | 'received' | 'paymentHistory'> | null = await prisma.task.findUnique({
//       where: { id: taskId },
//       select: { amount: true, received: true, paymentHistory: true },
//     });
//     if (!existingTask) return NextResponse.json({ error: "Task not found" }, { status: 404 });

//     const currentAmount = existingTask.amount || 0;
//     const currentReceived = existingTask.received || 0;

//     // FIX (Line 153 equivalent, assuming the request referred to this line in PATCH)
//     // Changed 'let' to 'const' as 'updatedAmountToSave' is not reassigned after its initial assignment.
//     const updatedAmountToSave = newAmount !== undefined ? newAmount : currentAmount;
//     let updatedReceivedToSave = newReceived !== undefined ? newReceived : currentReceived; // This can remain 'let' as it is conditionally modified below
//     if (updatedReceivedToSave > updatedAmountToSave) updatedReceivedToSave = updatedAmountToSave;

//     // FIX (Line 121 equivalent, from previous fix): Replaced 'any' with 'Prisma.TaskUpdateInput'
//     const updateData: Prisma.TaskUpdateInput = { updatedAt: new Date() };
//     if (newAmount !== undefined) updateData.amount = newAmount;
//     if (newReceived !== undefined) updateData.received = newReceived;

//     // FIX: Typed paymentEntry
//     const paymentEntry: PaymentHistoryEntry = {
//       amount: updatedAmountToSave,
//       received: updatedReceivedToSave,
//       fileUrl: null, // No file for PATCH
//       updatedAt: new Date(),
//       updatedBy: userName || userEmail,
//     };

//     const existingHistory = Array.isArray(existingTask.paymentHistory)
//       ? (existingTask.paymentHistory as PaymentHistoryEntry[])
//       : [];
//     updateData.paymentHistory = [...existingHistory, paymentEntry] as Prisma.InputJsonValue;

//     const updatedTask = await prisma.task.update({ where: { id: taskId }, data: updateData });
//     return NextResponse.json({ success: true, task: updatedTask });
//   } catch (err: unknown) { // FIX: Changed 'any' to 'unknown' for error handling
//     console.error("Payment Update Error (PATCH):", err);
//     return NextResponse.json({ error: "Update failed", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
//   }
// }












import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import cloudinary from "cloudinary";
import { Readable } from "stream";
import { Prisma } from "@prisma/client";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

interface PaymentHistoryEntry {
  amount: number;
  received: number;
  fileUrl: string | null;
  updatedAt: Date;
  updatedBy: string;
}

interface TaskWithPaymentInfo {
  id: string;
  amount: number | null;
  received: number | null;
  paymentProofs: Prisma.JsonValue;
  paymentHistory: Prisma.JsonValue;
  parentTaskId?: string | null;
}

function getUserDetails(req: NextRequest) {
  const { userId, sessionClaims } = getAuth(req);
  if (!userId) return { error: "Unauthorized" };
  const userEmail = (sessionClaims?.email as string) || "Unknown User";
  const userName = (sessionClaims?.firstName as string) || "Unknown User";
  return { userId, userEmail, userName };
}

async function getEffectiveTaskId(taskId: string): Promise<string> {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    select: { parentTaskId: true },
  });
  return task?.parentTaskId || taskId;
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = getUserDetails(req);
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: 401 });
  const { userEmail, userName } = auth;

  const originalTaskId = await getEffectiveTaskId(params.id);

  try {
    const formData = await req.formData();
    const amountStr = formData.get("amount") as string;
    const receivedStr = formData.get("received") as string;
    const file = formData.get("file") as File;

    const newAmount = amountStr ? parseFloat(amountStr) : undefined;
    const newReceived = receivedStr ? parseFloat(receivedStr) : undefined;

    const existingTask = await prisma.task.findUnique({
      where: { id: originalTaskId },
      select: { amount: true, received: true, paymentProofs: true, paymentHistory: true },
    });
    if (!existingTask) return NextResponse.json({ error: "Task not found" }, { status: 404 });

    // ✅ lock amount if already set
    if (existingTask.amount !== null && newAmount !== undefined) {
      return NextResponse.json({ error: "Amount is locked and cannot be updated." }, { status: 400 });
    }

    // ✅ lock received if already set
    // if (existingTask.received !== null && newReceived !== undefined) {
    //   return NextResponse.json({ error: "Initial received is locked. Use PATCH to add remaining received." }, { status: 400 });
    // }
    // ✅ allow cumulative received updates
let updatedReceived = existingTask.received ?? 0;
if (newReceived !== undefined) {
  if (existingTask.amount === null) {
    return NextResponse.json({ error: "Enter amount first before adding received." }, { status: 400 });
  }

  updatedReceived += newReceived;

  if (updatedReceived > existingTask.amount) {
    return NextResponse.json({ error: "Received cannot exceed total amount." }, { status: 400 });
  }
}


    let uploadedFileUrl: string | undefined;
    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadRes = await new Promise<cloudinary.UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { resource_type: "auto", folder: "payment_proofs" },
          (err, result) => {
            if (err) return reject(err);
            resolve(result!);
          }
        );
        Readable.from(buffer).pipe(uploadStream);
      });

      uploadedFileUrl = uploadRes.secure_url;
    }

    const updateData: Prisma.TaskUpdateInput = { updatedAt: new Date() };
    if (newAmount !== undefined) updateData.amount = newAmount;
    if (newReceived !== undefined) updateData.received = updatedReceived;


    if (uploadedFileUrl) {
      const currentProofs = Array.isArray(existingTask.paymentProofs)
        ? (existingTask.paymentProofs as string[])
        : [];
      updateData.paymentProofs = [...currentProofs, uploadedFileUrl];
    }

    const existingHistory = Array.isArray(existingTask.paymentHistory)
      ? (existingTask.paymentHistory as PaymentHistoryEntry[])
      : [];

    updateData.paymentHistory = [
      ...existingHistory,
      {
        amount: newAmount ?? existingTask.amount ?? 0,
        received: newReceived ?? existingTask.received ?? 0,
        fileUrl: uploadedFileUrl || null,
        updatedAt: new Date(),
        updatedBy: userName || userEmail,
      },
    ] as Prisma.InputJsonValue;

    const updatedTask = await prisma.task.update({
      where: { id: originalTaskId },
      data: updateData,
    });

    return NextResponse.json({ success: true, task: updatedTask, fileUrl: uploadedFileUrl });
  } catch (err: unknown) {
    console.error("Payment Upload Error (POST):", err);
    return NextResponse.json(
      { error: "Upload failed", details: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}




// PATCH /api/payments/:taskId
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = getUserDetails(req);
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: 401 });
  const { userEmail, userName } = auth;

  const originalTaskId = await getEffectiveTaskId(params.id);

  try {
    const body = await req.json();
    const received = body.received ? Number(body.received) : 0;

    const task = await prisma.task.findUnique({
      where: { id: originalTaskId },
      select: { amount: true, received: true, paymentHistory: true },
    });
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    if (!task.amount) {
      return NextResponse.json({ error: "Amount must be set before adding received" }, { status: 400 });
    }

    const currentReceived = task.received || 0;
    const updatedReceived = currentReceived + received;

    if (updatedReceived > task.amount) {
      return NextResponse.json({ error: "Received cannot exceed amount" }, { status: 400 });
    }

    const existingHistory = Array.isArray(task.paymentHistory)
      ? (task.paymentHistory as PaymentHistoryEntry[])
      : [];

    const updatedTask = await prisma.task.update({
      where: { id: originalTaskId },
      data: {
        received: updatedReceived,
        paymentHistory: [
          ...existingHistory,
          {
            amount: task.amount,
            received,
            fileUrl: null,
            updatedAt: new Date(),
            updatedBy: userName || userEmail,
          },
        ] as Prisma.InputJsonValue,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, task: updatedTask });
  } catch (err: any) {
    console.error("Payment Update Error (PATCH):", err);
    return NextResponse.json(
      { error: "Update failed", details: err.message },
      { status: 500 }
    );
  }
}
