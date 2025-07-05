"use client";

import React, { useEffect, useState } from "react";
import TaskTableView from "@/app/components/TaskTableView";
import { Task } from "@/types/task"; // Ensure this matches your type path

export default function ReportPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();

        if (Array.isArray(data.tasks)) {
          setTasks(data.tasks);
        } else {
          console.warn("Tasks not in expected array format:", data);
          setTasks([]);
        }
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      }
    };

    fetchTasks();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">📋 Task Report</h1>
      <TaskTableView tasks={tasks} />
    </main>
  );
}

