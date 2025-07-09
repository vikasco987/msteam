



// "use client";
// import Stopwatch from "../components/Stopwatch";
// import { useEffect, useState, useRef, useCallback } from "react";
// import { useUser } from "@clerk/nextjs";
// import TaskAttachments from "../components/TaskAttachments"; // Keep this import

// import {
//   DragDropContext,
//   Droppable,
//   Draggable,
//   DropResult,
// } from "@hello-pangea/dnd";
// import EditTaskModal from "../components/EditTaskModal";
// import { FaSearch, FaSortAmountDownAlt, FaFileExcel } from "react-icons/fa"; // FaDownload is still needed for export and in TaskAttachments if you pass it there.

// // --- TYPE UPDATE ---
// // Ensure the Task type correctly reflects the structure from your form
// // and includes customFields as a flexible object and attachments as an array of strings (URLs/paths)
// type Task = {
//   id: string;
//   title: string;
//   description?: string;
//   status: string;
//   dueDate?: string;
//   priority?: string;
//   assigner?: {
//     id?: string;
//     name?: string;
//     email?: string;
//   };
//   assignee?: {
//     id?: string;
//     name?: string;
//     email?: string;
//   };
//   assigneeId?: string;
//   createdByClerkId?: string;
//   updatedAt?: string;
//   createdAt?: string;
//   tags?: string[];
//   subtasks?: { title: string }[];
//   // Assuming customFields will store label-value pairs.
//   // The 'value' might be a string, or an object if it includes file metadata.
//   // For simplicity, we'll type it as an array of objects matching the CustomField from your form.
//   customFields?: { label: string; value: string | File[] | string[] }[]; // Update to match the TaskForm's CustomField structure
//   attachments?: string[]; // Array of attachment URLs/paths
// };

// const columns = [
//   {
//     id: "todo",
//     title: "📝 To Do",
//     color: "border-blue-500",
//     bgColor: "bg-gradient-to-br from-blue-100 to-blue-50",
//   },
//   {
//     id: "inprogress",
//     title: "⏳ In Progress",
//     color: "border-yellow-600",
//     bgColor: "bg-gradient-to-br from-yellow-100 to-yellow-50",
//   },
//   {
//     id: "done",
//     title: "✅ Done",
//     color: "border-green-500",
//     bgColor: "bg-gradient-to-br from-green-100 to-green-50",
//   },
// ];

// export default function Board() {
//   const { user } = useUser();
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [editingTask, setEditingTask] = useState<Task | null>(null);
//   const [filterText, setFilterText] = useState("");
//   const [sortBy, setSortBy] = useState("dueDate");
//   const audioRef = useRef<HTMLAudioElement>(null);

//   const fetchTasks = useCallback(async () => {
//     try {
//       const res = await fetch("/api/tasks");
//       const json = await res.json();
//       const taskArray = Array.isArray(json) ? json : json.tasks;

//       // Filter tasks relevant to the current user
//       // const relevantTasks = taskArray?.filter(
//       //   (task: Task) =>
//       //     task.assignee?.id === user?.id || task.assigneeId === user?.id
//       // );
      
//     console.log("Fetched tasks:", taskArray);

//       const relevantTasks = taskArray?.filter(
//   (task: Task) =>
//     task.assigneeId === user?.id ||
//     task.createdByClerkId === user?.id // Optional: show creator's own tasks too
// );


//       setTasks(relevantTasks || []);
//     } catch (err) {
//       console.error("Error fetching tasks:", err);
//     }
//   }, [user?.id]);

//   useEffect(() => {
//     if (user?.id) fetchTasks();
//   }, [user?.id, fetchTasks]);

//   const onDragEnd = async (result: DropResult) => {
//     const { destination, source, draggableId } = result;
//     if (!destination || destination.droppableId === source.droppableId) return;

//     const updated = tasks.map((t) =>
//       t.id === draggableId ? { ...t, status: destination.droppableId } : t
//     );
//     setTasks(updated);

//     try {
//       await fetch(`/api/tasks/${draggableId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: destination.droppableId }),
//       });
//       fetchTasks();
//     } catch (error) {
//       console.error("Failed to update task status:", error);
//     }
//   };

//   const handleDeleteTask = async (taskId: string) => {
//     try {
//       await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
//       fetchTasks();
//       setEditingTask(null);
//     } catch (err) {
//       console.error("Failed to delete task", err);
//     }
//   };

//   // The handleDownloadAllAttachments function is now moved to TaskAttachments component.
//   // We can remove it from here to avoid duplication.
//   // const handleDownloadAllAttachments = async (attachments: string[], taskId: string) => { /* ... */ };


//   const exportTasksToCsv = () => {
//     if (tasks.length === 0) return alert("No tasks to export.");

