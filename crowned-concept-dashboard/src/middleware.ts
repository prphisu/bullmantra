// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// --- AUTHENTICATION DISABLED ---
// This simple middleware allows every request to pass through.
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

/* --- YOUR ORIGINAL CLERK MIDDLEWARE (Commented Out) ---
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/about", "/services"], 
});
*/

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};