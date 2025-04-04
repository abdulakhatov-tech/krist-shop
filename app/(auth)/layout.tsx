import AuthLayoutWrapper from "@/layouts/auth.layout";
import type { Metadata } from "next";
import type React from "react";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: {
		default: "Auth",
		template: "%s | Auth",
	},
	description:
		"Access your Krist account or sign up to start shopping. Secure login and registration for a seamless shopping experience.",
	keywords: [
		"login",
		"signup",
		"register",
		"account access",
		"Krist authentication",
		"secure login",
	],
};

const AuthLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
	return <AuthLayoutWrapper>{children}</AuthLayoutWrapper>;
};

export default AuthLayout;
