// 'use server';

// import { auth, currentUser, clerkClient } from '@clerk/nextjs/server';
// import { prisma } from '../../../lib/prisma'; // adjust if needed

// export default async function DashboardPage() {
//   const { userId } = await auth();

//   if (!userId) {
//     return <div className="p-6">Please sign in to access the dashboard.</div>;
//   }

//   const user = await currentUser();
//   const role = String(user?.publicMetadata?.role || 'user');

//   // Admins see all tasks; Users see own
//   const tasks = await prisma.task.findMany({
//     where:
//       role === 'admin'
//         ? {}
//         : { OR: [{ assigneeId: userId }, { createdBy: userId }] },
//     orderBy: { createdAt: 'desc' },
//   });

//   let taskList = tasks;

//   if (role === 'admin') {
//     const userIds = [...new Set(tasks.map((t) => t.assigneeId).filter(Boolean))];
//     const usersMap: Record<string, string> = {};

//     for (const id of userIds) {
//       try {
//         const assignee = await clerkClient.users.getUser(id!); // ✅ fixed
//         usersMap[id!] =
//           assignee.firstName ||
//           assignee.username ||
//           assignee.emailAddresses[0]?.emailAddress ||
//           id;
//       } catch {
//         usersMap[id!] = id!;
//       }
//     }

//     taskList = tasks.map((task) => ({
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
//                     <span className="ml-2 italic"> | Assigned to: {task.assigneeName}</span>
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














// 'use server';

// import { auth, currentUser, clerkClient } from '@clerk/nextjs/server';
// import { prisma } from '../../../lib/prisma';
//  // Make sure this is a default export

// export default async function DashboardPage() {
//   const { userId } = await auth();

//   if (!userId) {
//     return <div className="p-6">Please sign in to access the dashboard.</div>;
//   }

//   const user = await currentUser();
//   const role = String(user?.publicMetadata?.role || 'user');

//   // ✅ Fetch tasks based on role
//   const tasks = await prisma.task.findMany({
//     where:
//       role === 'admin'
//         ? {}
//         : { OR: [{ assigneeId: userId }, { createdBy: userId }] },
//     orderBy: { createdAt: 'desc' },
//   });

//   let taskList: (typeof tasks[number] & { assigneeName?: string })[] = tasks;

//   // ✅ For admin, resolve assignee names
//   if (role === 'admin') {
//     const userIds = [...new Set(tasks.map((t) => t.assigneeId).filter(Boolean))];
//     const usersMap: Record<string, string> = {};

//     // for (const id of userIds) {
//     //   try {
//     //     const assignee = await clerkClient.users.getUser(id!);
//     //     usersMap[id!] =
//     //       assignee.firstName ||
//     //       assignee.username ||
//     //       assignee.emailAddresses[0]?.emailAddress ||
//     //       id!;
//     //   } catch {
//     //     usersMap[id!] = id!;
//     //   }
//     // }

//     for (const id of userIds) {
//   try {
//     const assignee = await clerk.users.getUser(id!);
//     usersMap[id!] =
//       assignee.firstName ?? 
//       assignee.username ?? 
//       assignee.emailAddresses[0]?.emailAddress ?? 
//       id!;
//   } catch {
//     usersMap[id!] = id!;
//   }
// }

//     // ✅ Add assigneeName to each task
//     taskList = tasks.map((task) => ({
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
//                     <span className="ml-2 italic"> | Assigned to: {task.assigneeName}</span>
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










// 'use server';

// import { auth, currentUser, clerkClient } from '@clerk/nextjs/server';
// import { prisma } from '../../../lib/prisma'; // ✅ Named import, make sure this matches your actual export

// export default async function DashboardPage() {
//   const { userId } = await auth();

//   if (!userId) {
//     return <div className="p-6">Please sign in to access the dashboard.</div>;
//   }

//   const user = await currentUser();
//   const role = String(user?.publicMetadata?.role || 'user');

//   // Admins see all tasks; Users see only their own
//   const tasks = await prisma.task.findMany({
//     where:
//       role === 'admin'
//         ? {}
//         : { OR: [{ assigneeId: userId }, { createdBy: userId }] },
//     orderBy: { createdAt: 'desc' },
//   });

