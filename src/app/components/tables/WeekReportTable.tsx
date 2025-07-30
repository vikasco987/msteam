"use client";

import React, { useEffect, useState } from "react";

type WeekReport = {
  week: string;
  startDate: string;
  endDate: string;
  totalLeads: number;
  totalRevenue: number;
  amountReceived: number;
  pendingAmount: number;
};

export default function WeekReportTable() {
  const [data, setData] = useState<WeekReport[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(`/api/stats/user-performance/week-report?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data || []);
        setTotal(res.total || 0);
      })
      .catch((err) => {
        console.error("Failed to load week report:", err);
        setData([]);
        setTotal(0);
      });
  }, [page, limit]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="bg-white shadow-md rounded-xl border border-gray-200 p-4 mt-8">
      <h2 className="text-lg font-semibold mb-4">📅 Week-over-Week Report</h2>
      {data.length === 0 ? (
        <p className="text-gray-500">No weekly data available.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="p-2">Week</th>
                  <th className="p-2">Date Range</th>
                  <th className="p-2">Leads</th>
                  <th className="p-2">Total Revenue</th>
                  <th className="p-2">Amount Received</th>
                  <th className="p-2">Pending</th>
                </tr>
              </thead>
              <tbody>
                {data.map((week, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      Week of{" "}
                      {new Date(week.week).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-2">
                      {new Date(week.startDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      -{" "}
                      {new Date(week.endDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-2">{week.totalLeads}</td>
                    <td className="p-2">₹{week.totalRevenue.toLocaleString()}</td>
                    <td className="p-2">₹{week.amountReceived.toLocaleString()}</td>
                    <td className="p-2">₹{week.pendingAmount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-between items-center text-sm">
            <span>
              Page {page} of {totalPages}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="limit">Rows:</label>
              <select
                id="limit"
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPage(1);
                }}
                className="border px-2 py-1 rounded"
              >
                {[5, 10, 20, 50].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
