// "use client";

// import { useEffect, useState } from "react";

// interface TableData {
//   headers: string[];
//   rows: Record<string, string>[];
// }

// export default function MonthlyAttendanceTable({ month }: { month: string }) {
//   const [data, setData] = useState<TableData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await fetch(`/api/attendance/monthly?month=${month}`);
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const json = await res.json();

//         // validate structure
//         if (!json || !Array.isArray(json.headers) || !Array.isArray(json.rows)) {
//           throw new Error("Invalid response format");
//         }

//         setData(json);
//       } catch (err: any) {
//         console.error("❌ Fetch monthly failed:", err);
//         setError(err.message || "Failed to load data");
//         setData({ headers: ["Employee"], rows: [] });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [month]);

//   if (loading) return <p className="p-4">Loading...</p>;
//   if (error) return <p className="p-4 text-red-600">Error: {error}</p>;
//   if (!data || data.rows.length === 0)
//     return <p className="p-4">No attendance records for {month}</p>;

//   return (
//     <div className="overflow-auto border rounded-lg shadow-lg bg-white">
//       <table className="min-w-full border-collapse text-sm">
//         <thead className="sticky top-0 bg-gray-800 text-white text-xs uppercase tracking-wide">
//           <tr>
//             {data.headers.map((h) => (
//               <th key={h} className="px-3 py-2 border">
//                 {h}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.rows.map((row, i) => (
//             <tr
//               key={i}
//               className={
//                 i % 2 === 0
//                   ? "bg-gray-50 hover:bg-gray-100"
//                   : "bg-white hover:bg-gray-100"
//               }
//             >
//               {data.headers.map((h) => (
//                 <td key={h} className="px-3 py-2 border text-center">
//                   {row[h] ?? "-"}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }











// lkjkhgfdfgyhjipkl[p
//   ',l;kjhjgvhjiko[p];
//   4
  
//   'oiuyuhuji'
// ]











// "use client";

// import { useEffect, useState } from "react";

// interface TableData {
//   headers: string[];
//   rows: Record<string, string>[]; // key is header, value is cell
// }

// // -------------------- Helpers --------------------
// // Decrease date by 1 day and format in IST
// function formatDateMinusOne(dateString?: string): string {
//   if (!dateString) return "-";
//   try {
//     const date = new Date(dateString);
//     date.setDate(date.getDate() - 1); // decrease 1 day
//     return date.toLocaleDateString("en-US", {
//       weekday: "short",
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//       timeZone: "Asia/Kolkata",
//     });
//   } catch {
//     return dateString;
//   }
// }

// export default function MonthlyAttendanceTable({ month }: { month: string }) {
//   const [data, setData] = useState<TableData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await fetch(`/api/attendance/monthly?month=${month}`);
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const json = await res.json();

//         // validate structure
//         if (!json || !Array.isArray(json.headers) || !Array.isArray(json.rows)) {
//           throw new Error("Invalid response format");
//         }

//         setData(json);
//       } catch (err: any) {
//         console.error("❌ Fetch monthly failed:", err);
//         setError(err.message || "Failed to load data");
//         setData({ headers: ["Employee"], rows: [] });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [month]);

//   if (loading) return <p className="p-4">Loading...</p>;
//   if (error) return <p className="p-4 text-red-600">Error: {error}</p>;
//   if (!data || data.rows.length === 0)
//     return <p className="p-4">No attendance records for {month}</p>;

//   return (
//     <div className="overflow-auto border rounded-lg shadow-lg bg-white">
//       <table className="min-w-full border-collapse text-sm">
//         <thead className="sticky top-0 bg-gray-800 text-white text-xs uppercase tracking-wide">
//           <tr>
//             {data.headers.map((h) => (
//               <th key={h} className="px-3 py-2 border">
//                 {h}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.rows.map((row, i) => (
//             <tr
//               key={i}
//               className={
//                 i % 2 === 0
//                   ? "bg-gray-50 hover:bg-gray-100"
//                   : "bg-white hover:bg-gray-100"
//               }
//             >
//               {data.headers.map((h) => (
//                 <td key={h} className="px-3 py-2 border text-center">
//                   {h.toLowerCase().includes("date")
//                     ? formatDateMinusOne(row[h])
//                     : row[h] ?? "-"}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }




// "use client";

// import { useEffect, useState } from "react";

