import { NextRequest, NextResponse } from "next/server";

/**
 * Redirect any request arriving on the old Vercel preview URL
 * (mixcare-website-claude.vercel.app) to the canonical custom domain.
 * 301 = permanent redirect — search engines will transfer SEO authority.
 */
export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  if (host.includes("vercel.app")) {
    const url = req.nextUrl.clone();
    url.host = "m.mixcarehealth.com";
    url.protocol = "https:";
    url.port = "";
    return NextResponse.redirect(url, { status: 301 });
  }
}

export const config = {
  // Run on all routes except Next.js internals, API routes, studio, and static assets
  matcher: ["/((?!_next|api|studio|favicon).*)"],
};
