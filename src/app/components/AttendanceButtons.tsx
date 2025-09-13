// "use client";

// import { useState } from "react";

// export default function AttendanceButtons() {
//   const [loading, setLoading] = useState(false);
//   const [reason, setReason] = useState("");
//   const [remarks, setRemarks] = useState("");
//   const [showReason, setShowReason] = useState(false);
//   const [actionType, setActionType] = useState<"checkIn" | "checkOut" | null>(null);

//   const handleAttendance = async (type: "checkIn" | "checkOut") => {
//     setLoading(true);

//     try {
//       // ✅ Get location from browser
//       let latitude: number | null = null;
//       let longitude: number | null = null;

//       if (navigator.geolocation) {
//         await new Promise<void>((resolve) => {
//           navigator.geolocation.getCurrentPosition(
//             (pos) => {
//               latitude = pos.coords.latitude;
//               longitude = pos.coords.longitude;
//               resolve();
//             },
//             (err) => {
//               console.warn("Geolocation error:", err);
//               resolve(); // continue without location
//             },
//             { enableHighAccuracy: true, timeout: 10000 }
//           );
//         });
//       }

//       // ✅ Send location + other data to backend
//       const res = await fetch("/api/attendance", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           type,
//           reason,
//           remarks,
//           lat: latitude,
//           lng: longitude,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         alert(data.error || "Failed to mark attendance");
//       } else {
//         alert(
//           `${type === "checkIn" ? "Check-In" : "Check-Out"} recorded\nStatus: ${
//             data.attendance?.status
//           }`
//         );
//         console.log("Attendance Response:", data);
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Error marking attendance");
//     } finally {
//       setLoading(false);
//       setReason("");
//       setRemarks("");
//       setShowReason(false);
//       setActionType(null);
//     }
//   };

//   const checkInClick = () => {
//     const hour = new Date().getHours();
//     setActionType("checkIn");
//     if (hour >= 10) setShowReason(true);
//     else handleAttendance("checkIn");
//   };

//   const checkOutClick = () => {
//     const hour = new Date().getHours();
//     setActionType("checkOut");
//     if (hour < 19) setShowReason(true);
//     else handleAttendance("checkOut");
//   };

//   return (
//     <div className="flex flex-col gap-4 p-4 border rounded-lg w-80">
//       {showReason && (
//         <div className="flex flex-col gap-2">
//           <textarea
//             placeholder="Reason (required)"
//             value={reason}
//             onChange={(e) => setReason(e.target.value)}
//             className="border p-2 rounded"
//           />
//           <textarea
//             placeholder="Remarks (optional)"
//             value={remarks}
//             onChange={(e) => setRemarks(e.target.value)}
//             className="border p-2 rounded"
//           />
//           <button
//             onClick={() => actionType && handleAttendance(actionType)}
//             disabled={loading || (showReason && !reason)}
//             className="bg-green-600 text-white py-2 rounded"
//           >
//             {loading ? "Submitting..." : "Submit"}
//           </button>
//         </div>
//       )}

//       {!showReason && (
//         <>
//           <button
//             onClick={checkInClick}
//             disabled={loading}
//             className="bg-blue-600 text-white py-2 rounded"
//           >
//             {loading && actionType === "checkIn" ? "..." : "Check In"}
//           </button>
//           <button
//             onClick={checkOutClick}
//             disabled={loading}
//             className="bg-red-600 text-white py-2 rounded"
//           >
//             {loading && actionType === "checkOut" ? "..." : "Check Out"}
//           </button>
//         </>
//       )}
//     </div>
//   );
// }










// "use client";

// import { useState } from "react";

// export default function AttendanceButtons() {
//   const [loading, setLoading] = useState(false);
//   const [reason, setReason] = useState("");
//   const [remarks, setRemarks] = useState("");
//   const [showReason, setShowReason] = useState(false);
//   const [actionType, setActionType] = useState<"checkIn" | "checkOut" | null>(null);

//   const handleAttendance = async (type: "checkIn" | "checkOut") => {
//     setLoading(true);

//     try {
//       let latitude: number | null = null;
//       let longitude: number | null = null;

//       if (navigator.geolocation) {
//         await new Promise<void>((resolve) => {
//           navigator.geolocation.getCurrentPosition(
//             (pos) => {
//               latitude = pos.coords.latitude;
//               longitude = pos.coords.longitude;
//               resolve();
//             },
//             () => resolve(),
//             { enableHighAccuracy: true, timeout: 10000 }
//           );
//         });
//       }

//       const res = await fetch("/api/attendance", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ type, reason, remarks, lat: latitude, lng: longitude }),
//       });

//       const data = await res.json();
//       if (!res.ok) alert(data.error || "Failed to mark attendance");
//       else
//         alert(
//           `${type === "checkIn" ? "Check-In" : "Check-Out"} recorded for ${
//             data.attendance.userName
//           }\nStatus: ${data.attendance.status}`
//         );
//     } catch (err) {
//       console.error(err);
//       alert("Error marking attendance");
//     } finally {
//       setLoading(false);
//       setReason("");
//       setRemarks("");
//       setShowReason(false);
//       setActionType(null);
//     }
//   };

