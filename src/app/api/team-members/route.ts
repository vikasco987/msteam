// import { createClerkClient } from "@clerk/backend";
// import { NextResponse } from "next/server";
// import { clerkClient } from '@clerk/clerk-sdk-node';

// // Ensure CLERK_SECRET_KEY is loaded
// const secret = process.env.CLERK_SECRET_KEY;
// if (!secret) {
//   console.error("❌ Missing CLERK_SECRET_KEY in environment variables!");
// }
// const clerk = secret ? createClerkClient({ secretKey: secret }) : null;

// export async function GET() {
//   if (!clerk) {
//     return NextResponse.json(
//       { error: "Server misconfigured: Clerk client not initialized" },
//       { status: 500 }
//     );
//   }

//   try {
//     const users = await clerk.users.getUserList();
//     const formatted = users.map((user) => ({
//       id: user.id,
//       email: user.emailAddresses[0]?.emailAddress || "no-email",
//       name:
//         [user.firstName, user.lastName].filter(Boolean).join(" ") ||
//         user.username ||
//         "Unnamed User",
//     }));
//     return NextResponse.json(formatted);
//   } catch (err) {
//     console.error("❌ Error fetching Clerk users:", err);
//     return NextResponse.json(
//       { error: "Failed to fetch team members" },
//       { status: 500 }
//     );
//   }
// }









import { createClerkClient } from "@clerk/backend";
import { NextResponse } from "next/server";

const secret = process.env.CLERK_SECRET_KEY;
const clerk = secret ? createClerkClient({ secretKey: secret }) : null;

export async function GET() {
  if (!clerk) {
    return NextResponse.json(
      { error: "Clerk not initialized" },
      { status: 500 }
    );
  }

  try {
    // ✅ getUserList() returns { data: [...] }
    const { data: users } = await clerk.users.getUserList();

    const formatted = users.map((user) => ({
      id: user.id,
      email: user.emailAddresses?.[0]?.emailAddress || "no-email",
      name:
        [user.firstName, user.lastName].filter(Boolean).join(" ") ||
        user.username ||
        "Unnamed User",
    }));

    return NextResponse.json(formatted);
  } catch (err) {
    console.error("❌ Error fetching Clerk users:", err);
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}
