// // src/app/components/TaskEditableCard.tsx
// "use client";

// import React, { useState } from "react";

// interface Props {
//   task: {
//     id: string;
//     title: string;
//     description?: string;
//     dueDate?: string;
//     priority?: string;
//     tags?: string[];
//     customFields?: {
//       shopName?: string;
//       outletName?: string;
//       phone?: string;
//       email?: string;
//       location?: string;
//       accountNumber?: string;
//       ifscCode?: string;
//     };
//   };
//   onUpdate: (taskId: string, updates: Partial<Props["task"]>) => void;
//   editable?: boolean; // New prop to toggle edit mode
// }

// export default function TaskEditableCard({ task, onUpdate, editable = true }: Props) {
//   const [editedTask, setEditedTask] = useState({
//     title: task.title,
//     description: task.description || "",
//     dueDate: task.dueDate || "",
//     priority: task.priority || "",
//     tags: task.tags?.join(", ") || "",
//     ...task.customFields,
//   });

//   const handleBlur = () => {
//     const updatedFields = {
//       title: editedTask.title,
//       description: editedTask.description,
//       dueDate: editedTask.dueDate,
//       priority: editedTask.priority,
//       tags: editedTask.tags.split(",").map((tag) => tag.trim()),
//       customFields: {
//         shopName: editedTask.shopName,
//         outletName: editedTask.outletName,
//         phone: editedTask.phone,
//         email: editedTask.email,
//         location: editedTask.location,
//         accountNumber: editedTask.accountNumber,
//         ifscCode: editedTask.ifscCode,
//       },
//     };
//     onUpdate(task.id, updatedFields);
//   };

//   const handleChange = (field: string, value: string) => {
//     setEditedTask((prev) => ({ ...prev, [field]: value }));
//   };

//   const renderField = (label: string, key: string, type: 'text' | 'date' | 'textarea' = 'text') => {
//     const value = editedTask[key as keyof typeof editedTask] || "";
//     if (!editable) {
//       return (
//         <p><strong>{label}:</strong> {value}</p>
//       );
//     }
//     if (type === 'textarea') {
//       return (
//         <textarea
//           value={value}
//           onChange={(e) => handleChange(key, e.target.value)}
//           onBlur={handleBlur}
//           className="w-full border rounded px-2 py-1"
//           placeholder={`${label}`}
//         />
//       );
//     }
//     return (
//       <input
//         type={type}
//         value={value}
//         onChange={(e) => handleChange(key, e.target.value)}
//         onBlur={handleBlur}
//         placeholder={label}
//         className="w-full border rounded px-2 py-1"
//       />
//     );
//   };

//   return (
//     <div className="space-y-2 text-sm text-gray-800">
//       {renderField("🟣 Title", "title")}
//       {renderField("📝 Description", "description", "textarea")}
//       {renderField("📅 Due Date", "dueDate", "date")}
//       {renderField("🔥 Priority", "priority")}
//       {renderField("🏷️ Tags (comma separated)", "tags")}

//       {/* Custom Fields */}
//       {[
//         { label: "🏪 Shop Name", key: "shopName" },
//         { label: "🏷️ Outlet Name", key: "outletName" },
//         { label: "📞 Phone", key: "phone" },
//         { label: "📧 Email", key: "email" },
//         { label: "📍 Location", key: "location" },
//         { label: "🏦 Account Number", key: "accountNumber" },
//         { label: "🔢 IFSC Code", key: "ifscCode" },
//       ].map(({ label, key }) => (
//         <div key={key}>{renderField(label, key)}</div>
//       ))}
//     </div>
//   );
// }







"use client";

import React, { useState } from "react";

type Task = {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority?: string;
  tags?: string[];
  subtasks?: { title: string }[];
  assigner?: { name?: string; email?: string };
  assignee?: { name?: string; email?: string };
  customFields?: Record<string, any>;
};

interface Props {
  task: Task;
  onUpdate: (updatedTask: Task) => void;
}

export default function TaskEditableCard({ task, onUpdate }: Props) {
  const [formData, setFormData] = useState<Task>({ ...task });

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCustomChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      customFields: { ...prev.customFields, [key]: value },
    }));
  };

  const handleSave = () => {
    onUpdate(formData);
  };

  return (
    <div className="space-y-2 text-sm text-gray-800">
      <input
        value={formData.title}
        onChange={(e) => handleChange("title", e.target.value)}
        className="w-full px-2 py-1 border rounded"
        placeholder="Task title"
      />

      <textarea
        value={formData.description || ""}
        onChange={(e) => handleChange("description", e.target.value)}
        className="w-full px-2 py-1 border rounded"
        placeholder="Description"
      />

      <input
        type="date"
        value={formData.dueDate || ""}
        onChange={(e) => handleChange("dueDate", e.target.value)}
        className="w-full px-2 py-1 border rounded"
      />

      <select
        value={formData.priority || ""}
        onChange={(e) => handleChange("priority", e.target.value)}
        className="w-full px-2 py-1 border rounded"
      >
        <option value="">Select Priority</option>
        <option value="high">🔥 High</option>
        <option value="medium">⚖️ Medium</option>
        <option value="low">🧊 Low</option>
      </select>

      <input
        type="text"
        value={formData.assignee?.name || ""}
        onChange={(e) =>
          handleChange("assignee", { ...formData.assignee, name: e.target.value })
        }
        className="w-full px-2 py-1 border rounded"
        placeholder="Assignee Name"
      />

      <input
        type="email"
        value={formData.assignee?.email || ""}
        onChange={(e) =>
          handleChange("assignee", { ...formData.assignee, email: e.target.value })
        }
        className="w-full px-2 py-1 border rounded"
        placeholder="Assignee Email"
      />

      {formData.customFields &&
        Object.entries(formData.customFields).map(([key, value]) => (
          <input
            key={key}
            value={value}
            onChange={(e) => handleCustomChange(key, e.target.value)}
            className="w-full px-2 py-1 border rounded"
            placeholder={key}
          />
        ))}

      <button
        onClick={handleSave}
        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        💾 Save
      </button>
    </div>
  );
}
