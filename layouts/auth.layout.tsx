"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";

import { PAGE_TITLES } from "@/utils/mock-data/auth-layout";

const AuthLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();
	const { title = "", description = "" } = PAGE_TITLES[pathname] || {};
	const isSignUp = pathname === "/auth/sign-up";

	const backLink =
		pathname === "/auth/forgot-password"
			? "/auth/sign-in"
			: pathname === "/auth/verify-otp"
				? "/auth/forgot-password"
				: pathname === "/auth/reset-password"
					? "/auth/sign-in"
					: null;

	return (
		<div className="w-full min-h-screen flex items-center justify-center container">
			<div className="flex flex-col gap-6 md:gap-8 max-w-[450px] w-full md:min-w-[500px] px-4">
				{/* Back Button */}
				{backLink && (
					<Link
						href={backLink}
						className="flex items-center gap-2 hover:text-blue-500"
					>
						<ArrowLeft />
						<h4 className="text-md font-normal leading-[100%] hover:underline">
							Back
						</h4>
					</Link>
				)}

				{/* Title & Description */}
				<div className="flex flex-col gap-3">
					<h1 className="text-3xl font-bold leading-[100%]">{title}</h1>
					<p className="hidden md:block text-md font-normal leading-[100%] text-gray-500">
						{description}
					</p>
				</div>

				{/* Auth Form */}
				{children}

				{/* Sign Up / Sign In Link */}
				{["/auth/sign-up", "/auth/sign-in"].includes(pathname) && (
					<p className="text-lg leading-6 font-normal tracking-wide text-center">
						{isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
						<Link
							href={isSignUp ? "/auth/sign-in" : "/auth/sign-up"}
							className="font-semibold underline hover:text-blue-500"
						>
							{isSignUp ? "Log in" : "Sign up"}
						</Link>
					</p>
				)}
			</div>
		</div>
	);
};

export default AuthLayoutWrapper;
