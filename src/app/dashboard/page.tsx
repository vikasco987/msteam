// // app/dashboard/page.tsx
// import { auth, currentUser } from "@clerk/nextjs/server";

// export default async function DashboardPage() {
//   // ✅ Get session details
//   const { userId } = await auth();

//   if (!userId) {
//     return <div>Please sign in to access the dashboard.</div>;
//   }

//   // ✅ Get full user info (e.g., firstName, email)
//   const user = await currentUser();

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">Welcome, {user?.firstName}!</h1>
//       <p>Your email: {user?.emailAddresses[0]?.emailAddress}</p>
//     </div>
//   );
// }





// import { auth, currentUser } from '@clerk/nextjs/server';

// export default async function DashboardPage() {
//   const { userId } = await auth();

//   if (!userId) {
//     return <div className="p-6">Please sign in to access the dashboard.</div>;
//   }

//   const user = await currentUser();
//   const role = user?.publicMetadata?.role || 'user'; // fallback to 'user' if role not set

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">
//         Welcome, {user?.firstName} ({role})
//       </h1>
//       <p className="text-gray-600 mb-4">
//         Your email: {user?.emailAddresses[0]?.emailAddress}
//       </p>

//       {role === 'admin' ? (
//         <div className="mt-4 p-4 bg-blue-100 border border-blue-300 rounded">
//           🔥 <strong>Admin Board:</strong> View & manage all tasks
//         </div>
//       ) : (
//         <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded">
//           👤 <strong>User Board:</strong> View your personal tasks
//         </div>
//       )}
//     </div>
//   );
// }



import { auth, currentUser } from '@clerk/nextjs/server';

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    return <div className="p-6">Please sign in to access the dashboard.</div>;
  }

  const user = await currentUser();

  // ✅ Type-safe role extraction
  const role = String(user?.publicMetadata?.role || 'user');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Welcome, {user?.firstName} ({role})
      </h1>

      <p className="text-gray-600 mb-4">
        Your email: {user?.emailAddresses[0]?.emailAddress}
      </p>

      {role === 'admin' ? (
        <div className="mt-4 p-4 bg-blue-100 border border-blue-300 rounded">
          🔥 <strong>Admin Board:</strong> View & manage all tasks
        </div>
      ) : (
        <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded">
          👤 <strong>User Board:</strong> View your personal tasks
        </div>
      )}
    </div>
  );
}