//     const headers = [
//       "ID",
//       "Title",
//       "Description",
//       "Status",
//       "Due Date",
//       "Priority",
//       "Assigner Name",
//       "Assigner Email",
//       "Assignee Name",
//       "Assignee Email",
//       "Created At",
//       "Updated At",
//       "Tags",
//       "Subtasks",
//       "Custom Fields",
//       "Attachments",
//     ];

//     const csvRows = tasks.map((task) =>
//       [
//         task.id,
//         task.title,
//         task.description,
//         task.status,
//         task.dueDate ? new Date(task.dueDate).toLocaleString() : "",
//         task.priority,
//         task.assigner?.name,
//         task.assigner?.email,
//         task.assignee?.name,
//         task.assignee?.email,
//         task.createdAt ? new Date(task.createdAt).toLocaleString() : "",
//         task.updatedAt ? new Date(task.updatedAt).toLocaleString() : "",
//         task.tags?.join(", "),
//         task.subtasks?.map((sub) => sub.title).join("; "),
//         // --- CUSTOM FIELDS EXPORT UPDATE ---
//         task.customFields
//           ? task.customFields
//               .map((f) => `${f.label}: ${Array.isArray(f.value) ? f.value.length > 0 ? 'Files attached' : '' : f.value}`)
//               .join("; ")
//           : "",
//         task.attachments?.join("; "),
//       ].map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
//     );

//     const csvContent = [headers.join(","), ...csvRows.map((row) => row.join(","))].join("\n");
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = `tasks_${new Date().toISOString().slice(0, 10)}.csv`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(link.href);
//   };

//   const sortedFilteredTasks = tasks
//     .filter((task) => task.title?.toLowerCase().includes(filterText.toLowerCase()))
//     .sort((a, b) => {
//       if (sortBy === "priority") {
//         const order: Record<string, number> = { high: 0, medium: 1, low: 2 };
//         return (order[a.priority ?? ""] ?? 3) - (order[b.priority ?? ""] ?? 3);
//       } else {
//         const aTime = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
//         const bTime = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
//         return aTime - bTime;
//       }
//     });

//   return (
//     <div className="p-4">
//       <audio ref={audioRef} src="/alert.mp3" preload="auto" />

//       <div className="flex justify-between items-center mb-4">
//         <div className="flex items-center gap-2">
//           <FaSearch className="text-purple-600" />
//           <input
//             value={filterText}
//             onChange={(e) => setFilterText(e.target.value)}
//             placeholder="Filter tasks..."
//             className="border border-purple-300 px-2 py-1 rounded-md text-sm"
//             aria-label="Filter tasks"
//           />
//         </div>
//         <div className="flex items-center gap-2">
//           <FaSortAmountDownAlt className="text-purple-600" />
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="border border-purple-300 px-2 py-1 rounded-md text-sm"
//             aria-label="Sort tasks"
//           >
//             <option value="dueDate">Sort by Due Date</option>
//             <option value="priority">Sort by Priority</option>
//           </select>
//         </div>
//         <button
//           onClick={exportTasksToCsv}
//           disabled={tasks.length === 0}
//           className={`flex items-center gap-2 px-4 py-2 rounded-md text-white ${
//             tasks.length === 0
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-green-600 hover:bg-green-700"
//           }`}
//           aria-label="Export tasks to CSV"
//         >
//           <FaFileExcel /> Export to Excel
//         </button>
//       </div>

//       <DragDropContext onDragEnd={onDragEnd}>
//         <div className="flex flex-col md:flex-row gap-4">
//           {columns.map((col) => (
//             <Droppable droppableId={col.id} key={col.id}>
//               {(provided) => (
//                 <div
//                   ref={provided.innerRef}
//                   {...provided.droppableProps}
//                   className={`rounded-lg p-4 flex-1 min-h-[400px] ${col.bgColor}`}
//                 >
//                   <h2 className={`text-lg font-bold mb-3 text-purple-900 border-b pb-2 ${col.color}`}>
//                     {col.title}
//                   </h2>
//                   {sortedFilteredTasks
//                     .filter((task) => task.status === col.id)
//                     .map((task, index) => (
//                       <Draggable draggableId={task.id} index={index} key={task.id}>
//                         {(provided) => (
//                           <div
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                             className="bg-white p-4 mb-3 rounded-xl shadow-md border-l-4 border-purple-500"
//                           >
//                             <h3 className="text-purple-800 font-semibold text-lg mb-1">{task.title}</h3>

//                             {/* Description */}
//                             {task.description && (
//                               <p className="text-gray-700 text-sm mb-1">{task.description}</p>
//                             )}

//                             {/* Assigner */}
//                             {task.assigner && (
//                               <p className="text-xs text-gray-500">
//                                 <span className="font-semibold">Assigned by:</span>{" "}
//                                 {task.assigner.name || task.assigner.email}
//                               </p>
//                             )}

