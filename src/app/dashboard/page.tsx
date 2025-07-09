"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type UserStat = {
  userName: string;
  email: string;
  taskCount: number;
  completedCount: number;
};

export default function DashboardPage() {
  const { user } = useUser();
  const [userStats, setUserStats] = useState<UserStat[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7)
  );

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`/api/stats/user-performance?month=${selectedMonth}`);
        const data = await res.json();
        setUserStats(data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    fetchStats();
  }, [selectedMonth]);

  const totalTasks = userStats.reduce((sum, u) => sum + u.taskCount, 0);
  const completedTasks = userStats.reduce((sum, u) => sum + u.completedCount, 0);
  const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  const mostActive =
    userStats.length > 0
      ? userStats.reduce((prev, curr) =>
          curr.taskCount > prev.taskCount ? curr : prev
        )
      : { userName: "N/A", taskCount: 0 };

  const email =
    typeof user?.emailAddresses?.[0]?.emailAddress === "string"
      ? user.emailAddresses[0].emailAddress
      : "Unknown";

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboard Overview</h1>

      <p className="text-sm text-gray-500 mb-4">
        Logged in as: {user?.username || email} ({String(user?.publicMetadata?.role || "user")})
      </p>

      <div className="mb-4">
        <label className="text-sm text-gray-600">Select Month: </label>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="ml-2 px-2 py-1 border rounded"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold">📌 Total Tasks</h3>
          <p className="text-2xl">{totalTasks}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold">✅ Completion Rate</h3>
          <p className="text-2xl">{completionRate}%</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold">🏆 Most Active</h3>
          <p className="text-lg">
            {mostActive.userName} ({mostActive.taskCount} tasks)
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4 h-96">
        <h2 className="text-xl font-semibold mb-4">📊 User Task Comparison</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={userStats}>
            <XAxis dataKey="userName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="taskCount" fill="#8884d8" name="Total Tasks" />
            <Bar dataKey="completedCount" fill="#82ca9d" name="Completed Tasks" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
