"use client";

import GenericBreadcrumb from "@/components/generics/breadcrumb";
import { cn } from "@/lib/utils";
import { profilePageLinks } from "@/utils/mock-data/breadcrumbs";
import { profileSidebarData } from "@/utils/mock-data/profile";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";

const ProfileLayout: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const pathname = usePathname();

	return (
		<div className="container">
			<GenericBreadcrumb links={profilePageLinks} />

			<div className="grid md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] gap-4 md:gap-8 pb-15">
				<aside className="bg-accent p-4">
					<nav>
						<ul className="flex flex-wrap md:flex-nowrap flex-row md:flex-col gap-3">
							{profileSidebarData?.map(({ id, title, path }) => (
								<li
									key={id}
									className={cn(
										pathname === path
											? "md:bg-black md:text-white"
											: "md:bg-white",
										"md:border md:py-2 md:px-4 rounded-sm hover:bg-black hover:text-white",
									)}
								>
									<Link
										href={path}
										className={cn(
											pathname === path
												? "font-semibold"
												: "font-normal hover:font-semibold",
											"text-[16px] leading-6",
										)}
									>
										{title}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</aside>

				<main>{children}</main>
			</div>
		</div>
	);
};

export default ProfileLayout;
