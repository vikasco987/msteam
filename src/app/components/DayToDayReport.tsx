





"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Search, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Typescript interfaces for data
interface ReportEntry {
  taskNumber: number;
  shopName: string;
   mobileNumber?: string;   //
  firstCreatedAt: string;
  totalRevenue: number;
  totalReceived: number;
  pending: number;
}

// helper: returns current month in YYYY-MM format
const getCurrentMonth = (): string => {
  return format(new Date(), "yyyy-MM");
};

export default function ShopReport({ month }: { month?: string }) {
  // State management
  const [data, setData] = useState<ReportEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Fetch data from API on component mount or month change
  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      setError(null);
      setData([]);

      try {
        const safeMonth =
          month && /^\d{4}-\d{2}$/.test(month) ? month : getCurrentMonth();
        const res = await fetch(`/api/seller/day-report?month=${safeMonth}`);

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(
            `Failed to fetch shop report. Status: ${res.status} ${res.statusText}. Message: ${errText}`
          );
        }

        const report: ReportEntry[] = await res.json();
        if (!Array.isArray(report)) {
          throw new Error("Invalid data format received from server");
        }

        setData(report);
      } catch (err: any) {
        console.error("Error fetching shop report:", err);
        setError(
          err.message || "Unknown error occurred while fetching report"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [month]);

  // Filter data based on search input
  const filteredData = data.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Format date for display
  const formatDate = (isoDate: string) => {
    return format(new Date(isoDate), "EEE, d LLL yyyy");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <span className="text-4xl text-blue-600">📊</span> Shop Report
          </h2>

          {/* Search input with icon */}
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by shop, revenue, or status..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl bg-white shadow-sm
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Conditional rendering for states with animation */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-blue-600 py-10"
            >
              <Loader2 className="inline-block animate-spin text-4xl" />
              <p className="mt-2 text-lg">Loading report...</p>
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg shadow-sm"
            >
              <h3 className="font-bold text-lg mb-2">Error</h3>
              <p>{error}</p>
            </motion.div>
          )}

          {!loading && !error && data.length === 0 && (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-500 py-10"
            >
              <p className="text-lg">No report data available for this month.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Data Table with animation */}
        <AnimatePresence>
          {!loading && !error && data.length > 0 && (
            <motion.div
              key="data-table"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg"
            >
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
                      Shop
                    </th>
                    <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
  Mobile
</th>

                    <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
                      First Task Date
                    </th>
                    <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
                      Received
                    </th>
                    <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
                      Pending
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredData.map((row, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-blue-50 transition-colors`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-700">
                        {row.taskNumber}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {row.shopName}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
  {row.mobileNumber || "-"}
</td>
                      <td className="px-6 py-4 text-gray-500">
                        {formatDate(row.firstCreatedAt)}
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        ₹{row.totalRevenue.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          ₹{row.totalReceived.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                          ₹{row.pending.toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredData.length === 0 && data.length > 0 && (
                <div className="text-center text-gray-500 py-4 bg-white">
                  <p>No results found for your search.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}