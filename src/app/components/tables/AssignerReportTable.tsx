// src/app/components/tables/AssignerReportTable.tsx
"use client";

import React, { useEffect, useState } from "react";
import { IndianRupee, Calendar } from "lucide-react";
import { motion } from "framer-motion";

// Define the data structure for the assigner report
type AssignerReport = {
  name: string;
  email: string;
  totalRevenue: number;
  amountReceived: number;
  pendingAmount: number;
  totalSales: number;
};

// Define the structure for the month options
type MonthOption = {
  value: string; // YYYY-MM format for API
  label: string; // Mon, YYYY format for display
};

/**
 * A React component that fetches and displays sales data grouped by assigner.
 * It uses the /api/stats/user-performance/by-assigner endpoint.
 */
export default function AssignerReportTable() {
  const [data, setData] = useState<AssignerReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State to manage the selected month for the dropdown
  const [selectedMonth, setSelectedMonth] = useState<string>('');

  // Function to generate the last 12 months with both value and label
  const generateMonths = (): MonthOption[] => {
    const months = [];
    const today = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const year = date.getFullYear();
      const monthNumber = String(date.getMonth() + 1).padStart(2, '0');
      const monthLabel = date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
      months.push({
        value: `${year}-${monthNumber}`,
        label: monthLabel,
      });
    }
    return months;
  };
  
  const availableMonths = generateMonths();
  const selectedMonthLabel = availableMonths.find(month => month.value === selectedMonth)?.label || 'Loading...';

  // Set the default selected month to the current month on first render
  useEffect(() => {
    if (availableMonths.length > 0 && !selectedMonth) {
      setSelectedMonth(availableMonths[0].value);
    }
  }, [availableMonths, selectedMonth]);

  useEffect(() => {
    // Only fetch data if a month is selected
    if (!selectedMonth) return;
    
    // Log the API call to help with debugging the backend
    console.log(`Fetching data for month: ${selectedMonth}`);
    const apiUrl = `/api/stats/user-performance/by-assigner?month=${selectedMonth}`;
    console.log(`API URL: ${apiUrl}`);

    // Fetch data from the API endpoint, passing the selected month
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await res.json();
        setData(json.data || []);
      } catch (err: any) {
        console.error("Failed to fetch assigner report:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedMonth]); // Rerun effect when selectedMonth changes

  return (
    <div className="bg-white p-6 rounded-lg shadow-2xl border border-gray-100 font-sans text-gray-900 transition-shadow duration-300 hover:shadow-3xl">
      {/* Header */}
      <div className="mb-6 border-b pb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          👤 Sales by Assigner
        </h2>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
        >
          {availableMonths.map(month => (
            <option key={month.value} value={month.value}>{month.label}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center py-10">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          No data available for {selectedMonthLabel}.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <tr>
                <th className="p-4 font-bold tracking-wider">Assigner</th>
                <th className="p-4 font-bold tracking-wider">Email</th>
                <th className="p-4 font-bold tracking-wider text-right">Sales</th>
                <th className="p-4 font-bold tracking-wider text-right">Total Revenue</th>
                <th className="p-4 font-bold tracking-wider text-right">Received</th>
                <th className="p-4 font-bold tracking-wider text-right">Pending</th>
              </tr>
            </thead>
            <tbody>
              {data.map((assigner, index) => {
                const pending = assigner.totalRevenue - assigner.amountReceived;
                const rowBg = index % 2 === 0 ? "bg-white" : "bg-gray-50";
                return (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`border-b hover:bg-gray-100 transition-colors duration-200 ${rowBg}`}
                  >
                    <td className="p-4 font-medium">{assigner.name}</td>
                    <td className="p-4 text-gray-500">{assigner.email}</td>
                    <td className="p-4 text-right font-semibold">{assigner.totalSales}</td>
                    <td className="p-4 text-right font-semibold text-green-700">₹{assigner.totalRevenue.toLocaleString()}</td>
                    <td className="p-4 text-right font-semibold text-blue-700">₹{assigner.amountReceived.toLocaleString()}</td>
                    <td className="p-4 text-right">
                      <span className={`px-3 py-1 text-xs rounded-full font-bold ${
                        pending === 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
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
