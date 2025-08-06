"use client";
import { useState } from "react";

export default function MarkAttendanceButton() {
  const [loading, setLoading] = useState(false);

  const handleCheckIn = async () => {
    setLoading(true);

    const location = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
        (err) => reject(err)
      );
    });

    const res = await fetch("/api/attendance/check-in", {
      method: "POST",
      body: JSON.stringify({ location }),
    });

    if (res.ok) alert("Attendance marked!");
    else alert("Failed to mark attendance.");

    setLoading(false);
  };

  return (
    <button
      onClick={handleCheckIn}
      disabled={loading}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      {loading ? "Marking..." : "Mark Attendance"}
    </button>
  );
}