//   const checkInClick = () => {
//     const hour = new Date().getHours();
//     setActionType("checkIn");
//     if (hour >= 10) setShowReason(true);
//     else handleAttendance("checkIn");
//   };

//   const checkOutClick = () => {
//     const hour = new Date().getHours();
//     setActionType("checkOut");
//     if (hour < 19) setShowReason(true);
//     else handleAttendance("checkOut");
//   };

//   return (
//     <div className="flex flex-col gap-4 p-4 border rounded-lg w-80">
//       {showReason && (
//         <div className="flex flex-col gap-2">
//           <textarea
//             placeholder="Reason (required)"
//             value={reason}
//             onChange={(e) => setReason(e.target.value)}
//             className="border p-2 rounded"
//           />
//           <textarea
//             placeholder="Remarks (optional)"
//             value={remarks}
//             onChange={(e) => setRemarks(e.target.value)}
//             className="border p-2 rounded"
//           />
//           <button
//             onClick={() => actionType && handleAttendance(actionType)}
//             disabled={loading || !reason}
//             className="bg-green-600 text-white py-2 rounded"
//           >
//             {loading ? "Submitting..." : "Submit"}
//           </button>
//         </div>
//       )}

//       {!showReason && (
//         <>
//           <button onClick={checkInClick} disabled={loading} className="bg-blue-600 text-white py-2 rounded">
//             {loading && actionType === "checkIn" ? "..." : "Check In"}
//           </button>
//           <button onClick={checkOutClick} disabled={loading} className="bg-red-600 text-white py-2 rounded">
//             {loading && actionType === "checkOut" ? "..." : "Check Out"}
//           </button>
//         </>
//       )}
//     </div>
//   );
// }



// "use client";

// import { useState, useEffect } from "react";

// export default function AttendanceButtons() {
//   const [loading, setLoading] = useState(false);
//   const [reason, setReason] = useState("");
//   const [remarks, setRemarks] = useState("");
//   const [showReason, setShowReason] = useState(false);
//   const [actionType, setActionType] = useState<"checkIn" | "checkOut" | null>(null);
//   const [checkInStatus, setCheckInStatus] = useState<"notCheckedIn" | "checkedIn" | null>(null);
//   const [checkInTime, setCheckInTime] = useState<string | null>(null);

//   // This effect will run once when the component mounts to check the user's initial status.
//   useEffect(() => {
//     // We would need to fetch the attendance status from the server here.
//     // For this example, we'll simulate a check.
//     const fetchStatus = async () => {
//       // In a real application, you'd make an API call like this:
//       // const res = await fetch("/api/attendance/status");
//       // const data = await res.json();
//       // if (data.checkedIn) {
//       //   setCheckInStatus("checkedIn");
//       //   setCheckInTime(data.checkInTime);
//       // } else {
//       //   setCheckInStatus("notCheckedIn");
//       // }

//       // Simulation for now:
//       // Let's assume the user is not checked in initially.
//       setCheckInStatus("notCheckedIn");
//     };
//     fetchStatus();
//   }, []);

//   const handleAttendance = async (type: "checkIn" | "checkOut") => {
//     setLoading(true);

//     try {
//       let latitude: number | null = null;
//       let longitude: number | null = null;

//       if (navigator.geolocation) {
//         await new Promise<void>((resolve) => {
//           navigator.geolocation.getCurrentPosition(
//             (pos) => {
//               latitude = pos.coords.latitude;
//               longitude = pos.coords.longitude;
//               resolve();
//             },
//             () => resolve(),
//             { enableHighAccuracy: true, timeout: 10000 }
//           );
//         });
//       }

//       const res = await fetch("/api/attendance", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ type, reason, remarks, lat: latitude, lng: longitude }),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         alert(data.error || "Failed to mark attendance");
//       } else {
//         alert(
//           `${type === "checkIn" ? "Check-In" : "Check-Out"} recorded for ${
//             data.attendance.userName
//           }\nStatus: ${data.attendance.status}`
//         );
//         // Update the status dynamically after a successful check-in
//         if (type === "checkIn") {
//           setCheckInStatus("checkedIn");
//           setCheckInTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
//         } else if (type === "checkOut") {
//           setCheckInStatus("notCheckedIn");
//           setCheckInTime(null);
//         }
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error marking attendance");
//     } finally {
//       setLoading(false);
//       setReason("");
//       setRemarks("");
//       setShowReason(false);
//       setActionType(null);
//     }
//   };

//   const checkInClick = () => {
//     const hour = new Date().getHours();
//     setActionType("checkIn");
//     if (hour >= 10) setShowReason(true);
//     else handleAttendance("checkIn");
//   };

