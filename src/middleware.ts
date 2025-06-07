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
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
