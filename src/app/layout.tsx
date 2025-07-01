import './globals.css';

export const metadata = {
  title: 'Team Dashboard',
  description: 'Manage your team and projects efficiently.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