//   const checkOutClick = () => {
//     const hour = new Date().getHours();
//     setActionType("checkOut");
//     if (hour < 19) setShowReason(true);
//     else handleAttendance("checkOut");
//   };

//   return (
//     <div className="flex flex-col gap-4 p-4 border rounded-lg w-80">
//       {/* Small card showing today's status */}
//       <div className="p-3 bg-gray-100 rounded-md text-sm text-center">
//         {checkInStatus === "checkedIn" && checkInTime ? (
//           <p>Checked in at {checkInTime}</p>
//         ) : (
//           <p>You are not checked in yet</p>
//         )}
//       </div>

//       {showReason && (
//         <div className="flex flex-col gap-2">
//           <textarea
//             placeholder="Reason (required)"
//             value={reason}
//             onChange={(e) => setReason(e.target.value)}
//             className="border p-2 rounded"
//           />
//           <textarea
//             placeholder="Remarks (optional)"
//             value={remarks}
//             onChange={(e) => setRemarks(e.target.value)}
//             className="border p-2 rounded"
//           />
//           <button
//             onClick={() => actionType && handleAttendance(actionType)}
//             disabled={loading || !reason}
//             className="bg-green-600 text-white py-2 rounded"
//           >
//             {loading ? "Submitting..." : "Submit"}
//           </button>
//         </div>
//       )}

//       {!showReason && (
//         <>
//           <button onClick={checkInClick} disabled={loading || checkInStatus === "checkedIn"} className={`text-white py-2 rounded ${checkInStatus === "checkedIn" ? "bg-gray-400" : "bg-blue-600"}`}>
//             {loading && actionType === "checkIn" ? "..." : "Check In"}
//           </button>
//           <button onClick={checkOutClick} disabled={loading || checkInStatus !== "checkedIn"} className={`text-white py-2 rounded ${checkInStatus !== "checkedIn" ? "bg-gray-400" : "bg-red-600"}`}>
//             {loading && actionType === "checkOut" ? "..." : "Check Out"}
//           </button>
//         </>
//       )}
//     </div>
//   );
// }











// "use client";

// import { useState, useEffect } from "react";
// import toast, { Toaster } from 'react-hot-toast';
// import { FaRegCheckCircle, FaClock, FaCalendarAlt } from 'react-icons/fa';

// export default function AttendanceButtons() {
//   const [loading, setLoading] = useState(false);
//   const [reason, setReason] = useState("");
//   const [remarks, setRemarks] = useState("");
//   const [showReason, setShowReason] = useState(false);
//   const [actionType, setActionType] = useState<"checkIn" | "checkOut" | null>(null);
//   const [checkInStatus, setCheckInStatus] = useState<"notCheckedIn" | "checkedIn" | null>(null);
//   const [checkInTime, setCheckInTime] = useState<string | null>(null);
//   const [overtime, setOvertime] = useState<string>("0h 0m");
//   const [hoursWorked, setHoursWorked] = useState<string>("0h 0m");

//   useEffect(() => {
//     // In a real app, this would be an API call to get the current day's attendance
//     const fetchStatus = async () => {
//       // Simulate API response
//       const attendanceData = {
//         checkedIn: false,
//         checkInTime: null,
//         hoursWorked: "0h 0m",
//         overtime: "0h 0m"
//       };

//       if (attendanceData.checkedIn) {
//         setCheckInStatus("checkedIn");
//         setCheckInTime(attendanceData.checkInTime);
//         setHoursWorked(attendanceData.hoursWorked);
//         setOvertime(attendanceData.overtime);
//       } else {
//         setCheckInStatus("notCheckedIn");
//       }
//     };
//     fetchStatus();
//   }, []);

//   const handleAttendance = async (type: "checkIn" | "checkOut") => {
//     setLoading(true);

//     try {
//       let latitude: number | null = null;
//       let longitude: number | null = null;

//       if (navigator.geolocation) {
//         await new Promise<void>((resolve) => {
//           navigator.geolocation.getCurrentPosition(
//             (pos) => {
//               latitude = pos.coords.latitude;
//               longitude = pos.coords.longitude;
//               resolve();
//             },
//             () => resolve(),
//             { enableHighAccuracy: true, timeout: 10000 }
//           );
//         });
//       }

//       const res = await fetch("/api/attendance", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ type, reason, remarks, lat: latitude, lng: longitude }),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         toast.error(data.error || "Failed to mark attendance");
//       } else {
//         toast.success(`Attendance marked successfully!`);

//         // Update the status dynamically after a successful action
//         if (type === "checkIn") {
//           setCheckInStatus("checkedIn");
//           setCheckInTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
//           setHoursWorked("0h 0m"); // Reset for new day
//           setOvertime("0h 0m"); // Reset for new day
//         } else if (type === "checkOut") {
//           setCheckInStatus("notCheckedIn");
//           setCheckInTime(null);
//           // In a real app, update hours worked and overtime from the API response
//           setHoursWorked("8h 30m");
//           setOvertime("0h 30m");
//         }
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Error marking attendance");
//     } finally {
//       setLoading(false);
//       setReason("");
//       setRemarks("");
//       setShowReason(false);
//       setActionType(null);
//     }
//   };

