import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/api/webhooks(.*)",
  "/api/uploadthing(.*)",
  "/auth/sign-in(.*)",
  "/auth/sign-up(.*)",
]);

export default clerkMiddleware((auth, request, event) => {
  const { userId } = auth();

  if (request.nextUrl.pathname === "/" && userId) {
    return Response.redirect(new URL("/home", request.url));
  }

  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
