


// 'use server';

// import { auth, currentUser } from '@clerk/nextjs/server';
// import clerk from '@clerk/clerk-sdk-node';
// import { prisma } from '../../../lib/prisma';

// type ExtendedTask = {
//   id: string;
//   title: string;
//   status: string;
//   dueDate: string | null;
//   assigneeId?: string | null;
//   createdBy?: string;
//   createdAt: Date;
//   assigneeName?: string;
// };

// export default async function DashboardPage() {
//   const { userId } = await auth();

//   if (!userId) {
//     return <div className="p-6">Please sign in to access the dashboard.</div>;
//   }

//   const user = await currentUser();
//   const role = String(user?.publicMetadata?.role || 'user');

//   const tasks = await prisma.task.findMany({
//     where:
//       role === 'admin'
//         ? {}
//         : {
//             OR: [{ assigneeId: userId }, { createdBy: userId }],
//           },
//     orderBy: { createdAt: 'desc' },
//   });

//   let taskList: ExtendedTask[] = tasks.map((task) => ({
//     ...task,
//     dueDate: task.dueDate ? task.dueDate.toISOString() : null, // ✅ convert Date to string
//   }));

//   if (role === 'admin') {
//     const userIds = [...new Set(tasks.map((t) => t.assigneeId).filter(Boolean))];
//     const usersMap: Record<string, string> = {};

//     for (const id of userIds) {
//       try {
//         const assignee = await clerk.users.getUser(id!);
//         usersMap[id!] =
//           assignee.firstName ||
//           assignee.username ||
//           assignee.emailAddresses[0]?.emailAddress ||
//           id;
//       } catch {
//         usersMap[id!] = id!;
//       }
//     }

//     taskList = taskList.map((task) => ({
//       ...task,
//       assigneeName: task.assigneeId ? usersMap[task.assigneeId] : 'Unassigned',
//     }));
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-2">
//         Welcome, {user?.firstName} ({role})
//       </h1>

//       <p className="text-gray-600 mb-4">
//         Your email: {user?.emailAddresses[0]?.emailAddress}
//       </p>

//       {role === 'admin' ? (
//         <div className="mt-4 p-4 bg-blue-100 border border-blue-300 rounded">
//           🔥 <strong>Admin Board:</strong> View & manage all tasks
//         </div>
//       ) : (
//         <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded">
//           👤 <strong>User Board:</strong> View your personal tasks
//         </div>
//       )}

//       <div className="mt-6">
//         <h2 className="text-xl font-semibold mb-3">🗂️ Tasks</h2>
//         {taskList.length === 0 ? (
//           <p>No tasks found.</p>
//         ) : (
//           <ul className="space-y-3">
//             {taskList.map((task) => (
//               <li key={task.id} className="p-4 border rounded bg-white">
//                 <div className="flex justify-between items-center">
//                   <strong>{task.title}</strong>
//                   <span className="text-sm text-gray-500">{task.status}</span>
//                 </div>
//                 <div className="text-sm text-gray-500 mt-1">
//                   Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
//                   {role === 'admin' && task.assigneeName && (
//                     <span className="ml-2 italic">| Assigned to: {task.assigneeName}</span>
//                   )}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }



//corect

// 'use server';

// import { auth, currentUser } from '@clerk/nextjs/server';
// import { clerkClient } from '@clerk/clerk-sdk-node'// ✅ correct import
// import { prisma } from '../../../lib/prisma';

// type ExtendedTask = {
//   id: string;
//   title: string;
//   status: string;
//   dueDate: string | null;
//   assigneeId?: string | null;
//   createdBy?: string;
//   createdAt: Date;
//   assigneeName?: string;
// };

// export default async function DashboardPage() {
//   const { userId } = await auth();

//   if (!userId) {
//     return <div className="p-6">Please sign in to access the dashboard.</div>;
//   }

//   const user = await currentUser();
//   const role = String(user?.publicMetadata?.role || 'user');

//   const tasks = await prisma.task.findMany({
//     where:
//       role === 'admin'
//         ? {}
//         : {
//             OR: [{ assigneeId: userId }, { createdBy: userId }],
//           },
//     orderBy: { createdAt: 'desc' },
//   });

//   let taskList: ExtendedTask[] = tasks.map((task) => ({
//     ...task,
//     dueDate: task.dueDate ? task.dueDate.toISOString() : null,
//   }));

//   if (role === 'admin') {
//     const userIds = [...new Set(tasks.map((t) => t.assigneeId).filter(Boolean))];
//     const usersMap: Record<string, string> = {};

//     for (const id of userIds) {
//       try {
//         const assignee = await clerkClient.users.getUser(id!); // ✅ fixed usage
//         usersMap[id!] =
//           assignee.firstName ??
//           assignee.username ??
//           assignee.emailAddresses[0]?.emailAddress ??
//           id!;
//       } catch {
//         usersMap[id!] = id!;
//       }
//     }

//     taskList = taskList.map((task) => ({
//       ...task,
//       assigneeName: task.assigneeId ? usersMap[task.assigneeId] : 'Unassigned',
//     }));
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-2">
//         Welcome, {user?.firstName} ({role})
//       </h1>

//       <p className="text-gray-600 mb-4">
//         Your email: {user?.emailAddresses[0]?.emailAddress}
//       </p>

//       {role === 'admin' ? (
//         <div className="mt-4 p-4 bg-blue-100 border border-blue-300 rounded">
//           🔥 <strong>Admin Board:</strong> View & manage all tasks
//         </div>
//       ) : (
//         <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded">
//           👤 <strong>User Board:</strong> View your personal tasks
//         </div>
//       )}

//       <div className="mt-6">
//         <h2 className="text-xl font-semibold mb-3">🗂️ Tasks</h2>
//         {taskList.length === 0 ? (
//           <p>No tasks found.</p>
//         ) : (
//           <ul className="space-y-3">
//             {taskList.map((task) => (
//               <li key={task.id} className="p-4 border rounded bg-white">
//                 <div className="flex justify-between items-center">
//                   <strong>{task.title}</strong>
//                   <span className="text-sm text-gray-500">{task.status}</span>
//                 </div>
//                 <div className="text-sm text-gray-500 mt-1">
//                   Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
//                   {role === 'admin' && task.assigneeName && (
//                     <span className="ml-2 italic">| Assigned to: {task.assigneeName}</span>
//                   )}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }








// import { createClerkClient } from "@clerk/backend";
// import { NextResponse } from "next/server";

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





// // src/app/dashboard/page.tsx

// import React from "react";
// import Board from "../components/Board";
//  // adjust path if needed

// export default function DashboardPage() {
//   return (
//     <main className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
//       <Board />
//     </main>
//   );
// }








// // src/app/dashboard/page.tsx

// import React from "react";
// import Board from "../components/Board";
//  // adjust path if needed

// export default function DashboardPage() {
//   return (
//     <main className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
//       <Board />
//     </main>
//   );
// }






// src/app/dashboard/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import Board from "../components/Board";
import TaskTableView from "../components/TaskTableView"; // ✅ Adjust path if needed
import { Task } from "@/types/task"; // ✅ Ensure path is correct

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Fetch tasks from your API
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      }
    };

    fetchTasks();
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* ✅ Kanban Board */}
      <Board />

      {/* ✅ Task Table View */}
      <h2 className="text-xl font-semibold mt-8 mb-2">📋 All Tasks (Table View)</h2>
      <TaskTableView tasks={tasks} />
    </main>
  );
}
