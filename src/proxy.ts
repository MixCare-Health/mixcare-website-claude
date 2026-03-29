import { NextRequest, NextResponse } from "next/server";
import { URL_LOCALE, LOCALE_URL_PREFIXES } from "@/lib/locale";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  for (const prefix of LOCALE_URL_PREFIXES) {
    const withSlash = `/${prefix}/`;
    const exact = `/${prefix}`;

    if (pathname === exact || pathname.startsWith(withSlash)) {
      const basePath = pathname === exact ? "/" : pathname.slice(exact.length);
      const locale = URL_LOCALE[prefix];

      const url = request.nextUrl.clone();
      url.pathname = basePath;

      const response = NextResponse.rewrite(url);
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
