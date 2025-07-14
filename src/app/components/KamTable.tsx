// "use client";

// import React, { useEffect, useState } from "react";

// interface Task {
//   id: string;
//   title: string;
//   shopName?: string;
//   customerName?: string;
//   packageAmount?: string;
//   startDate?: string;
//   endDate?: string;
//   timeline?: string;
//   assignerName?: string;
//   assignees?: { name?: string; email?: string }[];
//   customFields?: {
//     amount?: string;
//     amountReceived?: string;
//   };
// }

// export default function KamTableView() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchKamTasks = async () => {
//       try {
//         const res = await fetch("/api/tasks");
//         const data = await res.json();
//         const filtered = data.tasks.filter(
//           (t: Task) => t.title === "📂 Account Handling"
//         );
//         setTasks(filtered);
//       } catch (err) {
//         console.error("Failed to fetch Kam tasks:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchKamTasks();
//   }, []);

//   if (loading) return <p className="p-4">Loading...</p>;
//   if (tasks.length === 0)
//     return (
//       <p className="p-4 text-gray-500">No Account Handling tasks found.</p>
//     );

//   return (
//     <div className="p-6 bg-white rounded-lg shadow border border-gray-200 overflow-x-auto">
//       <h2 className="text-xl font-bold mb-4 text-purple-800">
//         📂 Account Handling
//       </h2>
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50 text-sm text-left font-semibold text-gray-700">
//           <tr>
//             <th className="px-4 py-2">Title</th>
//             <th className="px-4 py-2">Assigned By → To</th>
//             <th className="px-4 py-2">🏪 Shop Name</th>
//             <th className="px-4 py-2">👤 Customer Name</th>
//             <th className="px-4 py-2">💰 Amount</th>
//             <th className="px-4 py-2">✅ Received</th>
//             <th className="px-4 py-2">🧾 Pending</th>
//             <th className="px-4 py-2">🗓️ Start</th>
//             <th className="px-4 py-2">📅 End</th>
//             <th className="px-4 py-2">⏱️ Timeline</th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-100 text-sm">
//           {tasks.map((task) => {
//             const amount = Number(task.customFields?.amount || task.packageAmount || 0);
//             const received = Number(task.customFields?.amountReceived || 0);
//             const pending = amount - received;

//             return (
//               <tr key={task.id} className="hover:bg-gray-50 transition-colors">
//                 <td className="px-4 py-2">{task.title}</td>
//                 <td className="px-4 py-2">
//                   <span className="font-medium">{task.assignerName || "—"}</span>{" "}
//                   <span className="text-blue-500">→</span>{" "}
//                   {Array.isArray(task.assignees)
//                     ? task.assignees.map((a) => a?.name || "—").join(", ")
//                     : "—"}
//                 </td>
//                 <td className="px-4 py-2">{task.shopName || "—"}</td>
//                 <td className="px-4 py-2">{task.customerName || "—"}</td>
//                 <td className="px-4 py-2 font-medium text-gray-800">
//                   ₹ {amount.toLocaleString()}
//                 </td>
//                 <td className="px-4 py-2 text-green-700">
//                   ₹ {received.toLocaleString()}
//                 </td>
//                 <td className="px-4 py-2 text-rose-600">
//                   ₹ {pending.toLocaleString()}
//                 </td>
//                 <td className="px-4 py-2">{task.startDate || "—"}</td>
//                 <td className="px-4 py-2">{task.endDate || "—"}</td>
//                 <td className="px-4 py-2">{task.timeline || "—"}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }




// "use client";

// import React, { useEffect, useState } from "react";

// interface Task {
//   id: string;
//   title: string;
//   shopName?: string;
//   customerName?: string;
//   packageAmount?: string;
//   startDate?: string;
//   endDate?: string;
//   timeline?: string;
//   assignerName?: string;
//   assigneeName?: string;
//   assignees?: { name?: string; email?: string }[];
//   customFields?: {
//     amount?: number | string;
//     amountReceived?: number | string;
//   };
// }

// export default function KamTableView() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);
//   const [editedValues, setEditedValues] = useState<{ [key: string]: number }>({});

//   useEffect(() => {
//     const fetchKamTasks = async () => {
//       try {
//         const res = await fetch("/api/tasks");
//         const data = await res.json();
//         const filtered = data.tasks.filter((t: Task) => t.title === "📂 Account Handling");
//         setTasks(filtered);
//       } catch (err) {
//         console.error("Failed to fetch Kam tasks:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchKamTasks();
//   }, []);

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

//         const result = await res.json();
//         if (!res.ok) throw new Error(result.error || "Failed to update");