//   const checkInClick = () => {
//     const hour = new Date().getHours();
//     setActionType("checkIn");
//     if (hour >= 10) setShowReason(true);
//     else handleAttendance("checkIn");
//   };

//   const checkOutClick = () => {
//     const hour = new Date().getHours();
//     setActionType("checkOut");
//     if (hour < 19) setShowReason(true);
//     else handleAttendance("checkOut");
//   };

//   const attendanceSummary = [
//     { title: "Hours Worked Today", value: hoursWorked, icon: <FaClock className="text-gray-600" /> },
//     { title: "Overtime", value: overtime, icon: <FaCalendarAlt className="text-gray-600" /> },
//     { title: "Last Check-in", value: checkInTime || "N/A", icon: <FaRegCheckCircle className="text-gray-600" /> },
//   ];

//   return (
//     <>
//       <Toaster position="top-center" reverseOrder={false} />
//       <div className="flex flex-col gap-4 p-4 border rounded-lg w-80 shadow-md">
//         {/* Attendance Summary Widget */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {attendanceSummary.map((item) => (
//             <div key={item.title} className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg">
//               {item.icon}
//               <div className="flex flex-col">
//                 <span className="text-xs text-gray-500">{item.title}</span>
//                 <span className="font-semibold">{item.value}</span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Status Card */}
//         <div className="p-3 bg-gray-100 rounded-md text-sm text-center">
//           {checkInStatus === "checkedIn" && checkInTime ? (
//             <p className="font-semibold text-green-600">
//               <FaRegCheckCircle className="inline-block mr-2" />
//               Checked in at {checkInTime}
//             </p>
//           ) : (
//             <p>You are not checked in yet</p>
//           )}
//         </div>

//         {showReason && (
//           <div className="flex flex-col gap-2">
//             <textarea
//               placeholder="Reason (required)"
//               value={reason}
//               onChange={(e) => setReason(e.target.value)}
//               className="border p-2 rounded"
//             />
//             <textarea
//               placeholder="Remarks (optional)"
//               value={remarks}
//               onChange={(e) => setRemarks(e.target.value)}
//               className="border p-2 rounded"
//             />
//             <button
//               onClick={() => actionType && handleAttendance(actionType)}
//               disabled={loading || !reason}
//               className="relative bg-green-600 text-white py-2 rounded overflow-hidden"
//             >
//               {loading && <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="w-4 h-4 rounded-full bg-white animate-pulse" />
//               </div>}
//               <span className={loading ? "opacity-0" : ""}>{loading ? "Submitting..." : "Submit"}</span>
//             </button>
//           </div>
//         )}

//         {!showReason && (
//           <>
//             <button
//               onClick={checkInClick}
//               disabled={loading || checkInStatus === "checkedIn"}
//               className={`relative py-2 rounded overflow-hidden transition-all duration-300 ${checkInStatus === "checkedIn" ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-blue-600 text-white"}`}
//             >
//               {loading && actionType === "checkIn" ? (
//                 <div className="relative flex items-center justify-center">
//                   <div className="absolute w-full h-full rounded-full animate-ping bg-blue-400 opacity-75"></div>
//                   <div className="relative w-4 h-4 rounded-full bg-white"></div>
//                 </div>
//               ) : (
//                 <>
//                   {checkInStatus === "checkedIn" ? "Already Checked In ✔️" : "Check In"}
//                 </>
//               )}
//             </button>
//             <button
//               onClick={checkOutClick}
//               disabled={loading || checkInStatus !== "checkedIn"}
//               className={`relative py-2 rounded overflow-hidden transition-all duration-300 ${checkInStatus !== "checkedIn" ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-red-600 text-white"}`}
//             >
//               {loading && actionType === "checkOut" ? (
//                 <div className="relative flex items-center justify-center">
//                   <div className="absolute w-full h-full rounded-full animate-ping bg-red-400 opacity-75"></div>
//                   <div className="relative w-4 h-4 rounded-full bg-white"></div>
//                 </div>
//               ) : (
//                 "Check Out"
//               )}
//             </button>
//           </>
//         )}
//       </div>
//     </>
//   );
// }






// "use client";

// import { useState, useEffect } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { FaRegCheckCircle, FaClock, FaCalendarAlt } from "react-icons/fa";

// export default function AttendanceButtons() {
//   const [loading, setLoading] = useState(false);
//   const [reason, setReason] = useState("");
//   const [remarks, setRemarks] = useState("");
//   const [showReason, setShowReason] = useState(false);
//   const [actionType, setActionType] = useState<"checkIn" | "checkOut" | null>(null);
//   const [checkInStatus, setCheckInStatus] = useState<"notCheckedIn" | "checkedIn" | null>(null);
//   const [checkInTime, setCheckInTime] = useState<string | null>(null);
//   const [overtime, setOvertime] = useState<string>("0h 0m");
//   const [hoursWorked, setHoursWorked] = useState<string>("0h 0m");
//   const [isClient, setIsClient] = useState(false);

