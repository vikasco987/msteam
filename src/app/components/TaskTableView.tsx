









// // components/TaskTableView.tsx
// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import { Task } from "../../types/task";
// import { Note } from "../../../types/note";
// import { useUser } from "@clerk/nextjs";
// import { format, isToday, subDays, startOfMonth } from "date-fns";
// // Removed FaEdit as it's unused
// import { FaDownload, FaSearch, FaEye, FaEyeSlash, FaMapMarkerAlt } from "react-icons/fa";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import toast from "react-hot-toast";

// import NotesModal from "../components/NotesModal";

// // Define a more specific type for the user prop
// interface UserMetadata {
//   role?: string;
// }

// interface UserProp {
//   id?: string;
//   publicMetadata?: UserMetadata;
//   privateMetadata?: UserMetadata;
// }

// interface Props {
//   tasks: Task[];
//   user: UserProp; // Typed the user prop
// }

// const ALL_COLUMNS = [
//   "rowNumber",
//   "title",
//   "status",
//   "shopName",
//   "email",
//   "phone",
//   "assignerName",
//   "assignee",
//   "createdAt",
//   "activeTab",
//   "location",
//   "notes",
// ];

// export default function TaskTableView({ tasks, user }: Props) {
//   const [editMode, setEditMode] = useState(false);
//   const [editedValues, setEditedValues] = useState<{ [key: string]: number }>({});
//   const [localTasks, setLocalTasks] = useState<Task[]>(tasks || []);

//   const [query, setQuery] = useState("");
//   const [sortKey] = useState("createdAt");
//   const [sortDir] = useState("desc");
//   const [columns, setColumns] = useState<string[]>(ALL_COLUMNS);
//   const [statusFilter, setStatusFilter] = useState<string | null>(null);
//   const [sourceFilter, setSourceFilter] = useState<string | null>(null);
//   const [assigneeFilter, setAssigneeFilter] = useState<string | null>(null);
//   const [dateFilter, setDateFilter] = useState<string | null>(null);

//   const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
//   const [selectedTaskIdForNotes, setSelectedTaskIdForNotes] = useState<string | null>(null);
//   const [notesMap, setNotesMap] = useState<{ [taskId: string]: Note[] }>({});

//   const [currentPage, setCurrentPage] = useState(1);
//   const [tasksPerPage, setTasksPerPage] = useState(10);

//   const currentUserId = useUser().user?.id;
//   // Role extraction is fine as is
//   const role = user?.publicMetadata?.role || user?.privateMetadata?.role || "";

//   useEffect(() => {
//     if (!user) return;

//     if (!Array.isArray(tasks)) {
//       console.warn("⚠️ Invalid task data received:", tasks);
//       setLocalTasks([]);
//       return;
//     }

//     const initialNotes = tasks.reduce((acc, task) => {
//       if (Array.isArray(task.notes)) {
//         acc[task.id] = task.notes;
//       } else {
//         acc[task.id] = [];
//       }
//       return acc;
//     }, {} as { [taskId: string]: Note[] });
//     setNotesMap(initialNotes);

//     // Add role to the dependency array
//     if (role === "admin") {
//       setLocalTasks(tasks);
//     } else if (role === "seller") {
//       const sellerTasks = tasks.filter(
//         (t) => t.createdByClerkId === currentUserId || t.assigneeIds?.includes(currentUserId)
//       );
//       setLocalTasks(sellerTasks);
//     } else {
//       setLocalTasks([]);
//     }
//   }, [tasks, user, currentUserId, role]); // Added 'role' to dependency array

//   const filtered = useMemo(() => {
//     let filtered = [...localTasks];
//     const now = new Date();

//     if (query) {
//       const lower = query.toLowerCase();
//       filtered = filtered.filter((t) =>
//         [
//           t.customFields?.shopName,
//           t.customFields?.email,
//           t.customFields?.phone,
//           t.assignee?.name,
//           t.title,
//           t.status,
//           t.assignerName,
//           t.customFields?.location,
//           ...(notesMap[t.id] || []).map((note) => note.content),
//         ]
//           .filter(Boolean)
//           .join(" ")
//           .toLowerCase()
//           .includes(lower)
//       );
//     }
//     if (statusFilter) {
//       filtered = filtered.filter((t) => t.status === statusFilter);
//     }
//     if (assigneeFilter) {
//       filtered = filtered.filter((t) => t.assignee?.name === assigneeFilter);
//     }

