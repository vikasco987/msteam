"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

export default function DayReportByAssignerBar() {
  const [data, setData] = useState<any[]>([]);
  const [details, setDetails] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/stats/user-performance/day-report-by-assigner")
      .then((res) => res.json())
      .then((json) => setData(json.data || []));
  }, []);

  const fetchDetails = async (date: string) => {
    setSelectedDate(date);
    const res = await fetch(`/api/stats/user-performance/day-report-by-assigner?date=${date}`);
    const json = await res.json();
    setDetails(json.details || []);
  };

  return (
    <div className="bg-white shadow-md rounded-xl border p-4">
      <h2 className="text-lg font-semibold mb-4">📊 Day-by-Day Assigner Sales</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
            onClick={(state) => {
              if (state && state.activePayload && state.activePayload[0]) {
                const date = state.activePayload[0].payload.date;
                fetchDetails(date);
              }
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="date" type="category" width={100} />
            <Tooltip />
            <Bar dataKey="totalRevenue" fill="#4f46e5" radius={[0, 6, 6, 0]}>
              <LabelList dataKey="totalSales" position="insideRight" fill="#fff" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {selectedDate && details.length > 0 && (
        <div className="mt-6">
          <h3 className="text-md font-semibold mb-2">📌 Details for {selectedDate}</h3>
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Assigner</th>
                <th className="p-2">Email</th>
                <th className="p-2">Sales</th>
                <th className="p-2">Revenue</th>
                <th className="p-2">Received</th>
              </tr>
            </thead>
            <tbody>
              {details.map((d, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-2">{d.assigner}</td>
                  <td className="p-2">{d.email}</td>
                  <td className="p-2">{d.totalSales}</td>
                  <td className="p-2">₹{d.totalRevenue.toLocaleString()}</td>
                  <td className="p-2">₹{d.amountReceived.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
