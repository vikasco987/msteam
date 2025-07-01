// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { LayoutDashboard, Users, LogOut } from 'lucide-react';

// const navItems = [
//   { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
//   { label: 'Team Board', icon: Users, href: '/team-board' },
//   { label: 'Logout', icon: LogOut, href: '/logout' },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();

//   return (
//     <aside className="w-64 h-screen bg-white shadow-md p-4">
//       <h1 className="text-2xl font-bold mb-6">TeamBoard</h1>
//       <nav className="flex flex-col gap-2">
//         {navItems.map((item) => {
//           const isActive = pathname === item.href;
//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
//                 isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-700'
//               }`}
//             >
//               <item.icon size={20} />
//               <span>{item.label}</span>
//             </Link>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// }












'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, LogOut } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { label: 'Team Board', icon: Users, href: '/team-board' },
  { label: 'Logout', icon: LogOut, href: '/logout' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-white shadow-md p-4">
      <h1 className="text-2xl font-bold mb-6">TeamBoard</h1>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