//   // ✅ Only run client-side
//   useEffect(() => {
//     setIsClient(true);

//     const fetchTodayAttendance = async () => {
//       try {
//         const res = await fetch("/api/attendance/today"); // ✅ Your backend should return today's attendance
//         const data = await res.json();

//         if (data.attendance) {
//           const att = data.attendance;
//           setCheckInStatus(att.checkIn ? "checkedIn" : "notCheckedIn");
//           setCheckInTime(att.checkIn ? new Date(att.checkIn).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : null);

//           // Format hoursWorked & overtime
//           const wh = att.workingHours || 0;
//           const ot = att.overtimeHours || 0;
//           setHoursWorked(`${Math.floor(wh)}h ${Math.floor((wh % 1) * 60)}m`);
//           setOvertime(`${Math.floor(ot)}h ${Math.floor((ot % 1) * 60)}m`);
//         } else {
//           setCheckInStatus("notCheckedIn");
//         }
//       } catch (err) {
//         console.error("Error fetching today's attendance:", err);
//       }
//     };

//     fetchTodayAttendance();
//   }, []);

//   const handleAttendance = async (type: "checkIn" | "checkOut") => {
//     setLoading(true);
//     try {
//       let latitude: number | null = null;
//       let longitude: number | null = null;

//       if (navigator.geolocation) {
//         await new Promise<void>((resolve) => {
//           navigator.geolocation.getCurrentPosition(
//             (pos) => {
//               latitude = pos.coords.latitude;
//               longitude = pos.coords.longitude;
//               resolve();
//             },
//             () => resolve(),
//             { enableHighAccuracy: true, timeout: 10000 }
//           );
//         });
//       }

//       const res = await fetch("/api/attendance", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ type, reason, remarks, lat: latitude, lng: longitude }),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         toast.error(data.error || "Failed to mark attendance");
//       } else {
//         toast.success("Attendance marked successfully!");

//         // ✅ Update state from backend response
//         const att = data.attendance;
//         setCheckInStatus(att.checkIn ? "checkedIn" : "notCheckedIn");
//         setCheckInTime(att.checkIn ? new Date(att.checkIn).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : null);

//         const wh = att.workingHours || 0;
//         const ot = att.overtimeHours || 0;
//         setHoursWorked(`${Math.floor(wh)}h ${Math.floor((wh % 1) * 60)}m`);
//         setOvertime(`${Math.floor(ot)}h ${Math.floor((ot % 1) * 60)}m`);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Error marking attendance");
//     } finally {
//       setLoading(false);
//       setReason("");
//       setRemarks("");
//       setShowReason(false);
//       setActionType(null);
//     }
//   };

//   const checkInClick = () => {
//     const hour = new Date().getHours();
//     setActionType("checkIn");
//     if (hour >= 10) setShowReason(true);
//     else handleAttendance("checkIn");
//   };

//   const checkOutClick = () => {
//     const hour = new Date().getHours();
//     setActionType("checkOut");
//     if (hour < 19) setShowReason(true);
//     else handleAttendance("checkOut");
//   };

//   if (!isClient) return <div className="p-4 text-gray-500">Loading...</div>;

//   const attendanceSummary = [
//     { title: "Hours Worked Today", value: hoursWorked, icon: <FaClock className="text-gray-600" /> },
//     { title: "Overtime", value: overtime, icon: <FaCalendarAlt className="text-gray-600" /> },
//     { title: "Last Check-in", value: checkInTime || "N/A", icon: <FaRegCheckCircle className="text-gray-600" /> },
//   ];

//   return (
//     <>
//       <Toaster position="top-center" reverseOrder={false} />
//       <div className="flex flex-col gap-4 p-4 border rounded-lg w-80 shadow-md">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {attendanceSummary.map((item) => (
//             <div key={item.title} className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg">
//               {item.icon}
//               <div className="flex flex-col">
//                 <span className="text-xs text-gray-500">{item.title}</span>
//                 <span className="font-semibold">{item.value}</span>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="p-3 bg-gray-100 rounded-md text-sm text-center">
//           {checkInStatus === "checkedIn" && checkInTime ? (
//             <p className="font-semibold text-green-600">
//               <FaRegCheckCircle className="inline-block mr-2" />
//               Checked in at {checkInTime}
//             </p>
//           ) : (
//             <p>You are not checked in yet</p>
//           )}
//         </div>

