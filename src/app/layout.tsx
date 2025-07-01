import './globals.css';
import Sidebar from './components/Sidebar';

export const metadata = {
  title: 'Team Dashboard',
  description: 'Manage your team and projects efficiently.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-100 text-gray-900">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}
