"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function CumulativeMonthChart({ data }: { data: any[] }) {
  return (
    <div className="p-4 bg-white shadow-md rounded-xl border border-gray-200 mb-6">
      <h2 className="text-lg font-semibold mb-4">📅 Cumulative Monthly Revenue</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="cumulativeRevenue"
            stroke="#4f46e5"
            fill="#c7d2fe"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
