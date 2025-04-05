import { Separator } from "@/components/ui/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
} from "@/components/ui/sidebar";
import { DashboardSidebarPathnameClient } from "./client";

const DashboardSidebar = async () => {
	return (
		<Sidebar>
			<SidebarContent className="bg-[#001529] w-[255px]">
				<SidebarGroup>
					<SidebarGroupLabel className="px-6 h-12 text-white font-sans font-semibold text-2xl">
						Admin Panel
					</SidebarGroupLabel>
					<Separator className="mb-2 bg-gray-600" />
					<SidebarGroupContent>
						<SidebarMenu>
							<DashboardSidebarPathnameClient />
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="bg-[#001529] text-white px-6">
				Version: 0.0.1
			</SidebarFooter>
		</Sidebar>
	);
};

export default DashboardSidebar;
