// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { Card } from "../components/ui/card";
// import RevenueByAssigneeChart from "../components/charts/RevenueByAssigneeChart";
// import MonthReportTable from "../components/tables/MonthReportTable";
// import WeekReportTable from "../components/tables/WeekReportTable";
// import DayReportTable from "../components/tables/DayReportTable";
// import CumulativeRevenueChart from "../components/charts/CumulativeRevenueChart";
// import GoalProgress from "../components/charts/GoalProgress";
// import CombinedComparisonSection from "../components/tables/CombinedComparisonSection";

// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
// } from "recharts";

// const tabs = [
//   { label: "Comparison", key: "comparison" },
//   { label: "Day", key: "day" },
//    { label: "Week", key: "week" },
//   { label: "Month", key: "month" },
//   { label: "Charts", key: "charts" },
// ];

// export default function SalesDashboardPage() {
//   const [stats, setStats] = useState<any>(null);
//   const [monthlyData, setMonthlyData] = useState<any[]>([]);
//   const [assigneeData, setAssigneeData] = useState<any[]>([]);
//   const [dayData, setDayData] = useState<any[]>([]);
//   const [weekData, setWeekData] = useState<any[]>([]);
//   const [monthTableData, setMonthTableData] = useState<any[]>([]);
//   const [cumulativeData, setCumulativeData] = useState<any[]>([]);
//   const [activeTab, setActiveTab] = useState("comparison");
//   const [showGoalProgress, setShowGoalProgress] = useState(false);

//   useEffect(() => {
//     fetch("/api/stats/user-performance/overview")
//       .then((res) => res.json())
//       .then(setStats)
//       .catch((err) => {
//         console.error("Error loading overview stats:", err);
//         setStats(null);
//       });

//     fetch("/api/stats/user-performance/monthly")
//       .then((res) => res.json())
//       .then((data) => {
//         const formatted = Object.entries(data).map(([month, revenue]) => ({
//           month,
//           revenue: typeof revenue === "number" ? revenue : 0,
//         }));
//         setMonthlyData(formatted);
//       })
//       .catch((err) => {
//         console.error("Error loading monthly stats:", err);
//         setMonthlyData([]);
//       });

//     fetch("/api/stats/user-performance/by-assignee")
//       .then((res) => res.json())
//       .then((res) => {
//         const formatted = Object.entries(res).map(([assignee, revenue]) => ({
//           assignee,
//           revenue,
//         }));
//         setAssigneeData(formatted);
//       })
//       .catch((err) => {
//         console.error("Failed to load assignee chart data:", err);
//         setAssigneeData([]);
//       });

//     fetch("/api/stats/user-performance/day-report")
//       .then((res) => res.json())
//       .then(setDayData)
//       .catch((err) => console.error("Failed to fetch day data:", err));

//     fetch("/api/stats/user-performance/week-report")
//       .then((res) => res.json())
//       .then((data) => {
//         setWeekData(data);
//         setCumulativeData(data);
//       })
//       .catch((err) => console.error("Failed to fetch week data:", err));

//     fetch("/api/stats/user-performance/mom-table")
//       .then((res) => res.json())
//       .then(setMonthTableData)
//       .catch((err) => console.error("Failed to fetch month table:", err));
//   }, []);

//   useEffect(() => {
//     if (activeTab !== "charts") {
//       setShowGoalProgress(false);
//     }
//   }, [activeTab]);

//   if (!stats) return <p className="p-4">Loading dashboard...</p>;

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold flex items-center justify-between">
//         Sales Dashboard
//         <Link
//           href="/goals"
//           className="text-sm font-medium text-blue-600 hover:underline border border-blue-600 rounded px-3 py-1 ml-4 transition-colors duration-200 hover:bg-blue-50"
//         >
//           Set Goals
//         </Link>
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card title="Total Revenue" value={`₹${stats.totalRevenue ?? 0}`} />
//         <Card title="Received" value={`₹${stats.amountReceived ?? 0}`} />
//         <Card title="Pending" value={`₹${stats.pendingAmount ?? 0}`} />
//         <Card title="Sales" value={stats.totalSales ?? 0} />
//       </div>

