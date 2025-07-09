


// "use client";

// import React from "react";
// import { Task } from "@/types/task"; // Adjust path as needed

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
//             <th className="px-4 py-3">🏪 Shop Name</th>
//             <th className="px-4 py-3">📍 Location</th>
//             <th className="px-4 py-3">📞 Phone</th>
//             <th className="px-4 py-3">📧 Email</th>
//             <th className="px-4 py-3">Status</th>
//             <th className="px-4 py-3">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tasks.length === 0 ? (
//             <tr>
//               <td colSpan={8} className="text-center px-4 py-6 text-gray-500">
//                 No tasks found.
//               </td>
//             </tr>
//           ) : (
//             tasks.map((task) => (
//               <tr key={task.id} className="hover:bg-gray-50 transition">
//                 <td className="px-4 py-3">{task.title}</td>
//                 <td className="px-4 py-3">{task.assignee?.name || "—"}</td>
//                 <td className="px-4 py-3">{task.customFields?.shopName || "—"}</td>
//                 {/* <td className="px-4 py-3">{task.customFields?.location || "—"}</td> */}

//                 <td className="px-4 py-3">
//   {task.customFields?.location ? (
//     <a
//       href={task.customFields.location}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="text-blue-600 underline hover:text-blue-800"
//     >
//       View
//     </a>
//   ) : (
//     "—"
//   )}
// </td>

//                 <td className="px-4 py-3">{task.customFields?.phone || "—"}</td>
//                 <td className="px-4 py-3">{task.customFields?.email || "—"}</td>
//                 <td className="px-4 py-3 capitalize">{task.status || "Pending"}</td>
//                 <td className="px-4 py-3">
//                   <button className="text-blue-600 hover:underline mr-2">Edit</button>
//                     {/* <button className="text-red-600 hover:underline">Delete</button>
//                     </td>  */}
//                     </td> 
//                 </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }














// "use client";

// import React, { useState } from "react";
// import { Task } from "@/types/task"; // adjust path if needed
// import { useUser } from "@clerk/nextjs";

// interface Props {
//   tasks: Task[];
//   onUpdateTask: (id: string, field: string, value: number) => void; // Parent must handle update
// }

// export default function TaskTableView({ tasks, onUpdateTask }: Props) {
//   const { user } = useUser();
//   const [editMode, setEditMode] = useState(false);
//   const userRole = user?.publicMetadata?.role || "user"; // Default role

//   const isAdmin = userRole === "admin";

//   // Track non-admin submitted fields to prevent multiple edits
//   const [submittedFields, setSubmittedFields] = useState<{ [key: string]: boolean }>({});

//   const handleFieldChange = (
//     taskId: string,
//     field: "amount" | "amountReceived",
//     value: number
//   ) => {
//     const key = `${taskId}-${field}`;
//     if (!isAdmin && submittedFields[key]) return;

//     onUpdateTask(taskId, field, value);

//     if (!isAdmin) {
//       setSubmittedFields((prev) => ({ ...prev, [key]: true }));
//     }
//   };

//   return (
//     <div className="overflow-auto rounded-lg border border-gray-200 shadow mt-6">
//       <div className="flex justify-between items-center p-4">
//         <h2 className="text-lg font-bold text-gray-700">Task Table</h2>
//         <button
//           className="px-4 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
//           onClick={() => setEditMode((prev) => !prev)}
//         >
//           {editMode ? "Switch to View Mode" : "Switch to Edit Mode"}
//         </button>
//       </div>
//       <table className="min-w-full bg-white divide-y divide-gray-200 text-sm text-gray-800">
//         <thead className="bg-purple-100 text-purple-700 font-semibold text-left">
//           <tr>
//             <th className="px-4 py-3">Title</th>
//             <th className="px-4 py-3">Assignee</th>
//             <th className="px-4 py-3">🏪 Shop Name</th>
//             <th className="px-4 py-3">📍 Location</th>
//             <th className="px-4 py-3">📞 Phone</th>
//             <th className="px-4 py-3">📧 Email</th>
//             <th className="px-4 py-3">🧾 Amount</th>
//             <th className="px-4 py-3">✅ Received</th>
//             <th className="px-4 py-3">⏳ Pending</th>
//             <th className="px-4 py-3">Status</th>
//             <th className="px-4 py-3">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tasks.length === 0 ? (
//             <tr>
//               <td colSpan={11} className="text-center px-4 py-6 text-gray-500">
//                 No tasks found.
//               </td>
//             </tr>
//           ) : (
//             tasks.map((task) => {
//               const amount = task.customFields?.amount || 0;
//               const received = task.customFields?.amountReceived || 0;
//               const pending = amount - received;

//               return (
//                 <tr key={task.id} className="hover:bg-gray-50 transition">
//                   <td className="px-4 py-3">{task.title}</td>
//                   <td className="px-4 py-3">{task.assignee?.name || "—"}</td>
//                   <td className="px-4 py-3">{task.customFields?.shopName || "—"}</td>
//                   <td className="px-4 py-3">
//                     {task.customFields?.location ? (
//                       <a
//                         href={task.customFields.location}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-600 underline hover:text-blue-800"
//                       >
//                         View
//                       </a>
//                     ) : (
//                       "—"
//                     )}
//                   </td>
//                   <td className="px-4 py-3">{task.customFields?.phone || "—"}</td>
//                   <td className="px-4 py-3">{task.customFields?.email || "—"}</td>

//                   <td className="px-4 py-3">
//                     {editMode ? (
//                       <input
//                         type="number"
//                         className="w-20 px-2 py-1 border rounded"
//                         defaultValue={amount}
//                         onBlur={(e) =>
//                           handleFieldChange(task.id, "amount", Number(e.target.value))
//                         }
//                         disabled={!isAdmin && submittedFields[`${task.id}-amount`]}
//                       />
//                     ) : (
//                       amount
//                     )}
//                   </td>

//                   <td className="px-4 py-3">
//                     {editMode ? (
//                       <input
//                         type="number"
//                         className="w-20 px-2 py-1 border rounded"
//                         defaultValue={received}
//                         onBlur={(e) =>
//                           handleFieldChange(task.id, "amountReceived", Number(e.target.value))
//                         }
//                         disabled={!isAdmin && submittedFields[`${task.id}-amountReceived`]}
//                       />
//                     ) : (
//                       received
//                     )}
//                   </td>

//                   <td className="px-4 py-3 text-red-600 font-semibold">
//                     {pending}
//                   </td>

//                   <td className="px-4 py-3 capitalize">{task.status || "Pending"}</td>

//                   <td className="px-4 py-3">
//                     <button className="text-blue-600 hover:underline mr-2">Edit</button>
//                   </td>
//                 </tr>
//               );
//             })
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }




// // TaskTableView.tsx
// "use client";

// import React, { useState, useEffect } from "react";
// import { Task } from "@/types/task";
// import { useUser } from "@clerk/nextjs";
// import { format } from "date-fns";

// interface Props {
//   tasks: Task[];
// }

