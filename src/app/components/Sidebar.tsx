// src/components/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, LayoutDashboard, LogOut } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: <LayoutDashboard size={18} />, href: '/' },
  { label: 'Team', icon: <Users size={18} />, href: '/dashboard/team' },
  { label: 'Tasks', icon: <Home size={18} />, href: '/dashboard/tasks' },
  { label: 'Logout', icon: <LogOut size={18} />, href: '/logout' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-white border-r shadow-sm p-4 fixed">
      <div className="text-2xl font-bold text-blue-600 mb-10">TeamSpace</div>
      <nav className="space-y-3">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              pathname === item.href
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'hover:bg-gray-100 text-gray-800'
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
