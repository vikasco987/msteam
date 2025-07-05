



// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { LayoutDashboard, Users, LogOut } from 'lucide-react';

// const navItems = [
//   { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
//   { label: 'Team Board', icon: Users, href: '/team-board' },
//    { label: 'Create Task', icon: LayoutDashboard, href: '/create-task' },
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




// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { LayoutDashboard, Users, LogOut } from 'lucide-react';

// const navItems = [
//   { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
//   { label: 'Team Board', icon: Users, href: '/team-board' },
//   { label: 'Create Task', icon: LayoutDashboard, href: '/create-task' },
//   { label: 'Logout', icon: LogOut, href: '/logout' },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();

//   return (
//     <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-md p-4 z-50">
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












// // components/Sidebar.tsx
// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { LayoutDashboard, Users, LogOut, Menu } from 'lucide-react';

// const navItems = [
//   { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
//   { label: 'Team Board', icon: Users, href: '/team-board' },
//   { label: 'Create Task', icon: LayoutDashboard, href: '/create-task' },
//   { label: 'Logout', icon: LogOut, href: '/logout' },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <button
//         onClick={() => setOpen(!open)}
//         className="md:hidden p-4 fixed top-0 left-0 z-50 bg-white shadow-md"
//       >
//         <Menu />
//       </button>

//       <aside
//         className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-md p-4 z-40 transition-transform duration-300 transform ${
//           open ? 'translate-x-0' : '-translate-x-full'
//         } md:translate-x-0 md:static md:block`}
//       >
//         <h1 className="text-2xl font-bold mb-6">TeamBoard</h1>
//         <nav className="flex flex-col gap-2">
//           {navItems.map((item) => {
//             const isActive = pathname === item.href;
//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 onClick={() => setOpen(false)}
//                 className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
//                   isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-700'
//                 }`}
//               >
//                 <item.icon size={20} />
//                 <span>{item.label}</span>
//               </Link>
//             );
//           })}
//         </nav>
//       </aside>
//     </>
//   );
// }

// // components/FileDropzone.tsx
// 'use client';

// import { useDropzone } from 'react-dropzone';

// export function FileDropzone({ onDrop }: { onDrop: (files: File[]) => void }) {
//   const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
//     onDrop: acceptedFiles => onDrop(acceptedFiles),
//   });

//   return (
//     <div
//       {...getRootProps()}
//       className="border-2 border-dashed border-purple-300 p-4 rounded cursor-pointer bg-purple-50 hover:bg-purple-100"
//     >
//       <input {...getInputProps()} />
//       <p className="text-center">📂 Drag & drop files here or click to upload</p>
//       <ul className="mt-2 text-sm">
//         {acceptedFiles.map(file => (
//           <li key={file.name}>{file.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// // components/TaskForm.tsx
// // Add state:
// // const [step, setStep] = useState(0);
// // Replace step UI:
// // {step === 0 && Basic Info Form}
// // {step === 1 && Upload Fields}
// // {step === 2 && Custom Fields with FileDropzone}
// // Navigation:
// // {step > 0 && <button onClick={() => setStep(step - 1)}>⬅ Back</button>}
// // {step < 2 ? <button onClick={() => setStep(step + 1)}>➡ Next</button> : <button type="submit">Submit</button>}











// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { LayoutDashboard, Users, LogOut, Menu } from 'lucide-react';

// const navItems = [
//   { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
//   { label: 'Team Board', icon: Users, href: '/team-board' },
//   { label: 'Create Task', icon: LayoutDashboard, href: '/create-task' },
//   { label: 'Logout', icon: LogOut, href: '/logout' },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       {/* Toggle Button for Mobile */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="md:hidden p-4 fixed top-0 left-0 z-50 bg-white shadow-md"
//         aria-label="Toggle sidebar"
//       >
//         <Menu />
//       </button>

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-md p-4 z-40 transform transition-transform duration-300 
//         ${open ? 'translate-x-0' : '-translate-x-full'} 
//         md:translate-x-0 md:static md:block`}
//       >
//         <h1 className="text-2xl font-bold mb-6">TeamBoard</h1>
//         <nav className="flex flex-col gap-2">
//           {navItems.map((item) => {
//             const isActive = pathname === item.href;
//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 onClick={() => setOpen(false)} // Close menu on mobile click
//                 className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
//                   isActive
//                     ? 'bg-blue-500 text-white'
//                     : 'hover:bg-gray-100 text-gray-700'
//                 }`}
//               >
//                 <item.icon size={20} />
//                 <span>{item.label}</span>
//               </Link>
//             );
//           })}
//         </nav>
//       </aside>
//     </>
//   );
// }






'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, LogOut, Menu } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { label: 'Team Board', icon: Users, href: '/team-board' },
  { label: 'Create Task', icon: LayoutDashboard, href: '/create-task' },
  { label: 'Report', icon: LayoutDashboard, href: '/report' },
  { label: 'Logout', icon: LogOut, href: '/logout' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 🔁 Mobile Menu Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-4 fixed top-0 left-0 z-50 bg-white shadow-md"
        aria-label="Toggle sidebar"
      >
        <Menu />
      </button>

      {/* 🧭 Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-md p-4 z-40 transform transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:block`}
      >
        <h1 className="text-2xl font-bold mb-6">TeamBoard</h1>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)} // ✅ Close sidebar after navigation on mobile
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