//         {showReason && (
//           <div className="flex flex-col gap-2">
//             <textarea
//               placeholder="Reason (required)"
//               value={reason}
//               onChange={(e) => setReason(e.target.value)}
//               className="border p-2 rounded"
//             />
//             <textarea
//               placeholder="Remarks (optional)"
//               value={remarks}
//               onChange={(e) => setRemarks(e.target.value)}
//               className="border p-2 rounded"
//             />
//             <button
//               onClick={() => actionType && handleAttendance(actionType)}
//               disabled={loading || !reason}
//               className="relative bg-green-600 text-white py-2 rounded overflow-hidden"
//             >
//               {loading ? "Submitting..." : "Submit"}
//             </button>
//           </div>
//         )}

//         {!showReason && (
//           <>
//             <button
//               onClick={checkInClick}
//               disabled={loading || checkInStatus === "checkedIn"}
//               className={`relative py-2 rounded overflow-hidden transition-all duration-300 ${
//                 checkInStatus === "checkedIn"
//                   ? "bg-gray-400 text-gray-700 cursor-not-allowed"
//                   : "bg-blue-600 text-white"
//               }`}
//             >
//               {checkInStatus === "checkedIn" ? "Already Checked In ✔️" : "Check In"}
//             </button>
//             <button
//               onClick={checkOutClick}
//               disabled={loading || checkInStatus !== "checkedIn"}
//               className={`relative py-2 rounded overflow-hidden transition-all duration-300 ${
//                 checkInStatus !== "checkedIn"
//                   ? "bg-gray-400 text-gray-700 cursor-not-allowed"
//                   : "bg-red-600 text-white"
//               }`}
//             >
//               Check Out
//             </button>
//           </>
//         )}
//       </div>
//     </>
//   );
// // }
// "use client";

// import { useState, useEffect } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { FaRegCheckCircle, FaClock, FaCalendarAlt } from "react-icons/fa";

// export default function AttendanceButtons() {
//   const [loading, setLoading] = useState(false);
//   const [reason, setReason] = useState("");
//   const [remarks, setRemarks] = useState("");
//   const [showReason, setShowReason] = useState(false);
//   const [actionType, setActionType] = useState<"checkIn" | "checkOut" | null>(null);
//   const [checkInStatus, setCheckInStatus] = useState<"notCheckedIn" | "checkedIn" | "checkedOut">("notCheckedIn");
//   const [checkInTime, setCheckInTime] = useState<string | null>(null);
//   const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
//   const [overtime, setOvertime] = useState<string>("0h 0m");
//   const [hoursWorked, setHoursWorked] = useState<string>("0h 0m");
//   const [isClient, setIsClient] = useState(false);

//   // ------------------ Helper: convert backend UTC date to local time string ------------------
//   const formatTime = (utcDate: string) => {
//     if (!utcDate) return null;
//     const d = new Date(utcDate);
//     return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
//   };

//   // ------------------ Fetch today's attendance ------------------
//   const fetchTodayAttendance = async () => {
//     try {
//       const res = await fetch("/api/attendance/today");
//       const data = await res.json();

//       if (data.attendance) {
//         const att = data.attendance;
//         const checkedIn = !!att.checkIn;
//         const checkedOut = !!att.checkOut;

//         setCheckInStatus(
//           checkedOut ? "checkedOut" : checkedIn ? "checkedIn" : "notCheckedIn"
//         );

//         setCheckInTime(formatTime(att.checkIn));
//         setCheckOutTime(formatTime(att.checkOut));

//         const wh = att.workingHours || 0;
//         const ot = att.overtimeHours || 0;
//         setHoursWorked(`${Math.floor(wh)}h ${Math.floor((wh % 1) * 60)}m`);
//         setOvertime(`${Math.floor(ot)}h ${Math.floor((ot % 1) * 60)}m`);
//       } else {
//         setCheckInStatus("notCheckedIn");
//         setCheckInTime(null);
//         setCheckOutTime(null);
//         setHoursWorked("0h 0m");
//         setOvertime("0h 0m");
//       }
//     } catch (err) {
//       console.error("Error fetching today's attendance:", err);
//     }
//   };

//   useEffect(() => {
//     setIsClient(true);
//     fetchTodayAttendance();
//   }, []);

//   // ------------------ Handle check-in / check-out ------------------
//   const handleAttendance = async (type: "checkIn" | "checkOut") => {
//     setLoading(true);
//     try {
//       let latitude: number | null = null;
//       let longitude: number | null = null;

//       if (navigator.geolocation) {
//         await new Promise<void>((resolve) => {
//           navigator.geolocation.getCurrentPosition(
//             (pos) => {
//               latitude = pos.coords.latitude;
//               longitude = pos.coords.longitude;
//               resolve();
//             },
//             () => resolve(),
//             { enableHighAccuracy: true, timeout: 10000 }
//           );
//         });
//       }

//       const res = await fetch("/api/attendance", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ type, reason, remarks, lat: latitude, lng: longitude }),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         toast.error(data.error || "Failed to mark attendance");
//       } else {
//         toast.success("Attendance marked successfully!");
//         fetchTodayAttendance(); // ✅ Refresh after check-in/out
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Error marking attendance");
//     } finally {
//       setLoading(false);
//       setReason("");
//       setRemarks("");
//       setShowReason(false);
//       setActionType(null);
//     }
//   };