//       <div className="flex space-x-2 border-b mt-6">
//         {tabs.map((tab) => (
//           <button
//             key={tab.key}
//             onClick={() => setActiveTab(tab.key)}
//             className={`px-4 py-2 font-medium border-b-2 transition-all duration-200 ${
//               activeTab === tab.key
//                 ? "border-blue-600 text-blue-600"
//                 : "border-transparent text-gray-500 hover:text-blue-600"
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       <div>
//         {activeTab === "comparison" && <CombinedComparisonSection />}
//         {activeTab === "month" && <MonthReportTable data={monthTableData} />}
//         {activeTab === "week" && <WeekReportTable data={weekData} />}
//         {activeTab === "day" && <DayReportTable data={dayData} />}
//         {activeTab === "charts" && (
//           <>
//             {!showGoalProgress ? (
//               <>
//                 <div className="flex justify-end mb-4">
//                   <button
//                     onClick={() => setShowGoalProgress(true)}
//                     className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
//                   >
//                     Show Monthly Goal Progress
//                   </button>
//                 </div>

//                 <div className="rounded-xl bg-white shadow-md p-4 border border-gray-200 mb-6">
//                   <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
//                   {monthlyData.length > 0 ? (
//                     <ResponsiveContainer width="100%" height={300}>
//                       <LineChart data={monthlyData}>
//                         <XAxis dataKey="month" />
//                         <YAxis />
//                         <Tooltip />
//                         <Line
//                           type="monotone"
//                           dataKey="revenue"
//                           stroke="#4f46e5"
//                         />
//                       </LineChart>
//                     </ResponsiveContainer>
//                   ) : (
//                     <p className="text-gray-500">No data available</p>
//                   )}
//                 </div>

//                 <CumulativeRevenueChart data={cumulativeData} />
//                 <RevenueByAssigneeChart data={assigneeData} />
//               </>
//             ) : (
//               <GoalProgress />
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }




















































// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { Card } from "../components/ui/card";
// import RevenueByAssigneeChart from "../components/charts/RevenueByAssigneeChart";
// import MonthReportTable from "../components/tables/MonthReportTable";
// import WeekReportTable from "../components/tables/WeekReportTable";
// import DayReportTable from "../components/tables/DayReportTable";
// import CumulativeRevenueChart from "../components/charts/CumulativeRevenueChart";
// import GoalProgress from "../components/charts/GoalProgress";
// import CombinedComparisonSection from "../components/tables/CombinedComparisonSection";

// // Import the new FullDashboard component
// import FullDashboard from "../FullDashboard/FullDashboard";

// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
// } from "recharts";

// const tabs = [
//   { label: "Comparison", key: "comparison" },
//   { label: "Month", key: "month" },
//   { label: "Week", key: "week" },
//   { label: "Day", key: "day" },
//   { label: "Charts", key: "charts" },
//   { label: "Bars", key: "bars" }, // 👈 New tab added here
// ];

// export default function SalesDashboardPage() {
//   const [stats, setStats] = useState<any>(null);
//   const [monthlyData, setMonthlyData] = useState<any[]>([]);
//   const [assigneeData, setAssigneeData] = useState<any[]>([]);
//   const [dayData, setDayData] = useState<any[]>([]);
//   const [weekData, setWeekData] = useState<any[]>([]);
//   const [monthTableData, setMonthTableData] = useState<any[]>([]);
//   const [cumulativeData, setCumulativeData] = useState<any[]>([]);
//   const [activeTab, setActiveTab] = useState("comparison");
//   const [showGoalProgress, setShowGoalProgress] = useState(false);

//   useEffect(() => {
//     fetch("/api/stats/user-performance/overview")
//       .then((res) => res.json())
//       .then(setStats)
//       .catch((err) => {
//         console.error("Error loading overview stats:", err);
//         setStats(null);
//       });

