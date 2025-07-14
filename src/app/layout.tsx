






// import { ClerkProvider } from "@clerk/nextjs";
// import "./globals.css";
// import ClientLayout from "./ClientLayout";
// import { ReactNode } from "react";
// import { Toaster } from "react-hot-toast";
// import * as Tooltip from '@radix-ui/react-tooltip';

// export const metadata = {
//   title: "MagicScale",
//   description: "Manage your team and tasks with Clerk + Next.js",
// };

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <ClerkProvider>
//           <Tooltip.Provider delayDuration={200}>
//             <ClientLayout>
//               {children}
//               <Toaster position="top-right" /> {/* ✅ Toast visible globally */}
//             </ClientLayout>
//           </Tooltip.Provider>
//         </ClerkProvider>
//       </body>
//     </html>
//   );
// }







import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import * as Tooltip from '@radix-ui/react-tooltip';

export const metadata = {
  title: "MagicScale",
  description: "Manage your team and tasks with Clerk + Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="flex h-screen overflow-hidden">
        <ClerkProvider>
          <Tooltip.Provider delayDuration={200}>
            <ClientLayout>
              {children}
              <Toaster position="top-right" /> {/* ✅ Toast visible globally */}
            </ClientLayout>
          </Tooltip.Provider>
        </ClerkProvider>
      </body>
    </html>
  );
}