// export default function TaskTableView({ tasks }: Props) {
//   const { user } = useUser();
//   const [editMode, setEditMode] = useState(false);
//   const [editedValues, setEditedValues] = useState<{ [key: string]: number }>({});
//   const [localTasks, setLocalTasks] = useState<Task[]>(tasks || []);

//   useEffect(() => {
//     setLocalTasks(tasks || []);
//   }, [tasks]);

//   const handleInputChange = (
//     taskId: string,
//     field: "amount" | "amountReceived",
//     value: number
//   ) => {
//     const key = `${taskId}-${field}`;
//     setEditedValues((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleBlur = async (taskId: string, field: "amount" | "amountReceived") => {
//     const key = `${taskId}-${field}`;
//     const value = editedValues[key];

//     if (typeof value === "number" && !isNaN(value)) {
//       try {
//         const res = await fetch("/api/tasks/update", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ taskId, field, value }),
//         });

//         const data = await res.json();

//         if (!res.ok) {
//           alert(data.error || "Failed to update");
//         } else {
//           setLocalTasks((prev) =>
//             prev.map((t) =>
//               t.id === taskId
//                 ? {
//                     ...t,
//                     customFields: {
//                       ...t.customFields,
//                       [field]: value,
//                     },
//                   }
//                 : t
//             )
//           );
//         }
//       } catch (err) {
//         console.error("❌ Error:", err);
//       }
//     }
//   };

//   return (
//     <div className="overflow-auto rounded-lg border border-gray-200 shadow mt-6">
//       <div className="flex justify-between items-center p-4">
//         <h2 className="text-lg font-bold text-gray-700">Task Table</h2>
//         <button
//           className="px-4 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
//           onClick={() => setEditMode((prev) => !prev)}
//         >
//           {editMode ? "Switch to View Mode" : "Switch to Edit Mode"}
//         </button>
//       </div>

//       <table className="min-w-full bg-white divide-y divide-gray-200 text-sm text-gray-800">
//         <thead className="bg-purple-100 text-purple-700 font-semibold text-left">
//           <tr>
//             <th className="px-4 py-3">Title</th>
//             <th className="px-4 py-3">📅 Created</th>
//             <th className="px-4 py-3">Assignee</th>
//             <th className="px-4 py-3">🏪 Shop Name</th>
//             <th className="px-4 py-3">📍 Location</th>
//             <th className="px-4 py-3">📞 Phone</th>
//             <th className="px-4 py-3">📧 Email</th>
//             <th className="px-4 py-3">⏳ Pending</th>
//             <th className="px-4 py-3">🧾 Amount</th>
//             <th className="px-4 py-3">✅ Received</th>
//             <th className="px-4 py-3">Status</th>
//             <th className="px-4 py-3">Assigned By → To</th>
//             <th className="px-4 py-3">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {Array.isArray(localTasks) && localTasks.length > 0 ? (
//             localTasks.map((task) => {
//               const amount = task.customFields?.amount || 0;
//               const received = task.customFields?.amountReceived || 0;
//               const pending = amount - received;

//               return (
//                 <tr key={task.id} className="hover:bg-gray-50 transition">
//                   <td className="px-4 py-3 font-medium text-gray-800">{task.title}</td>
//                   <td className="px-4 py-3 text-gray-500">{format(new Date(task.createdAt), "dd MMM yyyy")}</td>
//                   <td className="px-4 py-3">{task.assignee?.name || "—"}</td>
//                   <td className="px-4 py-3">{task.customFields?.shopName || "—"}</td>
//                   <td className="px-4 py-3">
//                     {task.customFields?.location ? (
//                       <a
//                         href={task.customFields.location}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-600 underline hover:text-blue-800"
//                       >
//                         View
//                       </a>
//                     ) : (
//                       "—"
//                     )}
//                   </td>
//                   <td className="px-4 py-3">{task.customFields?.phone || "—"}</td>
//                   <td className="px-4 py-3">{task.customFields?.email || "—"}</td>
//                   <td className="px-4 py-3 text-red-600 font-semibold">{pending}</td>
//                   <td className="px-4 py-3">
//                     {editMode ? (
//                       <input
//                         type="number"
//                         className="w-20 px-2 py-1 border rounded"
//                         value={editedValues[`${task.id}-amount`] ?? amount}
//                         onChange={(e) =>
//                           handleInputChange(task.id, "amount", Number(e.target.value))
//                         }
//                         onBlur={() => handleBlur(task.id, "amount")}
//                       />
//                     ) : (
//                       amount
//                     )}
//                   </td>
//                   <td className="px-4 py-3">
//                     {editMode ? (
//                       <input
//                         type="number"
//                         className="w-20 px-2 py-1 border rounded"
//                         value={editedValues[`${task.id}-amountReceived`] ?? received}
//                         onChange={(e) =>
//                           handleInputChange(task.id, "amountReceived", Number(e.target.value))
//                         }
//                         onBlur={() => handleBlur(task.id, "amountReceived")}
//                       />
//                     ) : (
//                       received
//                     )}
//                   </td>
//                   <td className="px-4 py-3 capitalize">{task.status || "Pending"}</td>
//                   <td className="px-4 py-3">
//                     {task.assignerName || "—"} → {task.assignee?.name || "—"}
//                   </td>
//                   <td className="px-4 py-3">
//                     <button className="text-blue-600 hover:underline">Edit</button>
//                   </td>
//                 </tr>
//               );
//             })
//           ) : (
//             <tr>
//               <td colSpan={13} className="text-center px-4 py-6 text-gray-500">
//                 No tasks found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }
























// //correct code





// "use client";

// import React, { useState, useEffect } from "react";
// import { Task } from "@/types/task";
// import { useUser } from "@clerk/nextjs";
// import { format } from "date-fns";


// import {
//   ALL_COLUMNS,
//   useFilteredSortedTasks,
//   exportTasksToCSV,
//   getStatusColor,
//   getAmountColor,
// } from "../../utils/reportTableFeatures";


// interface Props {
//   tasks: Task[];
// }

// export default function TaskTableView({ tasks }: Props) {
//   const { user } = useUser();
//   const [editMode, setEditMode] = useState(false);
//   const [editedValues, setEditedValues] = useState<{ [key: string]: number }>({});
//   const [localTasks, setLocalTasks] = useState<Task[]>(tasks || []);

//   // useEffect(() => {
//   //   setLocalTasks(tasks || []);
//   // }, [tasks]);


//   useEffect(() => {
//   if (Array.isArray(tasks)) {
//     setLocalTasks(tasks);
//   } else {
//     console.warn("⚠️ Invalid task data received:", tasks);
//     setLocalTasks([]);
//   }
// }, [tasks]);

//   const handleInputChange = (
//     taskId: string,
//     field: "amount" | "amountReceived",
//     value: number
//   ) => {
//     const key = `${taskId}-${field}`;
//     setEditedValues((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleBlur = async (
//     taskId: string,
//     field: "amount" | "amountReceived"
//   ) => {
//     const key = `${taskId}-${field}`;
//     const value = editedValues[key];