//         setTasks((prev) =>
//           prev.map((t) =>
//             t.id === taskId
//               ? {
//                   ...t,
//                   customFields: {
//                     ...t.customFields,
//                     [field]: value,
//                   },
//                 }
//               : t
//           )
//         );
//         setEditedValues((prev) => {
//           const copy = { ...prev };
//           delete copy[key];
//           return copy;
//         });
//       } catch (err) {
//         console.error("Update error:", err);
//         alert("Failed to update value");
//       }
//     }
//   };

//   if (loading) return <p className="p-4">Loading...</p>;
//   if (tasks.length === 0)
//     return <p className="p-4 text-gray-500">No Account Handling tasks found.</p>;

//   return (
//     <div className="p-6 bg-gradient-to-b from-purple-50 to-white rounded-2xl shadow-xl border border-purple-200 overflow-x-auto">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold text-purple-800">📂 Account Handling</h2>
//         <button
//           onClick={() => setEditMode((prev) => !prev)}
//           className="text-sm px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:brightness-110 transition"
//         >
//           {editMode ? "Disable Edit Mode" : "Enable Edit Mode"}
//         </button>
//       </div>
//       <table className="min-w-full divide-y divide-purple-200">
//         <thead className="bg-purple-100">
//           <tr>
//             <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Title</th>
//             <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Shop</th>
//             <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Customer</th>
//             <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Start</th>
//             <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">End</th>
//             <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Timeline</th>
//             <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">By → To</th>
//             <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Amount</th>
//             <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">✅ Received</th>
//             <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">🧾 Pending</th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-100">
//           {tasks.map((t) => {
//             const amount = Number(t.customFields?.amount) || 0;
//             const received = Number(t.customFields?.amountReceived) || 0;
//             const pending = amount - received;

//             return (
//               <tr key={t.id} className="hover:bg-purple-50 transition">
//                 <td className="px-4 py-3 text-sm font-medium text-gray-700">{t.title}</td>
                
//                 <td className="px-4 py-3 text-sm text-gray-700">{t.shopName || "—"}</td>
//                 <td className="px-4 py-3 text-sm text-gray-700">{t.customerName || "—"}</td>
//                 <td className="px-4 py-3 text-sm text-gray-700">{t.startDate || "—"}</td>
//                 <td className="px-4 py-3 text-sm text-gray-700">{t.endDate || "—"}</td>
//                 <td className="px-4 py-3 text-sm text-gray-700">{t.timeline || "—"}</td>
//                 <td className="px-4 py-3 text-sm text-gray-700">
//                   <strong>{t.assignerName}</strong> → {t.assignees?.map((a) => a?.name).join(", ") || t.assigneeName || "—"}
//                 </td>
//                 <td className="px-4 py-3 text-sm">
//                   {editMode ? (
//                     <input
//                       type="number"
//                       className="w-24 px-2 py-1 border border-purple-300 rounded-md text-sm focus:ring-2 focus:ring-purple-400"
//                       value={editedValues[`${t.id}-amount`] ?? amount}
//                       onChange={(e) => handleInputChange(t.id, "amount", Number(e.target.value))}
//                       onBlur={() => handleBlur(t.id, "amount")}
//                     />
//                   ) : (
//                     <span className="font-medium text-purple-700">₹{amount.toLocaleString("en-IN")}</span>
//                   )}
//                 </td>
//                 <td className="px-4 py-3 text-sm">
//                   {editMode ? (
//                     <input
//                       type="number"
//                       className="w-24 px-2 py-1 border border-purple-300 rounded-md text-sm focus:ring-2 focus:ring-emerald-400"
//                       value={editedValues[`${t.id}-amountReceived`] ?? received}
//                       onChange={(e) => handleInputChange(t.id, "amountReceived", Number(e.target.value))}
//                       onBlur={() => handleBlur(t.id, "amountReceived")}
//                     />
//                   ) : (
//                     <span className="text-emerald-600 font-medium">₹{received.toLocaleString("en-IN")}</span>
//                   )}
//                 </td>
//                 <td className="px-4 py-3 text-sm font-semibold text-rose-600">
//                   ₹{pending.toLocaleString("en-IN")}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }


















// "use client";

// import React, { useEffect, useState } from "react";
// import { format } from "date-fns";

// interface Task {
//   id: string;
//   title: string;
//   shopName?: string;
//   customerName?: string;
//   packageAmount?: string;
//   startDate?: string;
//   endDate?: string;
//   timeline?: string;
//   assignerName?: string;
//   assigneeName?: string;
//   createdAt?: string;
//   assignees?: { name?: string; email?: string }[];
//   customFields?: {
//     amount?: number | string;
//     amountReceived?: number | string;
//   };
// }

// export default function KamTableView() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);
//   const [editedValues, setEditedValues] = useState<{ [key: string]: number }>({});