//                             {/* Assignee (explicitly show if different from assigner or to clarify) */}
//                             {task.assignee && task.assignee.id !== task.assigner?.id && (
//                                <p className="text-xs text-gray-500">
//                                   <span className="font-semibold">Assigned to:</span>{" "}
//                                   {task.assignee.name || task.assignee.email}
//                                </p>
//                             )}

//                             {/* Due Date */}
//                             {task.dueDate && (
//                                <p className="text-xs text-gray-500">
//                                   <span className="font-semibold">Due:</span>{" "}
//                                   {new Date(task.dueDate).toLocaleDateString()}
//                                </p>
//                             )}

//                             {/* Priority */}
//                             {task.priority && (
//                                <p className="text-xs text-gray-500 capitalize">
//                                   <span className="font-semibold">Priority:</span>{" "}
//                                   {task.priority}
//                                </p>
//                             )}

//                             {/* Created At */}
//                             {task.createdAt && (
//                               <p className="text-xs text-gray-500">
//                                 <span className="font-semibold">Created:</span>{" "}
//                                 {new Date(task.createdAt).toLocaleString()}
//                               </p>
//                             )}

//                             {/* Updated At */}
//                             {task.updatedAt && (
//                                <p className="text-xs text-gray-500">
//                                   <span className="font-semibold">Last Updated:</span>{" "}
//                                   {new Date(task.updatedAt).toLocaleString()}
//                                </p>
//                             )}

//                             {/* Expiry (2 days after creation) */}
//                             {task.createdAt && (
//                               <p className="text-xs text-gray-500">
//                                 <span className="font-semibold">Expires:</span>{" "}
//                                 {new Date(new Date(task.createdAt).getTime() + 2 * 86400000).toLocaleString()}
//                               </p>
//                             )}

//                             {/* Tags */}
//                             {task.tags && task.tags.length > 0 && (
//                                <p className="text-xs text-gray-500">
//                                   <span className="font-semibold">Tags:</span>{" "}
//                                   {task.tags.join(', ')}
//                                </p>
//                             )}

//                             {/* Subtasks */}
//                             {task.subtasks && task.subtasks.length > 0 && (
//                                <div>
//                                   <p className="text-xs text-gray-500 font-semibold">Subtasks:</p>
//                                   <ul className="list-disc list-inside text-xs text-gray-600 ml-2">
//                                      {task.subtasks.map((sub, i) => (
//                                         <li key={i}>{sub.title}</li>
//                                      ))}
//                                   </ul>
//                                </div>
//                             )}

//                             {/* --- Use the TaskAttachments component here --- */}
//                             <TaskAttachments
//                               customFields={task.customFields}
//                               attachments={task.attachments}
//                             />

//                             {/* Stopwatch */}
//                             {task.createdAt && <Stopwatch createdAt={task.createdAt} />}

//                             <div className="mt-3 flex gap-4">
//                               <button
//                                 onClick={() => setEditingTask(task)}
//                                 className="text-sm text-blue-600"
//                               >
//                                 ✏️ Edit
//                               </button>
//                               <button
//                                 onClick={() => handleDeleteTask(task.id)}
//                                 className="text-sm text-red-600"
//                               >
//                                 🗑️ Delete
//                               </button>
//                             </div>
//                           </div>
//                         )}
//                       </Draggable>
//                     ))}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           ))}
//         </div>
//       </DragDropContext>

//       {editingTask && (
//         <EditTaskModal
//           task={editingTask}
//           onClose={() => setEditingTask(null)}
//           onSave={fetchTasks}
//           onDelete={handleDeleteTask}
//         />
//       )}
//     </div>
//   );
// }













// "use client";

// import { useEffect, useState, useRef, useCallback } from "react";
// import { useUser } from "@clerk/nextjs";
// import {
//   DragDropContext,
//   Droppable,
//   Draggable,
//   DropResult,
// } from "@hello-pangea/dnd";
// import EditTaskModal from "../components/EditTaskModal";
// import TaskDetailsCard from "../components/TaskDetailsCard";
// import TaskEditableCard from "../components/TaskEditableCard";



// import { FaSearch, FaSortAmountDownAlt, FaFileExcel } from "react-icons/fa";

// // ✅ Updated Task type
// type Task = {
//   id: string;
//   title: string;
//   description?: string;
//   status: string;
//   dueDate?: string;
//   priority?: string;
//   assigner?: {
//     id?: string;
//     name?: string;
//     email?: string;
//   };
//   assignee?: {
//     id?: string;
//     name?: string;
//     email?: string;
//   };
//   assigneeId?: string; // fallback if your API returns just this
//   createdByClerkId?: string;
//   updatedAt?: string;
//   createdAt?: string;
//   tags?: string[];
//   subtasks?: { title: string }[];
//   customFields?: Record<string, unknown>;
//   attachments?: string[];
// };

