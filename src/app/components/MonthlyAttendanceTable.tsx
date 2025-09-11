"use client";

import { useEffect, useState } from "react";

interface TableData {
  headers: string[];
  rows: Record<string, string>[];
}

export default function MonthlyAttendanceTable({ month }: { month: string }) {
  const [data, setData] = useState<TableData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/attendance/monthly?month=${month}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        // validate structure
        if (!json || !Array.isArray(json.headers) || !Array.isArray(json.rows)) {
          throw new Error("Invalid response format");
        }

        setData(json);
      } catch (err: any) {
        console.error("❌ Fetch monthly failed:", err);
        setError(err.message || "Failed to load data");
        setData({ headers: ["Employee"], rows: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [month]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">Error: {error}</p>;
  if (!data || data.rows.length === 0)
    return <p className="p-4">No attendance records for {month}</p>;

  return (
    <div className="overflow-auto border rounded-lg shadow-lg bg-white">
      <table className="min-w-full border-collapse text-sm">
        <thead className="sticky top-0 bg-gray-800 text-white text-xs uppercase tracking-wide">
          <tr>
            {data.headers.map((h) => (
              <th key={h} className="px-3 py-2 border">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, i) => (
            <tr
              key={i}
              className={
                i % 2 === 0
                  ? "bg-gray-50 hover:bg-gray-100"
                  : "bg-white hover:bg-gray-100"
              }
            >
              {data.headers.map((h) => (
                <td key={h} className="px-3 py-2 border text-center">
                  {row[h] ?? "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
