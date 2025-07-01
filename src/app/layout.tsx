// import './globals.css';

// export const metadata = {
//   title: 'Team Dashboard',
//   description: 'Manage your team and projects efficiently.',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   );
// }



// File: src/app/layout.tsx
import "./globals.css";
import Sidebar from "@/app/components/Sidebar";

export const metadata = {
  title: "Team Dashboard",
  description: "Manage your team and projects efficiently.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
