// // app/seller/dashboard/page.tsx
// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function SellerDashboard() {
//   const [revenue, setRevenue] = useState([]);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     axios.get("/api/seller/dashboard/revenue").then(res => setRevenue(res.data));
//     axios.get("/api/seller/dashboard/orders").then(res => setOrders(res.data));
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">📊 Seller Dashboard</h1>

//       <section className="mt-4">
//         <h2 className="text-xl font-semibold">Revenue by Month</h2>
//         <ul>
//           {revenue.map((r, i) => (
//             <li key={i}>
//               {r._id.month}/{r._id.year} → ₹{r.totalRevenue}
//             </li>
//           ))}
//         </ul>
//       </section>

//       <section className="mt-4">
//         <h2 className="text-xl font-semibold">Orders</h2>
//         <ul>
//           {orders.map((o: any) => (
//             <li key={o._id}>
//               Order #{o._id} → ₹{o.amount} | {o.status}
//             </li>
//           ))}
//         </ul>
//       </section>
//     </div>
//   );
// }










// 'use client';

// import { useEffect, useState } from 'react';
// import { useUser } from '@clerk/nextjs';

// export default function SellerDashboard() {
//   const { user } = useUser();
//   const [stats, setStats] = useState<any>(null);

//   useEffect(() => {
//     async function fetchStats() {
//       const month = new Date().toISOString().slice(0, 7); // "2025-08"
//       const res = await fetch(`/api/seller/stats?month=${month}`);
//       const data = await res.json();
//       setStats(data);
//     }
//     fetchStats();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold text-purple-600">Seller Dashboard</h1>
//       <p className="text-gray-600">Welcome {user?.emailAddresses[0]?.emailAddress}</p>

//       {stats ? (
//         <div className="mt-6 bg-white p-4 rounded-lg shadow">
//           <h2 className="text-xl font-semibold">This Month’s Revenue</h2>
//           <p className="text-2xl text-green-600">₹{stats.totalRevenue || 0}</p>
//         </div>
//       ) : (
//         <p className="mt-6 text-gray-500">Loading stats...</p>
//       )}
//     </div>
//   );
// }










// "use client";
// import { useEffect, useState } from "react";

// export default function SellerStats() {
//   const [stats, setStats] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     async function fetchStats() {
//       try {
//         const res = await fetch("/api/seller/stats?month=2025-08");
//         if (!res.ok) throw new Error("Failed to fetch stats");
//         const data = await res.json();
//         setStats(data);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchStats();
//   }, []);

//   if (loading) return <p>Loading stats...</p>;
//   if (error) return <p className="text-red-500">Error: {error}</p>;

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//       <div className="p-4 rounded-lg shadow bg-white">
//         <h3 className="text-gray-500">Total Revenue</h3>
//         <p className="text-xl font-bold">₹{stats.totalRevenue}</p>
//       </div>

//       <div className="p-4 rounded-lg shadow bg-white">
//         <h3 className="text-gray-500">Received</h3>
//         <p className="text-xl font-bold">₹{stats.totalReceived}</p>
//       </div>

//       <div className="p-4 rounded-lg shadow bg-white">
//         <h3 className="text-gray-500">Pending</h3>
//         <p className="text-xl font-bold">₹{stats.pendingRevenue}</p>
//       </div>

//       <div className="p-4 rounded-lg shadow bg-white">
//         <h3 className="text-gray-500">Sales</h3>
//         <p className="text-xl font-bold">{stats.totalSales}</p>
//       </div>
//     </div>
//   );
// }




"use client";

import SellerStats from "../../components/SellerStats";
import DayToDayReport from "../../components/DayToDayReport";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <SellerStats />
      <DayToDayReport />
    </div>
  );
}
