// src/app/layout.tsx
import "./globals.css";
import Sidebar from "./components/Sidebar";

export const metadata = {
  title: "Team Dashboard",
  description: "Collaborate with your team",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
