// "use client";

// import { Copy } from "lucide-react";
// import { useState } from "react";

// interface CloneTaskButtonProps {
//   taskId: string;
//   onCloned?: (newTask: any) => void; // Optional callback to refresh task list
// }

// export default function CloneTaskButton({ taskId, onCloned }: CloneTaskButtonProps) {
//   const [loading, setLoading] = useState(false);

//   const handleClone = async () => {
//     if (!confirm("Duplicate this task?")) return;

//     setLoading(true);
//     try {
//       const res = await fetch(`/api/tasks/${taskId}/clone`, { method: "POST" });
//       const data = await res.json();

//       if (res.ok) {
//         alert("✅ Task duplicated!");
//         onCloned?.(data.task);
//       } else {
//         alert(`❌ ${data.error || "Failed to duplicate task"}`);
//       }
//     } catch (error) {
//       console.error("Clone error:", error);
//       alert("❌ Failed to duplicate task");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button
//       onClick={handleClone}
//       disabled={loading}
//       title="Duplicate Task"
//       className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//     >
//       <Copy className={`w-5 h-5 ${loading ? "opacity-50" : "text-gray-500 hover:text-gray-800"}`} />
//     </button>
//   );
// }























"use client";

import { Copy } from "lucide-react";
import { useState } from "react";

interface CloneTaskButtonProps {
  taskId: string;
  taskTitle?: string; // ✅ Allow passing original title
  onCloned?: (newTask: any) => void; // Optional callback to refresh task list
}

export default function CloneTaskButton({ taskId, taskTitle = "", onCloned }: CloneTaskButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClone = async () => {
    const newTitle = prompt(
      "Enter a title for the cloned task:",
      `${taskTitle || "Untitled Task"} (Copy)`
    );

    // ❌ Cancel cloning if user pressed Cancel
    if (newTitle === null) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/tasks/${taskId}/clone`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle.trim() || `${taskTitle || "Untitled Task"} (Copy)` }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Task duplicated!");
        onCloned?.(data.task);
      } else {
        alert(`❌ ${data.error || "Failed to duplicate task"}`);
      }
    } catch (error) {
      console.error("Clone error:", error);
      alert("❌ Failed to duplicate task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClone}
      disabled={loading}
      title="Duplicate Task"
      className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    >
      <Copy
        className={`w-5 h-5 ${loading ? "opacity-50" : "text-gray-500 hover:text-gray-800"}`}
      />
    </button>
  );
}