//     fetch("/api/stats/user-performance/monthly")
//       .then((res) => res.json())
//       .then((data) => {
//         const formatted = Object.entries(data).map(([month, revenue]) => ({
//           month,
//           revenue: typeof revenue === "number" ? revenue : 0,
//         }));
//         setMonthlyData(formatted);
//       })
//       .catch((err) => {
//         console.error("Error loading monthly stats:", err);
//         setMonthlyData([]);
//       });

//     fetch("/api/stats/user-performance/by-assignee")
//       .then((res) => res.json())
//       .then((res) => {
//         const formatted = Object.entries(res).map(([assignee, revenue]) => ({
//           assignee,
//           revenue,
//         }));
//         setAssigneeData(formatted);
//       })
//       .catch((err) => {
//         console.error("Failed to load assignee chart data:", err);
//         setAssigneeData([]);
//       });

//     fetch("/api/stats/user-performance/day-report")
//       .then((res) => res.json())
//       .then(setDayData)
//       .catch((err) => console.error("Failed to fetch day data:", err));

//     fetch("/api/stats/user-performance/week-report")
//       .then((res) => res.json())
//       .then((data) => {
//         setWeekData(data);
//         setCumulativeData(data);
//       })
//       .catch((err) => console.error("Failed to fetch week data:", err));

//     fetch("/api/stats/user-performance/mom-table")
//       .then((res) => res.json())
//       .then(setMonthTableData)
//       .catch((err) => console.error("Failed to fetch month table:", err));
//   }, []);

//   useEffect(() => {
//     if (activeTab !== "charts") {
//       setShowGoalProgress(false);
//     }
//   }, [activeTab]);

//   if (!stats) return <p className="p-4">Loading dashboard...</p>;

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold flex items-center justify-between">
//         Sales Dashboard
//         <Link
//           href="/goals"
//           className="text-sm font-medium text-blue-600 hover:underline border border-blue-600 rounded px-3 py-1 ml-4 transition-colors duration-200 hover:bg-blue-50"
//         >
//           Set Goals
//         </Link>
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card title="Total Revenue" value={`₹${stats.totalRevenue ?? 0}`} />
//         <Card title="Received" value={`₹${stats.amountReceived ?? 0}`} />
//         <Card title="Pending" value={`₹${stats.pendingAmount ?? 0}`} />
//         <Card title="Sales" value={stats.totalSales ?? 0} />
//       </div>

//       <div className="flex space-x-2 border-b mt-6">
//         {tabs.map((tab) => (
//           <button
//             key={tab.key}
//             onClick={() => setActiveTab(tab.key)}
//             className={`px-4 py-2 font-medium border-b-2 transition-all duration-200 ${
//               activeTab === tab.key
//                 ? "border-blue-600 text-blue-600"
//                 : "border-transparent text-gray-500 hover:text-blue-600"
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       <div>
//         {activeTab === "comparison" && <CombinedComparisonSection />}
//         {/* MonthReportTable, WeekReportTable, DayReportTable are now self-fetching,
//             so no need to pass data prop from SalesDashboardPage */}
//         {activeTab === "month" && <MonthReportTable />}
//         {activeTab === "week" && <WeekReportTable />}
//         {activeTab === "day" && <DayReportTable />}

//         {/* Charts tab content */}
//         {activeTab === "charts" && (
//           <>
//             {!showGoalProgress ? (
//               <>
//                 <div className="flex justify-end mb-4">
//                   <button
//                     onClick={() => setShowGoalProgress(true)}
//                     className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
//                   >
//                     Show Monthly Goal Progress
//                   </button>
//                 </div>