//   useEffect(() => {
//     const fetchKamTasks = async () => {
//       try {
//         const res = await fetch("/api/tasks");
//         const data = await res.json();
//         const filtered = data.tasks.filter((t: Task) => t.title === "📂 Account Handling");
//         setTasks(filtered);
//       } catch (err) {
//         console.error("Failed to fetch Kam tasks:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchKamTasks();
//   }, []);

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

//         const result = await res.json();
//         if (!res.ok) throw new Error(result.error || "Failed to update");

//         setTasks((prev) =>
//           prev.map((t) =>
//             t.id === taskId
//               ? {
//                   ...t,
//                   customFields: {
//                     ...t.customFields,
//                     [field]: value,
//                   },
//                 }
//               : t
//           )
//         );
//         setEditedValues((prev) => {
//           const copy = { ...prev };
//           delete copy[key];
//           return copy;
//         });
//       } catch (err) {
//         console.error("Update error:", err);
//         alert("Failed to update value");
//       }
//     }
//   };

//   if (loading) return <p className="p-4">Loading...</p>;
//   if (tasks.length === 0)
//     return <p className="p-4 text-gray-500">No Account Handling tasks found.</p>;

//   return (
//     <div className="p-6 bg-gradient-to-b from-purple-50 to-white rounded-2xl shadow-xl border border-purple-200 overflow-x-auto">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold text-purple-800">📂 Account Handling</h2>
//         <button
//           onClick={() => setEditMode((prev) => !prev)}
//           className="text-sm px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:brightness-110 transition"
//         >
//           {editMode ? "Disable Edit Mode" : "Enable Edit Mode"}
//         </button>
//       </div>
//       <table className="min-w-full divide-y divide-purple-200">
//         <thead className="bg-purple-100">
//           <tr>
//             <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Title</th>
//             <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Created</th>
//             <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Shop</th>
//             <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Customer</th>
//             <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Start</th>
//             <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">End</th>
//             <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Timeline</th>
//             <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">By → To</th>
//             <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">💰 Pkg Amount</th>
//             <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Amount</th>
//             <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">✅ Received</th>
//             <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">🧾 Pending</th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-100">
//           {tasks.map((t) => {
//             const amount = Number(t.customFields?.amount) || 0;
//             const received = Number(t.customFields?.amountReceived) || 0;
//             const pending = amount - received;

//             return (
//               <tr key={t.id} className="hover:bg-purple-50 transition">
//                 <td className="px-4 py-3 text-sm font-medium text-gray-700">{t.title}</td>
//                 <td className="px-4 py-3 text-sm text-gray-600">{t.createdAt ? format(new Date(t.createdAt), "dd MMM yyyy") : "—"}</td>
//                 <td className="px-4 py-3 text-sm text-gray-700">{t.shopName || "—"}</td>
//                 <td className="px-4 py-3 text-sm text-gray-700">{t.customerName || "—"}</td>
//                 <td className="px-4 py-3 text-sm text-gray-700">{t.startDate || "—"}</td>
//                 <td className="px-4 py-3 text-sm text-gray-700">{t.endDate || "—"}</td>
//                 <td className="px-4 py-3 text-sm text-gray-700">{t.timeline || "—"}</td>
//                 <td className="px-4 py-3 text-sm text-gray-700">
//                   <strong>{t.assignerName}</strong> → {t.assignees?.map((a) => a?.name).join(", ") || t.assigneeName || "—"}
//                 </td>
//                 <td className="px-4 py-3 text-sm text-purple-700 font-semibold">₹{t.packageAmount || "—"}</td>
//                 <td className="px-4 py-3 text-sm">
//                   {editMode ? (
//                     <input
//                       type="number"
//                       className="w-24 px-2 py-1 border border-purple-300 rounded-md text-sm focus:ring-2 focus:ring-purple-400"
//                       value={editedValues[`${t.id}-amount`] ?? amount}
//                       onChange={(e) => handleInputChange(t.id, "amount", Number(e.target.value))}
//                       onBlur={() => handleBlur(t.id, "amount")}
//                     />
//                   ) : (
//                     <span className="font-medium text-purple-700">₹{amount.toLocaleString("en-IN")}</span>
//                   )}
//                 </td>
//                 <td className="px-4 py-3 text-sm">
//                   {editMode ? (
//                     <input
//                       type="number"
//                       className="w-24 px-2 py-1 border border-purple-300 rounded-md text-sm focus:ring-2 focus:ring-emerald-400"
//                       value={editedValues[`${t.id}-amountReceived`] ?? received}
//                       onChange={(e) => handleInputChange(t.id, "amountReceived", Number(e.target.value))}
//                       onBlur={() => handleBlur(t.id, "amountReceived")}
//                     />
//                   ) : (
//                     <span className="text-emerald-600 font-medium">₹{received.toLocaleString("en-IN")}</span>
//                   )}
//                 </td>
//                 <td className="px-4 py-3 text-sm font-semibold text-rose-600">
//                   ₹{pending.toLocaleString("en-IN")}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }












