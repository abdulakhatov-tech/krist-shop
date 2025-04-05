import type { Metadata } from "next";
import type React from "react";
import type { ReactNode } from "react";

import { DashboardModals } from "@/common/modals";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNavbar, DashboardSidebar, ProtectedLayout } from "@/layouts";
import { SuspenseLoading } from "@/tools";

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
						<SuspenseLoading mode="dashboard">{children}</SuspenseLoading>
					</main>
				</div>
			</SidebarProvider>
			<SuspenseLoading mode="website">
				<DashboardModals />
			</SuspenseLoading>
		</ProtectedLayout>
	);
};

export default DashboardLayout;