//     if (typeof value === "number" && !isNaN(value)) {
//       try {
//         const res = await fetch("/api/tasks/update", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ taskId, field, value }),
//         });

//         const data = await res.json();

//         if (!res.ok) {
//           alert(data.error || "Failed to update");
//         } else {
//           setLocalTasks((prev) =>
//             prev.map((t) =>
//               t.id === taskId
//                 ? {
//                     ...t,
//                     customFields: {
//                       ...t.customFields,
//                       [field]: value,
//                     },
//                   }
//                 : t
//             )
//           );
//         }
//       } catch (err) {
//         console.error("❌ Error:", err);
//       }
//     }
//   };

//   return (
//     <div className="overflow-auto rounded-lg border border-gray-200 shadow mt-6">
//       <div className="flex justify-between items-center p-4">
//         <h2 className="text-lg font-bold text-gray-700">Task Table</h2>
//         <button
//           className="px-4 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
//           onClick={() => setEditMode((prev) => !prev)}
//         >
//           {editMode ? "Switch to View Mode" : "Switch to Edit Mode"}
//         </button>
//       </div>
      
     
      
//     {/* ✅ Existing editable task table continues here... */}
//       <table className="min-w-full bg-white divide-y divide-gray-200 text-sm text-gray-800">
//         <thead className="bg-purple-100 text-purple-700 font-semibold text-left">
//           <tr>
//             <th className="px-4 py-3">Title</th>
//             <th className="px-4 py-3">📅 Created</th>
//             <th className="px-4 py-3">Assigned By → To</th>
//             <th className="px-4 py-3">🏪 Shop Name</th>
//             <th className="px-4 py-3">📍 Location</th>
//             <th className="px-4 py-3">📞 Phone</th>
//             <th className="px-4 py-3">📧 Email</th>
//             <th className="px-4 py-3">Status</th>
//             <th className="px-4 py-3">🧾 Amount</th>
//             <th className="px-4 py-3">✅ Received</th>
//             <th className="px-4 py-3">🧾 Pending</th>
//           </tr>
//         </thead>

//         <tbody>
//           {localTasks.length === 0 ? (
//             <tr>
//               <td colSpan={11} className="text-center px-4 py-6 text-gray-500">
//                 No tasks found.
//               </td>
//             </tr>
//           ) : (
//             localTasks.map((task) => {
//               const amount = task.customFields?.amount || 0;
//               const received = task.customFields?.amountReceived || 0;
//               const pending = amount - received;

//               return (
//                 <tr key={task.id} className="hover:bg-gray-50 transition">
//                   <td className="px-4 py-3">{task.title}</td>
//                   <td className="px-4 py-3">{format(new Date(task.createdAt), "dd MMM yyyy")}</td>
//                   {/* <td className="px-4 py-3">{task.assignerName || "—"} → {task.assignee?.name || "—"}</td> */}

//                   <td className="px-4 py-3">
//   {task.assignerName || "—"} → {task.assignee?.name ?? task.assigneeEmail ?? "—"}
// </td>


//                   <td className="px-4 py-3">{task.customFields?.shopName || "—"}</td>

//                   <td className="px-4 py-3">
//                     {task.customFields?.location ? (
//                       <a
//                         href={task.customFields.location}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-600 underline hover:text-blue-800"
//                       >
//                         View
//                       </a>
//                     ) : (
//                       "—"
//                     )}
//                   </td>



             


//                   <td className="px-4 py-3">{task.customFields?.phone || "—"}</td>
//                   <td className="px-4 py-3">{task.customFields?.email || "—"}</td>
//                   <td className="px-4 py-3 capitalize">{task.status || "Pending"}</td>

//                   <td className="px-4 py-3">
//                     {editMode ? (
//                       <input
//                         type="number"
//                         className="w-20 px-2 py-1 border rounded"
//                         value={editedValues[`${task.id}-amount`] ?? amount}
//                         onChange={(e) =>
//                           handleInputChange(task.id, "amount", Number(e.target.value))
//                         }
//                         onBlur={() => handleBlur(task.id, "amount")}
//                       />
//                     ) : (
//                       amount
//                     )}
//                   </td>




//                   <td className="px-4 py-3">
//                     {editMode ? (
//                       <input
//                         type="number"
//                         className="w-20 px-2 py-1 border rounded"
//                         value={editedValues[`${task.id}-amountReceived`] ?? received}
//                         onChange={(e) =>
//                           handleInputChange(task.id, "amountReceived", Number(e.target.value))
//                         }
//                         onBlur={() => handleBlur(task.id, "amountReceived")}
//                       />
//                     ) : (
//                       received
//                     )}
//                   </td>

//                   <td className="px-4 py-3 text-red-600 font-semibold">{pending}</td>
//                 </tr>
//               );
//             })
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }











// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import { Task } from "@/types/task";
// import { useUser } from "@clerk/nextjs";
// import { format } from "date-fns";
// import { FaDownload, FaSearch, FaEye, FaEyeSlash } from "react-icons/fa";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

// const ALL_COLUMNS = [
//   "title",
//   "status",
//   "shopName",
//   "email",
//   "phone",
//   "assignerName",
//   "assignee",
//   "createdAt",
//   "activeTab"
// ];

// interface Props {
//   tasks: Task[];
// }

// export default function TaskTableView({ tasks }: Props) {
//   const { user } = useUser();
//   const [editMode, setEditMode] = useState(false);
//   const [editedValues, setEditedValues] = useState<{ [key: string]: number }>({});
//   const [localTasks, setLocalTasks] = useState<Task[]>(tasks || []);

//   const [query, setQuery] = useState("");
//   const [sortKey, setSortKey] = useState("createdAt");
//   const [sortDir, setSortDir] = useState("desc");
//   const [columns, setColumns] = useState<string[]>(ALL_COLUMNS);
//   const [statusFilter, setStatusFilter] = useState<string | null>(null);
//   const [sourceFilter, setSourceFilter] = useState<string | null>(null);
//   const [assigneeFilter, setAssigneeFilter] = useState<string | null>(null);

//   useEffect(() => {
//     if (Array.isArray(tasks)) {
//       setLocalTasks(tasks);
//     } else {
//       console.warn("⚠️ Invalid task data received:", tasks);
//       setLocalTasks([]);
//     }
//   }, [tasks]);

