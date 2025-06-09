import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Mark these routes as public (no auth required)
const isPublicRoute = createRouteMatcher([
  '/',             // 👈 allow homepage
  '/sign-in(.*)',  // allow sign-in
  '/sign-up(.*)',  // allow sign-up
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // All application routes excluding static files
    '/((?!_next|.*\\..*).*)',
    // API and RPC routes
    '/(api|trpc)(.*)',
  ],
};