//     if (dateFilter) {
//       filtered = filtered.filter((t) => {
//         const taskDate = new Date(t.createdAt);
//         switch (dateFilter) {
//           case "today":
//             return isToday(taskDate);
//           case "yesterday":
//             const yesterday = subDays(now, 1);
//             return format(taskDate, "yyyy-MM-dd") === format(yesterday, "yyyy-MM-dd");
//           case "last_7_days":
//             const sevenDaysAgo = subDays(now, 7);
//             return taskDate >= sevenDaysAgo && taskDate <= now;
//           case "this_month":
//             const startOfCurrentMonth = startOfMonth(now);
//             return taskDate >= startOfCurrentMonth && taskDate <= now;
//           case "last_month":
//             const startOfLastMonth = startOfMonth(subDays(now, 30));
//             const endOfLastMonth = subDays(startOfMonth(now), 1);
//             return taskDate >= startOfLastMonth && taskDate <= endOfLastMonth;
//           case "this_year":
//             const startOfCurrentYear = new Date(now.getFullYear(), 0, 1);
//             return taskDate >= startOfCurrentYear && taskDate <= now;
//           default:
//             return true;
//         }
//       });
//     }

//     return filtered.sort((a, b) => {
//       const valA = a[sortKey as keyof Task];
//       const valB = b[sortKey as keyof Task];

//       if (valA === undefined && valB === undefined) return 0;
//       if (valA === undefined) return sortDir === "asc" ? 1 : -1;
//       if (valB === undefined) return sortDir === "asc" ? -1 : 1;

//       if (sortKey === "createdAt") {
//         const dateA = new Date(a.createdAt).getTime();
//         const dateB = new Date(b.createdAt).getTime();
//         return sortDir === "asc" ? dateA - dateB : dateB - dateA;
//       }

//       return sortDir === "asc"
//         ? String(valA).localeCompare(String(valB))
//         : String(valB).localeCompare(String(valA));
//     });
//   }, [localTasks, query, sortKey, sortDir, statusFilter, assigneeFilter, dateFilter, notesMap]);

//   const totalPages = Math.ceil(filtered.length / tasksPerPage);
//   const paginatedTasks = useMemo(() => {
//     const startIndex = (currentPage - 1) * tasksPerPage;
//     const endIndex = startIndex + tasksPerPage;
//     return filtered.slice(startIndex, endIndex);
//   }, [filtered, currentPage, tasksPerPage]);

//   const exportCSV = () => {
//     const exportData = filtered.map((task) => ({
//       title: task.title,
//       status: task.status,
//       shopName: task.customFields?.shopName,
//       phone: task.customFields?.phone,
//       email: task.customFields?.email,
//       assignee: task.assignee?.name,
//       assigner: task.assignerName,
//       createdAt: task.createdAt,
//       location: task.customFields?.location,
//       amount: Number(task.customFields?.amount) || 0,
//       amountReceived: Number(task.customFields?.amountReceived) || 0,
//       notes: (notesMap[task.id] || []).map((note) => note.content).join(" | "),
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
//           toast.error(data.error || "Failed to update");
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
//           setEditedValues((prev) => {
//             const newState = { ...prev };
//             delete newState[key];
//             return newState;
//           });
//           toast.success("Task updated successfully!");
//         }
//       } catch (err) {
//         console.error("❌ Error:", err);
//         toast.error("An error occurred while updating the task.");
//       }
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-lg border border-gray-200 mt-6 overflow-hidden">
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b border-gray-100 bg-gray-50">
//         <div className="flex flex-wrap gap-3 items-center">
//           <div className="relative w-full sm:w-auto">
//             <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
//             <input
//               type="text"
//               placeholder="Search by shop, email, phone..."
//               className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm transition duration-200 ease-in-out w-full"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//             />
//           </div>
//           <select
//             className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none pr-8 bg-white transition duration-200 ease-in-out"
//             value={statusFilter ?? ""}
//             onChange={(e) => setStatusFilter(e.target.value || null)}
//           >
//             <option value="">All Status</option>
//             <option value="todo">To Do</option>
//             <option value="done">Done</option>
//           </select>
//           <select
//             className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none pr-8 bg-white transition duration-200 ease-in-out"
//             value={sourceFilter ?? ""}
//             onChange={(e) => setSourceFilter(e.target.value || null)}
//           >
//             <option value="">All Sources</option>
//             <option value="zomato">Zomato</option>
//             <option value="swiggy">Swiggy</option>
//             <option value="license">License</option>
//           </select>
//           <select
//             className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none pr-8 bg-white transition duration-200 ease-in-out"
//             value={assigneeFilter ?? ""}
//             onChange={(e) => setAssigneeFilter(e.target.value || null)}
//           >
//             <option value="">All Assignees</option>
//             {[...new Set(localTasks.map((t) => t.assignee?.name).filter(Boolean))].map((name) => (
//               <option key={name} value={name}>
//                 {name}
//               </option>
//             ))}
//           </select>
//           <select
//             className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none pr-8 bg-white transition duration-200 ease-in-out"
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