//   const checkInClick = () => {
//     const hour = new Date().getHours();
//     setActionType("checkIn");
//     if (hour >= 10) setShowReason(true);
//     else handleAttendance("checkIn");
//   };

//   const checkOutClick = () => {
//     const hour = new Date().getHours();
//     setActionType("checkOut");
//     if (hour < 19) setShowReason(true);
//     else handleAttendance("checkOut");
//   };

//   if (!isClient) return <div className="p-4 text-gray-500">Loading...</div>;

//   const attendanceSummary = [
//     { title: "Hours Worked Today", value: hoursWorked, icon: <FaClock className="text-gray-600" /> },
//     { title: "Overtime", value: overtime, icon: <FaCalendarAlt className="text-gray-600" /> },
//     { title: "Last Check-in", value: checkInTime || "N/A", icon: <FaRegCheckCircle className="text-gray-600" /> },
//     { title: "Last Check-out", value: checkOutTime || "N/A", icon: <FaRegCheckCircle className="text-gray-600" /> },
//   ];

//   return (
//     <>
//       <Toaster position="top-center" reverseOrder={false} />
//       <div className="flex flex-col gap-4 p-4 border rounded-lg w-80 shadow-md">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {attendanceSummary.map((item) => (
//             <div key={item.title} className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg">
//               {item.icon}
//               <div className="flex flex-col">
//                 <span className="text-xs text-gray-500">{item.title}</span>
//                 <span className="font-semibold">{item.value}</span>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="p-3 bg-gray-100 rounded-md text-sm text-center">
//           {checkInStatus === "checkedIn" && checkInTime ? (
//             <p className="font-semibold text-green-600">
//               <FaRegCheckCircle className="inline-block mr-2" />
//               Checked in at {checkInTime}
//             </p>
//           ) : checkInStatus === "checkedOut" && checkOutTime ? (
//             <p className="font-semibold text-blue-600">
//               <FaRegCheckCircle className="inline-block mr-2" />
//               Checked out at {checkOutTime}
//             </p>
//           ) : (
//             <p>You are not checked in yet</p>
//           )}
//         </div>

//         {showReason && (
//           <div className="flex flex-col gap-2">
//             <textarea
//               placeholder="Reason (required)"
//               value={reason}
//               onChange={(e) => setReason(e.target.value)}
//               className="border p-2 rounded"
//             />
//             <textarea
//               placeholder="Remarks (optional)"
//               value={remarks}
//               onChange={(e) => setRemarks(e.target.value)}
//               className="border p-2 rounded"
//             />
//             <button
//               onClick={() => actionType && handleAttendance(actionType)}
//               disabled={loading || !reason}
//               className="relative bg-green-600 text-white py-2 rounded overflow-hidden"
//             >
//               {loading ? "Submitting..." : "Submit"}
//             </button>
//           </div>
//         )}

//         {!showReason && (
//           <>
//             <button
//               onClick={checkInClick}
//               disabled={loading || checkInStatus !== "notCheckedIn"}
//               className={`relative py-2 rounded overflow-hidden transition-all duration-300 ${
//                 checkInStatus !== "notCheckedIn"
//                   ? "bg-gray-400 text-gray-700 cursor-not-allowed"
//                   : "bg-blue-600 text-white"
//               }`}
//             >
//               {checkInStatus === "checkedIn" || checkInStatus === "checkedOut"
//                 ? "Already Checked In ✔️"
//                 : "Check In"}
//             </button>
//             <button
//               onClick={checkOutClick}
//               disabled={loading || checkInStatus !== "checkedIn"}
//               className={`relative py-2 rounded overflow-hidden transition-all duration-300 ${
//                 checkInStatus !== "checkedIn"
//                   ? "bg-gray-400 text-gray-700 cursor-not-allowed"
//                   : "bg-red-600 text-white"
//               }`}
//             >
//               Check Out
//             </button>
//           </>
//         )}
//       </div>
//     </>
//   );
// }





"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaRegCheckCircle, FaClock, FaCalendarAlt } from "react-icons/fa";

