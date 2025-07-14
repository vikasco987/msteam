import TaskTimeline from "../components/TaskTimeline";

export default function TimelinePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-purple-800">📊 Project Timeline</h1>
      <TaskTimeline />
    </div>
  );
}
