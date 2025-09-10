"use client";

import { useState } from "react";

export default function AttendanceButtons() {
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [remarks, setRemarks] = useState("");
  const [showReason, setShowReason] = useState(false);
  const [actionType, setActionType] = useState<"checkIn" | "checkOut" | null>(null);

  const handleAttendance = async (type: "checkIn" | "checkOut") => {
    setLoading(true);

    try {
      // ✅ Get location from browser
      let latitude: number | null = null;
      let longitude: number | null = null;

      if (navigator.geolocation) {
        await new Promise<void>((resolve) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              latitude = pos.coords.latitude;
              longitude = pos.coords.longitude;
              resolve();
            },
            (err) => {
              console.warn("Geolocation error:", err);
              resolve(); // continue without location
            },
            { enableHighAccuracy: true, timeout: 10000 }
          );
        });
      }

      // ✅ Send location + other data to backend
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          reason,
          remarks,
          lat: latitude,
          lng: longitude,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to mark attendance");
      } else {
        alert(
          `${type === "checkIn" ? "Check-In" : "Check-Out"} recorded\nStatus: ${
            data.attendance?.status
          }`
        );
        console.log("Attendance Response:", data);
      }
    } catch (error) {
      console.error(error);
      alert("Error marking attendance");
    } finally {
      setLoading(false);
      setReason("");
      setRemarks("");
      setShowReason(false);
      setActionType(null);
    }
  };

  const checkInClick = () => {
    const hour = new Date().getHours();
    setActionType("checkIn");
    if (hour >= 10) setShowReason(true);
    else handleAttendance("checkIn");
  };

  const checkOutClick = () => {
    const hour = new Date().getHours();
    setActionType("checkOut");
    if (hour < 19) setShowReason(true);
    else handleAttendance("checkOut");
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg w-80">
      {showReason && (
        <div className="flex flex-col gap-2">
          <textarea
            placeholder="Reason (required)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="border p-2 rounded"
          />
          <textarea
            placeholder="Remarks (optional)"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={() => actionType && handleAttendance(actionType)}
            disabled={loading || (showReason && !reason)}
            className="bg-green-600 text-white py-2 rounded"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      )}

      {!showReason && (
        <>
          <button
            onClick={checkInClick}
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded"
          >
            {loading && actionType === "checkIn" ? "..." : "Check In"}
          </button>
          <button
            onClick={checkOutClick}
            disabled={loading}
            className="bg-red-600 text-white py-2 rounded"
          >
            {loading && actionType === "checkOut" ? "..." : "Check Out"}
          </button>
        </>
      )}
    </div>
  );
}