//   const filtered = useMemo(() => {
//     let filtered = [...localTasks];
//     if (query) {
//       const lower = query.toLowerCase();
//       filtered = filtered.filter((t) =>
//         [
//           t.customFields?.shopName,
//           t.customFields?.email,
//           t.customFields?.phone,
//           t.assignee?.name
//         ]
//           .join(" ")
//           .toLowerCase()
//           .includes(lower)
//       );
//     }
//     if (statusFilter) {
//       filtered = filtered.filter((t) => t.status === statusFilter);
//     }
//     if (sourceFilter) {
//       filtered = filtered.filter((t) => t.activeTab === sourceFilter);
//     }
//     if (assigneeFilter) {
//       filtered = filtered.filter((t) => t.assignee?.name === assigneeFilter);
//     }
//     return filtered.sort((a, b) => {
//       const valA = a[sortKey as keyof Task];
//       const valB = b[sortKey as keyof Task];
//       return sortDir === "asc"
//         ? String(valA).localeCompare(String(valB))
//         : String(valB).localeCompare(String(valA));
//     });
//   }, [localTasks, query, sortKey, sortDir, statusFilter, sourceFilter, assigneeFilter]);

//   const exportCSV = () => {
//     const exportData = filtered.map((task) => ({
//       title: task.title,
//       status: task.status,
//       shopName: task.customFields?.shopName,
//       phone: task.customFields?.phone,
//       email: task.customFields?.email,
//       assignee: task.assignee?.name,
//       assigner: task.assignerName,
//       source: task.activeTab,
//       createdAt: task.createdAt
//     }));
//     const ws = XLSX.utils.json_to_sheet(exportData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Tasks");
//     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//     const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
//     saveAs(blob, `Tasks_Report_${Date.now()}.xlsx`);
//   };

//   const handleInputChange = (
//     taskId: string,
//     field: "amount" | "amountReceived",
//     value: number
//   ) => {
//     const key = `${taskId}-${field}`;
//     setEditedValues((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleBlur = async (
//     taskId: string,
//     field: "amount" | "amountReceived"
//   ) => {
//     const key = `${taskId}-${field}`;
//     const value = editedValues[key];

//     if (typeof value === "number" && !isNaN(value)) {
//       try {
//         const res = await fetch("/api/tasks/update", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ taskId, field, value })
//         });

//         const data = await res.json();

//         if (!res.ok) {
//           alert(data.error || "Failed to update");
//         } else {
//           setLocalTasks((prev) =>
//             prev.map((t) =>
//               t.id === taskId
//                 ? {
//                     ...t,
//                     customFields: {
//                       ...t.customFields,
//                       [field]: value
//                     }
//                   }
//                 : t
//             )
//           );
//         }
//       } catch (err) {
//         console.error("❌ Error:", err);
//       }
//     }
//   };

//   return (
//     <div className="overflow-auto rounded-lg border border-gray-200 shadow mt-6">
//       <div className="flex flex-wrap gap-2 justify-between items-center p-4">
//         <div className="flex flex-wrap gap-2">
//           <input
//             type="text"
//             placeholder="Search by shop, email, phone..."
//             className="border px-3 py-2 rounded"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//           />
//           <select
//             className="border px-3 py-2 rounded"
//             value={statusFilter ?? ""}
//             onChange={(e) => setStatusFilter(e.target.value || null)}
//           >
//             <option value="">All Status</option>
//             <option value="todo">To Do</option>
//             <option value="done">Done</option>
//           </select>
//           <select
//             className="border px-3 py-2 rounded"
//             value={sourceFilter ?? ""}
//             onChange={(e) => setSourceFilter(e.target.value || null)}
//           >
//             <option value="">All Sources</option>
//             <option value="zomato">Zomato</option>
//             <option value="swiggy">Swiggy</option>
//             <option value="license">License</option>
//           </select>
//           <select
//             className="border px-3 py-2 rounded"
//             value={assigneeFilter ?? ""}
//             onChange={(e) => setAssigneeFilter(e.target.value || null)}
//           >
//             <option value="">All Assignees</option>
//             {[...new Set(localTasks.map((t) => t.assignee?.name).filter(Boolean))].map((name) => (
//               <option key={name} value={name}>{name}</option>
//             ))}
//           </select>
//         </div>

//         <div className="flex gap-2">
//           <button
//             className="bg-green-600 text-white px-4 py-2 rounded"
//             onClick={exportCSV}
//           >
//             <FaDownload className="inline mr-2" /> Export CSV
//           </button>
//           <button
//             className="px-4 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
//             onClick={() => setEditMode((prev) => !prev)}
//           >
//             {editMode ? "Switch to View Mode" : "Switch to Edit Mode"}
//           </button>
//         </div>
//       </div>

//       <div className="flex flex-wrap gap-2 px-4 pb-2">
//         {ALL_COLUMNS.map((col) => (
//           <button
//             key={col}
//             onClick={() =>
//               setColumns((prev) =>
//                 prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
//               )
//             }
//             className={`px-3 py-1 border rounded text-sm flex items-center gap-1 ${
//               columns.includes(col) ? "bg-blue-500 text-white" : "bg-gray-200"
//             }`}
//           >
//             {columns.includes(col) ? <FaEye /> : <FaEyeSlash />} {col}
//           </button>
//         ))}
//       </div>

//       <table className="min-w-full bg-white divide-y divide-gray-200 text-sm text-gray-800">
//         <thead className="bg-purple-100 text-purple-700 font-semibold text-left">
//           <tr>
//             {columns.includes("title") && <th className="px-4 py-3">Title</th>}
//             {columns.includes("createdAt") && <th className="px-4 py-3">📅 Created</th>}
//             {columns.includes("assignerName") && <th className="px-4 py-3">Assigned By → To</th>}
//             {columns.includes("shopName") && <th className="px-4 py-3">🏪 Shop Name</th>}
//             {columns.includes("location") && <th className="px-4 py-3">📍 Location</th>}
//             {columns.includes("phone") && <th className="px-4 py-3">📞 Phone</th>}
//             {columns.includes("email") && <th className="px-4 py-3">📧 Email</th>}
//             {columns.includes("status") && <th className="px-4 py-3">Status</th>}
//             <th className="px-4 py-3">🧾 Amount</th>
//             <th className="px-4 py-3">✅ Received</th>
//             <th className="px-4 py-3">🧾 Pending</th>
//           </tr>
//         </thead>

//         <tbody>
//           {filtered.length === 0 ? (
//             <tr>
//               <td colSpan={11} className="text-center px-4 py-6 text-gray-500">
//                 No tasks found.
//               </td>
//             </tr>
//           ) : (
//             filtered.map((task) => {
//               const amount = task.customFields?.amount || 0;
//               const received = task.customFields?.amountReceived || 0;
//               const pending = amount - received;

