
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import EditTaskModal from "../components/EditTaskModal";
import { FaSearch, FaSortAmountDownAlt, FaFileExcel } from "react-icons/fa";

// ✅ Updated Task type
type Task = {
  id: string;
  title: string;
  description?: string;
  status: string;
  dueDate?: string;
  priority?: string;
  assigner?: {
    id?: string;
    name?: string;
    email?: string;
  };
  assignee?: {
    id?: string;
    name?: string;
    email?: string;
  };
  assigneeId?: string; // fallback if your API returns just this
  createdByClerkId?: string;
  updatedAt?: string;
  createdAt?: string;
  tags?: string[];
  subtasks?: { title: string }[];
  customFields?: Record<string, unknown>;
  attachments?: string[];
};

const columns = [
  {
    id: "todo",
    title: "📝 To Do",
    color: "border-blue-500",
    bgColor: "bg-gradient-to-br from-blue-100 to-blue-50",
  },
  {
    id: "inprogress",
    title: "⏳ In Progress",
    color: "border-yellow-600",
    bgColor: "bg-gradient-to-br from-yellow-100 to-yellow-50",
  },
  {
    id: "done",
    title: "✅ Done",
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
  const audioRef = useRef<HTMLAudioElement>(null);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch("/api/tasks");
      const json = await res.json();
      const taskArray = Array.isArray(json) ? json : json.tasks;

      // Filter tasks assigned to user or created by user
      const relevantTasks = taskArray?.filter(
        (task: Task) =>
          task.assignee?.id === user?.id ||
          task.assigneeId === user?.id || // fallback if assignee is string id
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
      setEditingTask(null); // close modal if open
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  const exportTasksToCsv = () => {
    if (tasks.length === 0) return alert("No tasks to export.");

    const headers = [
      "ID",
      "Title",
      "Description",
      "Status",
      "Due Date",
      "Priority",
      "Assigner Name",
      "Assigner Email",
      "Assignee Name",
      "Assignee Email",
      "Created At",
      "Updated At",
      "Tags",
      "Subtasks",
      "Custom Fields",
      "Attachments",
    ];

    const csvRows = tasks.map((task) =>
      [
        task.id,
        task.title,
        task.description,
        task.status,
        task.dueDate ? new Date(task.dueDate).toLocaleString() : "",
        task.priority,
        task.assigner?.name,
        task.assigner?.email,
        task.assignee?.name,
        task.assignee?.email,
        task.createdAt ? new Date(task.createdAt).toLocaleString() : "",
        task.updatedAt ? new Date(task.updatedAt).toLocaleString() : "",
        task.tags?.join(", "),
        task.subtasks?.map((sub) => sub.title).join("; "),
        task.customFields
          ? Object.entries(task.customFields)
              .map(([k, v]) => `${k}: ${v}`)
              .join("; ")
          : "",
        task.attachments?.join("; "),
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
        // Treat missing dueDate as far future to sort last
        const aTime = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        const bTime = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
        return aTime - bTime;
      }
    });

  return (
    <div className="p-4">
      <audio ref={audioRef} src="/alert.mp3" preload="auto" />

      <div className="flex justify-between items-center mb-4">
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
          onClick={exportTasksToCsv}
          disabled={tasks.length === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-white ${
            tasks.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
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
                  <h2
                    className={`text-lg font-bold mb-3 text-purple-900 border-b pb-2 ${col.color}`}
                  >
                    {col.title}
                  </h2>
                  {sortedFilteredTasks
                    .filter((task) => task.status === col.id)
                    .map((task, index) => (
                      <Draggable draggableId={task.id} index={index} key={task.id}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-4 mb-3 rounded-xl shadow-md border-l-4 border-purple-500"
                          >
                            <h3 className="text-purple-800 font-semibold text-lg mb-1">
                              {task.title}
                            </h3>
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
          onDelete={handleDeleteTask} // ✅ Required prop
        />
      )}
    </div>
  );
}