//                 <div className="flex flex-col lg:flex-row gap-6">
//                   {/* Left side: Bars Section */}
//                   <div className="lg:w-1/4 w-full bg-white border border-gray-200 rounded-xl shadow-md p-4">
//                     <h2 className="text-lg font-semibold mb-4">📊 Bars</h2>
//                     {/* You can replace below with any bar chart or KPI list */}
//                     <p className="text-sm text-gray-600">
//                       Revenue breakdown by sales type, payment mode, category, etc.
//                     </p>
//                     {/* Place your components like:
//                         <SaleTypePieChart />
//                         <PaymentModePieChart />
//                         <ProductBarChart />
//                         <CategoryTreemap />
//                     */}
//                   </div>

//                   {/* Right side: Charts Section */}
//                   <div className="lg:w-3/4 w-full space-y-6">
//                     <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200">
//                       <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
//                       {monthlyData.length > 0 ? (
//                         <ResponsiveContainer width="100%" height={300}>
//                           <LineChart data={monthlyData}>
//                             <XAxis dataKey="month" />
//                             <YAxis />
//                             <Tooltip />
//                             <Line
//                               type="monotone"
//                               dataKey="revenue"
//                               stroke="#4f46e5"
//                             />
//                           </LineChart>
//                         </ResponsiveContainer>
//                       ) : (
//                         <p className="text-gray-500">No data available</p>
//                       )}
//                     </div>

//                     <CumulativeRevenueChart data={cumulativeData} />
//                     <RevenueByAssigneeChart data={assigneeData} />
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <GoalProgress />
//             )}
//           </>
//         )}

//         {/* Render FullDashboard when the "Bars" tab is active */}
//         {activeTab === "bars" && <FullDashboard />}
//       </div>
//     </div>
//   );
// }










// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { Card } from "../components/ui/card";
// import RevenueByAssigneeChart from "../components/charts/RevenueByAssigneeChart";
// import MonthReportTable from "../components/tables/MonthReportTable";
// import WeekReportTable from "../components/tables/WeekReportTable";
// import DayReportTable from "../components/tables/DayReportTable";
// import CumulativeRevenueChart from "../components/charts/CumulativeRevenueChart";
// import GoalProgress from "../components/charts/GoalProgress";
// import AllReportsSection from "../components/tables/AllReportsSection";
// import CumulativeDayChart from "../components/charts/CumulativeDayChart";
// import CumulativeMonthChart from "../components/charts/CumulativeMonthChart";
// // ✅ Import the new CumulativeChartSwitcher component
// import CumulativeChartSwitcher from "../components/charts/CumulativeChartSwitcher";

// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
// } from "recharts";

// const tabs = [
//   { label: "All Reports", key: "all" },
//   { label: "Day", key: "day" },
//   { label: "Week", key: "week" },
//   { label: "Month", key: "month" },
//   { label: "Charts", key: "charts" },
// ];

// export default function SalesDashboardPage() {
//   const [stats, setStats] = useState<any>(null);
//   const [monthlyData, setMonthlyData] = useState<any[]>([]);
//   const [assigneeData, setAssigneeData] = useState<any[]>([]);
//   const [dayData, setDayData] = useState<any[]>([]);
//   const [weekData, setWeekData] = useState<any[]>([]);
//   const [monthTableData, setMonthTableData] = useState<any[]>([]);
//   const [cumulativeData, setCumulativeData] = useState<any[]>([]);
//   const [activeTab, setActiveTab] = useState("all");
//   const [showGoalProgress, setShowGoalProgress] = useState(false);
//   const [cumulativeDayData, setCumulativeDayData] = useState<any[]>([]);

//   useEffect(() => {
//     fetch("/api/stats/user-performance/overview")
//       .then((res) => res.json())
//       .then(setStats)
//       .catch((err) => {
//         console.error("Error loading overview stats:", err);
//         setStats(null);
//       });

//     fetch("/api/stats/user-performance/monthly")
//       .then((res) => res.json())
//       .then((data) => {
//         const formatted = Object.entries(data).map(([month, revenue]) => ({
//           month,
//           revenue: typeof revenue === "number" ? revenue : 0,
//         }));
//         setMonthlyData(formatted);
//       })
//       .catch((err) => {
//         console.error("Error loading monthly stats:", err);
//         setMonthlyData([]);
//       });

