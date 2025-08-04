"use client";

import React, { useEffect, useState } from "react";
import { IndianRupee, Calendar } from "lucide-react";
import { motion } from "framer-motion";

type CategorySales = {
  category: string;
  label: string;
  totalSales: number;
  totalRevenue: number;
  amountReceived: number;
};

export default function CategorySalesTable() {
  const [data, setData] = useState<CategorySales[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // Format month label (Aug 2025)
  const formatMonthLabel = (date: Date) =>
    date.toLocaleString("en-US", { month: "short", year: "numeric" });

  // Format month value (2025-08)
  const formatMonthValue = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

  // Last 12 months
  const monthsList = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return {
      label: formatMonthLabel(date),
      value: formatMonthValue(date),
    };
  });

  // Fetch API
  const fetchData = async (month: string) => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/stats/user-performance/category-sales?month=${month}`
      );
      const json = await res.json();
      setData(json.data || []);
    } catch (error) {
      console.error("Failed to load category sales:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentMonth = formatMonthValue(new Date());
    setSelectedMonth(currentMonth);
    fetchData(currentMonth);
  }, []);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = e.target.value;
    setSelectedMonth(month);
    fetchData(month);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-2xl border border-gray-100 font-sans text-gray-900 transition-shadow duration-300 hover:shadow-3xl">
      {/* Header */}
      <div className="mb-6 border-b pb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          📊 Category-wise Sales
        </h2>
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
        >
          {monthsList.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-500 text-center py-10">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          No sales data available.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <tr>
                <th className="p-4 font-bold tracking-wider">Category</th>
                <th className="p-4 font-bold tracking-wider text-right">
                  Sales Count
                </th>
                <th className="p-4 font-bold tracking-wider text-right">
                  Total Revenue
                </th>
                <th className="p-4 font-bold tracking-wider text-right">
                  Amount Received
                </th>
                <th className="p-4 font-bold tracking-wider text-right">
                  Pending
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((c, idx) => {
                const pending = c.totalRevenue - c.amountReceived;
                const rowBg =
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50";
                return (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`border-b hover:bg-gray-100 transition-colors duration-200 ${rowBg}`}
                  >
                    <td className="p-4 font-medium">{c.label}</td>
                    <td className="p-4 text-right font-semibold">
                      {c.totalSales}
                    </td>
                    <td className="p-4 text-right font-semibold text-green-700">
                      ₹{c.totalRevenue.toLocaleString()}
                    </td>
                    <td className="p-4 text-right font-semibold text-blue-700">
                      ₹{c.amountReceived.toLocaleString()}
                    </td>
                    <td className="p-4 text-right">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-bold ${
                          pending === 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        ₹{pending.toLocaleString()}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
