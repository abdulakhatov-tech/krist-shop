"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { dashboardSidebarItems } from "@/utils/mock-data/dashboard-sidebar";

export const DashboardSidebarPathnameClient = () => {
	const pathname = usePathname();

	return (
		<>
			{dashboardSidebarItems.map((item) => (
				<SidebarMenuItem key={item.title}>
					<SidebarMenuButton
						asChild
						className={cn(
							item.url === pathname && "bg-[#BC8E5B]",
							"w-full h-[40px] flex items-center gap-3 px-4 text-white rounded-lg hover:bg-[#BC8E5B] hover:text-white hover:scale-[0.94] transition-all duration-150",
						)}
					>
						<Link href={item.url || "#"} className="w-full h-full">
							<item.icon className="!w-5 !h-5" />
							<span className="font-sans text-[16px] font-normal text-white">
								{item.title}
							</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</>
	);
};