//     fetch("/api/stats/user-performance/by-assignee")
//       .then((res) => res.json())
//       .then((res) => {
//         const formatted = Object.entries(res).map(([assignee, revenue]) => ({
//           assignee,
//           revenue,
//         }));
//         setAssigneeData(formatted);
//       })
//       .catch((err) => {
//         console.error("Failed to load assignee chart data:", err);
//         setAssigneeData([]);
//       });

//     fetch("/api/stats/user-performance/day-report?page=1&limit=1000")
//       .then((res) => res.json())
//       .then((json) => {
//         setDayData(json.data || []);
//         setCumulativeDayData(json.data || []);
//       })
//       .catch((err) => console.error("Failed to fetch day data:", err));

//     fetch("/api/stats/user-performance/week-report?page=1&limit=1000")
//       .then((res) => res.json())
//       .then((data) => {
//         setWeekData(data.data);
//         setCumulativeData(data.data);
//       })
//       .catch((err) => console.error("Failed to fetch week data:", err));

//     fetch("/api/stats/user-performance/mom-table")
//       .then((res) => res.json())
//       .then((res) => {
//         setMonthTableData(res.data || []);
//       })
//       .catch((err) => console.error("Failed to fetch month table:", err));
//   }, []);

//   useEffect(() => {
//     if (activeTab !== "charts") {
//       setShowGoalProgress(false);
//     }
//   }, [activeTab]);

//   if (!stats) return <p className="p-4">Loading dashboard...</p>;

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold flex items-center justify-between">
//         Sales Dashboard
//         <Link
//           href="/goals"
//           className="text-sm font-medium text-blue-600 hover:underline border border-blue-600 rounded px-3 py-1 ml-4 transition-colors duration-200 hover:bg-blue-50"
//         >
//           Set Goals
//         </Link>
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card title="Total Revenue" value={`₹${stats.totalRevenue ?? 0}`} />
//         <Card title="Received" value={`₹${stats.amountReceived ?? 0}`} />
//         <Card title="Pending" value={`₹${stats.pendingAmount ?? 0}`} />
//         <Card title="Sales" value={stats.totalSales ?? 0} />
//       </div>

//       <div className="flex space-x-2 border-b mt-8">
//         {tabs.map((tab) => (
//           <button
//             key={tab.key}
//             onClick={() => setActiveTab(tab.key)}
//             className={`px-4 py-2 font-medium border-b-2 transition-all duration-200 ${
//               activeTab === tab.key
//                 ? "border-blue-600 text-blue-600"
//                 : "border-transparent text-gray-500 hover:text-blue-600"
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       <div>
//         {activeTab === "all" && <AllReportsSection />}
//         {activeTab === "month" && <MonthReportTable data={monthTableData} />}
//         {activeTab === "week" && <WeekReportTable data={weekData} />}
//         {activeTab === "day" && <DayReportTable data={dayData} />}

//         {activeTab === "charts" && (
//           <>
//             {!showGoalProgress ? (
//               <>
//                 <div className="flex justify-end mb-4">
//                   <button
//                     onClick={() => setShowGoalProgress(true)}
//                     className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
//                   >
//                     Show Monthly Goal Progress
//                   </button>
//                 </div>

//                 <div className="rounded-xl bg-white shadow-md p-4 border border-gray-200 mb-6">
//                   <h2 className="text-lg font-semibold mb-4">
//                     Monthly Revenue
//                   </h2>
//                   {monthlyData.length > 0 ? (
//                     <ResponsiveContainer width="100%" height={300}>
//                       <LineChart data={monthlyData}>
//                         <XAxis dataKey="month" />
//                         <YAxis />
//                         <Tooltip />
//                         <Line
//                           type="monotone"
//                           dataKey="revenue"
//                           stroke="#4f46e5"
//                         />
//                       </LineChart>
//                     </ResponsiveContainer>
//                   ) : (
//                     <p className="text-gray-500">No data available</p>
//                   )}
//                 </div>