//   let taskList: (typeof tasks[number] & { assigneeName?: string })[] = tasks;

//   if (role === 'admin') {
//     const userIds = [...new Set(tasks.map((t) => t.assigneeId).filter(Boolean))];
//     const usersMap: Record<string, string> = {};

//     for (const id of userIds) {
//       try {
//         const assignee = await clerkClient.users.getUser(id!); // ✅ Fixed usage
//         usersMap[id!] =
//           assignee.firstName ||
//           assignee.username ||
//           assignee.emailAddresses[0]?.emailAddress ||
//           id;
//       } catch {
//         usersMap[id!] = id!;
//       }
//     }

//     taskList = tasks.map((task) => ({
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
//                     <span className="ml-2 italic"> | Assigned to: {task.assigneeName}</span>
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











// 'use server';

// import { auth, currentUser } from '@clerk/nextjs/server';
// import clerk from '@clerk/clerk-sdk-node';
// import { prisma } from '../../../lib/prisma';

// // ✅ Extended type for admin task rendering
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

//   let taskList: ExtendedTask[] = tasks;

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

//     taskList = tasks.map((task) => ({
//       ...task,
//       assigneeName: task.assigneeId ? usersMap[task.assigneeId] : 'Unassigned',
//     })) as ExtendedTask[];
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
//                   {role === 'admin' && (task as ExtendedTask).assigneeName && (
//                     <span className="ml-2 italic">
//                       | Assigned to: {(task as ExtendedTask).assigneeName}
//                     </span>
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





'use server';

import { auth, currentUser } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/clerk-sdk-node'// ✅ correct import
import { prisma } from '../../../lib/prisma';

type ExtendedTask = {
  id: string;
  title: string;
  status: string;
  dueDate: string | null;
  assigneeId?: string | null;
  createdBy?: string;
  createdAt: Date;
  assigneeName?: string;
};

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    return <div className="p-6">Please sign in to access the dashboard.</div>;
  }

  const user = await currentUser();
  const role = String(user?.publicMetadata?.role || 'user');

  const tasks = await prisma.task.findMany({
    where:
      role === 'admin'
        ? {}
        : {
            OR: [{ assigneeId: userId }, { createdBy: userId }],
          },
    orderBy: { createdAt: 'desc' },
  });

  let taskList: ExtendedTask[] = tasks.map((task) => ({
    ...task,
    dueDate: task.dueDate ? task.dueDate.toISOString() : null,
  }));

  if (role === 'admin') {
    const userIds = [...new Set(tasks.map((t) => t.assigneeId).filter(Boolean))];
    const usersMap: Record<string, string> = {};

    for (const id of userIds) {
      try {
        const assignee = await clerkClient.users.getUser(id!); // ✅ fixed usage
        usersMap[id!] =
          assignee.firstName ??
          assignee.username ??
          assignee.emailAddresses[0]?.emailAddress ??
          id!;
      } catch {
        usersMap[id!] = id!;
      }
    }

    taskList = taskList.map((task) => ({
      ...task,
      assigneeName: task.assigneeId ? usersMap[task.assigneeId] : 'Unassigned',
    }));
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">
        Welcome, {user?.firstName} ({role})
      </h1>

      <p className="text-gray-600 mb-4">
        Your email: {user?.emailAddresses[0]?.emailAddress}
      </p>

      {role === 'admin' ? (
        <div className="mt-4 p-4 bg-blue-100 border border-blue-300 rounded">
          🔥 <strong>Admin Board:</strong> View & manage all tasks
        </div>
      ) : (
        <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded">
          👤 <strong>User Board:</strong> View your personal tasks
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">🗂️ Tasks</h2>
        {taskList.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <ul className="space-y-3">
            {taskList.map((task) => (
              <li key={task.id} className="p-4 border rounded bg-white">
                <div className="flex justify-between items-center">
                  <strong>{task.title}</strong>
                  <span className="text-sm text-gray-500">{task.status}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
                  {role === 'admin' && task.assigneeName && (
                    <span className="ml-2 italic">| Assigned to: {task.assigneeName}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
