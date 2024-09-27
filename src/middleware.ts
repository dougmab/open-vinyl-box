import {NextRequest, NextResponse} from "next/server";

export function middleware (request: NextRequest) {
  const token = request.cookies.get('ovb.token');

  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*', "/product/:path*"]
}
