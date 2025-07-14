// src/app/components/TaskTimeline.tsx
"use client";

import React, { useEffect, useState } from "react";
import { format, differenceInCalendarDays, addDays, isToday } from "date-fns";
import Image from "next/image"; // Import the Image component

interface Task {
  id: string;
  name: string;
  start: string;
  end: string;
  progress: number;
  assigneeIds?: string[];
}

const startDate = new Date("2025-07-10");
const endDate = new Date("2025-07-31");
const totalDays = differenceInCalendarDays(endDate, startDate) + 1;

export default function TaskTimeline() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [zoom, setZoom] = useState(40);
  // Removed selectedTask as it's declared but unused
  // const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/timeline", { cache: "no-store" });
        const data = await res.json();
        if (Array.isArray(data.tasks)) {
          setTasks(data.tasks);
        }
      } catch (err) {
        console.error("Failed to load timeline tasks:", err);
      }
    };
    fetchTasks();
  }, []);

  // 🔵 Generate unique avatar for each assignee
  const allAssignees = Array.from(
    new Set(tasks.flatMap((task) => task.assigneeIds || []))
  );

  const assigneeAvatarMap = Object.fromEntries(
    allAssignees.map((id) => [
      id,
      `https://api.dicebear.com/7.x/identicon/svg?seed=${id}`,
    ])
  );

  // 🔵 Filter by search term & avatar
  const filteredTasks = tasks.filter((task) => {
    const hasSelectedAvatar =
      selectedAvatar === null ||
      (task.assigneeIds || []).includes(selectedAvatar);
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase());
    return hasSelectedAvatar && matchesSearch;
  });

  return (
    <div className="space-y-4 p-4 bg-white rounded-xl shadow-md overflow-x-auto">
      {/* 🔍 Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-600">Filter by assignee:</span>
          {allAssignees.map((id) => (
            <Image // Migrated from <img> to <Image>
              key={id}
              src={assigneeAvatarMap[id]}
              alt="avatar"
              width={32} // Added width prop for Image component
              height={32} // Added height prop for Image component
              className={`w-8 h-8 rounded-full object-cover cursor-pointer border-2 ${
                selectedAvatar === id ? "border-blue-500" : "border-transparent"
              }`}
              onClick={() =>
                setSelectedAvatar((prev) => (prev === id ? null : id))
              }
            />
          ))}
        </div>

        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm w-64"
        />

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500">Zoom:</label>
          <input
            type="range"
            min={20}
            max={100}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
        </div>
      </div>

      {/* 📅 Timeline Grid */}
      <div
        className="relative grid border border-gray-200"
        style={{ gridTemplateColumns: `200px repeat(${totalDays}, minmax(${zoom}px, 1fr))` }}
      >
        {/* Header Row */}
        <div className="bg-gray-100 p-2 font-semibold text-sm text-center border-r">Task</div>
        {Array.from({ length: totalDays }).map((_, i) => {
          const current = addDays(startDate, i);
          const isTodayColumn = isToday(current);
          return (
            <div
              key={i}
              className={`text-[11px] p-1 text-center border-r border-b border-gray-200 ${
                isTodayColumn ? "bg-yellow-100 font-bold text-yellow-900" : "bg-gray-50"
              }`}
            >
              {format(current, "dd")}
            </div>
          );
        })}

        {/* Task Rows */}
        {filteredTasks.map((task) => {
          const startOffset = differenceInCalendarDays(new Date(task.start), startDate);
          const duration =
            differenceInCalendarDays(new Date(task.end), new Date(task.start)) + 1;

          return (
            <React.Fragment key={task.id}>
              <div
                className="p-2 text-sm font-medium border-t border-r bg-gray-100 flex items-center gap-2 cursor-pointer"
                // Removed onClick={() => setSelectedTask(task)} as selectedTask is unused
                // onClick={() => setSelectedTask(task)}
              >
                {(task.assigneeIds || []).map((id) => (
                  <Image // Migrated from <img> to <Image>
                    key={id}
                    src={assigneeAvatarMap[id]}
                    alt="avatar"
                    width={20} // Added width prop for Image component
                    height={20} // Added height prop for Image component
                    className="w-5 h-5 rounded-full object-cover"
                  />
                ))}
                <span>{task.name}</span>
              </div>

              {Array.from({ length: totalDays }).map((_, i) => {
                const isBar = i >= startOffset && i < startOffset + duration;
                const bgColor =
                  task.progress === 100
                    ? "bg-green-500"
                    : task.progress > 0
                    ? "bg-blue-500"
                    : "bg-gray-300";

                return (
                  <div
                    key={i}
                    className={`h-6 border-t border-r ${isBar ? `${bgColor} relative` : ""}`}
                  >
                    {isBar && (
                      <div
                        className="h-full absolute top-0 left-0 bg-white/20 text-white text-[10px] px-1 flex items-center"
                        style={{ width: `${task.progress}%` }}
                      >
                        {task.progress}%
                      </div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}