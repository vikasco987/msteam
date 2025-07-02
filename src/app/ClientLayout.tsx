'use client';

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from '@clerk/nextjs';
import Sidebar from '@/app/components/Sidebar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900 antialiased">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex justify-between items-center px-6 py-4 bg-white shadow border-b">
          <div>
            <h1 className="text-xl font-bold">ClickUp Clone</h1>

            {/* ✅ Show user name and role with safe type casting */}
            {isLoaded && user && (
              <p className="text-sm text-gray-500">
                {/* Logged in as: {user.firstName} ({user.publicMetadata?.role as string || 'no role'}) */}
                Logged in as: {user.firstName} ({String(user.publicMetadata?.role || 'no role')})

              </p>
            )}
          </div>

          <div className="flex gap-4 items-center">
            <SignedOut>
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