//               return (
//                 <tr key={task.id} className="hover:bg-gray-50 transition">
//                   {columns.includes("title") && <td className="px-4 py-3">{task.title}</td>}
//                   {columns.includes("createdAt") && <td className="px-4 py-3">{format(new Date(task.createdAt), "dd MMM yyyy")}</td>}
//                   {columns.includes("assignerName") && (
//                     <td className="px-4 py-3">
//                       {task.assignerName || "—"} → {task.assignee?.name ?? task.assigneeEmail ?? "—"}
//                     </td>
//                   )}
//                   {columns.includes("shopName") && <td className="px-4 py-3">{task.customFields?.shopName || "—"}</td>}
//                   {columns.includes("location") && (
//                     <td className="px-4 py-3">
//                       {task.customFields?.location ? (
//                         <a
//                           href={task.customFields.location}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 underline hover:text-blue-800"
//                         >
//                           View
//                         </a>
//                       ) : (
//                         "—"
//                       )}
//                     </td>
//                   )}
//                   {columns.includes("phone") && <td className="px-4 py-3">{task.customFields?.phone || "—"}</td>}
//                   {columns.includes("email") && <td className="px-4 py-3">{task.customFields?.email || "—"}</td>}
//                   {columns.includes("status") && <td className="px-4 py-3 capitalize">{task.status || "Pending"}</td>}
//                   <td className="px-4 py-3">
//                     {editMode ? (
//                       <input
//                         type="number"
//                         className="w-20 px-2 py-1 border rounded"
//                         value={editedValues[`${task.id}-amount`] ?? amount}
//                         onChange={(e) =>
//                           handleInputChange(task.id, "amount", Number(e.target.value))
//                         }
//                         onBlur={() => handleBlur(task.id, "amount")}
//                       />
//                     ) : (
//                       amount
//                     )}
//                   </td>
//                   <td className="px-4 py-3">
//                     {editMode ? (
//                       <input
//                         type="number"
//                         className="w-20 px-2 py-1 border rounded"
//                         value={editedValues[`${task.id}-amountReceived`] ?? received}
//                         onChange={(e) =>
//                           handleInputChange(task.id, "amountReceived", Number(e.target.value))
//                         }
//                         onBlur={() => handleBlur(task.id, "amountReceived")}
//                       />
//                     ) : (
//                       received
//                     )}
//                   </td>
//                   <td className="px-4 py-3 text-red-600 font-semibold">{pending}</td>
//                 </tr>
//               );
//             })
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }




















// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import { Task } from "@/types/task";
// import { useUser } from "@clerk/nextjs";
// import { format, isToday, isPast, subDays, startOfMonth } from "date-fns"; // Import necessary date-fns functions
// import { FaDownload, FaSearch, FaEye, FaEyeSlash } from "react-icons/fa";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

// const ALL_COLUMNS = [
//   "title",
//   "status",
//   "shopName",
//   "email",
//   "phone",
//   "assignerName",
//   "assignee",
//   "createdAt",
//   "activeTab",
//   "location" // Added location to ALL_COLUMNS for consistency
// ];

// interface Props {
//   tasks: Task[];
// }

// export default function TaskTableView({ tasks }: Props) {
//   const { user } = useUser();
//   const [editMode, setEditMode] = useState(false);
//   const [editedValues, setEditedValues] = useState<{ [key: string]: number }>({});
//   const [localTasks, setLocalTasks] = useState<Task[]>(tasks || []);

//   const [query, setQuery] = useState("");
//   const [sortKey, setSortKey] = useState("createdAt");
//   const [sortDir, setSortDir] = useState("desc");
//   const [columns, setColumns] = useState<string[]>(ALL_COLUMNS);
//   const [statusFilter, setStatusFilter] = useState<string | null>(null);
//   const [sourceFilter, setSourceFilter] = useState<string | null>(null);
//   const [assigneeFilter, setAssigneeFilter] = useState<string | null>(null);
//   const [dateFilter, setDateFilter] = useState<string | null>(null); // New state for date filter

//   useEffect(() => {
//     if (Array.isArray(tasks)) {
//       setLocalTasks(tasks);
//     } else {
//       console.warn("⚠️ Invalid task data received:", tasks);
//       setLocalTasks([]);
//     }
//   }, [tasks]);

//   const filtered = useMemo(() => {
//     let filtered = [...localTasks];
//     const now = new Date(); // Get current date/time once for consistent filtering

//     if (query) {
//       const lower = query.toLowerCase();
//       filtered = filtered.filter((t) =>
//         [
//           t.customFields?.shopName,
//           t.customFields?.email,
//           t.customFields?.phone,
//           t.assignee?.name,
//           t.title, // Include title in search
//           t.status, // Include status in search
//           t.assignerName, // Include assignerName in search
//           t.activeTab, // Include activeTab in search
//           t.customFields?.location // Include location in search
//         ]
//           .filter(Boolean) // Filter out undefined/null values
//           .join(" ")
//           .toLowerCase()
//           .includes(lower)
//       );
//     }
//     if (statusFilter) {
//       filtered = filtered.filter((t) => t.status === statusFilter);
//     }
//     if (sourceFilter) {
//       filtered = filtered.filter((t) => t.activeTab === sourceFilter);
//     }
//     if (assigneeFilter) {
//       filtered = filtered.filter((t) => t.assignee?.name === assigneeFilter);
//     }

//     // New date filtering logic
//     if (dateFilter) {
//       filtered = filtered.filter((t) => {
//         const taskDate = new Date(t.createdAt);
//         switch (dateFilter) {
//           case "today":
//             return isToday(taskDate);
//           case "yesterday":
//             const yesterday = subDays(now, 1);
//             return format(taskDate, 'yyyy-MM-dd') === format(yesterday, 'yyyy-MM-dd');
//           case "last_7_days":
//             const sevenDaysAgo = subDays(now, 7);
//             return taskDate >= sevenDaysAgo && isPast(taskDate);
//           case "this_month":
//             const startOfCurrentMonth = startOfMonth(now);
//             return taskDate >= startOfCurrentMonth && isPast(taskDate);
//           case "last_month":
//             const startOfLastMonth = startOfMonth(subDays(now, 30)); // Approximate last month
//             const endOfLastMonth = subDays(startOfMonth(now), 1);
//             return taskDate >= startOfLastMonth && taskDate <= endOfLastMonth;
//           case "this_year":
//             const startOfCurrentYear = new Date(now.getFullYear(), 0, 1);
//             return taskDate >= startOfCurrentYear && isPast(taskDate);
//           default:
//             return true; // No specific date filter applied
//         }
//       });
//     }

//     return filtered.sort((a, b) => {
//       const valA = a[sortKey as keyof Task];
//       const valB = b[sortKey as keyof Task];

//       // Handle undefined values for sorting
//       if (valA === undefined && valB === undefined) return 0;
//       if (valA === undefined) return sortDir === "asc" ? 1 : -1;
//       if (valB === undefined) return sortDir === "asc" ? -1 : 1;

//       return sortDir === "asc"
//         ? String(valA).localeCompare(String(valB))
//         : String(valB).localeCompare(String(valA));
//     });
//   }, [localTasks, query, sortKey, sortDir, statusFilter, sourceFilter, assigneeFilter, dateFilter]); // Add dateFilter to dependencies

//   const exportCSV = () => {
//     const exportData = filtered.map((task) => ({
//       title: task.title,
//       status: task.status,
//       shopName: task.customFields?.shopName,
//       phone: task.customFields?.phone,
//       email: task.customFields?.email,
//       assignee: task.assignee?.name,
//       assigner: task.assignerName,
//       source: task.activeTab,
//       createdAt: task.createdAt,
//       location: task.customFields?.location,
//       amount: task.customFields?.amount || 0,
//       amountReceived: task.customFields?.amountReceived || 0,
//     }));
//     const ws = XLSX.utils.json_to_sheet(exportData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Tasks");
//     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//     const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
//     saveAs(blob, `Tasks_Report_${Date.now()}.xlsx`);
//   };