//         <div className="flex flex-wrap gap-2">
//           <button
//             className="inline-flex items-center bg-green-600 text-white font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 ease-in-out"
//             onClick={exportCSV}
//           >
//             <FaDownload className="inline mr-2 -ml-1" /> Export CSV
//           </button>
//           <button
//             className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-in-out
//             bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500"
//             onClick={() => setEditMode((prev) => !prev)}
//           >
//             {editMode ? "Switch to View Mode" : "Switch to Edit Mode"}
//           </button>
//         </div>
//       </div>

//       <div className="flex flex-wrap gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50">
//         <span className="text-gray-700 text-sm font-medium mr-2">Show/Hide Columns:</span>
//         {ALL_COLUMNS.map((col) => (
//           <button
//             key={col}
//             onClick={() =>
//               setColumns((prev) => (prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]))
//             }
//             className={`inline-flex items-center px-3 py-1.5 border rounded-full text-xs font-medium transition-all duration-200 ease-in-out
//               ${
//                 columns.includes(col)
//                   ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                   : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
//               }`}
//           >
//             {columns.includes(col) ? <FaEye className="mr-1" /> : <FaEyeSlash className="mr-1" />}{" "}
//             {col.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
//           </button>
//         ))}
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200 table-auto">
//           <thead className="bg-gray-100">
//             <tr>
//               {columns.includes("rowNumber") && (
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   #
//                 </th>
//               )}
//               {columns.includes("title") && (
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Title
//                 </th>
//               )}
//               {columns.includes("createdAt") && (
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   📅 Created
//                 </th>
//               )}
//               {columns.includes("assignerName") && (
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Assigned By → To
//                 </th>
//               )}
//               {columns.includes("shopName") && (
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   🏪 Shop Name
//                 </th>
//               )}
//               {columns.includes("location") && (
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   📍 Location
//                 </th>
//               )}
//               {columns.includes("phone") && (
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   📞 Phone
//                 </th>
//               )}
//               {columns.includes("email") && (
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   📧 Email
//                 </th>
//               )}
//               {columns.includes("status") && (
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Status
//                 </th>
//               )}
//               {columns.includes("notes") && (
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   📝 Notes
//                 </th>
//               )}
//               <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                 🧾 Amount
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                 ✅ Received
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                 🧾 Pending
//               </th>
//             </tr>
//           </thead>

//           <tbody className="bg-white divide-y divide-gray-100">
//             {paginatedTasks.length === 0 ? (
//               <tr>
//                 <td colSpan={ALL_COLUMNS.length + 3} className="text-center px-4 py-8 text-gray-500 text-base">
//                   <div className="flex flex-col items-center justify-center h-full">
//                     <svg
//                       className="w-12 h-12 text-gray-400 mb-3"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="1.5"
//                         d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                       ></path>
//                     </svg>
//                     <p className="text-lg font-medium">No tasks found</p>
//                     <p className="text-sm text-gray-500">
//                       Adjust your filters or add new tasks to see them here.
//                     </p>
//                   </div>
//                 </td>
//               </tr>
//             ) : (
//               paginatedTasks.map((task, index) => {
//                 const amount = Number(task.customFields?.amount) || 0;
//                 const received = Number(task.customFields?.amountReceived) || 0;
//                 const pending = amount - received;
//                 const rowNumber = (currentPage - 1) * tasksPerPage + index + 1;

