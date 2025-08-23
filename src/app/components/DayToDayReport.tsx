// "use client";

// import { useEffect, useState } from "react";

// interface ReportEntry {
//   date: string;
//   leads: number;
//   revenue: number;
//   received: number;
// }

// // helper: always returns YYYY-MM
// function getCurrentMonth() {
//   const now = new Date();
//   return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
// }

// export default function DayToDayReport({ month }: { month?: string }) {
//   const [data, setData] = useState<ReportEntry[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const fetchReport = async () => {
//       setLoading(true);
//       setError(null);
//       setData([]);

//       try {
//         const safeMonth = month && /^\d{4}-\d{2}$/.test(month) ? month : getCurrentMonth();

//         const res = await fetch(`/api/seller/day-report?month=${safeMonth}`);

//         if (!res.ok) {
//           const errText = await res.text();
//           throw new Error(
//             `Failed to fetch day-to-day report. Status: ${res.status} ${res.statusText}. Message: ${errText}`
//           );
//         }

//         const report: ReportEntry[] = await res.json();

//         if (!Array.isArray(report)) {
//           throw new Error("Invalid data format received from server");
//         }

//         setData(report);
//       } catch (err: any) {
//         console.error("Error fetching day-to-day report:", err);
//         setError(err.message || "Unknown error occurred while fetching report");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReport();
//   }, [month]);

