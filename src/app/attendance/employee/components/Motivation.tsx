// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useUser, useAuth } from "@clerk/nextjs";

// interface RankedEmployee {
//   userId?: string;
//   employeeName: string;
//   daysPresent: number;
//   daysLate: number;
//   earlyLeaves: number;
//   earlyArrival: number;
//   overtimeHours: number;
//   score: number;
//   rank: number;
//   medal?: string;
// }

// // helpers
// const pad = (n: number) => String(n).padStart(2, "0");

// function formatHours(decimal?: number) {
//   if (!decimal || decimal <= 0) return "0h";
//   const hrs = Math.floor(decimal);
//   const mins = Math.round((decimal - hrs) * 60);
//   const parts: string[] = [];
//   if (hrs) parts.push(`${hrs}h`);
//   if (mins) parts.push(`${mins}m`);
//   return parts.join(" ");
// }

// function getMedalEmoji(rank: number) {
//   if (rank === 1) return "🥇";
//   if (rank === 2) return "🥈";
//   if (rank === 3) return "🥉";
//   return "";
// }

// export default function Motivation() {
//   const { user, isLoaded } = useUser();
//   const { getToken } = useAuth();

//   const [month, setMonth] = useState(() => {
//     const now = new Date();
//     return `${now.getFullYear()}-${pad(now.getMonth() + 1)}`;
//   });

//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState<RankedEmployee[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!isLoaded || !user) return;
//     fetchData(month);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isLoaded, user?.id, month]);

//   async function fetchData(monthParam: string) {
//     setLoading(true);
//     setError(null);
//     try {
//       const token = await getToken();
//       const qs = monthParam ? `?month=${encodeURIComponent(monthParam)}` : "";
//       const res = await fetch(`/api/attendance/employeerank${qs}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) {
//         const txt = await res.text();
//         throw new Error(txt || `HTTP ${res.status}`);
//       }
//       const json = (await res.json()) as any[];

//       // Defensive normalization
//       const normalized: RankedEmployee[] = (Array.isArray(json) ? json : []).map((it, idx) => ({
//         userId: it.userId,
//         employeeName: it.employeeName || "Unknown",
//         daysPresent: Number(it.daysPresent ?? 0) || 0,
//         daysLate: Number(it.daysLate ?? 0) || 0,
//         earlyLeaves: Number(it.earlyLeaves ?? 0) || 0,
//         earlyArrival: Number(it.earlyArrival ?? (Number(it.daysPresent ?? 0) - Number(it.daysLate ?? 0) - Number(it.earlyLeaves ?? 0))) || 0,
//         overtimeHours: Math.round((Number(it.overtimeHours ?? 0) + Number.EPSILON) * 100) / 100,
//         score: Math.round((Number(it.score ?? 0) + Number.EPSILON) * 100) / 100,
//         rank: Number(it.rank ?? (idx + 1)),
//         medal: it.medal || getMedalEmoji(Number(it.rank ?? (idx + 1))),
//       }));

//       setData(normalized);
//     } catch (err: any) {
//       console.error("Failed to fetch ranking:", err);
//       setError(err?.message || "Failed to fetch");
//       setData([]);
//     } finally {
//       setLoading(false);
//     }
//   }

//   // derived lists for top categories
//   const topConsistency = useMemo(() => [...data].sort((a, b) => b.daysPresent - a.daysPresent).slice(0, 3), [data]);
//   const topEarly = useMemo(() => [...data].sort((a, b) => b.earlyArrival - a.earlyArrival).slice(0, 3), [data]);
//   const topOvertime = useMemo(() => [...data].sort((a, b) => b.overtimeHours - a.overtimeHours).slice(0, 3), [data]);

//   const totals = useMemo(() => {
//     return data.reduce(
//       (acc, r) => {
//         acc.totalEmployees += 1;
//         acc.sumDaysPresent += r.daysPresent;
//         acc.sumOvertime += r.overtimeHours;
//         acc.sumLate += r.daysLate;
//         return acc;
//       },
//       { totalEmployees: 0, sumDaysPresent: 0, sumOvertime: 0, sumLate: 0 }
//     );
//   }, [data]);

