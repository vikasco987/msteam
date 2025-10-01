"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, UserMinus, Clock, ArrowUpCircle } from "lucide-react";

interface AttendanceRecord {
  date: string; // UTC string
  checkIn?: string;
  checkOut?: string;
  status: "Present" | "Absent" | "Leave" | "Half-Day";
  lateBy?: string; // e.g., "10 min"
  workingHours?: number; // in decimal hours
  overtime?: number; // in decimal hours
  remarks?: string;
}

// -------------------- Helpers --------------------
// Convert UTC to IST
function toIST(dateString?: string) {
  if (!dateString) return null;
  const date = new Date(dateString);
  return new Date(date.getTime() + 5.5 * 60 * 60 * 1000);
}

// Format date
function formatDate(dateString?: string) {
  const date = toIST(dateString);
  if (!date) return "-";
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

// Format time
function formatTime(dateString?: string) {
  const date = toIST(dateString);
  if (!date) return "-";
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
}

// Format decimal hours to "X hr Y min"
function formatDecimalHours(decimal?: number) {
  if (!decimal) return "-";
  const hrs = Math.floor(decimal);
  const mins = Math.round((decimal - hrs) * 60);
  if (hrs && mins) return `${hrs} hr ${mins} min`;
  if (hrs) return `${hrs} hr`;
  if (mins) return `${mins} min`;
  return "0 min";
}

// -------------------- Component --------------------
export default function DailyAttendanceTable() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Replace this with your API call to fetch the employee's monthly attendance
  useEffect(() => {
    async function fetchAttendance() {
      setLoading(true);
      try {
        const res = await fetch("/api/attendance/employee/monthly"); // Example endpoint
        const data: AttendanceRecord[] = await res.json();
        setRecords(data);
      } catch (err) {
        console.error("Failed to fetch attendance", err);
        setRecords([]);
      } finally {
        setLoading(false);
      }
    }
    fetchAttendance();
  }, []);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">My Attendance 📅</h1>

      {loading ? (
        <p>Loading attendance...</p>
      ) : records.length === 0 ? (
        <p>No attendance records found for this month.</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow-lg bg-white">
          <table className="min-w-full text-sm border-collapse">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Check-In</th>
                <th className="px-4 py-2 border">Check-Out</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Late By</th>
                <th className="px-4 py-2 border">Working Hours</th>
                <th className="px-4 py-2 border">Overtime</th>
                <th className="px-4 py-2 border">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "bg-white hover:bg-gray-100"}
                >
                  <td className="px-4 py-2 border text-center">{formatDate(rec.date)}</td>
                  <td className="px-4 py-2 border text-center">{formatTime(rec.checkIn)}</td>
                  <td className="px-4 py-2 border text-center">{formatTime(rec.checkOut)}</td>
                  <td className="px-4 py-2 border text-center">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        rec.status === "Present"
                          ? "bg-green-100 text-green-800"
                          : rec.status === "Absent"
                          ? "bg-red-100 text-red-800"
                          : rec.status === "Leave"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {rec.status === "Present" && <CheckCircle className="w-3 h-3 mr-1" />}
                      {rec.status === "Absent" && <XCircle className="w-3 h-3 mr-1" />}
                      {rec.status === "Leave" && <CheckCircle className="w-3 h-3 mr-1" />}
                      {rec.status === "Half-Day" && <UserMinus className="w-3 h-3 mr-1" />}
                      {rec.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 border text-center">{rec.lateBy || "-"}</td>
                  <td className="px-4 py-2 border text-center">{formatDecimalHours(rec.workingHours)}</td>
                  <td className="px-4 py-2 border text-center">{formatDecimalHours(rec.overtime)}</td>
                  <td className="px-4 py-2 border text-center">{rec.remarks || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
