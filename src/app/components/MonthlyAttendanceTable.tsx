"use client";
import { useEffect, useState } from "react";

interface TableData {
  headers: string[];
  rows: Record<string, string>[];
}

export default function MonthlyAttendanceTable({ month }: { month: string }) {
  const [data, setData] = useState<TableData | null>(null);

  useEffect(() => {
    fetch(`/api/attendance/monthly?month=${month}`)
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("❌ Fetch monthly failed:", err));
  }, [month]);

  if (!data) return <p>Loading...</p>;
  if (data.rows.length === 0) return <p>No attendance records for {month}</p>;

  return (
    <div className="overflow-auto border rounded-lg shadow-md">
      <table className="min-w-full border-collapse text-xs">
        <thead>
          <tr className="bg-gray-100">
            {data.headers.map(h => (
              <th key={h} className="px-2 py-1 border">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {data.headers.map(h => (
                <td key={h} className="px-2 py-1 border text-center">
                  {row[h]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

