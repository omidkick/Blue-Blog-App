import { NextResponse } from "next/server";
import { middlewareAuth } from "./utils/middlewareAuth";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Auth routes - redirect to home if already authenticated
  if (pathname.startsWith("/signin") || pathname.startsWith("/signup")) {
    const user = await middlewareAuth(req);
    if (user) return NextResponse.redirect(new URL(`/home`, req.nextUrl));
  }

  // Protected routes - redirect to signin if not authenticated
  if (pathname.startsWith("/profile")) {
    const user = await middlewareAuth(req);
    if (!user) {
      const response = NextResponse.redirect(new URL(`/signin`, req.nextUrl));

      // Store the original URL for redirect after login
      response.cookies.set("redirectPath", pathname, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 10, // 10 minutes
      });

      return response;
    }
  }

  // For other routes, continue normally
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/signin", "/signup"],
};
