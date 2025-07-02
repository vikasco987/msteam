'use client';

import React, { useState } from 'react';

export default function TaskForm() {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [projectId, setProjectId] = useState('');
  const [tags, setTags] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [assigneeId, setAssigneeId] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const taskData = {
      title,
      status,
      projectId,
      tags: tags.split(',').map((tag) => tag.trim()),
      dueDate,
      priority,
      assigneeId,
    };

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });

      const result = await res.json();

      if (result.success) {
        alert("✅ Task created!");
        // Reset form fields
        setTitle('');
        setStatus('');
        setProjectId('');
        setTags('');
        setDueDate('');
        setPriority('');
        setAssigneeId('');
      } else {
        alert("❌ Error creating task");
      }
    } catch (error) {
      console.error("Error submitting task:", error);
      alert("❌ Failed to create task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md p-4 bg-white rounded shadow">
      <input
        className="w-full border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        className="w-full border p-2 rounded"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        placeholder="Status"
      />
      <input
        className="w-full border p-2 rounded"
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
        placeholder="Project ID"
      />
      <input
        className="w-full border p-2 rounded"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma separated)"
      />
      <input
        className="w-full border p-2 rounded"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <input
        className="w-full border p-2 rounded"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        placeholder="Priority"
      />
      <input
        className="w-full border p-2 rounded"
        value={assigneeId}
        onChange={(e) => setAssigneeId(e.target.value)}
        placeholder="Assignee ID"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Create Task
      </button>
    </form>
  );
}