//                 {/* ✅ Render the new CumulativeChartSwitcher */}
//                 <CumulativeChartSwitcher
//                   dayData={cumulativeDayData}
//                   weekData={cumulativeData}
//                   monthData={monthTableData}
//                 />

//                 <RevenueByAssigneeChart data={assigneeData} />
//               </>
//             ) : (
//               <GoalProgress />
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }




















// FILE: ./src/app/sales-dashboard/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

// ... imports for charts and components
import { Card } from "../components/ui/card";
import RevenueByAssigneeChart from "../components/charts/RevenueByAssigneeChart";
import MonthReportTable from "../components/tables/MonthReportTable";
import WeekReportTable from "../components/tables/WeekReportTable";
import DayReportTable from "../components/tables/DayReportTable";
// import CumulativeRevenueChart from "../components/charts/CumulativeRevenueChart"; // REMOVED: Unused
import GoalProgress from "../components/charts/GoalProgress";
import AllReportsSection from "../components/tables/AllReportsSection";
// import CumulativeDayChart from "../components/charts/CumulativeDayChart"; // REMOVED: Unused
// import CumulativeMonthChart from "../components/charts/CumulativeMonthChart"; // REMOVED: Unused
import CumulativeChartSwitcher from "../components/charts/CumulativeChartSwitcher";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// Define interfaces for your data structures to avoid 'any'
interface SalesStats {
  totalRevenue: number;
  amountReceived: number;
  pendingAmount: number;
  totalSales: number;
}

interface MonthlyChartData {
  month: string;
  revenue: number;
}

interface AssigneeChartData {
  assignee: string;
  revenue: number; // Assuming revenue is a number, adjust if it's a different type
}

// Assuming DayReportTable, WeekReportTable, MonthReportTable, and AllReportsSection
// expect an array of objects. You might have specific types for these in your project.
// For now, I'll use a generic type or you can replace these with your actual types.
// Example: interface DayReportEntry { date: string; sales: number; /* ... other fields */ }
// For simplicity, let's assume they are arrays of objects with varying structures:
type ReportEntry = Record<string, any>; // A generic object for table data

const tabs = [
  { label: "All Reports", key: "all" },
  { label: "Day", key: "day" },
  { label: "Week", key: "week" },
  { label: "Month", key: "month" },
  { label: "Charts", key: "charts" },
];