//                 const hasNotes = (notesMap[task.id]?.length || 0) > 0;

//                 return (
//                   <tr
//                     key={task.id}
//                     className={`${
//                       index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                     } hover:bg-gray-100 transition-colors duration-150 ease-in-out`}
//                   >
//                     {columns.includes("rowNumber") && (
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
//                         {rowNumber}
//                       </td>
//                     )}
//                     {columns.includes("title") && (
//                       <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {task.title}
//                       </td>
//                     )}
//                     {columns.includes("createdAt") && (
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
//                         {format(new Date(task.createdAt), "dd MMM, HH:mm")}
//                       </td>
//                     )}
//                     {columns.includes("assignerName") && (
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
//                         <span className="font-semibold text-gray-800">{task.assignerName || "—"}</span>{" "}
//                         <span className="text-blue-500">→</span>{" "}
//                         <span className="text-blue-600 font-medium">
//                           {Array.isArray(task.assignees) && task.assignees.length > 0
//                             ? task.assignees.map((a) => a?.name || a?.email || "—").join(", ")
//                             : task.assigneeEmail || "—"}
//                         </span>
//                       </td>
//                     )}
//                     {columns.includes("shopName") && (
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
//                         {task.customFields?.shopName || "—"}
//                       </td>
//                     )}
//                     {columns.includes("location") && (
//                       <td className="px-4 py-3 whitespace-nowrap text-sm">
//                         {task.customFields?.location ? (
//                           <a
//                             href={String(task.customFields?.location || "")}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
//                           >
//                             <FaMapMarkerAlt className="text-blue-500" /> View
//                           </a>
//                         ) : (
//                           <span className="text-gray-400">—</span>
//                         )}
//                       </td>
//                     )}
//                     {columns.includes("phone") && (
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
//                         {task.customFields?.phone || "—"}
//                       </td>
//                     )}
//                     {columns.includes("email") && (
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
//                         {task.customFields?.email || "—"}
//                       </td>
//                     )}
//                     {columns.includes("status") && (
//                       <td className="px-4 py-3 whitespace-nowrap text-sm">
//                         <span
//                           className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                             task.status === "done" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
//                           }`}
//                         >
//                           {task.status || "Pending"}
//                         </span>
//                       </td>
//                     )}
//                     {columns.includes("notes") && (
//                       <td className="px-4 py-3 whitespace-nowrap text-sm">
//                         <button
//                           onClick={() => {
//                             setSelectedTaskIdForNotes(task.id);
//                             setIsNoteModalOpen(true);
//                           }}
//                           className={`flex items-center gap-1 transition-colors duration-200 ${
//                             hasNotes
//                               ? "text-blue-600 hover:text-blue-800"
//                               : "text-gray-400 hover:text-gray-600"
//                           }`}
//                           title={hasNotes ? "View/Edit Notes" : "Add Note"}
//                         >
//                           📝
//                           {hasNotes && (
//                             <span className="ml-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
//                               {notesMap[task.id].length}
//                             </span>
//                           )}
//                         </button>
//                       </td>
//                     )}
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
//                       {editMode ? (
//                         <input
//                           type="number"
//                           className="w-24 px-2 py-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-center text-sm"
//                           value={editedValues[`${task.id}-amount`] ?? amount}
//                           onChange={(e) => handleInputChange(task.id, "amount", Number(e.target.value))}
//                           onBlur={() => handleBlur(task.id, "amount")}
//                         />
//                       ) : (
//                         <span className="font-medium">₹ {amount.toLocaleString("en-IN")}</span>
//                       )}
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
//                       {editMode ? (
//                         <input
//                           type="number"
//                           className="w-24 px-2 py-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-center text-sm"
//                           value={editedValues[`${task.id}-amountReceived`] ?? received}
//                           onChange={(e) => handleInputChange(task.id, "amountReceived", Number(e.target.value))}
//                           onBlur={() => handleBlur(task.id, "amountReceived")}
//                         />
//                       ) : (
//                         <span className="text-emerald-700 font-medium">₹ {received.toLocaleString("en-IN")}</span>
//                       )}
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-rose-600">
//                       ₹ {pending.toLocaleString("en-IN")}
//                     </td>
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       {filtered.length > 0 && (
//         <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-gray-100 bg-gray-50">
//           <div className="flex items-center gap-2 mb-3 sm:mb-0">
//             <span className="text-sm text-gray-700">Tasks per page:</span>
//             <select
//               className="border border-gray-300 px-2 py-1 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
//               value={tasksPerPage}
//               onChange={(e) => {
//                 setTasksPerPage(Number(e.target.value));
//                 setCurrentPage(1);
//               }}
//             >
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={20}>20</option>
//               <option value={50}>50</option>
//             </select>
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               Previous
//             </button>
//             <span className="text-sm text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Conditionally render the NotesModal */}
//       {isNoteModalOpen && selectedTaskIdForNotes && (
//         <NotesModal
//           taskId={selectedTaskIdForNotes}
//           // Pass the array of notes for the selected task
//           initialNotes={notesMap[selectedTaskIdForNotes] || []}
//           onClose={(updatedNotes: Note[] | undefined) => {
//             setIsNoteModalOpen(false);
//             setSelectedTaskIdForNotes(null);
//             // Update the notesMap state only if the notes were saved/updated
//             if (updatedNotes !== undefined) {
//               setNotesMap((prev) => ({
//                 ...prev,
//                 [selectedTaskIdForNotes]: updatedNotes,
//               }));
//             }
//           }}
//         />
//       )}
//     </div>
//   );
// }



































// components/TaskTableView.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Task } from "../../types/task";
import { Note } from "../../../types/note";
import { useUser } from "@clerk/nextjs";
import { format, isToday, subDays, startOfMonth } from "date-fns";
import { FaDownload, FaSearch, FaEye, FaEyeSlash, FaMapMarkerAlt } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import toast from "react-hot-toast";

import NotesModal from "../components/NotesModal";

// Define a more specific type for the user prop
interface UserMetadata {
  role?: string;
}

interface UserProp {
  id?: string;
  publicMetadata?: UserMetadata;
  privateMetadata?: UserMetadata;
}

interface Props {
  tasks: Task[];
  user: UserProp; // Typed the user prop
}

const ALL_COLUMNS = [
  "rowNumber",
  "title",
  "status",
  "shopName",
  "email",
  "phone",
  "assignerName",
  "assignee",
  "createdAt",
  "activeTab",
  "location",
  "notes",
];

export default function TaskTableView({ tasks, user }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState<{ [key: string]: number }>({});
  const [localTasks, setLocalTasks] = useState<Task[]>(tasks || []);

  const [query, setQuery] = useState("");
  const [sortKey] = useState("createdAt");
  const [sortDir] = useState("desc");
  const [columns, setColumns] = useState<string[]>(ALL_COLUMNS);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sourceFilter, setSourceFilter] = useState<string | null>(null);
  const [assigneeFilter, setAssigneeFilter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<string | null>(null);

  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [selectedTaskIdForNotes, setSelectedTaskIdForNotes] = useState<string | null>(null);
  const [notesMap, setNotesMap] = useState<{ [taskId: string]: Note[] }>({});

  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(10);

  const currentUserId = useUser().user?.id;
  // Role extraction is fine as is
  const role = user?.publicMetadata?.role || user?.privateMetadata?.role || "";

  useEffect(() => {
    if (!user) return;

    if (!Array.isArray(tasks)) {
      console.warn("⚠️ Invalid task data received:", tasks);
      setLocalTasks([]);
      return;
    }

    const initialNotes = tasks.reduce((acc, task) => {
      if (Array.isArray(task.notes)) {
        acc[task.id] = task.notes;
      } else {
        acc[task.id] = [];
      }
      return acc;
    }, {} as { [taskId: string]: Note[] });
    setNotesMap(initialNotes);

    // ✅ UPDATED: Safer filtering for 'seller' role
    if (role === "admin" || role === "manager") { // Assuming 'manager' should also see all tasks
      setLocalTasks(tasks);
    } else if (role === "seller" && currentUserId) {
      const sellerTasks = tasks.filter(
        (t) =>
          t.createdByClerkId === currentUserId ||
          (Array.isArray(t.assigneeIds) && t.assigneeIds.includes(currentUserId))
      );
      setLocalTasks(sellerTasks);
    } else {
      // For other roles or if currentUserId is not available for seller, show no tasks
      setLocalTasks([]);
    }
  }, [tasks, user, currentUserId, role]); // Added 'role' to dependency array

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
          t.customFields?.location,
          ...(notesMap[t.id] || []).map((note) => note.content),
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
            return format(taskDate, "yyyy-MM-dd") === format(yesterday, "yyyy-MM-dd");
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

      if (sortKey === "createdAt") {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortDir === "asc" ? dateA - dateB : dateB - dateA;
      }

      return sortDir === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [localTasks, query, sortKey, sortDir, statusFilter, assigneeFilter, dateFilter, notesMap]);

  const totalPages = Math.ceil(filtered.length / tasksPerPage);
  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * tasksPerPage;
    const endIndex = startIndex + tasksPerPage;
    return filtered.slice(startIndex, endIndex);
  }, [filtered, currentPage, tasksPerPage]);

  const exportCSV = () => {
    const exportData = filtered.map((task) => ({
      title: task.title,
      status: task.status,
      shopName: task.customFields?.shopName,
      phone: task.customFields?.phone,
      email: task.customFields?.email,
      assignee: task.assignee?.name,
      assigner: task.assignerName,
      createdAt: task.createdAt,
      location: task.customFields?.location,
      amount: Number(task.customFields?.amount) || 0,
      amountReceived: Number(task.customFields?.amountReceived) || 0,
      notes: (notesMap[task.id] || []).map((note) => note.content).join(" | "),
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

  const handleBlur = async (taskId: string, field: "amount" | "amountReceived") => {
    const key = `${taskId}-${field}`;
    const value = editedValues[key];

    if (typeof value === "number" && !isNaN(value)) {
      try {
        const res = await fetch("/api/tasks/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ taskId, field, value }),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.error || "Failed to update");
        } else {
          setLocalTasks((prev) =>
            prev.map((t) =>
              t.id === taskId
                ? {
                    ...t,
                    customFields: {
                      ...t.customFields,
                      [field]: value,
                    },
                  }
                : t
            )
          );
          setEditedValues((prev) => {
            const newState = { ...prev };
            delete newState[key];
            return newState;
          });
          toast.success("Task updated successfully!");
        }
      } catch (err) {
        console.error("❌ Error:", err);
        toast.error("An error occurred while updating the task.");
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
              <option key={name} value={name}>
                {name}
              </option>
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
              setColumns((prev) => (prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]))
            }
            className={`inline-flex items-center px-3 py-1.5 border rounded-full text-xs font-medium transition-all duration-200 ease-in-out
              ${
                columns.includes(col)
                  ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
              }`}
          >
            {columns.includes(col) ? <FaEye className="mr-1" /> : <FaEyeSlash className="mr-1" />}{" "}
            {col.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-100">
            <tr>
              {columns.includes("rowNumber") && (
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  #
                </th>
              )}
              {columns.includes("title") && (
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Title
                </th>
              )}
              {columns.includes("createdAt") && (
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  📅 Created
                </th>
              )}
              {columns.includes("assignerName") && (
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Assigned By → To
                </th>
              )}
              {columns.includes("shopName") && (
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  🏪 Shop Name
                </th>
              )}
              {columns.includes("location") && (
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  📍 Location
                </th>
              )}
              {columns.includes("phone") && (
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  📞 Phone
                </th>
              )}
              {columns.includes("email") && (
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  📧 Email
                </th>
              )}
              {columns.includes("status") && (
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
              )}
              {columns.includes("notes") && (
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  📝 Notes
                </th>
              )}
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                🧾 Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                ✅ Received
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                🧾 Pending
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {paginatedTasks.length === 0 ? (
              <tr>
                <td colSpan={ALL_COLUMNS.length + 3} className="text-center px-4 py-8 text-gray-500 text-base">
                  <div className="flex flex-col items-center justify-center h-full">
                    <svg
                      className="w-12 h-12 text-gray-400 mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    <p className="text-lg font-medium">No tasks found</p>
                    <p className="text-sm text-gray-500">
                      Adjust your filters or add new tasks to see them here.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedTasks.map((task, index) => {
                const amount = Number(task.customFields?.amount) || 0;
                const received = Number(task.customFields?.amountReceived) || 0;
                const pending = amount - received;
                const rowNumber = (currentPage - 1) * tasksPerPage + index + 1;

                const hasNotes = (notesMap[task.id]?.length || 0) > 0;

                return (
                  <tr
                    key={task.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition-colors duration-150 ease-in-out`}
                  >
                    {columns.includes("rowNumber") && (
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {rowNumber}
                      </td>
                    )}
                    {columns.includes("title") && (
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {task.title}
                      </td>
                    )}
                    {columns.includes("createdAt") && (
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {format(new Date(task.createdAt), "dd MMM, HH:mm")}
                      </td>
                    )}
                    {columns.includes("assignerName") && (
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <span className="font-semibold text-gray-800">{task.assignerName || "—"}</span>{" "}
                        <span className="text-blue-500">→</span>{" "}
                        <span className="text-blue-600 font-medium">
                          {Array.isArray(task.assignees) && task.assignees.length > 0
                            ? task.assignees.map((a) => a?.name || a?.email || "—").join(", ")
                            : task.assigneeEmail || "—"}
                        </span>
                      </td>
                    )}
                    {columns.includes("shopName") && (
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {task.customFields?.shopName || "—"}
                      </td>
                    )}
                    {columns.includes("location") && (
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {task.customFields?.location ? (
                          <a
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
                    {columns.includes("phone") && (
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {task.customFields?.phone || "—"}
                      </td>
                    )}
                    {columns.includes("email") && (
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {task.customFields?.email || "—"}
                      </td>
                    )}
                    {columns.includes("status") && (
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span
                          className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            task.status === "done" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {task.status || "Pending"}
                        </span>
                      </td>
                    )}
                    {columns.includes("notes") && (
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <button
                          onClick={() => {
                            setSelectedTaskIdForNotes(task.id);
                            setIsNoteModalOpen(true);
                          }}
                          className={`flex items-center gap-1 transition-colors duration-200 ${
                            hasNotes
                              ? "text-blue-600 hover:text-blue-800"
                              : "text-gray-400 hover:text-gray-600"
                          }`}
                          title={hasNotes ? "View/Edit Notes" : "Add Note"}
                        >
                          📝
                          {hasNotes && (
                            <span className="ml-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                              {notesMap[task.id].length}
                            </span>
                          )}
                        </button>
                      </td>
                    )}
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {editMode ? (
                        <input
                          type="number"
                          className="w-24 px-2 py-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-center text-sm"
                          value={editedValues[`${task.id}-amount`] ?? amount}
                          onChange={(e) => handleInputChange(task.id, "amount", Number(e.target.value))}
                          onBlur={() => handleBlur(task.id, "amount")}
                        />
                      ) : (
                        <span className="font-medium">₹ {amount.toLocaleString("en-IN")}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {editMode ? (
                        <input
                          type="number"
                          className="w-24 px-2 py-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-center text-sm"
                          value={editedValues[`${task.id}-amountReceived`] ?? received}
                          onChange={(e) => handleInputChange(task.id, "amountReceived", Number(e.target.value))}
                          onBlur={() => handleBlur(task.id, "amountReceived")}
                        />
                      ) : (
                        <span className="text-emerald-700 font-medium">₹ {received.toLocaleString("en-IN")}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-rose-600">
                      ₹ {pending.toLocaleString("en-IN")}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {filtered.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center gap-2 mb-3 sm:mb-0">
            <span className="text-sm text-gray-700">Tasks per page:</span>
            <select
              className="border border-gray-300 px-2 py-1 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
              value={tasksPerPage}
              onChange={(e) => {
                setTasksPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Conditionally render the NotesModal */}
      {isNoteModalOpen && selectedTaskIdForNotes && (
        <NotesModal
          taskId={selectedTaskIdForNotes}
          // Pass the array of notes for the selected task
          initialNotes={notesMap[selectedTaskIdForNotes] || []}
          onClose={(updatedNotes: Note[] | undefined) => {
            setIsNoteModalOpen(false);
            setSelectedTaskIdForNotes(null);
            // Update the notesMap state only if the notes were saved/updated
            if (updatedNotes !== undefined) {
              setNotesMap((prev) => ({
                ...prev,
                [selectedTaskIdForNotes]: updatedNotes,
              }));
            }
          }}
        />
      )}
    </div>
  );
}

