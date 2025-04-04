import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const token = request.cookies.get("_auth")?.value;
	const { pathname } = request.nextUrl;

	if (token && pathname.startsWith("/auth")) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	// if (!token && (pathname === "/" || pathname.startsWith("/dashboard"))) {
	//   return NextResponse.redirect(new URL("/auth/sign-in", request.url));
	// }

	if (!token && pathname.startsWith("/dashboard")) {
		return NextResponse.redirect(new URL("/auth/sign-in", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/", "/dashboard/:path*", "/auth/:path*"],
};