// const columns = [
//   {
//     id: "todo",
//     title: "📝 To Do",
//     color: "border-blue-500",
//     bgColor: "bg-gradient-to-br from-blue-100 to-blue-50",
//   },
//   {
//     id: "inprogress",
//     title: "⏳ In Progress",
//     color: "border-yellow-600",
//     bgColor: "bg-gradient-to-br from-yellow-100 to-yellow-50",
//   },
//   {
//     id: "done",
//     title: "✅ Done",
//     color: "border-green-500",
//     bgColor: "bg-gradient-to-br from-green-100 to-green-50",
//   },
// ];

// export default function Board() {
//   const { user } = useUser();
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [editingTask, setEditingTask] = useState<Task | null>(null);
//   const [filterText, setFilterText] = useState("");
//   const [sortBy, setSortBy] = useState("dueDate");
//   const audioRef = useRef<HTMLAudioElement>(null);

//   const fetchTasks = useCallback(async () => {
//     try {
//       const res = await fetch("/api/tasks");
//       const json = await res.json();
//       const taskArray = Array.isArray(json) ? json : json.tasks;

//       // Filter tasks assigned to user or created by user
//       const relevantTasks = taskArray?.filter(
//         (task: Task) =>
//           task.assignee?.id === user?.id ||
//           task.assigneeId === user?.id || // fallback if assignee is string id
//           task.createdByClerkId === user?.id
//       );

//       setTasks(relevantTasks || []);
//     } catch (err) {
//       console.error("Error fetching tasks:", err);
//     }
//   }, [user?.id]);

//   useEffect(() => {
//     if (user?.id) fetchTasks();
//   }, [user?.id, fetchTasks]);

//   const onDragEnd = async (result: DropResult) => {
//     const { destination, source, draggableId } = result;
//     if (!destination || destination.droppableId === source.droppableId) return;

//     const updated = tasks.map((t) =>
//       t.id === draggableId ? { ...t, status: destination.droppableId } : t
//     );
//     setTasks(updated);

//     try {
//       await fetch(`/api/tasks/${draggableId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: destination.droppableId }),
//       });
//       fetchTasks();
//     } catch (error) {
//       console.error("Failed to update task status:", error);
//     }
//   };

//   const handleDeleteTask = async (taskId: string) => {
//     try {
//       await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
//       fetchTasks();
//       setEditingTask(null); // close modal if open
//     } catch (err) {
//       console.error("Failed to delete task", err);
//     }
//   };

//   const exportTasksToCsv = () => {
//     if (tasks.length === 0) return alert("No tasks to export.");

//     const headers = [
//       "ID",
//       "Title",
//       "Description",
//       "Status",
//       "Due Date",
//       "Priority",
//       "Assigner Name",
//       "Assigner Email",
//       "Assignee Name",
//       "Assignee Email",
//       "Created At",
//       "Updated At",
//       "Tags",
//       "Subtasks",
//       "Custom Fields",
//       "Attachments",
//     ];

//     const csvRows = tasks.map((task) =>
//       [
//         task.id,
//         task.title,
//         task.description,
//         task.status,
//         task.dueDate ? new Date(task.dueDate).toLocaleString() : "",
//         task.priority,
//         task.assigner?.name,
//         task.assigner?.email,
//         task.assignee?.name,
//         task.assignee?.email,
//         task.createdAt ? new Date(task.createdAt).toLocaleString() : "",
//         task.updatedAt ? new Date(task.updatedAt).toLocaleString() : "",
//         task.tags?.join(", "),
//         task.subtasks?.map((sub) => sub.title).join("; "),
//         task.customFields
//           ? Object.entries(task.customFields)
//               .map(([k, v]) => `${k}: ${v}`)
//               .join("; ")
//           : "",
//         task.attachments?.join("; "),
//       ].map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
//     );

//     const csvContent = [headers.join(","), ...csvRows.map((row) => row.join(","))].join("\n");
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = `tasks_${new Date().toISOString().slice(0, 10)}.csv`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(link.href);
//   };

//   const sortedFilteredTasks = tasks
//     .filter((task) => task.title?.toLowerCase().includes(filterText.toLowerCase()))
//     .sort((a, b) => {
//       if (sortBy === "priority") {
//         const order: Record<string, number> = { high: 0, medium: 1, low: 2 };
//         return (order[a.priority ?? ""] ?? 3) - (order[b.priority ?? ""] ?? 3);
//       } else {
//         // Treat missing dueDate as far future to sort last
//         const aTime = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
//         const bTime = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
//         return aTime - bTime;
//       }
//     });

//   return (
//     <div className="p-4">
//       <audio ref={audioRef} src="/alert.mp3" preload="auto" />

