"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";

import { cn } from "@/lib/utils";
import { type NavItemType, navItems } from "@/utils/mock-data/navbar-mock";

type PropsType = {
	direction?: "vertical" | "horizontal";
};

const NavItems: React.FC<PropsType> = ({ direction = "horizontal" }) => {
	const pathname = usePathname();

	return (
		<ul
			className={cn(
				direction === "vertical" ? "flex-col gap-3" : "flex-row gap-4 md:gap-6",
				"flex items-center",
			)}
		>
			{navItems?.map(({ _id, path, title }: NavItemType) => (
				<li key={_id}>
					<Link
						href={path}
						className={`${
							pathname === path
								? "font-semibold border-b border-b-black"
								: "font-normal"
						} text-lg flex items-center gap-1`}
					>
						{title}
					</Link>
				</li>
			))}
		</ul>
	);
};

export default NavItems;