"use client";

import React, { useEffect, useState } from "react";
import { format } from "date-fns";

interface Task {
  id: string;
  title: string;
  shopName?: string;
  customerName?: string;
  packageAmount?: string;
  startDate?: string;
  endDate?: string;
  timeline?: string;
  assignerName?: string;
  assigneeName?: string;
  createdAt?: string;
  assignees?: { name?: string; email?: string }[];
  customFields?: {
    amount?: number | string;
    amountReceived?: number | string;
  };
}

export default function KamTableView() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState<{ [key: string]: number }>({});
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    const fetchKamTasks = async () => {
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();
        const filtered = data.tasks
          .filter((t: Task) => t.title === "📂 Account Handling")
          .filter((t: Task) =>
            [
              t.title,
              t.shopName,
              t.customerName,
              t.assignerName,
              t.assigneeName,
            ]
              .filter(Boolean)
              .join(" ")
              .toLowerCase()
              .includes(query.toLowerCase())
          )
          .slice(0, limit);
        setTasks(filtered);
      } catch (err) {
        console.error("Failed to fetch Kam tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchKamTasks();
  }, [query, limit]);

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

        const result = await res.json();
        if (!res.ok) throw new Error(result.error || "Failed to update");

        setTasks((prev) =>
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
          const copy = { ...prev };
          delete copy[key];
          return copy;
        });
      } catch (err) {
        console.error("Update error:", err);
        alert("Failed to update value");
      }
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (tasks.length === 0)
    return <p className="p-4 text-gray-500">No Account Handling tasks found.</p>;

  return (
    <div className="p-6 bg-gradient-to-b from-purple-50 to-white rounded-2xl shadow-xl border border-purple-200 overflow-x-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <h2 className="text-2xl font-bold text-purple-800">📂 Account Handling</h2>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search tasks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border px-3 py-1.5 rounded-md text-sm focus:ring-2 focus:ring-purple-400"
          />
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="border px-2 py-1 rounded-md text-sm"
          >
            {[10, 20, 50, 100].map((n) => (
              <option key={n} value={n}>{n} entries</option>
            ))}
          </select>
          <button
            onClick={() => setEditMode((prev) => !prev)}
            className="text-sm px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:brightness-110 transition"
          >
            {editMode ? "Disable Edit Mode" : "Enable Edit Mode"}
          </button>
        </div>
      </div>
      <table className="min-w-full divide-y divide-purple-200">
        <thead className="bg-purple-100">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Title</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Created</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Shop</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Customer</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Start</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">End</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Timeline</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">By → To</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">💰 Pkg Amount</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Amount</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">✅ Received</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">🧾 Pending</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {tasks.map((t) => {
            const amount = Number(t.customFields?.amount) || 0;
            const received = Number(t.customFields?.amountReceived) || 0;
            const pending = amount - received;

            return (
              <tr key={t.id} className="hover:bg-purple-50 transition">
                <td className="px-4 py-3 text-sm font-medium text-gray-700">{t.title}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{t.createdAt ? format(new Date(t.createdAt), "dd MMM yyyy") : "—"}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{t.shopName || "—"}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{t.customerName || "—"}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{t.startDate || "—"}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{t.endDate || "—"}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{t.timeline || "—"}</td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  <strong>{t.assignerName}</strong> → {t.assignees?.map((a) => a?.name).join(", ") || t.assigneeName || "—"}
                </td>
                <td className="px-4 py-3 text-sm text-purple-700 font-semibold">₹{t.packageAmount || "—"}</td>
                <td className="px-4 py-3 text-sm">
                  {editMode ? (
                    <input
                      type="number"
                      className="w-24 px-2 py-1 border border-purple-300 rounded-md text-sm focus:ring-2 focus:ring-purple-400"
                      value={editedValues[`${t.id}-amount`] ?? amount}
                      onChange={(e) => handleInputChange(t.id, "amount", Number(e.target.value))}
                      onBlur={() => handleBlur(t.id, "amount")}
                    />
                  ) : (
                    <span className="font-medium text-purple-700">₹{amount.toLocaleString("en-IN")}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm">
                  {editMode ? (
                    <input
                      type="number"
                      className="w-24 px-2 py-1 border border-purple-300 rounded-md text-sm focus:ring-2 focus:ring-emerald-400"
                      value={editedValues[`${t.id}-amountReceived`] ?? received}
                      onChange={(e) => handleInputChange(t.id, "amountReceived", Number(e.target.value))}
                      onBlur={() => handleBlur(t.id, "amountReceived")}
                    />
                  ) : (
                    <span className="text-emerald-600 font-medium">₹{received.toLocaleString("en-IN")}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-rose-600">
                  ₹{pending.toLocaleString("en-IN")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
