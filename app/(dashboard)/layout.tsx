import type { Metadata } from "next";
import type React from "react";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: {
		default: "Dashboard",
		template: "%s | Dashboard",
	},
	description:
		"Manage your orders, profile, and account settings in the Krist dashboard. Stay on top of your shopping experience.",
	keywords: [
		"user dashboard",
		"account management",
		"order history",
		"Krist dashboard",
		"profile settings",
		"shopping management",
	],
};

const DashboardLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<>
			<aside>Aside</aside>
			<main>{children}</main>
		</>
	);
};

export default DashboardLayout;
