"use client";

import React, { useState, useEffect } from "react";

type MonthReport = {
  month: string;
  totalRevenue: number;
  amountReceived: number;
  pendingAmount: number;
  totalLeads: number;
};

export default function MonthReportTable() {
  const [data, setData] = useState<MonthReport[]>([]);
  const [monthFilter, setMonthFilter] = useState("");
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(`/api/stats/user-performance/mom-table?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((response) => {
        const fetchedData: MonthReport[] = response.data;
        setData(fetchedData);
        setTotal(response.total || 0);

        // Only extract available months once — not filtered!
        const months = Array.from(new Set(response.data.map((item) => item.month)))
          .sort()
          .reverse();
        setAvailableMonths(months);
      })
      .catch((err) => {
        console.error("Failed to fetch month-over-month table data:", err);
        setData([]);
        setTotal(0);
        setAvailableMonths([]);
      });
  }, [page, limit]);

  const filteredData = data.filter((item) =>
    monthFilter === "" || item.month.startsWith(monthFilter)
  );

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-xl p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">📆 Month-to-Month Report</h2>

      <div className="mb-4 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center">
          <label htmlFor="month-filter" className="mr-2 text-sm font-medium text-gray-700">
            Filter by Month:
          </label>
          <select
            id="month-filter"
            value={monthFilter}
            onChange={(e) => {
              setMonthFilter(e.target.value);
              setPage(1);
            }}
            className="border border-gray-300 px-3 py-1 rounded-md text-sm shadow-sm"
          >
            <option value="">All</option>
            {availableMonths.map((month) => (
              <option key={month} value={month}>
                {new Date(`${month}-01`).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 text-sm">
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

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 font-semibold text-gray-700">Date</th>
              <th className="p-3 font-semibold text-gray-700">Revenue</th>
              <th className="p-3 font-semibold text-gray-700">Received</th>
              <th className="p-3 font-semibold text-gray-700">Pending</th>
              <th className="p-3 font-semibold text-gray-700">Leads</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    {new Date(`${row.month}-01`).toLocaleDateString("en-IN", {
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-3">₹{row.totalRevenue.toLocaleString()}</td>
                  <td className="p-3">₹{row.amountReceived.toLocaleString()}</td>
                  <td className="p-3">₹{row.pendingAmount.toLocaleString()}</td>
                  <td className="p-3">{row.totalLeads.toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No data available.
                </td>
              </tr>
            )}
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
      </div>
    </div>
  );
}
