import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  // 🔹 Block access to protected pages if no valid token
  if (!token && req.nextUrl.pathname.startsWith("/DOCTOR")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/DOCTOR/:path*"], // Apply middleware to all protected routes
};
