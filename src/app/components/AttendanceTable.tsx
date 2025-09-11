"use client";

import { useEffect, useState } from "react";
import MonthlyAttendanceTable from "./MonthlyAttendanceTable";

interface Attendance {
  id: string;
  userId: string;
  employeeName?: string;
  faceImage?: string;
  location?: string;
  deviceInfo?: string;
  checkIn?: string;
  checkOut?: string;
  checkInReason?: string;
  checkOutReason?: string;
  date: string;
  status?: string;
  verified?: boolean;
  workingHours?: number;
  overtimeHours?: number;
  remarks?: string;
  createdAt: string;
  updatedAt: string;
}

// -------------------- Helpers --------------------
function formatDate(dateString?: string): string {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    const weekday = date.toLocaleString("en-US", { weekday: "short" });
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${weekday}, ${day} ${month}, ${year}`;
  } catch {
    return dateString;
  }
}

function formatTime(dateString?: string): string {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    let hour = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const suffix = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minutes} ${suffix}`;
  } catch {
    return dateString;
  }
}

function formatHours(minutes?: number): string {
  if (minutes == null) return "-";
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs && mins) return `${hrs} hr ${mins} min`;
  if (hrs) return `${hrs} hr`;
  if (mins) return `${mins} min`;
  return "0 min";
}

// -------------------- Component --------------------
export default function AttendanceTable() {
  const [data, setData] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMonthly, setShowMonthly] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0] // ✅ default today
  );

  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/attendance/list?date=${selectedDate}`);
        const json = await res.json();
        if (Array.isArray(json)) {
          setData(json);
        } else {
          setData([]);
        }
      } catch (err) {
        console.error("Failed to load attendance:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [selectedDate]);

  if (loading) return <p className="p-4">Loading attendance...</p>;

  return (
    <div className="p-4 space-y-4">
      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Date Picker */}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-3 py-2 border rounded text-sm"
        />

        {/* Toggle Button */}
        <button
          onClick={() => setShowMonthly(!showMonthly)}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          {showMonthly ? "Hide Monthly View" : "Show Monthly View"}
        </button>
      </div>

      {/* Conditional Rendering */}
      {showMonthly ? (
        <MonthlyAttendanceTable month={selectedDate.slice(0, 7)} />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Employee</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Check In</th>
                <th className="p-2 border">Check Out</th>
                <th className="p-2 border">Reason</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Working Hours</th>
                <th className="p-2 border">Overtime</th>
                <th className="p-2 border">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-4 text-center text-gray-500">
                    No attendance records found for {selectedDate}.
                  </td>
                </tr>
              ) : (
                data.map((row) => (
                  <tr key={row.id} className="border-t hover:bg-gray-50">
                    <td className="p-2 border">{row.employeeName || row.userId}</td>
                    <td className="p-2 border">{formatDate(row.date)}</td>
                    <td className="p-2 border">{formatTime(row.checkIn)}</td>
                    <td className="p-2 border">{formatTime(row.checkOut)}</td>
                    <td className="p-2 border">
                      {row.checkInReason || row.checkOutReason || "-"}
                    </td>
                    <td className="p-2 border">{row.status || "-"}</td>
                    <td className="p-2 border">{formatHours(row.workingHours)}</td>
                    <td className="p-2 border">{formatHours(row.overtimeHours)}</td>
                    <td className="p-2 border">{row.remarks || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