//       <div className="flex justify-between items-center mb-4">
//         <div className="flex items-center gap-2">
//           <FaSearch className="text-purple-600" />
//           <input
//             value={filterText}
//             onChange={(e) => setFilterText(e.target.value)}
//             placeholder="Filter tasks..."
//             className="border border-purple-300 px-2 py-1 rounded-md text-sm"
//             aria-label="Filter tasks"
//           />
//         </div>
//         <div className="flex items-center gap-2">
//           <FaSortAmountDownAlt className="text-purple-600" />
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="border border-purple-300 px-2 py-1 rounded-md text-sm"
//             aria-label="Sort tasks"
//           >
//             <option value="dueDate">Sort by Due Date</option>
//             <option value="priority">Sort by Priority</option>
//           </select>
//         </div>
//         <button
//           onClick={exportTasksToCsv}
//           disabled={tasks.length === 0}
//           className={`flex items-center gap-2 px-4 py-2 rounded-md text-white ${
//             tasks.length === 0
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-green-600 hover:bg-green-700"
//           }`}
//           aria-label="Export tasks to CSV"
//         >
//           <FaFileExcel /> Export to Excel
//         </button>
//       </div>

//       <DragDropContext onDragEnd={onDragEnd}>
//         <div className="flex flex-col md:flex-row gap-4">
//           {columns.map((col) => (
//             <Droppable droppableId={col.id} key={col.id}>
//               {(provided) => (
//                 <div
//                   ref={provided.innerRef}
//                   {...provided.droppableProps}
//                   className={`rounded-lg p-4 flex-1 min-h-[400px] ${col.bgColor}`}
//                 >
//                   <h2
//                     className={`text-lg font-bold mb-3 text-purple-900 border-b pb-2 ${col.color}`}
//                   >
//                     {col.title}
//                   </h2>
//                   {sortedFilteredTasks
//                     .filter((task) => task.status === col.id)
//                     .map((task, index) => (
//                       <Draggable draggableId={task.id} index={index} key={task.id}>
//                         {(provided) => (
//                           <div
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                             className="bg-white p-4 mb-3 rounded-xl shadow-md border-l-4 border-purple-500"
//                           >
//                             {/* <h3 className="text-purple-800 font-semibold text-lg mb-1">
//                               {task.title}
//                             </h3>
//                             <TaskDetailsCard task={task} /> */}
//                             {/* <TaskDetailsCard task={task} /> */}


//                             {viewMode === "edit" ? (
//   <TaskEditableCard task={task} onUpdate={handleFieldUpdate} />
// ) : (
//   <TaskDetailsCard task={task} />
// )}



//                             <button
//                               onClick={() => setEditingTask(task)}
//                               className="text-sm text-blue-600 mt-2"
//                               aria-label={`Edit task ${task.title}`}
//                             >
//                               ✏️ Edit
//                             </button>
//                             <button
//                               onClick={() => handleDeleteTask(task.id)}
//                               className="text-sm text-red-600 ml-4"
//                               aria-label={`Delete task ${task.title}`}
//                             >
//                               🗑️ Delete
//                             </button>
//                           </div>
//                         )}
//                       </Draggable>
//                     ))}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           ))}
//         </div>
//       </DragDropContext>

//       {editingTask && (
//         <EditTaskModal
//           task={editingTask}
//           onClose={() => setEditingTask(null)}
//           onSave={fetchTasks}
//           onDelete={handleDeleteTask} // ✅ Required prop
//         />
//       )}
//     </div>
//   );
// }












// "use client";

// import { useEffect, useState, useRef, useCallback } from "react";
// import { useUser } from "@clerk/nextjs";
// import {
//   DragDropContext,
//   Droppable,
//   Draggable,
//   DropResult,
// } from "@hello-pangea/dnd";
// import { Task } from "../../types/task"; // use the correct relative path

// import EditTaskModal from "../components/EditTaskModal";
// import TaskDetailsCard from "../components/TaskDetailsCard";
// import TaskEditableCard from "../components/TaskEditableCard";
// import { FaSearch, FaSortAmountDownAlt, FaFileExcel, FaEye, FaEdit } from "react-icons/fa";

// // ✅ Updated Task type
// type Task = {
//   id: string;
//   title: string;
//   description?: string;
//   status: string;
//   dueDate?: string;
//   priority?: string;
//   assigner?: {
//     id?: string;
//     name?: string;
//     email?: string;
//   };
//   assignee?: {
//     id?: string;
//     name?: string;
//     email?: string;
//   };
//   assigneeId?: string;
//   createdByClerkId?: string;
//   updatedAt?: string;
//   createdAt?: string;
//   tags?: string[];
//   subtasks?: { title: string }[];
//   customFields?: Record<string, unknown>;
//   attachments?: string[];
// };

// const columns = [
//   {
//     id: "todo",
//     title: "📝 To Do",
//     color: "border-blue-500",
//     bgColor: "bg-gradient-to-br from-blue-100 to-blue-50",
//   },
//   {
//     id: "inprogress",
//     title: "⏳ In Progress",
//     color: "border-yellow-600",
//     bgColor: "bg-gradient-to-br from-yellow-100 to-yellow-50",
//   },
//   {
//     id: "done",
//     title: "✅ Done",
//     color: "border-green-500",
//     bgColor: "bg-gradient-to-br from-green-100 to-green-50",
//   },
// ];

