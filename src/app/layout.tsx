// // src/app/layout.tsx
// import {
//   ClerkProvider,
//   SignInButton,
//   SignUpButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from '@clerk/nextjs';
// import Sidebar from '@/app/components/Sidebar';
// import './globals.css';

// export const metadata = {
//   title: 'ClickUp Clone',
//   description: 'Manage your team and tasks with Clerk + Next.js',
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <ClerkProvider>
//       <html lang="en">
//         <body className="bg-gray-100 text-gray-900 antialiased">
//           <div className="flex min-h-screen">
//             {/* Sidebar */}
//             <Sidebar />

//             <div className="flex-1 flex flex-col min-h-screen">
//               {/* Header */}
//               <header className="flex justify-between items-center px-6 py-4 bg-white shadow border-b">
//                 <h1 className="text-xl font-bold">ClickUp Clone</h1>

//                 <div className="flex gap-4 items-center">
//                   <SignedOut>
//                     <SignInButton mode="modal">
//                       <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//                         Sign In
//                       </button>
//                     </SignInButton>
//                     <SignUpButton mode="modal">
//                       <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
//                         Sign Up
//                       </button>
//                     </SignUpButton>
//                   </SignedOut>

//                   <SignedIn>
//                     <UserButton afterSignOutUrl="/" />
//                   </SignedIn>
//                 </div>
//               </header>

//               {/* Main content */}
//               <main className="flex-1 p-6 overflow-y-auto">
//                 {children}
//               </main>
//             </div>
//           </div>
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }





// // src/app/layout.tsx (server component)
// import { ClerkProvider } from '@clerk/nextjs';
// import './globals.css';
// import ClientLayout from './ClientLayout';

// export const metadata = {
//   title: 'ClickUp Clone',
//   description: 'Manage your team and tasks with Clerk + Next.js',
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <ClerkProvider>
//       <html lang="en">
//         <body>
//           <ClientLayout>{children}</ClientLayout>
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }




// // src/app/layout.tsx
// import { ClerkProvider } from '@clerk/nextjs';
// import './globals.css';
// import ClientLayout from './ClientLayout';

// export const metadata = {
//   title: 'ClickUp Clone',
//   description: 'Manage your team and tasks with Clerk + Next.js',
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <ClerkProvider>
//       <html lang="en">
//         <body>
//           <ClientLayout>{children}</ClientLayout>
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }








// src/app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { ReactNode } from "react";

export const metadata = {
  title: "ClickUp Clone",
  description: "Manage your team and tasks with Clerk + Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <ClientLayout>{children}</ClientLayout>
        </ClerkProvider>
      </body>
    </html>
  );
}