//   const filtered = data.filter((item) =>
//     Object.values(item)
//       .join(" ")
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   const formatDate = (isoDate: string) => {
//     const date = new Date(isoDate);
//     return date.toLocaleString("en-IN", {
//       hour: "2-digit",
//       minute: "2-digit",
//       weekday: "short",
//       day: "2-digit",
//       month: "long",
//     });
//   };

//   return (
//     <div className="p-6 bg-white rounded-2xl shadow-md mt-6">
//       <h2 className="text-xl font-semibold mb-4">📅 Day-to-Day Report</h2>

//       <input
//         type="text"
//         placeholder="Search by date, leads, or amount..."
//         className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {loading && <p>Loading report...</p>}

//       {error && (
//         <div className="text-red-500 bg-red-100 p-3 rounded mb-4">
//           <strong>Error:</strong> {error}
//         </div>
//       )}

//       {!loading && !error && data.length === 0 && (
//         <p className="text-gray-500">No report data available for this month.</p>
//       )}

//       {data.length > 0 && (
//         <div className="overflow-x-auto">
//           <table className="w-full border border-gray-200 rounded-lg">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-3 text-left">Date</th>
//                 <th className="p-3 text-left">Leads</th>
//                 <th className="p-3 text-left">Revenue</th>
//                 <th className="p-3 text-left">Received</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map((row, index) => (
//                 <tr key={index} className="border-t hover:bg-gray-50">
//                   <td className="p-3">{formatDate(row.date)}</td>
//                   <td className="p-3">{row.leads}</td>
//                   <td className="p-3">₹{row.revenue.toLocaleString()}</td>
//                   <td className="p-3 text-green-600">₹{row.received.toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }









// "use client";

// import { useEffect, useState } from "react";

// interface ReportEntry {
//   shopName: string;
//   firstCreatedAt: string;
//   totalRevenue: number;
//   totalReceived: number;
//   pending: number;
// }

// // helper: always returns YYYY-MM
// function getCurrentMonth() {
//   const now = new Date();
//   return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
// }

// export default function ShopReport({ month }: { month?: string }) {
//   const [data, setData] = useState<ReportEntry[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const fetchReport = async () => {
//       setLoading(true);
//       setError(null);
//       setData([]);

//       try {
//         const safeMonth = month && /^\d{4}-\d{2}$/.test(month) ? month : getCurrentMonth();

//         const res = await fetch(`/api/seller/day-report?month=${safeMonth}`);

//         if (!res.ok) {
//           const errText = await res.text();
//           throw new Error(
//             `Failed to fetch shop report. Status: ${res.status} ${res.statusText}. Message: ${errText}`
//           );
//         }

//         const report: ReportEntry[] = await res.json();

//         if (!Array.isArray(report)) {
//           throw new Error("Invalid data format received from server");
//         }

//         setData(report);
//       } catch (err: any) {
//         console.error("Error fetching shop report:", err);
//         setError(err.message || "Unknown error occurred while fetching report");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReport();
//   }, [month]);

//   const filtered = data.filter((item) =>
//     Object.values(item)
//       .join(" ")
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   const formatDate = (isoDate: string) => {
//     const date = new Date(isoDate);
//     return date.toLocaleDateString("en-IN", {
//       weekday: "short",
//       day: "2-digit",
//       month: "long",
//       year: "numeric",
//     });
//   };

//   return (
//     <div className="p-6 bg-white rounded-2xl shadow-md mt-6">
//       <h2 className="text-xl font-semibold mb-4">🏪 Shop Report</h2>

//       <input
//         type="text"
//         placeholder="Search by shop, revenue, or status..."
//         className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {loading && <p>Loading report...</p>}

//       {error && (
//         <div className="text-red-500 bg-red-100 p-3 rounded mb-4">
//           <strong>Error:</strong> {error}
//         </div>
//       )}

//       {!loading && !error && data.length === 0 && (
//         <p className="text-gray-500">No report data available for this month.</p>
//       )}

//       {data.length > 0 && (
//         <div className="overflow-x-auto">
//           <table className="w-full border border-gray-200 rounded-lg">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-3 text-left">Shop</th>
//                 <th className="p-3 text-left">First Task Date</th>
//                 <th className="p-3 text-left">Revenue</th>
//                 <th className="p-3 text-left">Received</th>
//                 <th className="p-3 text-left">Pending</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map((row, index) => (
//                 <tr key={index} className="border-t hover:bg-gray-50">
//                   <td className="p-3 font-medium">{row.shopName}</td>
//                   <td className="p-3">{formatDate(row.firstCreatedAt)}</td>
//                   <td className="p-3">₹{row.totalRevenue.toLocaleString()}</td>
//                   <td className="p-3 text-green-600">₹{row.totalReceived.toLocaleString()}</td>
//                   <td className="p-3 text-red-600">₹{row.pending.toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

















// "use client";

// import { useEffect, useState } from "react";
// import { format } from "date-fns";

// // Typescript interfaces for data
// interface ReportEntry {
//   shopName: string;
//   firstCreatedAt: string;
//   totalRevenue: number;
//   totalReceived: number;
//   pending: number;
// }

// // helper: returns current month in YYYY-MM format
// const getCurrentMonth = (): string => {
//   return format(new Date(), "yyyy-MM");
// };

// export default function ShopReport({ month }: { month?: string }) {
//   // State management
//   const [data, setData] = useState<ReportEntry[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [search, setSearch] = useState("");

//   // Fetch data from API on component mount or month change
//   useEffect(() => {
//     const fetchReport = async () => {
//       setLoading(true);
//       setError(null);
//       setData([]);

//       try {
//         const safeMonth = month && /^\d{4}-\d{2}$/.test(month) ? month : getCurrentMonth();
//         const res = await fetch(`/api/seller/day-report?month=${safeMonth}`);

//         if (!res.ok) {
//           const errText = await res.text();
//           throw new Error(
//             `Failed to fetch shop report. Status: ${res.status} ${res.statusText}. Message: ${errText}`
//           );
//         }

//         const report: ReportEntry[] = await res.json();
//         if (!Array.isArray(report)) {
//           throw new Error("Invalid data format received from server");
//         }

//         setData(report);
//       } catch (err: any) {
//         console.error("Error fetching shop report:", err);
//         setError(err.message || "Unknown error occurred while fetching report");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReport();
//   }, [month]);

//   // Filter data based on search input
//   const filteredData = data.filter((item) =>
//     Object.values(item).join(" ").toLowerCase().includes(search.toLowerCase())
//   );

//   // Format date for display
//   const formatDate = (isoDate: string) => {
//     return format(new Date(isoDate), "EEE, d LLL yyyy");
//   };

//   return (
//     <div className="p-6 bg-white rounded-2xl shadow-xl mt-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//           <span className="text-3xl">📊</span> Shop Report
//         </h2>
//         <input
//           type="text"
//           placeholder="Search reports..."
//           className="w-full max-w-sm p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* Conditional rendering for loading, error, and empty states */}
//       {loading && <p className="text-center text-blue-500">Loading report...</p>}

//       {error && (
//         <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4">
//           <strong>Error:</strong> {error}
//         </div>
//       )}

//       {!loading && !error && data.length === 0 && (
//         <div className="text-center text-gray-500 py-10">
//           <p className="text-lg">No report data available for this month.</p>
//         </div>
//       )}

//       {/* Main data table */}
//       {!loading && !error && data.length > 0 && (
//         <div className="overflow-x-auto shadow-sm rounded-lg">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Shop
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   First Task Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Revenue
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Received
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Pending
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredData.map((row, index) => (
//                 <tr key={index} className="hover:bg-gray-100 transition-colors duration-200">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {row.shopName}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {formatDate(row.firstCreatedAt)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     ₹{row.totalRevenue.toLocaleString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
//                     ₹{row.totalReceived.toLocaleString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
//                     ₹{row.pending.toLocaleString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {filteredData.length === 0 && data.length > 0 && (
//             <div className="text-center text-gray-500 py-4">
//               <p>No results found for your search.</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }













// "use client";

// import { useEffect, useState } from "react";
// import { format } from "date-fns";
// import { Search } from "lucide-react";

// // Typescript interfaces for data
// interface ReportEntry {
//   shopName: string;
//   firstCreatedAt: string;
//   totalRevenue: number;
//   totalReceived: number;
//   pending: number;
// }

// // helper: returns current month in YYYY-MM format
// const getCurrentMonth = (): string => {
//   return format(new Date(), "yyyy-MM");
// };

// export default function ShopReport({ month }: { month?: string }) {
//   // State management
//   const [data, setData] = useState<ReportEntry[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [search, setSearch] = useState("");

//   // Fetch data from API on component mount or month change
//   useEffect(() => {
//     const fetchReport = async () => {
//       setLoading(true);
//       setError(null);
//       setData([]);

//       try {
//         const safeMonth = month && /^\d{4}-\d{2}$/.test(month) ? month : getCurrentMonth();
//         const res = await fetch(`/api/seller/day-report?month=${safeMonth}`);

//         if (!res.ok) {
//           const errText = await res.text();
//           throw new Error(
//             `Failed to fetch shop report. Status: ${res.status} ${res.statusText}. Message: ${errText}`
//           );
//         }

//         const report: ReportEntry[] = await res.json();
//         if (!Array.isArray(report)) {
//           throw new Error("Invalid data format received from server");
//         }

//         setData(report);
//       } catch (err: any) {
//         console.error("Error fetching shop report:", err);
//         setError(err.message || "Unknown error occurred while fetching report");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReport();
//   }, [month]);

//   // Filter data based on search input
//   const filteredData = data.filter((item) =>
//     Object.values(item).join(" ").toLowerCase().includes(search.toLowerCase())
//   );

//   // Format date for display
//   const formatDate = (isoDate: string) => {
//     return format(new Date(isoDate), "EEE, d LLL yyyy");
//   };

//   return (
//     <div className="p-6 bg-white rounded-2xl shadow-xl mt-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
//         <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//           <span className="text-3xl">📊</span> Shop Report
//         </h2>

//         {/* Search input with icon */}
//         <div className="relative w-full max-w-sm">
//           <Search className="absolute left-3 top-3 text-gray-400" size={18} />
//           <input
//             type="text"
//             placeholder="Search by shop, revenue, or status..."
//             className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg 
//               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Conditional rendering for states */}
//       {loading && <p className="text-center text-blue-500">Loading report...</p>}

//       {error && (
//         <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4">
//           <strong>Error:</strong> {error}
//         </div>
//       )}

//       {!loading && !error && data.length === 0 && (
//         <div className="text-center text-gray-500 py-10">
//           <p className="text-lg">No report data available for this month.</p>
//         </div>
//       )}

//       {/* Data Table */}
//       {!loading && !error && data.length > 0 && (
//         <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
//           <table className="min-w-full text-sm">
//             <thead className="bg-gray-100 text-gray-700">
//               <tr>
//                 <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">Shop</th>
//                 <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
//                   First Task Date
//                 </th>
//                 <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">Revenue</th>
//                 <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">Received</th>
//                 <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">Pending</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.map((row, index) => (
//                 <tr
//                   key={index}
//                   className={`${
//                     index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                   } hover:bg-blue-50 transition-colors`}
//                 >
//                   <td className="px-6 py-4 font-medium text-gray-900">{row.shopName}</td>
//                   <td className="px-6 py-4 text-gray-500">{formatDate(row.firstCreatedAt)}</td>
//                   <td className="px-6 py-4">₹{row.totalRevenue.toLocaleString()}</td>
//                   <td className="px-6 py-4">
//                     <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
//                       ₹{row.totalReceived.toLocaleString()}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-medium">
//                       ₹{row.pending.toLocaleString()}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {filteredData.length === 0 && data.length > 0 && (
//             <div className="text-center text-gray-500 py-4">
//               <p>No results found for your search.</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }













// "use client";

// import { useEffect, useState } from "react";
// import { format } from "date-fns";
// import { Search } from "lucide-react";

// // Typescript interfaces for data
// interface ReportEntry {
//   taskNumber: number;   // ✅ added
//   shopName: string;
//   firstCreatedAt: string;
//   totalRevenue: number;
//   totalReceived: number;
//   pending: number;
// }

// // helper: returns current month in YYYY-MM format
// const getCurrentMonth = (): string => {
//   return format(new Date(), "yyyy-MM");
// };

// export default function ShopReport({ month }: { month?: string }) {
//   // State management
//   const [data, setData] = useState<ReportEntry[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [search, setSearch] = useState("");

//   // Fetch data from API on component mount or month change
//   useEffect(() => {
//     const fetchReport = async () => {
//       setLoading(true);
//       setError(null);
//       setData([]);

//       try {
//         const safeMonth =
//           month && /^\d{4}-\d{2}$/.test(month) ? month : getCurrentMonth();
//         const res = await fetch(`/api/seller/day-report?month=${safeMonth}`);

//         if (!res.ok) {
//           const errText = await res.text();
//           throw new Error(
//             `Failed to fetch shop report. Status: ${res.status} ${res.statusText}. Message: ${errText}`
//           );
//         }

//         const report: ReportEntry[] = await res.json();
//         if (!Array.isArray(report)) {
//           throw new Error("Invalid data format received from server");
//         }

//         setData(report);
//       } catch (err: any) {
//         console.error("Error fetching shop report:", err);
//         setError(
//           err.message || "Unknown error occurred while fetching report"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReport();
//   }, [month]);

//   // Filter data based on search input
//   const filteredData = data.filter((item) =>
//     Object.values(item)
//       .join(" ")
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   // Format date for display
//   const formatDate = (isoDate: string) => {
//     return format(new Date(isoDate), "EEE, d LLL yyyy");
//   };

//   return (
//     <div className="p-6 bg-white rounded-2xl shadow-xl mt-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
//         <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//           <span className="text-3xl">📊</span> Shop Report
//         </h2>

//         {/* Search input with icon */}
//         <div className="relative w-full max-w-sm">
//           <Search className="absolute left-3 top-3 text-gray-400" size={18} />
//           <input
//             type="text"
//             placeholder="Search by shop, revenue, or status..."
//             className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg 
//               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Conditional rendering for states */}
//       {loading && <p className="text-center text-blue-500">Loading report...</p>}

//       {error && (
//         <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4">
//           <strong>Error:</strong> {error}
//         </div>
//       )}

//       {!loading && !error && data.length === 0 && (
//         <div className="text-center text-gray-500 py-10">
//           <p className="text-lg">No report data available for this month.</p>
//         </div>
//       )}

//       {/* Data Table */}
//       {!loading && !error && data.length > 0 && (
//         <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
//           <table className="min-w-full text-sm">
//             <thead className="bg-gray-100 text-gray-700">
//               <tr>
//                 <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
//                   #
//                 </th>
//                 <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
//                   Shop
//                 </th>
//                 <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
//                   First Task Date
//                 </th>
//                 <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
//                   Revenue
//                 </th>
//                 <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
//                   Received
//                 </th>
//                 <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
//                   Pending
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.map((row, index) => (
//                 <tr
//                   key={index}
//                   className={`${
//                     index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                   } hover:bg-blue-50 transition-colors`}
//                 >
//                   <td className="px-6 py-4 font-medium text-gray-700">
//                     {row.taskNumber}
//                   </td>
//                   <td className="px-6 py-4 font-medium text-gray-900">
//                     {row.shopName}
//                   </td>
//                   <td className="px-6 py-4 text-gray-500">
//                     {formatDate(row.firstCreatedAt)}
//                   </td>
//                   <td className="px-6 py-4">
//                     ₹{row.totalRevenue.toLocaleString()}
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
//                       ₹{row.totalReceived.toLocaleString()}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-medium">
//                       ₹{row.pending.toLocaleString()}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {filteredData.length === 0 && data.length > 0 && (
//             <div className="text-center text-gray-500 py-4">
//               <p>No results found for your search.</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }













// "use client";

// import { useEffect, useState } from "react";
// import { format } from "date-fns";
// import { Search, Loader2 } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// // Typescript interfaces for data
// interface ReportEntry {
//   taskNumber: number;
//   shopName: string;
//   firstCreatedAt: string;
//   totalRevenue: number;
//   totalReceived: number;
//   pending: number;
// }

// // helper: returns current month in YYYY-MM format
// const getCurrentMonth = (): string => {
//   return format(new Date(), "yyyy-MM");
// };

// export default function ShopReport({ month }: { month?: string }) {
//   // State management
//   const [data, setData] = useState<ReportEntry[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [search, setSearch] = useState("");

//   // Fetch data from API on component mount or month change
//   useEffect(() => {
//     const fetchReport = async () => {
//       setLoading(true);
//       setError(null);
//       setData([]);

//       try {
//         const safeMonth =
//           month && /^\d{4}-\d{2}$/.test(month) ? month : getCurrentMonth();
//         const res = await fetch(`/api/seller/day-report?month=${safeMonth}`);

//         if (!res.ok) {
//           const errText = await res.text();
//           throw new Error(
//             `Failed to fetch shop report. Status: ${res.status} ${res.statusText}. Message: ${errText}`
//           );
//         }

//         const report: ReportEntry[] = await res.json();
//         if (!Array.isArray(report)) {
//           throw new Error("Invalid data format received from server");
//         }

//         setData(report);
//       } catch (err: any) {
//         console.error("Error fetching shop report:", err);
//         setError(
//           err.message || "Unknown error occurred while fetching report"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReport();
//   }, [month]);

//   // Filter data based on search input
//   const filteredData = data.filter((item) =>
//     Object.values(item)
//       .join(" ")
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   // Format date for display
//   const formatDate = (isoDate: string) => {
//     return format(new Date(isoDate), "EEE, d LLL yyyy");
//   };

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
//           <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
//             <span className="text-4xl text-blue-600">📊</span> Shop Report
//           </h2>

//           {/* Search input with icon */}
//           <div className="relative w-full max-w-sm">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//             <input
//               type="text"
//               placeholder="Search by shop, revenue, or status..."
//               className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl bg-white shadow-sm
//                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Conditional rendering for states with animation */}
//         <AnimatePresence mode="wait">
//           {loading && (
//             <motion.div
//               key="loading-state"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="text-center text-blue-600 py-10"
//             >
//               <Loader2 className="inline-block animate-spin text-4xl" />
//               <p className="mt-2 text-lg">Loading report...</p>
//             </motion.div>
//           )}

//           {error && (
//             <motion.div
//               key="error-state"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg shadow-sm"
//             >
//               <h3 className="font-bold text-lg mb-2">Error</h3>
//               <p>{error}</p>
//             </motion.div>
//           )}

//           {!loading && !error && data.length === 0 && (
//             <motion.div
//               key="empty-state"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="text-center text-gray-500 py-10"
//             >
//               <p className="text-lg">No report data available for this month.</p>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Data Table with animation */}
//         <AnimatePresence>
//           {!loading && !error && data.length > 0 && (
//             <motion.div
//               key="data-table"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2, duration: 0.5 }}
//               className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg"
//             >
//               <table className="min-w-full text-sm">
//                 <thead className="bg-gray-100 text-gray-700">
//                   <tr>
//                     <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
//                       #
//                     </th>
//                     <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
//                       Shop
//                     </th>
//                     <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
//                       First Task Date
//                     </th>
//                     <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
//                       Revenue
//                     </th>
//                     <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
//                       Received
//                     </th>
//                     <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
//                       Pending
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {filteredData.map((row, index) => (
//                     <tr
//                       key={index}
//                       className={`${
//                         index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                       } hover:bg-blue-50 transition-colors`}
//                     >
//                       <td className="px-6 py-4 font-medium text-gray-700">
//                         {row.taskNumber}
//                       </td>
//                       <td className="px-6 py-4 font-medium text-gray-900">
//                         {row.shopName}
//                       </td>
//                       <td className="px-6 py-4 text-gray-500">
//                         {formatDate(row.firstCreatedAt)}
//                       </td>
//                       <td className="px-6 py-4 text-gray-900">
//                         ₹{row.totalRevenue.toLocaleString()}
//                       </td>
//                       <td className="px-6 py-4">
//                         <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
//                           ₹{row.totalReceived.toLocaleString()}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4">
//                         <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
//                           ₹{row.pending.toLocaleString()}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               {filteredData.length === 0 && data.length > 0 && (
//                 <div className="text-center text-gray-500 py-4 bg-white">
//                   <p>No results found for your search.</p>
//                 </div>
//               )}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }












"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Search, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Typescript interfaces for data
interface ReportEntry {
  taskNumber: number;
  shopName: string;
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