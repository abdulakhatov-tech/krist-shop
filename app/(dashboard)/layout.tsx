import type { Metadata } from "next";
import type React from "react";
import type { ReactNode } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNavbar, DashboardSidebar, ProtectedLayout } from "@/layouts";

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
		<ProtectedLayout>
			<SidebarProvider>
				<DashboardSidebar />

				<div className="w-full">
					<DashboardNavbar />

					<main
						className="p-4 md:p-5"
						style={{ minHeight: "calc(100vh - 56px)" }}
					>
						{children}
					</main>
				</div>
			</SidebarProvider>
		</ProtectedLayout>
	);
};

export default DashboardLayout;
