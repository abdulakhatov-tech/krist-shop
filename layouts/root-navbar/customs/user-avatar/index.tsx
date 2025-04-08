import Link from "next/link";
import type React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { IUser } from "@/interfaces/user.interface";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignOut from "@/layouts/sign-out";
import {
	Heart,
	LayoutDashboard,
	LogOut,
	Settings,
	ShoppingCart,
	User,
} from "lucide-react";
import "./style.css";

export const userAvatarItems = [
	{
		name: "Dashboard",
		icon: LayoutDashboard,
		link: "/dashboard",
		allowedRoles: ["admin", "seller"],
	},
	{
		name: "Profile",
		icon: User,
		link: "/profile",
		allowedRoles: ["admin", "seller", "customer"],
	},
	{
		name: "Shopping Cart",
		icon: ShoppingCart,
		link: "/cart",
		allowedRoles: ["admin", "seller", "customer"],
	},
	{
		name: "Favorites",
		icon: Heart,
		link: "/favorites",
		allowedRoles: ["admin", "seller", "customer"],
	},
	{
		name: "Settings",
		icon: Settings,
		link: "/settings",
		allowedRoles: ["admin", "seller", "customer"],
	},
	{
		name: "Logout",
		icon: LogOut,
		link: "/logout",
		allowedRoles: ["admin", "seller", "customer"],
	},
];

const UserAvatar: React.FC = () => {
	const user = useAuthUser<IUser | null>();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar className="w-10 h-10">
					<AvatarImage src={user?.profilePhoto as string} />
					<AvatarFallback className="text-[16px] bg-gray-200">
						{user?.firstName?.[0]}.{user?.lastName?.[0]}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{userAvatarItems.map((item) => {
					if (item.name === "Logout") {
						return (
							<SignOut key={item.name}>
								<DropdownMenuItem
									key={item.name}
									className="sign-out hover:text-white hover:bg-[#dc143ce1] text-[15px]"
								>
									{item.icon && (
										<item.icon className="mr-[2px] !w-5 !h-5 sign-out-icon" />
									)}
									{item.name}
								</DropdownMenuItem>
							</SignOut>
						);
					}

					return (
						<Link key={item.name} href={item.link}>
							<DropdownMenuItem className="hover:bg-gray-100 text-[15px]">
								{item.icon && <item.icon className="mr-[2px] !w-5 !h-5" />}
								{item.name}
							</DropdownMenuItem>
						</Link>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserAvatar;
