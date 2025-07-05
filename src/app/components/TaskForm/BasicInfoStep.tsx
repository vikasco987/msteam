// import React from "react";

// type TeamMember = {
//   id: string;
//   email: string;
//   name?: string;
// };

// interface Props {
//   title: string;
//   assigneeId: string;
//   teamMembers: TeamMember[];
//   activeTab: "license" | "swiggy" | "zomato";
//   setTitle: (val: string) => void;
//   setAssigneeId: (val: string) => void;
//   setActiveTab: (val: "license" | "swiggy" | "zomato") => void;
// }

// export default function BasicInfoStep({
//   title,
//   assigneeId,
//   teamMembers,
//   activeTab,
//   setTitle,
//   setAssigneeId,
//   setActiveTab,
// }: Props) {
//   return (
//     <div className="space-y-4">
//       {/* Task Title */}
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="📝 Task Title"
//         className="w-full border border-purple-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
//         required
//       />

//       {/* Assign To */}
//       <select
//         value={assigneeId}
//         onChange={(e) => setAssigneeId(e.target.value)}
//         className="w-full border border-purple-300 rounded-lg p-3 bg-purple-50 text-gray-800 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
//         required
//       >
//         <option value="">👤 Assign to...</option>
//         {teamMembers.map((member) => (
//           <option key={member.id} value={member.id}>
//             {member.name || member.email} ({member.email})
//           </option>
//         ))}
//       </select>

//       {/* Tabs for onboarding types */}
//       <div className="flex gap-2 justify-center mt-4">
//         {["license", "swiggy", "zomato"].map((tab) => (
//           <button
//             type="button"
//             key={tab}
//             onClick={() => setActiveTab(tab as "license" | "swiggy" | "zomato")}
//             className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors duration-200 ${
//               activeTab === tab
//                 ? "bg-purple-600 text-white shadow-sm"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             {tab === "license"
//               ? "🧾 License"
//               : tab === "swiggy"
//               ? "🍔 Swiggy"
//               : "🍽️ Zomato"}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }









// "use client";

// import React, { useEffect, useState } from "react";
// import { useAuth } from "@clerk/nextjs";

// type TeamMember = {
//   id: string;
//   email: string;
//   name?: string;
// };

// interface Props {
//   title: string;
//   assigneeId: string;
//   activeTab: "license" | "swiggy" | "zomato";
//   setTitle: (val: string) => void;
//   setAssigneeId: (val: string) => void;
//   setActiveTab: (val: "license" | "swiggy" | "zomato") => void;
// }

// export default function BasicInfoStep({
//   title,
//   assigneeId,
//   activeTab,
//   setTitle,
//   setAssigneeId,
//   setActiveTab,
// }: Props) {
//   const { getToken } = useAuth();
//   const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

//   useEffect(() => {
//     const fetchTeamMembers = async () => {
//       try {
//         const token = await getToken();
//         const res = await fetch("/api/team-members", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         setTeamMembers(data);
//       } catch (err) {
//         console.error("Failed to load team members", err);
//       }
//     };

//     fetchTeamMembers();
//   }, [getToken]);

//   return (
//     <div className="space-y-4">
//       {/* Task Title */}
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="📝 Task Title"
//         className="w-full border border-purple-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
//         required
//       />

//       {/* Assign To */}
//       <select
//         value={assigneeId}
//         onChange={(e) => setAssigneeId(e.target.value)}
//         className="w-full border border-purple-300 rounded-lg p-3 bg-purple-50 text-gray-800 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
//         required
//       >
//         <option value="">👤 Assign to...</option>
//         {teamMembers.map((member) => (
//           <option key={member.id} value={member.id}>
//             {member.name || member.email} ({member.email})
//           </option>
//         ))}
//       </select>

//       {/* Tabs for onboarding types */}
//       <div className="flex gap-2 justify-center mt-4">
//         {["license", "swiggy", "zomato"].map((tab) => (
//           <button
//             type="button"
//             key={tab}
//             onClick={() => setActiveTab(tab as "license" | "swiggy" | "zomato")}
//             className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors duration-200 ${
//               activeTab === tab
//                 ? "bg-purple-600 text-white shadow-sm"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             {tab === "license"
//               ? "🧾 License"
//               : tab === "swiggy"
//               ? "🍔 Swiggy"
//               : "🍽️ Zomato"}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }











"use client";

import React from "react";

type TeamMember = {
  id: string;
  email: string;
  name?: string;
};

interface Props {
  title: string;
  assigneeId: string;
  activeTab: "license" | "swiggy" | "zomato";
  teamMembers: TeamMember[]; // ✅ Now coming from parent
  setTitle: (val: string) => void;
  setAssigneeId: (val: string) => void;
  setActiveTab: (val: "license" | "swiggy" | "zomato") => void;
}

export default function BasicInfoStep({
  title,
  assigneeId,
  activeTab,
  teamMembers,
  setTitle,
  setAssigneeId,
  setActiveTab,
}: Props) {
  return (
    <div className="space-y-4">
      {/* 📝 Task Title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="📝 Task Title"
        className="w-full border border-purple-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
        required
      />

      {/* 👤 Assign To */}
      <select
        value={assigneeId}
        onChange={(e) => setAssigneeId(e.target.value)}
        className="w-full border border-purple-300 rounded-lg p-3 bg-purple-50 text-gray-800 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
        required
      >
        <option value="">👤 Assign to...</option>
        {teamMembers.map((member) => (
          <option key={member.id} value={member.id}>
            {member.name || member.email} ({member.email})
          </option>
        ))}
      </select>

      {/* 🔄 Tabs for Onboarding Type */}
      <div className="flex gap-2 justify-center mt-4">
        {["license", "swiggy", "zomato"].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab as "license" | "swiggy" | "zomato")}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors duration-200 ${
              activeTab === tab
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab === "license"
              ? "🧾 License"
              : tab === "swiggy"
              ? "🍔 Swiggy"
              : "🍽️ Zomato"}
          </button>
        ))}
      </div>
    </div>
  );
}