// export default function Board() {
//   const { user } = useUser();
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [editingTask, setEditingTask] = useState<Task | null>(null);
//   const [filterText, setFilterText] = useState("");
//   const [sortBy, setSortBy] = useState("dueDate");
//   const [viewMode, setViewMode] = useState<"view" | "edit">("view");
//   const audioRef = useRef<HTMLAudioElement>(null);

//   const fetchTasks = useCallback(async () => {
//     try {
//       const res = await fetch("/api/tasks");
//       const json = await res.json();
//       const taskArray = Array.isArray(json) ? json : json.tasks;

//       const relevantTasks = taskArray?.filter(
//         (task: Task) =>
//           task.assignee?.id === user?.id ||
//           task.assigneeId === user?.id ||
//           task.createdByClerkId === user?.id
//       );

//       setTasks(relevantTasks || []);
//     } catch (err) {
//       console.error("Error fetching tasks:", err);
//     }
//   }, [user?.id]);

//   useEffect(() => {
//     if (user?.id) fetchTasks();
//   }, [user?.id, fetchTasks]);

//   const onDragEnd = async (result: DropResult) => {
//     const { destination, source, draggableId } = result;
//     if (!destination || destination.droppableId === source.droppableId) return;

//     const updated = tasks.map((t) =>
//       t.id === draggableId ? { ...t, status: destination.droppableId } : t
//     );
//     setTasks(updated);

//     try {
//       await fetch(`/api/tasks/${draggableId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: destination.droppableId }),
//       });
//       fetchTasks();
//     } catch (error) {
//       console.error("Failed to update task status:", error);
//     }
//   };

//   const handleDeleteTask = async (taskId: string) => {
//     try {
//       await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
//       fetchTasks();
//       setEditingTask(null);
//     } catch (err) {
//       console.error("Failed to delete task", err);
//     }
//   };

//   const handleFieldUpdate = async (updatedTask: Task) => {
//     try {
//       await fetch(`/api/tasks/${updatedTask.id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedTask),
//       });
//       fetchTasks();
//     } catch (err) {
//       console.error("Failed to update task", err);
//     }
//   };

//   const exportTasksToCsv = () => {
//     if (tasks.length === 0) return alert("No tasks to export.");

//     const headers = [
//       "ID", "Title", "Description", "Status", "Due Date", "Priority",
//       "Assigner Name", "Assigner Email", "Assignee Name", "Assignee Email",
//       "Created At", "Updated At", "Tags", "Subtasks", "Custom Fields", "Attachments"
//     ];

//     const csvRows = tasks.map((task) =>
//       [
//         task.id, task.title, task.description, task.status,
//         task.dueDate ? new Date(task.dueDate).toLocaleString() : "",
//         task.priority, task.assigner?.name, task.assigner?.email,
//         task.assignee?.name, task.assignee?.email,
//         task.createdAt ? new Date(task.createdAt).toLocaleString() : "",
//         task.updatedAt ? new Date(task.updatedAt).toLocaleString() : "",
//         task.tags?.join(", "),
//         task.subtasks?.map((sub) => sub.title).join("; "),
//         task.customFields ? Object.entries(task.customFields).map(([k, v]) => `${k}: ${v}`).join("; ") : "",
//         task.attachments?.join("; ")
//       ].map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
//     );

//     const csvContent = [headers.join(","), ...csvRows.map((row) => row.join(","))].join("\n");
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = `tasks_${new Date().toISOString().slice(0, 10)}.csv`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(link.href);
//   };

//   const sortedFilteredTasks = tasks
//     .filter((task) => task.title?.toLowerCase().includes(filterText.toLowerCase()))
//     .sort((a, b) => {
//       if (sortBy === "priority") {
//         const order: Record<string, number> = { high: 0, medium: 1, low: 2 };
//         return (order[a.priority ?? ""] ?? 3) - (order[b.priority ?? ""] ?? 3);
//       } else {
//         const aTime = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
//         const bTime = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
//         return aTime - bTime;
//       }
//     });

//   return (
//     <div className="p-4">
//       <audio ref={audioRef} src="/alert.mp3" preload="auto" />

//       <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
//         <div className="flex items-center gap-2">
//           <FaSearch className="text-purple-600" />
//           <input
//             value={filterText}
//             onChange={(e) => setFilterText(e.target.value)}
//             placeholder="Filter tasks..."
//             className="border border-purple-300 px-2 py-1 rounded-md text-sm"
//             aria-label="Filter tasks"
//           />
//         </div>

//         <div className="flex items-center gap-2">
//           <FaSortAmountDownAlt className="text-purple-600" />
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="border border-purple-300 px-2 py-1 rounded-md text-sm"
//             aria-label="Sort tasks"
//           >
//             <option value="dueDate">Sort by Due Date</option>
//             <option value="priority">Sort by Priority</option>
//           </select>
//         </div>

