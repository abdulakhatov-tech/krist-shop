"use client";

import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { IUser } from "@/interfaces/user.interface";
import { userAvatarItems } from "@/utils/mock-data/navbar-mock";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import "./style.css";

const UserAvatar = () => {
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
				{userAvatarItems?.map((item) => {
					if (item.name === "Logout") {
						return (
							<DropdownMenuItem
								key={item.name}
								className="sign-out hover:text-white hover:bg-[#dc143ce1] text-[15px]"
							>
								<Link href="?auth=sign-out" className="flex items-center gap-2">
									{item.icon && (
										<item.icon className="mr-[2px] !w-5 !h-5 sign-out-icon" />
									)}
									{item.name}
								</Link>
							</DropdownMenuItem>
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