//   const handleInputChange = (
//     taskId: string,
//     field: "amount" | "amountReceived",
//     value: number
//   ) => {
//     const key = `${taskId}-${field}`;
//     setEditedValues((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleBlur = async (
//     taskId: string,
//     field: "amount" | "amountReceived"
//   ) => {
//     const key = `${taskId}-${field}`;
//     const value = editedValues[key];

//     if (typeof value === "number" && !isNaN(value)) {
//       try {
//         const res = await fetch("/api/tasks/update", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ taskId, field, value })
//         });

//         const data = await res.json();

//         if (!res.ok) {
//           alert(data.error || "Failed to update");
//         } else {
//           setLocalTasks((prev) =>
//             prev.map((t) =>
//               t.id === taskId
//                 ? {
//                     ...t,
//                     customFields: {
//                       ...t.customFields,
//                       [field]: value
//                     }
//                   }
//                 : t
//             )
//           );
//           setEditedValues((prev) => {
//             const newState = { ...prev };
//             delete newState[key];
//             return newState;
//           });
//         }
//       } catch (err) {
//         console.error("❌ Error:", err);
//         alert("An error occurred while updating the task.");
//       }
//     }
//   };

//   return (
//     <div className="overflow-auto rounded-lg border border-gray-200 shadow mt-6">
//       <div className="flex flex-wrap gap-2 justify-between items-center p-4">
//         <div className="flex flex-wrap gap-2">
//           <input
//             type="text"
//             placeholder="Search by shop, email, phone..."
//             className="border px-3 py-2 rounded"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//           />
//           <select
//             className="border px-3 py-2 rounded"
//             value={statusFilter ?? ""}
//             onChange={(e) => setStatusFilter(e.target.value || null)}
//           >
//             <option value="">All Status</option>
//             <option value="todo">To Do</option>
//             <option value="done">Done</option>
//           </select>
//           <select
//             className="border px-3 py-2 rounded"
//             value={sourceFilter ?? ""}
//             onChange={(e) => setSourceFilter(e.target.value || null)}
//           >
//             <option value="">All Sources</option>
//             <option value="zomato">Zomato</option>
//             <option value="swiggy">Swiggy</option>
//             <option value="license">License</option>
//           </select>
//           <select
//             className="border px-3 py-2 rounded"
//             value={assigneeFilter ?? ""}
//             onChange={(e) => setAssigneeFilter(e.target.value || null)}
//           >
//             <option value="">All Assignees</option>
//             {[...new Set(localTasks.map((t) => t.assignee?.name).filter(Boolean))].map((name) => (
//               <option key={name} value={name}>{name}</option>
//             ))}
//           </select>
//           {/* New filter for "Days Task Added" */}
//           <select
//             className="border px-3 py-2 rounded"
//             value={dateFilter ?? ""}
//             onChange={(e) => setDateFilter(e.target.value || null)}
//           >
//             <option value="">All Dates</option>
//             <option value="today">Today</option>
//             <option value="yesterday">Yesterday</option>
//             <option value="last_7_days">Last 7 Days</option>
//             <option value="this_month">This Month</option>
//             <option value="last_month">Last Month</option>
//             <option value="this_year">This Year</option>
//           </select>
//         </div>

//         <div className="flex gap-2">
//           <button
//             className="bg-green-600 text-white px-4 py-2 rounded"
//             onClick={exportCSV}
//           >
//             <FaDownload className="inline mr-2" /> Export CSV
//           </button>
//           <button
//             className="px-4 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
//             onClick={() => setEditMode((prev) => !prev)}
//           >
//             {editMode ? "Switch to View Mode" : "Switch to Edit Mode"}
//           </button>
//         </div>
//       </div>

//       <div className="flex flex-wrap gap-2 px-4 pb-2">
//         {ALL_COLUMNS.map((col) => (
//           <button
//             key={col}
//             onClick={() =>
//               setColumns((prev) =>
//                 prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
//               )
//             }
//             className={`px-3 py-1 border rounded text-sm flex items-center gap-1 ${
//               columns.includes(col) ? "bg-blue-500 text-white" : "bg-gray-200"
//             }`}
//           >
//             {columns.includes(col) ? <FaEye /> : <FaEyeSlash />} {col}
//           </button>
//         ))}
//       </div>

//       <table className="min-w-full bg-white divide-y divide-gray-200 text-sm text-gray-800">
//         <thead className="bg-purple-100 text-purple-700 font-semibold text-left">
//           <tr>
//             {columns.includes("title") && <th className="px-4 py-3">Title</th>}
//             {columns.includes("createdAt") && <th className="px-4 py-3">📅 Created</th>}
//             {columns.includes("assignerName") && <th className="px-4 py-3">Assigned By → To</th>}
//             {columns.includes("shopName") && <th className="px-4 py-3">🏪 Shop Name</th>}
//             {columns.includes("location") && <th className="px-4 py-3">📍 Location</th>}
//             {columns.includes("phone") && <th className="px-4 py-3">📞 Phone</th>}
//             {columns.includes("email") && <th className="px-4 py-3">📧 Email</th>}
//             {columns.includes("status") && <th className="px-4 py-3">Status</th>}
//             <th className="px-4 py-3">🧾 Amount</th>
//             <th className="px-4 py-3">✅ Received</th>
//             <th className="px-4 py-3">🧾 Pending</th>
//           </tr>
//         </thead>

//         <tbody>
//           {filtered.length === 0 ? (
//             <tr>
//               <td colSpan={11} className="text-center px-4 py-6 text-gray-500">
//                 No tasks found.
//               </td>
//             </tr>
//           ) : (
//             filtered.map((task) => {
//               const amount = task.customFields?.amount || 0;
//               const received = task.customFields?.amountReceived || 0;
//               const pending = amount - received;