// interface TableData {
//   headers: string[];
//   rows: Record<string, string>[];
// }

// // -------------------- Helpers --------------------
// function formatDate(dateString?: string): string {
//   if (!dateString) return "-";
//   try {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       weekday: "short",
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//       timeZone: "Asia/Kolkata",
//     });
//   } catch {
//     return dateString;
//   }
// }

// export default function MonthlyAttendanceTable({ month }: { month: string }) {
//   const [data, setData] = useState<TableData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // For monthly API, month should be in YYYY-MM format
//         const monthParam = month.includes("-") && month.length === 7 ? month : month.slice(0, 7);
//         const res = await fetch(`/api/attendance/monthly?month=${monthParam}`);
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const json = await res.json();

//         if (!json || !Array.isArray(json.headers) || !Array.isArray(json.rows)) {
//           throw new Error("Invalid response format");
//         }

//         setData(json);
//       } catch (err: any) {
//         console.error("❌ Fetch monthly failed:", err);
//         setError(err.message || "Failed to load data");
//         setData({ headers: ["Employee"], rows: [] });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [month]);

//   if (loading) return <p className="p-4">Loading...</p>;
//   if (error) return <p className="p-4 text-red-600">Error: {error}</p>;
//   if (!data || data.rows.length === 0)
//     return <p className="p-4">No attendance records for {month}</p>;

//   return (
//     <div className="overflow-auto border rounded-lg shadow-lg bg-white">
//       <table className="min-w-full border-collapse text-sm">
//         <thead className="sticky top-0 bg-gray-800 text-white text-xs uppercase tracking-wide">
//           <tr>
//             {data.headers.map((h) => (
//               <th key={h} className="px-3 py-2 border">
//                 {h}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.rows.map((row, i) => (
//             <tr
//               key={i}
//               className={
//                 i % 2 === 0
//                   ? "bg-gray-50 hover:bg-gray-100"
//                   : "bg-white hover:bg-gray-100"
//               }
//             >
//               {data.headers.map((h) => (
//                 <td key={h} className="px-3 py-2 border text-center">
//                   {h.toLowerCase().includes("date")
//                     ? formatDate(row[h])
//                     : row[h] ?? "-"}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";

interface TableData {
  headers: string[];
  rows: Record<string, string>[]; // key is header, value is cell
}

// -------------------- Helpers --------------------
// Increment date by 1 day and format in IST
function formatDatePlusOne(dateString?: string): string {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1); // increment 1 day
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    });
  } catch {
    return dateString;
  }
}

export default function MonthlyAttendanceTable({ month }: { month: string }) {
  const [data, setData] = useState<TableData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const monthParam = month.includes("-") && month.length === 7 ? month : month.slice(0, 7);
        const res = await fetch(`/api/attendance/monthly?month=${monthParam}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        if (!json || !Array.isArray(json.headers) || !Array.isArray(json.rows)) {
          throw new Error("Invalid response format");
        }

        // Optional: sort rows by checkIn date
        json.rows.sort((a: any, b: any) => {
          const dateA = a.checkIn ? new Date(a.checkIn).getTime() : 0;
          const dateB = b.checkIn ? new Date(b.checkIn).getTime() : 0;
          return dateA - dateB;
        });

        setData(json);
      } catch (err: any) {
        console.error("❌ Fetch monthly failed:", err);
        setError(err.message || "Failed to load data");
        setData({ headers: ["Employee"], rows: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [month]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">Error: {error}</p>;
  if (!data || data.rows.length === 0)
    return <p className="p-4">No attendance records for {month}</p>;

  return (
    <div className="overflow-auto border rounded-lg shadow-lg bg-white">
      <table className="min-w-full border-collapse text-sm">
        <thead className="sticky top-0 bg-gray-800 text-white text-xs uppercase tracking-wide">
          <tr>
            {data.headers.map((h) => (
              <th key={h} className="px-3 py-2 border">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, i) => (
            <tr
              key={i}
              className={
                i % 2 === 0
                  ? "bg-gray-50 hover:bg-gray-100"
                  : "bg-white hover:bg-gray-100"
              }
            >
              {data.headers.map((h) => (
                <td key={h} className="px-3 py-2 border text-center">
                  {(h.toLowerCase().includes("date") || h.toLowerCase().includes("checkin")) 
                    ? formatDatePlusOne(row[h] ?? row["checkIn"]) 
                    : row[h] ?? "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
