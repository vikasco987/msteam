










// "use client";

// import React from "react";
// import { Task } from "@/types/task"; // adjust path as needed

// interface Props {
//   tasks: Task[];
// }

// export default function TaskTableView({ tasks }: Props) {
//   return (
//     <div className="overflow-auto rounded-lg border border-gray-200 shadow mt-6">
//       <table className="min-w-full bg-white divide-y divide-gray-200 text-sm text-gray-800">
//         <thead className="bg-purple-100 text-purple-700 font-semibold text-left">
//           <tr>
//             <th className="px-4 py-3">Title</th>
//             <th className="px-4 py-3">Assignee</th>
//             <th className="px-4 py-3">Priority</th>
//             <th className="px-4 py-3">Due Date</th>
//             <th className="px-4 py-3">Status</th>
//             <th className="px-4 py-3">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tasks.length === 0 ? (
//             <tr>
//               <td colSpan={6} className="text-center px-4 py-6 text-gray-500">
//                 No tasks found.
//               </td>
//             </tr>
//           ) : (
//             tasks.map((task) => (
//               <tr key={task.id} className="hover:bg-gray-50 transition">
//                 <td className="px-4 py-3">{task.title}</td>
//                 <td className="px-4 py-3">{task.assignee?.name || "—"}</td>
//                 <td className="px-4 py-3 capitalize">{task.priority || "—"}</td>
//                 <td className="px-4 py-3">
//                   {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "—"}
//                 </td>
//                 <td className="px-4 py-3 capitalize">{task.status || "Pending"}</td>
//                 <td className="px-4 py-3">
//                   <button className="text-blue-600 hover:underline mr-2">Edit</button>
//                   {/* <button className="text-red-600 hover:underline">Delete</button> */}
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }








"use client";

import React from "react";
import { Task } from "@/types/task"; // Adjust path as needed

interface Props {
  tasks: Task[];
}

export default function TaskTableView({ tasks }: Props) {
  return (
    <div className="overflow-auto rounded-lg border border-gray-200 shadow mt-6">
      <table className="min-w-full bg-white divide-y divide-gray-200 text-sm text-gray-800">
        <thead className="bg-purple-100 text-purple-700 font-semibold text-left">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Assignee</th>
            <th className="px-4 py-3">🏪 Shop Name</th>
            <th className="px-4 py-3">📍 Location</th>
            <th className="px-4 py-3">📞 Phone</th>
            <th className="px-4 py-3">📧 Email</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center px-4 py-6 text-gray-500">
                No tasks found.
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3">{task.title}</td>
                <td className="px-4 py-3">{task.assignee?.name || "—"}</td>
                <td className="px-4 py-3">{task.customFields?.shopName || "—"}</td>
                {/* <td className="px-4 py-3">{task.customFields?.location || "—"}</td> */}

                <td className="px-4 py-3">
  {task.customFields?.location ? (
    <a
      href={task.customFields.location}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline hover:text-blue-800"
    >
      View
    </a>
  ) : (
    "—"
  )}
</td>

                <td className="px-4 py-3">{task.customFields?.phone || "—"}</td>
                <td className="px-4 py-3">{task.customFields?.email || "—"}</td>
                <td className="px-4 py-3 capitalize">{task.status || "Pending"}</td>
                <td className="px-4 py-3">
                  <button className="text-blue-600 hover:underline mr-2">Edit</button>
                    {/* <button className="text-red-600 hover:underline">Delete</button>
                    </td>  */}
                    </td> 
                </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