//         <button
//           onClick={() => setViewMode(viewMode === "view" ? "edit" : "view")}
//           className="px-3 py-1 text-sm rounded-md border border-purple-600 text-purple-600 hover:bg-purple-100"
//         >
//           {viewMode === "view" ? (<><FaEdit className="inline mr-1" /> Edit Mode</>) : (<><FaEye className="inline mr-1" /> View Mode</>)}
//         </button>

//         <button
//           onClick={exportTasksToCsv}
//           disabled={tasks.length === 0}
//           className={`flex items-center gap-2 px-4 py-2 rounded-md text-white ${
//             tasks.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
//           }`}
//           aria-label="Export tasks to CSV"
//         >
//           <FaFileExcel /> Export to Excel
//         </button>
//       </div>

//       <DragDropContext onDragEnd={onDragEnd}>
//         <div className="flex flex-col md:flex-row gap-4">
//           {columns.map((col) => (
//             <Droppable droppableId={col.id} key={col.id}>
//               {(provided) => (
//                 <div
//                   ref={provided.innerRef}
//                   {...provided.droppableProps}
//                   className={`rounded-lg p-4 flex-1 min-h-[400px] ${col.bgColor}`}
//                 >
//                   <h2 className={`text-lg font-bold mb-3 text-purple-900 border-b pb-2 ${col.color}`}>{col.title}</h2>

//                   {sortedFilteredTasks.filter((task) => task.status === col.id).map((task, index) => (
//                     <Draggable draggableId={task.id} index={index} key={task.id}>
//                       {(provided) => (
//                         <div
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           className="bg-white p-4 mb-3 rounded-xl shadow-md border-l-4 border-purple-500"
//                         >
//                           {viewMode === "edit" ? (
//                             <TaskEditableCard task={task} onUpdate={handleFieldUpdate} />
//                           ) : (
//                             <TaskDetailsCard task={task} />
//                           )}

//                           <button
//                             onClick={() => setEditingTask(task)}
//                             className="text-sm text-blue-600 mt-2"
//                             aria-label={`Edit task ${task.title}`}
//                           >
//                             ✏️ Edit
//                           </button>
//                           <button
//                             onClick={() => handleDeleteTask(task.id)}
//                             className="text-sm text-red-600 ml-4"
//                             aria-label={`Delete task ${task.title}`}
//                           >
//                             🗑️ Delete
//                           </button>
//                         </div>
//                       )}
//                     </Draggable>
//                   ))}

//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           ))}
//         </div>
//       </DragDropContext>

//       {editingTask && (
//         <EditTaskModal
//           task={editingTask}
//           onClose={() => setEditingTask(null)}
//           onSave={fetchTasks}
//           onDelete={handleDeleteTask}
//         />
//       )}
//     </div>
//   );
// }


























"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
// import type { Task } from "../../types/task";
import type { Task } from "../../../types/task";


import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { FaSearch, FaSortAmountDownAlt, FaFileExcel, FaEye, FaEdit } from "react-icons/fa";

import EditTaskModal from "../components/EditTaskModal";
import TaskDetailsCard from "../components/TaskDetailsCard";
import TaskEditableCard from "../components/TaskEditableCard";

// ✅ Updated Task type
// export type Task = {
//   id: string;
//   title: string;
//   description?: string;
//   status: string;
//   dueDate?: string;
//   priority?: string;
//   assigner?: {
//     id?: string;
//     name?: string;
//     email?: string;
//   };
//   assignee?: {
//     id?: string;
//     name?: string;
//     email?: string;
//   };
//   assigneeId?: string;
//   createdByClerkId?: string;
//   updatedAt?: string;
//   createdAt?: string;
//   tags?: string[];
//   subtasks?: { title: string }[];
//   customFields?: Record<string, unknown>;
//   attachments?: string[];
// };

const columns = [
  {
    id: "todo",
    title: "\uD83D\uDCDD To Do",
    color: "border-blue-500",
    bgColor: "bg-gradient-to-br from-blue-100 to-blue-50",
  },
  {
    id: "inprogress",
    title: "\u23F3 In Progress",
    color: "border-yellow-600",
    bgColor: "bg-gradient-to-br from-yellow-100 to-yellow-50",
  },
  {
    id: "done",
    title: "\u2705 Done",
    color: "border-green-500",
    bgColor: "bg-gradient-to-br from-green-100 to-green-50",
  },
];

