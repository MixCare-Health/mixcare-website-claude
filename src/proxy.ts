import { NextRequest, NextResponse } from "next/server";
import { URL_LOCALE, LOCALE_URL_PREFIXES } from "@/lib/locale";

export function proxy(request: NextRequest) {
  // 1. Redirect old Vercel URL to canonical custom domain (301 permanent)
  const host = request.headers.get("host") ?? "";
  if (host.includes("vercel.app")) {
    const url = request.nextUrl.clone();
    url.host = "m.mixcarehealth.com";
    url.protocol = "https:";
    url.port = "";
    return NextResponse.redirect(url, { status: 301 });
  }

  // 2. Locale routing — rewrite /zh-hk/... and /zh-cn/... paths
  const { pathname } = request.nextUrl;

  for (const prefix of LOCALE_URL_PREFIXES) {
    const withSlash = `/${prefix}/`;
    const exact = `/${prefix}`;

    if (pathname === exact || pathname.startsWith(withSlash)) {
      const basePath = pathname === exact ? "/" : pathname.slice(exact.length);
      const locale = URL_LOCALE[prefix];

      const url = request.nextUrl.clone();
      url.pathname = basePath;

      // Update the Cookie header in the forwarded request so server components
      // (which read from request cookies, not response cookies) see the new locale immediately.
      const requestHeaders = new Headers(request.headers);
      const existingCookies = request.headers.get("cookie") ?? "";
      const updatedCookies = existingCookies
        .split(";")
        .map((c) => c.trim())
        .filter((c) => !c.startsWith("locale="))
        .concat(`locale=${locale}`)
        .join("; ");
      requestHeaders.set("cookie", updatedCookies);

      const response = NextResponse.rewrite(url, {
        request: { headers: requestHeaders },
      });
      // Also set on the response so the browser persists the cookie for future requests.
      response.cookies.set("locale", locale, {
        path: "/",
        maxAge: 31536000,
        sameSite: "lax",
      });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|logos|images|api).*)"],
};