//               return (
//                 <tr key={task.id} className="hover:bg-gray-50 transition">
//                   {columns.includes("title") && <td className="px-4 py-3">{task.title}</td>}
//                   {columns.includes("createdAt") && <td className="px-4 py-3">{format(new Date(task.createdAt), "dd MMM HH:mm")}</td>}
//                   {columns.includes("assignerName") && (
//                     <td className="px-4 py-3">
//                       {task.assignerName || "—"} → {task.assignee?.name ?? task.assigneeEmail ?? "—"}
//                     </td>
//                   )}
//                   {columns.includes("shopName") && <td className="px-4 py-3">{task.customFields?.shopName || "—"}</td>}
//                   {columns.includes("location") && (
//                     <td className="px-4 py-3">
//                       {task.customFields?.location ? (
//                         <a
//                           href={task.customFields.location}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 underline hover:text-blue-800"
//                         >
//                           View
//                         </a>
//                       ) : (
//                         "—"
//                       )}
//                     </td>
//                   )}
//                   {columns.includes("phone") && <td className="px-4 py-3">{task.customFields?.phone || "—"}</td>}
//                   {columns.includes("email") && <td className="px-4 py-3">{task.customFields?.email || "—"}</td>}
//                   {columns.includes("status") && <td className="px-4 py-3 capitalize">{task.status || "Pending"}</td>}
//                   <td className="px-4 py-3">
//                     {editMode ? (
//                       <input
//                         type="number"
//                         className="w-20 px-2 py-1 border rounded"
//                         value={editedValues[`${task.id}-amount`] ?? amount}
//                         onChange={(e) =>
//                           handleInputChange(task.id, "amount", Number(e.target.value))
//                         }
//                         onBlur={() => handleBlur(task.id, "amount")}
//                       />
//                     ) : (
//                       amount
//                     )}
//                   </td>
//                   <td className="px-4 py-3">
//                     {editMode ? (
//                       <input
//                         type="number"
//                         className="w-20 px-2 py-1 border rounded"
//                         value={editedValues[`${task.id}-amountReceived`] ?? received}
//                         onChange={(e) =>
//                           handleInputChange(task.id, "amountReceived", Number(e.target.value))
//                         }
//                         onBlur={() => handleBlur(task.id, "amountReceived")}
//                       />
//                     ) : (
//                       received
//                     )}
//                   </td>
//                   <td className="px-4 py-3 text-red-600 font-semibold">{pending}</td>
//                 </tr>
//               );
//             })
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }









//isPast,


"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Task } from "@/types/task";
// import { useUser } from "@clerk/nextjs";
import { format, isToday,  subDays, startOfMonth } from "date-fns";
import { FaDownload, FaSearch, FaEye, FaEyeSlash, FaMapMarkerAlt } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ALL_COLUMNS = [
  "title",
  "status",
  "shopName",
  "email",
  "phone",
  "assignerName",
  "assignee",
  "createdAt",
  "activeTab",
  "location"
];

interface Props {
  tasks: Task[];
}

