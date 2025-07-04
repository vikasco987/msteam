// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isProtectedRoute = createRouteMatcher([
//   "/dashboard(.*)",
//   "/api/tasks(.*)",
// ]);

// export default clerkMiddleware((auth, req) => {
//   // ✅ Just call auth().protect directly without awaiting or invoking auth()
//   if (isProtectedRoute(req)) {
//     auth().protect(); // ← do not `await` this, it's synchronous
//   }
// });

// export const config = {
//   matcher: [
//     "/((?!_next|.*\\..*).*)", // all routes except static files
//     "/(api|trpc)(.*)",        // all api/trpc routes
//   ],
// };









// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// ✅ Create matchers
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/team-board(.*)',
  '/create-task(.*)',
  '/api/tasks(.*)',
  '/api/team-members(.*)',
])

// ✅ Apply middleware
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect() // ✅ NOT auth().protect() — this is the fix!
  }
})

// ✅ Match API and all non-static routes
export const config = {
  matcher: [
    '/((?!_next|.*\\..*).*)',
    '/(api|trpc)(.*)',
  ],
}
