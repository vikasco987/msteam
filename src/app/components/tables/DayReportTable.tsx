"use client";

import React, { useEffect, useState } from "react";

type DayReport = {
  date: string;
  totalLeads: number;
  totalRevenue: number;
  amountReceived: number;
  pendingAmount: number;
};

export default function DayReportTable() {
  const [data, setData] = useState<DayReport[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / limit);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/stats/user-performance/day-report?page=${page}&limit=${limit}`);
      const json = await res.json();
      setData(json.data || []);
      setTotal(json.total || 0);
    } catch (err) {
      console.error("Failed to load daily report:", err);
      setData([]);
      setTotal(0);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, limit]);

  return (
    <div className="bg-white shadow-md rounded-xl border border-gray-200 p-4 mt-8">
      <h2 className="text-lg font-semibold mb-4">📅 Day-to-Day Report</h2>

      {data.length === 0 ? (
        <p className="text-gray-500">No daily data available.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="p-2">Date</th>
                  <th className="p-2">Leads</th>
                  <th className="p-2">Total Revenue</th>
                  <th className="p-2">Amount Received</th>
                  <th className="p-2">Pending</th>
                </tr>
              </thead>
              <tbody>
                {data.map((day, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-2">{day.date}</td>
                    <td className="p-2">{day.totalLeads}</td>
                    <td className="p-2">₹{day.totalRevenue.toLocaleString()}</td>
                    <td className="p-2">₹{day.amountReceived.toLocaleString()}</td>
                    <td className="p-2">₹{day.pendingAmount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-wrap justify-between items-center mt-4 gap-4">
            {/* Rows per page selector */}
            <div className="flex items-center gap-2">
              <label htmlFor="limit" className="text-sm text-gray-600">
                Rows per page:
              </label>
              <select
                id="limit"
                value={limit}
                onChange={(e) => {
                  setPage(1); // reset to page 1 on limit change
                  setLimit(Number(e.target.value));
                }}
                className="border px-2 py-1 rounded text-sm"
              >
                {[5, 10, 25, 50, 100].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Page navigation */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm">
                Page {page} of {totalPages || 1}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
