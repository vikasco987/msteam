// src/app/create-task/page.tsx
'use client';

import TaskForm from '../components/TaskForm';

export default function CreateTaskPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📝 Create Task</h1>
      <TaskForm />
    </div>
  );
}