//   return (
//     <div className="p-4 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Employee Ranking Dashboard 🏆</h1>

//       <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div className="flex items-center gap-3">
//           <label className="font-semibold text-gray-700">Select Month:</label>
//           <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="border rounded p-2" />
//         </div>

//         <div className="flex items-center gap-4">
//           <div className="bg-white p-3 rounded shadow text-center">
//             <div className="text-sm text-gray-500">Employees</div>
//             <div className="text-xl font-bold">{totals.totalEmployees}</div>
//           </div>
//           <div className="bg-white p-3 rounded shadow text-center">
//             <div className="text-sm text-gray-500">Avg Days Present</div>
//             <div className="text-xl font-bold">
//               {totals.totalEmployees ? (totals.sumDaysPresent / totals.totalEmployees).toFixed(2) : "0.00"}
//             </div>
//           </div>
//           <div className="bg-white p-3 rounded shadow text-center">
//             <div className="text-sm text-gray-500">Total Overtime</div>
//             <div className="text-xl font-bold">{formatHours(totals.sumOvertime)}</div>
//           </div>
//         </div>
//       </div>

//       {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">{error}</div>}

//       {loading ? (
//         <div className="text-center p-12 bg-white rounded shadow-lg">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-3"></div>
//           <p>Loading employee records...</p>
//         </div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             <div className="bg-white rounded-lg shadow p-4">
//               <h3 className="text-lg font-semibold mb-3">Most Consistent</h3>
//               {topConsistency.length === 0 ? <p className="text-gray-500">No data</p> : (
//                 <ol className="space-y-2">
//                   {topConsistency.map((r, i) => (
//                     <li key={r.employeeName} className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <span className="text-2xl">{getMedalEmoji(i + 1)}</span>
//                         <span className="font-medium">{r.employeeName}</span>
//                       </div>
//                       <div className="text-sm text-gray-600">{r.daysPresent} days</div>
//                     </li>
//                   ))}
//                 </ol>
//               )}
//             </div>

//             <div className="bg-white rounded-lg shadow p-4">
//               <h3 className="text-lg font-semibold mb-3">Early Birds</h3>
//               {topEarly.length === 0 ? <p className="text-gray-500">No data</p> : (
//                 <ol className="space-y-2">
//                   {topEarly.map((r, i) => (
//                     <li key={r.employeeName} className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <span className="text-2xl">{getMedalEmoji(i + 1)}</span>
//                         <span className="font-medium">{r.employeeName}</span>
//                       </div>
//                       <div className="text-sm text-gray-600">{r.earlyArrival} early</div>
//                     </li>
//                   ))}
//                 </ol>
//               )}
//             </div>

//             <div className="bg-white rounded-lg shadow p-4">
//               <h3 className="text-lg font-semibold mb-3">Overtime Heroes</h3>
//               {topOvertime.length === 0 ? <p className="text-gray-500">No data</p> : (
//                 <ol className="space-y-2">
//                   {topOvertime.map((r, i) => (
//                     <li key={r.employeeName} className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <span className="text-2xl">{getMedalEmoji(i + 1)}</span>
//                         <span className="font-medium">{r.employeeName}</span>
//                       </div>
//                       <div className="text-sm text-gray-600">{formatHours(r.overtimeHours)}</div>
//                     </li>
//                   ))}
//                 </ol>
//               )}
//             </div>
//           </div>

