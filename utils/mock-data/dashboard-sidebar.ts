import {
	Activity,
	ChartColumnStacked,
	Gauge,
	ListOrdered,
	Palette,
	PencilRuler,
	Settings,
	ShoppingCart,
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
		title: "Sizes",
		url: "/dashboard/sizes",
		icon: PencilRuler,
	},
	{
		title: "Colors",
		url: "/dashboard/colors",
		icon: Palette,
	},
	{
		title: "Stocks",
		url: "/dashboard/stocks",
		icon: Activity,
	},
	{
		title: "Settings",
		url: "/dashboard/settings",
		icon: Settings,
	},
];