export default function SalesDashboardPage() {
  const { user } = useUser();
  const router = useRouter(); // Initialize useRouter

  // Use specific types instead of 'any'
  const [stats, setStats] = useState<SalesStats | null>(null);
  const [monthlyData, setMonthlyData] = useState<MonthlyChartData[]>([]);
  const [assigneeData, setAssigneeData] = useState<AssigneeChartData[]>([]);
  const [dayData, setDayData] = useState<ReportEntry[]>([]);
  const [weekData, setWeekData] = useState<ReportEntry[]>([]);
  const [monthTableData, setMonthTableData] = useState<ReportEntry[]>([]);
  const [cumulativeData, setCumulativeData] = useState<ReportEntry[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showGoalProgress, setShowGoalProgress] = useState(false);
  const [cumulativeDayData, setCumulativeDayData] = useState<ReportEntry[]>([]);

  // ✅ Redirect if user not admin or master
  useEffect(() => {
    if (user && !["admin", "master"].includes(user?.publicMetadata?.role as string)) {
      router.push("/unauthorized");
    }
  }, [user, router]); // FIX: Added 'router' to dependency array

  useEffect(() => {
    fetch("/api/stats/user-performance/overview")
      .then((res) => res.json())
      .then(setStats)
      .catch((err) => {
        console.error("Error loading overview stats:", err);
        setStats(null);
      });

    fetch("/api/stats/user-performance/monthly")
      .then((res) => res.json())
      .then((data: Record<string, number>) => { // FIX: Type data for monthly
        const formatted = Object.entries(data).map(([month, revenue]) => ({
          month,
          revenue: typeof revenue === "number" ? revenue : 0,
        }));
        setMonthlyData(formatted);
      })
      .catch((err) => {
        console.error("Error loading monthly stats:", err);
        setMonthlyData([]);
      });

    fetch("/api/stats/user-performance/by-assignee")
      .then((res) => res.json())
      .then((res: Record<string, number>) => { // FIX: Type res for by-assignee
        const formatted = Object.entries(res).map(([assignee, revenue]) => ({
          assignee,
          revenue: typeof revenue === "number" ? revenue : 0, // Ensure revenue is number
        }));
        setAssigneeData(formatted);
      })
      .catch((err) => {
        console.error("Failed to load assignee chart data:", err);
        setAssigneeData([]);
      });

    fetch("/api/stats/user-performance/day-report?page=1&limit=1000")
      .then((res) => res.json())
      .then((json: { data: ReportEntry[] }) => { // FIX: Type json for day-report
        setDayData(json.data || []);
        setCumulativeDayData(json.data || []);
      })
      .catch((err) => console.error("Failed to fetch day data:", err));

    fetch("/api/stats/user-performance/week-report?page=1&limit=1000")
      .then((res) => res.json())
      .then((data: { data: ReportEntry[] }) => { // FIX: Type data for week-report
        setWeekData(data.data);
        setCumulativeData(data.data);
      })
      .catch((err) => console.error("Failed to fetch week data:", err));

    fetch("/api/stats/user-performance/mom-table")
      .then((res) => res.json())
      .then((res: { data: ReportEntry[] }) => { // FIX: Type res for mom-table
        setMonthTableData(res.data || []);
      })
      .catch((err) => console.error("Failed to fetch month table:", err));
  }, []); // router is not needed here as it's not directly used in the fetches

  useEffect(() => {
    if (activeTab !== "charts") {
      setShowGoalProgress(false);
    }
  }, [activeTab]);

  if (!user) return <p className="p-4">Loading user...</p>;
  if (!stats) return <p className="p-4">Loading dashboard...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold flex items-center justify-between">
        Sales Dashboard
        <Link
          href="/goals"
          className="text-sm font-medium text-blue-600 hover:underline border border-blue-600 rounded px-3 py-1 ml-4 transition-colors duration-200 hover:bg-blue-50"
        >
          Set Goals
        </Link>
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Total Revenue" value={`₹${stats.totalRevenue ?? 0}`} />
        <Card title="Received" value={`₹${stats.amountReceived ?? 0}`} />
        <Card title="Pending" value={`₹${stats.pendingAmount ?? 0}`} />
        <Card title="Sales" value={stats.totalSales ?? 0} />
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b mt-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 font-medium border-b-2 transition-all duration-200 ${
              activeTab === tab.key
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-blue-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "all" && <AllReportsSection />}
        {activeTab === "month" && <MonthReportTable data={monthTableData} />}
        {activeTab === "week" && <WeekReportTable data={weekData} />}
        {activeTab === "day" && <DayReportTable data={dayData} />}
        {activeTab === "charts" && (
          <>
            {!showGoalProgress ? (
              <>
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setShowGoalProgress(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Show Monthly Goal Progress
                  </button>
                </div>

                {/* Monthly Line Chart */}
                <div className="rounded-xl bg-white shadow-md p-4 border border-gray-200 mb-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Monthly Revenue
                  </h2>
                  {monthlyData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={monthlyData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="#4f46e5"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-gray-500">No data available</p>
                  )}
                </div>

                <CumulativeChartSwitcher
                  dayData={cumulativeDayData}
                  weekData={cumulativeData}
                  monthData={monthTableData}
                />

                <RevenueByAssigneeChart data={assigneeData} />
              </>
            ) : (
              <GoalProgress />
            )}
          </>
        )}
      </div>
    </div>
  );
}