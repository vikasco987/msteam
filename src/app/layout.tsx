import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast"; // ✅ import added

export const metadata = {
  title: "ClickUp Clone",
  description: "Manage your team and tasks with Clerk + Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <ClientLayout>
            {children}
            <Toaster position="top-center" /> {/* ✅ Toast container */}
          </ClientLayout>
        </ClerkProvider>
      </body>
    </html>
  );
}
