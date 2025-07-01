// // src/app/components/Sidebar.tsx
// 'use client';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { Users, LayoutDashboard, LogOut } from 'lucide-react';

// const navItems = [
//   { label: "Dashboard", icon: <LayoutDashboard size={18} />, href: "/" },
//   { label: "Team", icon: <Users size={18} />, href: "/team" },
//   { label: "Logout", icon: <LogOut size={18} />, href: "/logout" },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();

//   return (
//     <aside className="w-64 bg-white border-r border-gray-200 p-4 h-full">
//       <h2 className="text-xl font-semibold mb-6">TeamBoard</h2>
//       <nav className="space-y-2">
//         {navItems.map(({ label, href, icon }) => (
//           <Link
//             key={label}
//             href={href}
//             className={`flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 ${
//               pathname === href ? "bg-gray-200 font-medium" : ""
//             }`}
//           >
//             {icon}
//             <span>{label}</span>
//           </Link>
//         ))}
//       </nav>
//     </aside>
//   );
// }







'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, LayoutDashboard, LogOut } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: <LayoutDashboard size={18} />, href: '/' },
  { label: 'Team', icon: <Users size={18} />, href: '/team' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4">
      <h1 className="text-xl font-bold mb-8">TeamBoard</h1>
      <nav className="flex flex-col space-y-4">
        {navItems.map(({ label, icon, href }) => (
          <Link
            key={label}
            href={href}
            className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 ${
              pathname === href ? 'bg-gray-700' : ''
            }`}
          >
            {icon}
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <button className="mt-auto flex items-center gap-2 text-sm text-red-400 hover:text-red-300">
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}