//           <div className="overflow-x-auto bg-white rounded-xl shadow-xl border border-gray-200">
//             <table className="min-w-full text-sm">
//               <thead className="bg-gray-50 sticky top-0 z-10">
//                 <tr className="text-gray-600 uppercase font-semibold tracking-wider">
//                   <th className="px-4 py-3 border-b text-center">Rank</th>
//                   <th className="px-4 py-3 border-b text-left">Employee</th>
//                   <th className="px-4 py-3 border-b text-center">Days Present</th>
//                   <th className="px-4 py-3 border-b text-center">Days Late</th>
//                   <th className="px-4 py-3 border-b text-center">Early Arrivals</th>
//                   <th className="px-4 py-3 border-b text-center">Overtime</th>
//                   <th className="px-4 py-3 border-b text-center">Score</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.map((rec) => {
//                   const highlight = rec.rank <= 3 ? "bg-yellow-50" : rec.rank % 2 === 0 ? "bg-gray-50" : "bg-white";
//                   return (
//                     <tr key={`${rec.employeeName}-${rec.rank}`} className={`${highlight} transition`}>
//                       <td className="px-4 py-3 border-b text-center font-bold text-purple-600">{getMedalEmoji(rec.rank)} {rec.rank}</td>
//                       <td className="px-4 py-3 border-b">{rec.employeeName}</td>
//                       <td className="px-4 py-3 border-b text-center">{rec.daysPresent}</td>
//                       <td className="px-4 py-3 border-b text-center">{rec.daysLate}</td>
//                       <td className="px-4 py-3 border-b text-center">{rec.earlyArrival}</td>
//                       <td className="px-4 py-3 border-b text-center">{formatHours(rec.overtimeHours)}</td>
//                       <td className="px-4 py-3 border-b text-center font-semibold text-blue-600">{rec.score}</td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }












// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useUser, useAuth } from "@clerk/nextjs";

// interface RankedEmployee {
//   userId?: string;
//   employeeName: string;
//   daysPresent: number;
//   daysLate: number;
//   earlyLeaves: number;
//   earlyArrival: number;
//   totalWorkingHours: number;
//   overtimeHours: number;
//   score: number;
//   rank: number;
//   medal?: string;
// }

// // helpers
// const pad = (n: number) => String(n).padStart(2, "0");

// function formatHours(decimal?: number) {
//   if (!decimal || decimal <= 0) return "0h";
//   const hrs = Math.floor(decimal);
//   const mins = Math.round((decimal - hrs) * 60);
//   const parts: string[] = [];
//   if (hrs) parts.push(`${hrs}h`);
//   if (mins) parts.push(`${mins}m`);
//   return parts.join(" ");
// }

// function getMedalEmoji(rank: number) {
//   if (rank === 1) return "🥇";
//   if (rank === 2) return "🥈";
//   if (rank === 3) return "🥉";
//   return "";
// }

// export default function Motivation() {
//   const { user, isLoaded } = useUser();
//   const { getToken } = useAuth();

//   const [month, setMonth] = useState(() => {
//     const now = new Date();
//     return `${now.getFullYear()}-${pad(now.getMonth() + 1)}`;
//   });

//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState<RankedEmployee[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!isLoaded || !user) return;
//     fetchData(month);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isLoaded, user?.id, month]);

//   async function fetchData(monthParam: string) {
//     setLoading(true);
//     setError(null);
//     try {
//       const token = await getToken();
//       const qs = monthParam ? `?month=${encodeURIComponent(monthParam)}` : "";
//       const res = await fetch(`/api/attendance/employeerank${qs}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) {
//         const txt = await res.text();
//         throw new Error(txt || `HTTP ${res.status}`);
//       }
//       const json = (await res.json()) as any[];

//       // Defensive normalization
//       const normalized: RankedEmployee[] = (Array.isArray(json) ? json : []).map((it, idx) => ({
//         userId: it.userId,
//         employeeName: it.employeeName || "Unknown",
//         daysPresent: Number(it.daysPresent ?? 0),
//         daysLate: Number(it.daysLate ?? 0),
//         earlyLeaves: Number(it.earlyLeaves ?? 0),
//         earlyArrival: Number(it.earlyArrival ?? 0),
//         totalWorkingHours: Math.round((Number(it.totalWorkingHours ?? 0) + Number.EPSILON) * 100) / 100,
//         overtimeHours: Math.round((Number(it.overtimeHours ?? 0) + Number.EPSILON) * 100) / 100,
//         score: Math.round((Number(it.score ?? 0) + Number.EPSILON) * 100) / 100,
//         rank: Number(it.rank ?? (idx + 1)),
//         medal: it.medal || getMedalEmoji(Number(it.rank ?? (idx + 1))),
//       }));

