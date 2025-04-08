import { Heart, Search, ShoppingBasket } from "lucide-react";

import type { ComponentType, SVGProps } from "react";

export type NavItemType = {
	_id: string;
	path: string;
	title: string;
};

export type NavActionType = {
	_id: string;
	Icon: ComponentType<SVGProps<SVGSVGElement>>;
	title: string;
	type: "search" | "favorites" | "shopping-cart";
};

export const navItems: NavItemType[] = [
	{
		_id: "1",
		path: "/",
		title: "Home",
	},
	{
		_id: "2",
		path: "/shop",
		title: "Shop",
	},
	{
		_id: "3",
		path: "/about",
		title: "About",
	},
	{
		_id: "4",
		path: "/contact-us",
		title: "Contact Us",
	},
];

export const navActions: NavActionType[] = [
	{
		_id: "1",
		Icon: Search,
		title: "Search",
		type: "search",
	},
	{
		_id: "2",
		Icon: Heart,
		title: "Favorites",
		type: "favorites",
	},
	{
		_id: "3",
		Icon: ShoppingBasket,
		title: "Shopping Cart",
		type: "shopping-cart",
	},
];
