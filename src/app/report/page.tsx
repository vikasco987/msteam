



// "use client";

// import React, { useEffect, useState } from "react";
// import TaskTableView from "@/app/components/TaskTableView";
// import { Task } from "@/types/task";
// import { useUser } from "@clerk/nextjs";

// export default function ReportPage() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const { user, isLoaded } = useUser();

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const res = await fetch("/api/tasks");
//         const data = await res.json();

//         if (Array.isArray(data.tasks)) {
//           setTasks(data.tasks);
//         } else {
//           console.warn("Tasks not in expected array format:", data);
//           setTasks([]);
//         }
//       } catch (err) {
//         console.error("Failed to fetch tasks:", err);
//       }
//     };

//     if (user && (user.publicMetadata.role === "admin" || user.publicMetadata.role === "seller")) {
//       fetchTasks();
//     }
//   }, [user]);

//   if (!isLoaded) return <div>Loading user...</div>;

//   const role = user?.publicMetadata?.role;

//   if (role !== "admin" && role !== "seller") {
//     return <div className="p-6 text-red-500">⛔ Access Denied: You are not authorized to view this page.</div>;
//   }

//   return (
//     <main className="p-6">
//       <h1 className="text-2xl font-bold mb-4">📋 Task Report</h1>
//       <TaskTableView tasks={tasks} user={user} />
//     </main>
//   );
// }




















// "use client";

// import React, { useEffect, useState } from "react";
// import TaskTableView from "@/app/components/TaskTableView";
// import { Task } from "@/types/task";
// import { useUser } from "@clerk/nextjs";

// export default function ReportPage() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const { user, isLoaded } = useUser();

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const res = await fetch("/api/tasks");
//         const data = await res.json();

//         if (Array.isArray(data.tasks)) {
//           setTasks(data.tasks);
//         } else {
//           console.warn("Tasks not in expected array format:", data);
//           setTasks([]);
//         }
//       } catch (err) {
//         console.error("Failed to fetch tasks:", err);
//       }
//     };

//     if (user && (user.publicMetadata.role === "admin" || user.publicMetadata.role === "seller")) {
//       fetchTasks();
//     }
//   }, [user]);

//   if (!isLoaded) return <div>Loading user...</div>;

//   const role = user?.publicMetadata?.role;

//   if (role !== "admin" && role !== "seller") {
//     return <div className="p-6 text-red-500">⛔ Access Denied: You are not authorized to view this page.</div>;
//   }

//   return (
//     <main className="p-6">
//       <h1 className="text-2xl font-bold mb-4">📋 Task Report</h1>
//       <TaskTableView tasks={tasks} user={user} />
//     </main>
//   );
// }















"use client";

import React, { useEffect, useState } from "react";
import TaskTableView from "@/app/components/TaskTableView";
import { Task } from "@/types/task";
import { useUser } from "@clerk/nextjs";

export default function ReportPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user, isLoaded } = useUser();

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

    if (user && (user.publicMetadata.role === "admin" || user.publicMetadata.role === "seller")) {
      fetchTasks();
    }
  }, [user]);

  if (!isLoaded || !user) { // Combined loading and null user check
    return <div className="p-6 text-gray-500">Loading user...</div>;
  }

  const role = user.publicMetadata?.role;

  if (role !== "admin" && role !== "seller") {
    return <div className="p-6 text-red-500">⛔ Access Denied</div>;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">📋 Task Report</h1>
      <TaskTableView tasks={tasks} user={user} />
    </main>
  );
}