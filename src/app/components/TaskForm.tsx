"use client";

import React, { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/nextjs";

type TeamMember = {
  id: string;
  email: string;
  name?: string;
};

export default function TaskForm() {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");
  const [projectId, setProjectId] = useState("");
  const [tags, setTags] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [assigneeId, setAssigneeId] = useState("");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Team Members using Clerk JWT (template: fallback)
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const token = await getToken({ template: "fallback" });
        if (!token) throw new Error("⚠️ Missing Clerk JWT token");

        const res = await fetch("/api/team-members", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error(`Failed to fetch users (${res.status})`);
        const data = await res.json();

        if (!Array.isArray(data)) throw new Error("Team data not array");
        setTeamMembers(data);
      } catch (err) {
        console.error("❌ Error fetching team members:", err);
      }
    };

    fetchTeamMembers();
  }, [getToken]);

  // ✅ Create Task using Clerk token
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = await getToken({ template: "fallback" });
      if (!token) throw new Error("Missing token from Clerk");

      const taskData = {
        title,
        status,
        projectId,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        dueDate,
        priority,
        assigneeId,
        assignerEmail: user?.emailAddresses?.[0]?.emailAddress || "unknown@domain.com",
        assignerName: user?.fullName || "Unknown User",
      };

      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        alert("✅ Task created!");
        setTitle("");
        setStatus("todo");
        setProjectId("");
        setTags("");
        setDueDate("");
        setPriority("medium");
        setAssigneeId("");
      } else {
        alert("❌ Task creation failed: " + (result.message || "Unknown error"));
        console.error("Response:", result);
      }
    } catch (err) {
      console.error("❌ Task submission error:", err);
      alert("❌ Could not create task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md p-4 bg-white rounded shadow">
      <input
        className="w-full border p-2 rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="Project ID"
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <input
        className="w-full border p-2 rounded"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="Priority (low, medium, high)"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      />
      <select
        className="w-full border p-2 rounded"
        value={assigneeId}
        onChange={(e) => setAssigneeId(e.target.value)}
        required
      >
        <option value="">👤 Assign to team member</option>
        {teamMembers
          .sort((a, b) => (a.name || a.email).localeCompare(b.name || b.email))
          .map((member) => (
            <option key={member.id} value={member.id}>
              {member.name || member.email} ({member.email})
            </option>
          ))}
      </select>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
}
