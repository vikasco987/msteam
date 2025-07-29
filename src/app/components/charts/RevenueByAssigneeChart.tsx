// src/components/charts/RevenueByAssigneeChart.tsx
"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RevenueByAssigneeChart({ data }: { data: any[] }) {
  return (
    <div className="p-4 bg-white shadow-md rounded-xl border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Revenue by Assignee</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart layout="vertical" data={data}>
          <XAxis type="number" />
          <YAxis dataKey="assignee" type="category" />
          <Tooltip />
          <Bar dataKey="revenue" fill="#38bdf8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