//       setData(normalized);
//     } catch (err: any) {
//       console.error("Failed to fetch ranking:", err);
//       setError(err?.message || "Failed to fetch");
//       setData([]);
//     } finally {
//       setLoading(false);
//     }
//   }

//   // derived lists for top categories
//   const topConsistency = useMemo(() => [...data].sort((a, b) => b.daysPresent - a.daysPresent).slice(0, 3), [data]);
//   const topEarly = useMemo(() => [...data].sort((a, b) => b.earlyArrival - a.earlyArrival).slice(0, 3), [data]);
//   const topOvertime = useMemo(() => [...data].sort((a, b) => b.overtimeHours - a.overtimeHours).slice(0, 3), [data]);

//   const totals = useMemo(() => {
//     return data.reduce(
//       (acc, r) => {
//         acc.totalEmployees += 1;
//         acc.sumDaysPresent += r.daysPresent;
//         acc.sumOvertime += r.overtimeHours;
//         acc.sumTotalHours += r.totalWorkingHours;
//         acc.sumLate += r.daysLate;
//         return acc;
//       },
//       { totalEmployees: 0, sumDaysPresent: 0, sumOvertime: 0, sumTotalHours: 0, sumLate: 0 }
//     );
//   }, [data]);

//   return (
//     <div className="p-4 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Employee Ranking Dashboard 🏆</h1>

//       <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div className="flex items-center gap-3">
//           <label className="font-semibold text-gray-700">Select Month:</label>
//           <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="border rounded p-2" />
//         </div>

//         <div className="flex items-center gap-4">
//           <div className="bg-white p-3 rounded shadow text-center">
//             <div className="text-sm text-gray-500">Employees</div>
//             <div className="text-xl font-bold">{totals.totalEmployees}</div>
//           </div>
//           <div className="bg-white p-3 rounded shadow text-center">
//             <div className="text-sm text-gray-500">Avg Days Present</div>
//             <div className="text-xl font-bold">
//               {totals.totalEmployees ? (totals.sumDaysPresent / totals.totalEmployees).toFixed(2) : "0.00"}
//             </div>
//           </div>
//           <div className="bg-white p-3 rounded shadow text-center">
//             <div className="text-sm text-gray-500">Total Hours Worked</div>
//             <div className="text-xl font-bold">{formatHours(totals.sumTotalHours)}</div>
//           </div>
//           <div className="bg-white p-3 rounded shadow text-center">
//             <div className="text-sm text-gray-500">Total Overtime</div>
//             <div className="text-xl font-bold">{formatHours(totals.sumOvertime)}</div>
//           </div>
//         </div>
//       </div>

//       {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">{error}</div>}

//       {loading ? (
//         <div className="text-center p-12 bg-white rounded shadow-lg">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-3"></div>
//           <p>Loading employee records...</p>
//         </div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             <div className="bg-white rounded-lg shadow p-4">
//               <h3 className="text-lg font-semibold mb-3">Most Consistent</h3>
//               {topConsistency.length === 0 ? <p className="text-gray-500">No data</p> : (
//                 <ol className="space-y-2">
//                   {topConsistency.map((r, i) => (
//                     <li key={r.employeeName} className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <span className="text-2xl">{getMedalEmoji(i + 1)}</span>
//                         <span className="font-medium">{r.employeeName}</span>
//                       </div>
//                       <div className="text-sm text-gray-600">{r.daysPresent} days</div>
//                     </li>
//                   ))}
//                 </ol>
//               )}
//             </div>

//             <div className="bg-white rounded-lg shadow p-4">
//               <h3 className="text-lg font-semibold mb-3">Early Birds</h3>
//               {topEarly.length === 0 ? <p className="text-gray-500">No data</p> : (
//                 <ol className="space-y-2">
//                   {topEarly.map((r, i) => (
//                     <li key={r.employeeName} className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <span className="text-2xl">{getMedalEmoji(i + 1)}</span>
//                         <span className="font-medium">{r.employeeName}</span>
//                       </div>
//                       <div className="text-sm text-gray-600">{r.earlyArrival} early</div>
//                     </li>
//                   ))}
//                 </ol>
//               )}
//             </div>