export default function AttendanceButtons() {
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [remarks, setRemarks] = useState("");
  const [showReason, setShowReason] = useState(false);
  const [actionType, setActionType] = useState<"checkIn" | "checkOut" | null>(
    null
  );
  const [checkInStatus, setCheckInStatus] = useState<
    "notCheckedIn" | "checkedIn" | "checkedOut"
  >("notCheckedIn");
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
  const [overtime, setOvertime] = useState<string>("0h 0m");
  const [hoursWorked, setHoursWorked] = useState<string>("0h 0m");
  const [isClient, setIsClient] = useState(false);

  // ------------------ Helper: convert backend UTC date to local time string ------------------
  const formatTime = (utcDate: string) => {
    if (!utcDate) return null;
    const d = new Date(utcDate);
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ------------------ Fetch today's attendance ------------------
  const fetchTodayAttendance = async () => {
    try {
      const res = await fetch("/api/attendance/today");
      const data = await res.json();

      if (data.attendance) {
        const att = data.attendance;
        const checkedIn = !!att.checkIn;
        const checkedOut = !!att.checkOut;

        setCheckInStatus(
          checkedOut ? "checkedOut" : checkedIn ? "checkedIn" : "notCheckedIn"
        );

        setCheckInTime(formatTime(att.checkIn));
        setCheckOutTime(formatTime(att.checkOut));

        const wh = att.workingHours || 0;
        const ot = att.overtimeHours || 0;
        setHoursWorked(`${Math.floor(wh)}h ${Math.floor((wh % 1) * 60)}m`);
        setOvertime(`${Math.floor(ot)}h ${Math.floor((ot % 1) * 60)}m`);
      } else {
        setCheckInStatus("notCheckedIn");
        setCheckInTime(null);
        setCheckOutTime(null);
        setHoursWorked("0h 0m");
        setOvertime("0h 0m");
      }
    } catch (err) {
      console.error("Error fetching today's attendance:", err);
    }
  };

  useEffect(() => {
    setIsClient(true);
    fetchTodayAttendance();
  }, []);

  // ------------------ Handle check-in / check-out ------------------
  const handleAttendance = async (type: "checkIn" | "checkOut") => {
    setLoading(true);
    try {
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
            () => resolve(),
            { enableHighAccuracy: true, timeout: 10000 }
          );
        });
      }

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
        toast.error(data.error || "Failed to mark attendance");
      } else {
        toast.success("Attendance marked successfully!");
        fetchTodayAttendance(); // ✅ Refresh after check-in/out
      }
    } catch (err) {
      console.error(err);
      toast.error("Error marking attendance");
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

  if (!isClient) return <div className="p-4 text-gray-500">Loading...</div>;

  const attendanceSummary = [
    {
      title: "Hours Worked Today",
      value: hoursWorked,
      icon: <FaClock className="text-indigo-600" />,
    },
    {
      title: "Overtime",
      value: overtime,
      icon: <FaCalendarAlt className="text-pink-600" />,
    },
    {
      title: "Last Check-in",
      value: checkInTime || "N/A",
      icon: <FaRegCheckCircle className="text-green-600" />,
    },
    {
      title: "Last Check-out",
      value: checkOutTime || "N/A",
      icon: <FaRegCheckCircle className="text-red-600" />,
    },
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 🔥 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/videos/fallback.jpg"
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>

      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="flex flex-col gap-6 p-6 w-96 rounded-2xl shadow-2xl bg-white/20 backdrop-blur-xl border border-white/30 animate-fadeIn">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {attendanceSummary.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 p-4 bg-white/40 backdrop-blur-lg rounded-xl shadow hover:scale-105 transition-transform"
              >
                {item.icon}
                <div className="flex flex-col">
                  <span className="text-xs text-gray-700">{item.title}</span>
                  <span className="font-bold text-gray-900">{item.value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Status */}
          <div className="p-3 bg-white/40 backdrop-blur-lg rounded-lg text-sm text-center shadow">
            {checkInStatus === "checkedIn" && checkInTime ? (
              <p className="font-semibold text-green-600">
                <FaRegCheckCircle className="inline-block mr-2" />
                Checked in at {checkInTime}
              </p>
            ) : checkInStatus === "checkedOut" && checkOutTime ? (
              <p className="font-semibold text-blue-600">
                <FaRegCheckCircle className="inline-block mr-2" />
                Checked out at {checkOutTime}
              </p>
            ) : (
              <p className="text-gray-800">You are not checked in yet</p>
            )}
          </div>

          {/* Reason Form */}
          {showReason && (
            <div className="flex flex-col gap-3">
              <textarea
                placeholder="Reason (required)"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
              />
              <textarea
                placeholder="Remarks (optional)"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
              />
              <button
                onClick={() => actionType && handleAttendance(actionType)}
                disabled={loading || !reason}
                className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-all"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          )}

          {/* Action Buttons */}
          {!showReason && (
            <div className="flex flex-col gap-3">
              <button
                onClick={checkInClick}
                disabled={loading || checkInStatus !== "notCheckedIn"}
                className={`py-2 rounded-lg font-semibold transition-all duration-300 shadow ${
                  checkInStatus !== "notCheckedIn"
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white hover:scale-105"
                }`}
              >
                {checkInStatus === "checkedIn" || checkInStatus === "checkedOut"
                  ? "Already Checked In ✔️"
                  : "Check In"}
              </button>
              <button
                onClick={checkOutClick}
                disabled={loading || checkInStatus !== "checkedIn"}
                className={`py-2 rounded-lg font-semibold transition-all duration-300 shadow ${
                  checkInStatus !== "checkedIn"
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 text-white hover:scale-105"
                }`}
              >
                Check Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