export default function Board() {
  const { user } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filterText, setFilterText] = useState("");
  const [sortBy, setSortBy] = useState("dueDate");
  const [viewMode, setViewMode] = useState<"view" | "edit">("view");
  const audioRef = useRef<HTMLAudioElement>(null);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch("/api/tasks");
      const json = await res.json();
      const taskArray = Array.isArray(json) ? json : json.tasks;

      // const relevantTasks = taskArray?.filter(
      //   (task: Task) =>
      //     task.assignee?.id === user?.id ||
      //     task.assigneeId === user?.id ||
      //     task.createdByClerkId === user?.id
      // );

      const relevantTasks = taskArray?.filter(
  (task: Task) =>
    task.assigneeId === user?.id ||
    task.createdByClerkId === user?.id
);


      setTasks(relevantTasks || []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) fetchTasks();
  }, [user?.id, fetchTasks]);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    const updated = tasks.map((t) =>
      t.id === draggableId ? { ...t, status: destination.droppableId } : t
    );
    setTasks(updated);

    try {
      await fetch(`/api/tasks/${draggableId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: destination.droppableId }),
      });
      fetchTasks();
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
      fetchTasks();
      setEditingTask(null);
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  const handleFieldUpdate = async (updatedTask: Task) => {
    try {
      await fetch(`/api/tasks/${updatedTask.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      fetchTasks();
    } catch (err) {
      console.error("Failed to update task", err);
    }
  };

  const exportTasksToCsv = () => {
    if (tasks.length === 0) return alert("No tasks to export.");

    const headers = [
      "ID", "Title", "Description", "Status", "Due Date", "Priority",
      "Assigner Name", "Assigner Email", "Assignee Name", "Assignee Email",
      "Created At", "Updated At", "Tags", "Subtasks", "Custom Fields", "Attachments"
    ];

    const csvRows = tasks.map((task) =>
      [
        task.id, task.title, task.description, task.status,
        task.dueDate ? new Date(task.dueDate).toLocaleString() : "",
        task.priority, task.assigner?.name, task.assigner?.email,
        task.assignee?.name, task.assignee?.email,
        task.createdAt ? new Date(task.createdAt).toLocaleString() : "",
        task.updatedAt ? new Date(task.updatedAt).toLocaleString() : "",
        task.tags?.join(", "),
        task.subtasks?.map((sub) => sub.title).join("; "),
        task.customFields ? Object.entries(task.customFields).map(([k, v]) => `${k}: ${v}`).join("; ") : "",
        task.attachments?.join("; ")
      ].map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
    );

    const csvContent = [headers.join(","), ...csvRows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `tasks_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  const sortedFilteredTasks = tasks
    .filter((task) => task.title?.toLowerCase().includes(filterText.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "priority") {
        const order: Record<string, number> = { high: 0, medium: 1, low: 2 };
        return (order[a.priority ?? ""] ?? 3) - (order[b.priority ?? ""] ?? 3);
      } else {
        const aTime = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        const bTime = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
        return aTime - bTime;
      }
    });

  return (
    <div className="p-4">
      <audio ref={audioRef} src="/alert.mp3" preload="auto" />

      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <FaSearch className="text-purple-600" />
          <input
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Filter tasks..."
            className="border border-purple-300 px-2 py-1 rounded-md text-sm"
            aria-label="Filter tasks"
          />
        </div>

        <div className="flex items-center gap-2">
          <FaSortAmountDownAlt className="text-purple-600" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-purple-300 px-2 py-1 rounded-md text-sm"
            aria-label="Sort tasks"
          >
            <option value="dueDate">Sort by Due Date</option>
            <option value="priority">Sort by Priority</option>
          </select>
        </div>

        <button
          onClick={() => setViewMode(viewMode === "view" ? "edit" : "view")}
          className="px-3 py-1 text-sm rounded-md border border-purple-600 text-purple-600 hover:bg-purple-100"
        >
          {viewMode === "view" ? (<><FaEdit className="inline mr-1" /> Edit Mode</>) : (<><FaEye className="inline mr-1" /> View Mode</>)}
        </button>

        <button
          onClick={exportTasksToCsv}
          disabled={tasks.length === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-white ${
            tasks.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
          aria-label="Export tasks to CSV"
        >
          <FaFileExcel /> Export to Excel
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col md:flex-row gap-4">
          {columns.map((col) => (
            <Droppable droppableId={col.id} key={col.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`rounded-lg p-4 flex-1 min-h-[400px] ${col.bgColor}`}
                >
                  <h2 className={`text-lg font-bold mb-3 text-purple-900 border-b pb-2 ${col.color}`}>{col.title}</h2>

                  {sortedFilteredTasks.filter((task) => task.status === col.id).map((task, index) => (
                    <Draggable draggableId={task.id} index={index} key={task.id}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-4 mb-3 rounded-xl shadow-md border-l-4 border-purple-500"
                        >
                          {viewMode === "edit" ? (
                            <TaskEditableCard task={task} onUpdate={handleFieldUpdate} />
                          ) : (
                            <TaskDetailsCard task={task} />
                          )}

                          <button
                            onClick={() => setEditingTask(task)}
                            className="text-sm text-blue-600 mt-2"
                            aria-label={`Edit task ${task.title}`}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="text-sm text-red-600 ml-4"
                            aria-label={`Delete task ${task.title}`}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={fetchTasks}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
}