//             <div className="bg-white rounded-lg shadow p-4">
//               <h3 className="text-lg font-semibold mb-3">Overtime Heroes</h3>
//               {topOvertime.length === 0 ? <p className="text-gray-500">No data</p> : (
//                 <ol className="space-y-2">
//                   {topOvertime.map((r, i) => (
//                     <li key={r.employeeName} className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <span className="text-2xl">{getMedalEmoji(i + 1)}</span>
//                         <span className="font-medium">{r.employeeName}</span>
//                       </div>
//                       <div className="text-sm text-gray-600">{formatHours(r.overtimeHours)}</div>
//                     </li>
//                   ))}
//                 </ol>
//               )}
//             </div>
//           </div>

//           <div className="overflow-x-auto bg-white rounded-xl shadow-xl border border-gray-200">
//             <table className="min-w-full text-sm">
//               <thead className="bg-gray-50 sticky top-0 z-10">
//                 <tr className="text-gray-600 uppercase font-semibold tracking-wider">
//                   <th className="px-4 py-3 border-b text-center">Rank</th>
//                   <th className="px-4 py-3 border-b text-left">Employee</th>
//                   <th className="px-4 py-3 border-b text-center">Days Present</th>
//                   <th className="px-4 py-3 border-b text-center">Days Late</th>
//                   <th className="px-4 py-3 border-b text-center">Early Arrivals</th>
//                   <th className="px-4 py-3 border-b text-center">Total Hours</th>
//                   <th className="px-4 py-3 border-b text-center">Overtime</th>
//                   <th className="px-4 py-3 border-b text-center">Score</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.map((rec) => {
//                   const highlight = rec.rank <= 3 ? "bg-yellow-50" : rec.rank % 2 === 0 ? "bg-gray-50" : "bg-white";
//                   return (
//                     <tr key={`${rec.employeeName}-${rec.rank}`} className={`${highlight} transition`}>
//                       <td className="px-4 py-3 border-b text-center font-bold text-purple-600">{getMedalEmoji(rec.rank)} {rec.rank}</td>
//                       <td className="px-4 py-3 border-b">{rec.employeeName}</td>
//                       <td className="px-4 py-3 border-b text-center">{rec.daysPresent}</td>
//                       <td className="px-4 py-3 border-b text-center">{rec.daysLate}</td>
//                       <td className="px-4 py-3 border-b text-center">{rec.earlyArrival}</td>
//                       <td className="px-4 py-3 border-b text-center">{formatHours(rec.totalWorkingHours)}</td>
//                       <td className="px-4 py-3 border-b text-center">{formatHours(rec.overtimeHours)}</td>
//                       <td className="px-4 py-3 border-b text-center font-semibold text-blue-600">{rec.score}</td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }





































"use client";

import { useEffect, useMemo, useState } from "react";
import { useUser, useAuth } from "@clerk/nextjs";

interface RankedEmployee {
  userId?: string;
  employeeName: string;
  daysPresent: number;
  daysLate: number;
  earlyLeaves: number;
  earlyArrival: number;
  totalWorkingHours: number;
  overtimeHours: number;
  score: number;
  rank: number;
  medal?: string;
  attendancePercent?: number;
}

// helpers
const pad = (n: number) => String(n).padStart(2, "0");

function formatHours(decimal?: number) {
  if (!decimal || decimal <= 0) return "0h";
  const hrs = Math.floor(decimal);
  const mins = Math.round((decimal - hrs) * 60);
  const parts: string[] = [];
  if (hrs) parts.push(`${hrs}h`);
  if (mins) parts.push(`${mins}m`);
  return parts.join(" ");
}

function getMedalEmoji(rank: number) {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return "";
}