export default function TaskTableView({ tasks }: Props) {
  // const { user } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState<{ [key: string]: number }>({});
  const [localTasks, setLocalTasks] = useState<Task[]>(tasks || []);

  const [query, setQuery] = useState("");
  const [sortKey] = useState("createdAt");  //, setSortKey
  const [sortDir] = useState("desc");  //, setSortDir
  const [columns, setColumns] = useState<string[]>(ALL_COLUMNS);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sourceFilter, setSourceFilter] = useState<string | null>(null);
  const [assigneeFilter, setAssigneeFilter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<string | null>(null);

  useEffect(() => {
    if (Array.isArray(tasks)) {
      setLocalTasks(tasks);
    } else {
      console.warn("⚠️ Invalid task data received:", tasks);
      setLocalTasks([]);
    }
  }, [tasks]);

  const filtered = useMemo(() => {
    let filtered = [...localTasks];
    const now = new Date();

    if (query) {
      const lower = query.toLowerCase();
      filtered = filtered.filter((t) =>
        [
          t.customFields?.shopName,
          t.customFields?.email,
          t.customFields?.phone,
          t.assignee?.name,
          t.title,
          t.status,
          t.assignerName,
          // t.activeTab,
          t.customFields?.location
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(lower)
      );
    }
    if (statusFilter) {
      filtered = filtered.filter((t) => t.status === statusFilter);
    }
    // if (sourceFilter) {
    //   filtered = filtered.filter((t) => t.activeTab === sourceFilter);
    // }
    if (assigneeFilter) {
      filtered = filtered.filter((t) => t.assignee?.name === assigneeFilter);
    }

    if (dateFilter) {
      filtered = filtered.filter((t) => {
        const taskDate = new Date(t.createdAt);
        switch (dateFilter) {
          case "today":
            return isToday(taskDate);
          case "yesterday":
            const yesterday = subDays(now, 1);
            return format(taskDate, 'yyyy-MM-dd') === format(yesterday, 'yyyy-MM-dd');
          case "last_7_days":
            const sevenDaysAgo = subDays(now, 7);
            return taskDate >= sevenDaysAgo && taskDate <= now;
          case "this_month":
            const startOfCurrentMonth = startOfMonth(now);
            return taskDate >= startOfCurrentMonth && taskDate <= now;
          case "last_month":
            const startOfLastMonth = startOfMonth(subDays(now, 30));
            const endOfLastMonth = subDays(startOfMonth(now), 1);
            return taskDate >= startOfLastMonth && taskDate <= endOfLastMonth;
          case "this_year":
            const startOfCurrentYear = new Date(now.getFullYear(), 0, 1);
            return taskDate >= startOfCurrentYear && taskDate <= now;
          default:
            return true;
        }
      });
    }

    return filtered.sort((a, b) => {
      const valA = a[sortKey as keyof Task];
      const valB = b[sortKey as keyof Task];

      if (valA === undefined && valB === undefined) return 0;
      if (valA === undefined) return sortDir === "asc" ? 1 : -1;
      if (valB === undefined) return sortDir === "asc" ? -1 : 1;

      if (sortKey === 'createdAt') {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortDir === 'asc' ? dateA - dateB : dateB - dateA;
      }

      return sortDir === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [localTasks, query, sortKey, sortDir, statusFilter, assigneeFilter, dateFilter]);
  //, sourceFilter

  // const exportCSV = () => {
  //   const exportData = filtered.map((task) => ({
  //     title: task.title,
  //     status: task.status,
  //     shopName: task.customFields?.shopName,
  //     phone: task.customFields?.phone,
  //     email: task.customFields?.email,
  //     assignee: task.assignee?.name,
  //     assigner: task.assignerName,
  //     // source: task.activeTab,
  //     createdAt: task.createdAt,
  //     location: task.customFields?.location,
  //     amount: task.customFields?.amount || 0,
  //     amountReceived: task.customFields?.amountReceived || 0,
  //   }));


  const exportCSV = () => {
  const exportData = filtered.map((task) => ({
    title: task.title,
    status: task.status,
    shopName: task.customFields?.shopName,
    phone: task.customFields?.phone,
    email: task.customFields?.email,
    assignee: task.assignee?.name,
    assigner: task.assignerName,
    // source: task.activeTab, // ❌ Remove or add conditionally if needed
    createdAt: task.createdAt,
    location: task.customFields?.location,
    amount: Number(task.customFields?.amount) || 0,
    amountReceived: Number(task.customFields?.amountReceived) || 0,
  }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tasks");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `Tasks_Report_${Date.now()}.xlsx`);
  };

  const handleInputChange = (
    taskId: string,
    field: "amount" | "amountReceived",
    value: number
  ) => {
    const key = `${taskId}-${field}`;
    setEditedValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleBlur = async (
    taskId: string,
    field: "amount" | "amountReceived"
  ) => {
    const key = `${taskId}-${field}`;
    const value = editedValues[key];

    if (typeof value === "number" && !isNaN(value)) {
      try {
        const res = await fetch("/api/tasks/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ taskId, field, value })
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.error || "Failed to update");
        } else {
          setLocalTasks((prev) =>
            prev.map((t) =>
              t.id === taskId
                ? {
                    ...t,
                    customFields: {
                      ...t.customFields,
                      [field]: value
                    }
                  }
                : t
            )
          );
          setEditedValues((prev) => {
            const newState = { ...prev };
            delete newState[key];
            return newState;
          });
        }
      } catch (err) {
        console.error("❌ Error:", err);
        alert("An error occurred while updating the task.");
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 mt-6 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative w-full sm:w-auto">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search by shop, email, phone..."
              className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm transition duration-200 ease-in-out w-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <select
            className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none pr-8 bg-white transition duration-200 ease-in-out"
            value={statusFilter ?? ""}
            onChange={(e) => setStatusFilter(e.target.value || null)}
          >
            <option value="">All Status</option>
            <option value="todo">To Do</option>
            <option value="done">Done</option>
          </select>
          <select
            className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none pr-8 bg-white transition duration-200 ease-in-out"
            value={sourceFilter ?? ""}
            onChange={(e) => setSourceFilter(e.target.value || null)}
          >
            <option value="">All Sources</option>
            <option value="zomato">Zomato</option>
            <option value="swiggy">Swiggy</option>
            <option value="license">License</option>
          </select>
          <select
            className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none pr-8 bg-white transition duration-200 ease-in-out"
            value={assigneeFilter ?? ""}
            onChange={(e) => setAssigneeFilter(e.target.value || null)}
          >
            <option value="">All Assignees</option>
            {[...new Set(localTasks.map((t) => t.assignee?.name).filter(Boolean))].map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
          <select
            className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none pr-8 bg-white transition duration-200 ease-in-out"
            value={dateFilter ?? ""}
            onChange={(e) => setDateFilter(e.target.value || null)}
          >
            <option value="">All Dates</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last_7_days">Last 7 Days</option>
            <option value="this_month">This Month</option>
            <option value="last_month">Last Month</option>
            <option value="this_year">This Year</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            className="inline-flex items-center bg-green-600 text-white font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 ease-in-out"
            onClick={exportCSV}
          >
            <FaDownload className="inline mr-2 -ml-1" /> Export CSV
          </button>
          <button
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-in-out
            bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500"
            onClick={() => setEditMode((prev) => !prev)}
          >
            {editMode ? "Switch to View Mode" : "Switch to Edit Mode"}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50">
        <span className="text-gray-700 text-sm font-medium mr-2">Show/Hide Columns:</span>
        {ALL_COLUMNS.map((col) => (
          <button
            key={col}
            onClick={() =>
              setColumns((prev) =>
                prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
              )
            }
            className={`inline-flex items-center px-3 py-1.5 border rounded-full text-xs font-medium transition-all duration-200 ease-in-out
              ${
                columns.includes(col)
                  ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
              }`}
          >
            {columns.includes(col) ? <FaEye className="mr-1" /> : <FaEyeSlash className="mr-1" />} {col.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          {/* FIXED: No whitespace between <thead> and <tr> */}
          <thead className="bg-gray-100"><tr>
              {columns.includes("title") && <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Title</th>}
              {columns.includes("createdAt") && <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">📅 Created</th>}
              {columns.includes("assignerName") && <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Assigned By → To</th>}
              {columns.includes("shopName") && <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">🏪 Shop Name</th>}
              {columns.includes("location") && <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">📍 Location</th>}
              {columns.includes("phone") && <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">📞 Phone</th>}
              {columns.includes("email") && <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">📧 Email</th>}
              {columns.includes("status") && <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>}
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">🧾 Amount</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">✅ Received</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">🧾 Pending</th>
          </tr></thead>

          {/* FIXED: No whitespace between <tbody> and {filtered.length === 0 ? ... */}
          <tbody className="bg-white divide-y divide-gray-100">{
            filtered.length === 0 ? (
              <tr>
                <td colSpan={ALL_COLUMNS.length + 3} className="text-center px-4 py-8 text-gray-500 text-base">
                  <div className="flex flex-col items-center justify-center h-full">
                    <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    <p className="text-lg font-medium">No tasks found</p>
                    <p className="text-sm text-gray-500">Adjust your filters or add new tasks to see them here.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((task, index) => {
                // const amount = task.customFields?.amount || 0;
                // const received = task.customFields?.amountReceived || 0;
                // const pending = amount - received;

                const amount = Number(task.customFields?.amount) || 0;
const received = Number(task.customFields?.amountReceived) || 0;
const pending = amount - received;


                return (
                  <tr key={task.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors duration-150 ease-in-out`}>
                    {columns.includes("title") && <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{task.title}</td>}
                    {columns.includes("createdAt") && <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{format(new Date(task.createdAt), "dd MMM, HH:mm")}</td>}
                    {columns.includes("assignerName") && (
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <span className="font-semibold text-gray-800">{task.assignerName || "—"}</span> <span className="text-blue-500">→</span> <span className="text-blue-600 font-medium">{task.assignee?.name ?? task.assigneeEmail ?? "—"}</span>
                      </td>
                    )}
                    {columns.includes("shopName") && <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{task.customFields?.shopName || "—"}</td>}
                    {columns.includes("location") && (
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {task.customFields?.location ? (
                          <a
                            // href={task.customFields.location}
                            href={String(task.customFields?.location || "")}

                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                          >
                            <FaMapMarkerAlt className="text-blue-500" /> View
                          </a>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    )}
                    {columns.includes("phone") && <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{task.customFields?.phone || "—"}</td>}
                    {columns.includes("email") && <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{task.customFields?.email || "—"}</td>}
                    {columns.includes("status") && (
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          task.status === "done" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                        }`}>
                          {task.status || "Pending"}
                        </span>
                      </td>
                    )}
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {editMode ? (
                        <input
                          type="number"
                          className="w-24 px-2 py-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-center text-sm"
                          value={editedValues[`${task.id}-amount`] ?? amount}
                          onChange={(e) =>
                            handleInputChange(task.id, "amount", Number(e.target.value))
                          }
                          onBlur={() => handleBlur(task.id, "amount")}
                        />
                      ) : (
                        <span className="font-medium">₹ {amount.toLocaleString('en-IN')}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {editMode ? (
                        <input
                          type="number"
                          className="w-24 px-2 py-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-center text-sm"
                          value={editedValues[`${task.id}-amountReceived`] ?? received}
                          onChange={(e) =>
                            handleInputChange(task.id, "amountReceived", Number(e.target.value))
                          }
                          onBlur={() => handleBlur(task.id, "amountReceived")}
                        />
                      ) : (
                        <span className="text-emerald-700 font-medium">₹ {received.toLocaleString('en-IN')}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-rose-600">
                      ₹ {pending.toLocaleString('en-IN')}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}