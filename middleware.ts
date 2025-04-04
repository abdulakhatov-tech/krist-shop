import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const token = request.cookies.get("_auth")?.value;
	const userCookie = request.cookies.get("_auth_state")?.value;
	const { pathname } = request.nextUrl;

	if (token && pathname.startsWith("/auth")) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	if (!token && pathname.startsWith("/dashboard")) {
		return NextResponse.redirect(new URL("/auth/sign-in", request.url));
	}

	// If logged in but not admin and tries to access dashboard
	if (userCookie && pathname.startsWith("/dashboard")) {
		try {
			const user = JSON.parse(userCookie);
			const role = user?.role;

			if (role !== "admin") {
				return NextResponse.redirect(new URL("/", request.url));
			}
		} catch (error) {
			// if parsing fails, force logout
			return NextResponse.redirect(new URL("/auth/sign-in", request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/", "/dashboard/:path*", "/auth/:path*"],
};