export default function Motivation() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  const [month, setMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}`;
  });

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<RankedEmployee[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !user) return;
    fetchData(month);
  }, [isLoaded, user?.id, month]);

  async function fetchData(monthParam: string) {
    setLoading(true);
    setError(null);
    try {
      const token = await getToken();
      const qs = monthParam ? `?month=${encodeURIComponent(monthParam)}` : "";
      const res = await fetch(`/api/attendance/employeerank${qs}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `HTTP ${res.status}`);
      }
      const json = (await res.json()) as any[];

      // calculate days till today in the selected month
      const [year, monthStr] = monthParam.split("-");
      const currentDate = new Date();
      const selectedMonth = Number(monthStr) - 1;
      const selectedYear = Number(year);
      const daysTillToday =
        selectedYear === currentDate.getFullYear() && selectedMonth === currentDate.getMonth()
          ? currentDate.getDate()
          : new Date(selectedYear, selectedMonth + 1, 0).getDate();

      const normalized: RankedEmployee[] = (Array.isArray(json) ? json : []).map((it, idx) => {
        const daysPresent = Number(it.daysPresent ?? 0);
        const absentDays = Math.max(daysTillToday - daysPresent, 0);
        const attendancePercent = ((daysTillToday - absentDays) / daysTillToday) * 100;

        return {
          userId: it.userId,
          employeeName: it.employeeName || "Unknown",
          daysPresent,
          daysLate: Number(it.daysLate ?? 0),
          earlyLeaves: Number(it.earlyLeaves ?? 0),
          earlyArrival: Number(it.earlyArrival ?? 0),
          totalWorkingHours: Math.round((Number(it.totalWorkingHours ?? 0) + Number.EPSILON) * 100) / 100,
          overtimeHours: Math.round((Number(it.overtimeHours ?? 0) + Number.EPSILON) * 100) / 100,
          score: Math.round((Number(it.score ?? 0) + Number.EPSILON) * 100) / 100,
          rank: Number(it.rank ?? (idx + 1)),
          medal: it.medal || getMedalEmoji(Number(it.rank ?? (idx + 1))),
          attendancePercent: Math.round(attendancePercent * 100) / 100, // 2 decimals
        };
      });

      setData(normalized);
    } catch (err: any) {
      console.error("Failed to fetch ranking:", err);
      setError(err?.message || "Failed to fetch");
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  // derived lists for top categories
  const topConsistency = useMemo(() => [...data].sort((a, b) => b.daysPresent - a.daysPresent).slice(0, 3), [data]);
  const topEarly = useMemo(() => [...data].sort((a, b) => b.earlyArrival - a.earlyArrival).slice(0, 3), [data]);
  const topOvertime = useMemo(() => [...data].sort((a, b) => b.overtimeHours - a.overtimeHours).slice(0, 3), [data]);

  const totals = useMemo(() => {
    return data.reduce(
      (acc, r) => {
        acc.totalEmployees += 1;
        acc.sumDaysPresent += r.daysPresent;
        acc.sumOvertime += r.overtimeHours;
        acc.sumTotalHours += r.totalWorkingHours;
        acc.sumLate += r.daysLate;
        return acc;
      },
      { totalEmployees: 0, sumDaysPresent: 0, sumOvertime: 0, sumTotalHours: 0, sumLate: 0 }
    );
  }, [data]);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Employee Ranking Dashboard 🏆</h1>

      {/* Month Selector + Stats */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="font-semibold text-gray-700">Select Month:</label>
          <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="border rounded p-2" />
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-white p-3 rounded shadow text-center">
            <div className="text-sm text-gray-500">Employees</div>
            <div className="text-xl font-bold">{totals.totalEmployees}</div>
          </div>
          <div className="bg-white p-3 rounded shadow text-center">
            <div className="text-sm text-gray-500">Avg Days Present</div>
            <div className="text-xl font-bold">
              {totals.totalEmployees ? (totals.sumDaysPresent / totals.totalEmployees).toFixed(2) : "0.00"}
            </div>
          </div>
          <div className="bg-white p-3 rounded shadow text-center">
            <div className="text-sm text-gray-500">Total Hours Worked</div>
            <div className="text-xl font-bold">{formatHours(totals.sumTotalHours)}</div>
          </div>
          <div className="bg-white p-3 rounded shadow text-center">
            <div className="text-sm text-gray-500">Total Overtime</div>
            <div className="text-xl font-bold">{formatHours(totals.sumOvertime)}</div>
          </div>
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">{error}</div>}

      {loading ? (
        <div className="text-center p-12 bg-white rounded shadow-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-3"></div>
          <p>Loading employee records...</p>
        </div>
      ) : (
        <>
          {/* Top Performers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold mb-3">Most Consistent</h3>
              {topConsistency.length === 0 ? <p className="text-gray-500">No data</p> : (
                <ol className="space-y-2">
                  {topConsistency.map((r, i) => (
                    <li key={r.employeeName} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getMedalEmoji(i + 1)}</span>
                        <span className="font-medium">{r.employeeName}</span>
                      </div>
                      <div className="text-sm text-gray-600">{r.daysPresent} days</div>
                    </li>
                  ))}
                </ol>
              )}
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold mb-3">Early Birds</h3>
              {topEarly.length === 0 ? <p className="text-gray-500">No data</p> : (
                <ol className="space-y-2">
                  {topEarly.map((r, i) => (
                    <li key={r.employeeName} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getMedalEmoji(i + 1)}</span>
                        <span className="font-medium">{r.employeeName}</span>
                      </div>
                      <div className="text-sm text-gray-600">{r.earlyArrival} early</div>
                    </li>
                  ))}
                </ol>
              )}
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold mb-3">Overtime Heroes</h3>
              {topOvertime.length === 0 ? <p className="text-gray-500">No data</p> : (
                <ol className="space-y-2">
                  {topOvertime.map((r, i) => (
                    <li key={r.employeeName} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getMedalEmoji(i + 1)}</span>
                        <span className="font-medium">{r.employeeName}</span>
                      </div>
                      <div className="text-sm text-gray-600">{formatHours(r.overtimeHours)}</div>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>

          {/* Ranking Table */}
          <div className="overflow-x-auto bg-white rounded-xl shadow-xl border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr className="text-gray-600 uppercase font-semibold tracking-wider">
                  <th className="px-4 py-3 border-b text-center">Rank</th>
                  <th className="px-4 py-3 border-b text-left">Employee</th>
                  <th className="px-4 py-3 border-b text-center">Days Present</th>
                  <th className="px-4 py-3 border-b text-center">Attendance %</th>
                  <th className="px-4 py-3 border-b text-center">Days Late</th>
                  <th className="px-4 py-3 border-b text-center">Early Arrivals</th>
                  <th className="px-4 py-3 border-b text-center">Total Hours</th>
                  <th className="px-4 py-3 border-b text-center">Overtime</th>
                  <th className="px-4 py-3 border-b text-center">Score</th>
                </tr>
              </thead>
              <tbody>
                {data.map((rec) => {
                  const highlight = rec.rank <= 3 ? "bg-yellow-50" : rec.rank % 2 === 0 ? "bg-gray-50" : "bg-white";
                  return (
                    <tr key={`${rec.employeeName}-${rec.rank}`} className={`${highlight} transition`}>
                      <td className="px-4 py-3 border-b text-center font-bold text-purple-600">
                        {getMedalEmoji(rec.rank)} {rec.rank}
                      </td>
                      <td className="px-4 py-3 border-b">{rec.employeeName}</td>
                      <td className="px-4 py-3 border-b text-center">{rec.daysPresent}</td>
                      <td className="px-4 py-3 border-b text-center text-green-600 font-semibold">
                        {rec.attendancePercent?.toFixed(2)}%
                      </td>
                      <td className="px-4 py-3 border-b text-center">{rec.daysLate}</td>
                      <td className="px-4 py-3 border-b text-center">{rec.earlyArrival}</td>
                      <td className="px-4 py-3 border-b text-center">{formatHours(rec.totalWorkingHours)}</td>
                      <td className="px-4 py-3 border-b text-center">{formatHours(rec.overtimeHours)}</td>
                      <td className="px-4 py-3 border-b text-center font-semibold text-blue-600">{rec.score}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
