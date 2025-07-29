// pages/api/tasks/[id]/payments/route.ts (or payments.ts)

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import cloudinary from "cloudinary";
import { Readable } from "stream";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

function getUserDetails(req: NextRequest) {
  const { userId, sessionClaims } = getAuth(req);
  if (!userId) return { error: "Unauthorized" };
  const userEmail = sessionClaims?.email as string || "Unknown User";
  const userName = sessionClaims?.firstName as string || "Unknown User";
  return { userId, userEmail, userName };
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = getUserDetails(req);
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: 401 });
  const { userEmail, userName } = auth;

  const taskId = params.id;

  try {
    const formData = await req.formData();
    const amountStr = formData.get("amount") as string;
    const receivedStr = formData.get("received") as string;
    const file = formData.get("file") as File;

    const newAmount = amountStr ? parseFloat(amountStr) : undefined;
    const newReceived = receivedStr ? parseFloat(receivedStr) : undefined;

    const existingTask = await prisma.task.findUnique({
      where: { id: taskId },
      select: { amount: true, received: true, paymentProofs: true, paymentHistory: true },
    });

    if (!existingTask) return NextResponse.json({ error: "Task not found" }, { status: 404 });

    let uploadedFileUrl: string | undefined;

    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadRes = await new Promise<cloudinary.UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { resource_type: "auto", folder: "payment_proofs" },
          (err, result) => {
            if (err) return reject(err);
            resolve(result);
          }
        );
        Readable.from(buffer).pipe(uploadStream);
      });

      uploadedFileUrl = uploadRes.secure_url;
    }

    const currentAmount = existingTask.amount || 0;
    const currentReceived = existingTask.received || 0;
    let updatedAmountToSave = !isNaN(newAmount!) ? newAmount! : currentAmount;
    let updatedReceivedToSave = !isNaN(newReceived!) ? newReceived! : currentReceived;
    if (updatedReceivedToSave > updatedAmountToSave) updatedReceivedToSave = updatedAmountToSave;

    const updateData: any = { updatedAt: new Date() };
    if (!isNaN(newAmount!)) updateData.amount = newAmount;
    if (!isNaN(newReceived!)) updateData.received = newReceived;
    if (uploadedFileUrl) {
      updateData.paymentProofs = { push: uploadedFileUrl };
    }

    const paymentEntry = {
      amount: updatedAmountToSave,
      received: updatedReceivedToSave,
      fileUrl: uploadedFileUrl || null,
      updatedAt: new Date(),
      updatedBy: userName || userEmail,
    };

    const existingHistory = Array.isArray(existingTask.paymentHistory) ? existingTask.paymentHistory : [];
    updateData.paymentHistory = [...existingHistory, paymentEntry];

    const updatedTask = await prisma.task.update({ where: { id: taskId }, data: updateData });
    return NextResponse.json({ success: true, task: updatedTask, fileUrl: uploadedFileUrl });
  } catch (err) {
    console.error("Payment Upload Error (POST):", err);
    return NextResponse.json({ error: "Upload failed", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = getUserDetails(req);
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: 401 });
  const { userEmail, userName } = auth;
  const taskId = params.id;

  try {
    const { amount, received } = await req.json();
    const newAmount = typeof amount === 'number' ? amount : undefined;
    const newReceived = typeof received === 'number' ? received : undefined;

    const existingTask = await prisma.task.findUnique({
      where: { id: taskId },
      select: { amount: true, received: true, paymentHistory: true },
    });
    if (!existingTask) return NextResponse.json({ error: "Task not found" }, { status: 404 });

    const currentAmount = existingTask.amount || 0;
    const currentReceived = existingTask.received || 0;
    let updatedAmountToSave = newAmount !== undefined ? newAmount : currentAmount;
    let updatedReceivedToSave = newReceived !== undefined ? newReceived : currentReceived;
    if (updatedReceivedToSave > updatedAmountToSave) updatedReceivedToSave = updatedAmountToSave;

    const updateData: any = { updatedAt: new Date() };
    if (newAmount !== undefined) updateData.amount = newAmount;
    if (newReceived !== undefined) updateData.received = newReceived;

    const paymentEntry = {
      amount: updatedAmountToSave,
      received: updatedReceivedToSave,
      fileUrl: null,
      updatedAt: new Date(),
      updatedBy: userName || userEmail,
    };

    const existingHistory = Array.isArray(existingTask.paymentHistory) ? existingTask.paymentHistory : [];
    updateData.paymentHistory = [...existingHistory, paymentEntry];

    const updatedTask = await prisma.task.update({ where: { id: taskId }, data: updateData });
    return NextResponse.json({ success: true, task: updatedTask });
  } catch (err) {
    console.error("Payment Update Error (PATCH):", err);
    return NextResponse.json({ error: "Update failed", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
