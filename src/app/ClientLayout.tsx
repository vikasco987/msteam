// 'use client';

// import {
//   SignInButton,
//   SignUpButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from '@clerk/nextjs';
// import Sidebar from '@/app/components/Sidebar';

// export default function ClientLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex min-h-screen bg-gray-100 text-gray-900 antialiased">
//       {/* Sidebar */}
//       <Sidebar />

//       <div className="flex-1 flex flex-col min-h-screen">
//         {/* Header */}
//         <header className="flex justify-between items-center px-6 py-4 bg-white shadow border-b">
//           <h1 className="text-xl font-bold">ClickUp Clone</h1>

//           <div className="flex gap-4 items-center">
//             <SignedOut>
//               {/* ✅ Correct prop is forceRedirectUrl */}
//               <SignInButton mode="redirect" forceRedirectUrl="/dashboard" asChild>
//                 <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//                   Sign In
//                 </button>
//               </SignInButton>
//               <SignUpButton mode="redirect" forceRedirectUrl="/dashboard" asChild>
//                 <button type="button" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
//                   Sign Up
//                 </button>
//               </SignUpButton>
//             </SignedOut>

//             <SignedIn>
//               <UserButton afterSignOutUrl="/" />
//             </SignedIn>
//           </div>
//         </header>

//         {/* Main content */}
//         <main className="flex-1 p-6 overflow-y-auto">{children}</main>
//       </div>
//     </div>
//   );
// }




'use client';

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import Sidebar from '@/app/components/Sidebar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900 antialiased">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex justify-between items-center px-6 py-4 bg-white shadow border-b">
          <h1 className="text-xl font-bold">ClickUp Clone</h1>

          <div className="flex gap-4 items-center">
            <SignedOut>
              {/* Use built-in SignInButton without asChild */}
              <SignInButton mode="redirect" forceRedirectUrl="/dashboard" />
              <SignUpButton mode="redirect" forceRedirectUrl="/dashboard" />
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
