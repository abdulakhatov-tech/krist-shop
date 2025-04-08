import {
	Activity,
	ChartColumnStacked,
	Gauge,
	ListOrdered,
	Mails,
	Settings,
	ShoppingCart,
	TicketSlash,
	Users,
} from "lucide-react";

export interface DashboardSidebarItemType {
	title: string;
	url: string;
	icon: React.ComponentType<{ className?: string }>;
}

export const dashboardSidebarItems: DashboardSidebarItemType[] = [
	{
		title: "Dashboard",
		url: "/dashboard",
		icon: Gauge,
	},
	{
		title: "Users",
		url: "/dashboard/users",
		icon: Users,
	},
	{
		title: "Products",
		url: "/dashboard/products",
		icon: ShoppingCart,
	},
	{
		title: "Orders",
		url: "/dashboard/orders",
		icon: ListOrdered,
	},
	{
		title: "Categories",
		url: "/dashboard/categories",
		icon: ChartColumnStacked,
	},
	{
		title: "Subcategories",
		url: "/dashboard/subcategories",
		icon: ChartColumnStacked,
	},
	{
		title: "Newsletters",
		url: "/dashboard/newsletters",
		icon: Mails,
	},
	{
		title: "Banners",
		url: "/dashboard/banners",
		icon: TicketSlash,
	},
	{
		title: "Settings",
		url: "/dashboard/settings",
		icon: Settings,
	},
];
