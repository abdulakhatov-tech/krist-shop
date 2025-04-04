import { House, LogOut } from "lucide-react";
import Link from "next/link";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { CustomTooltip } from "@/tools";

const DashboardNavbar = () => {
	return (
		<header className="bg-[#001529] w-full h-14 px-4 flex items-center justify-between">
			<SidebarTrigger className="text-white" />

			<div className="flex items-center gap-4">
				<CustomTooltip title="Shopping">
					<Link href="/">
						<House className="text-white !w-7 !h-7 hover:scale-95" />
					</Link>
				</CustomTooltip>
				<CustomTooltip title="Logout">
					<LogOut className="text-white hover:text-[#DB4444] !w-7 !h-7 hover:scale-95" />
				</CustomTooltip>
			</div>
		</header>
	);
};

export default DashboardNavbar;
