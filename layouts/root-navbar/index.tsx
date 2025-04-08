"use client";

import Link from "next/link";
import type React from "react";
import { useEffect, useState } from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

import { Button } from "@/components/ui/button";
import {
	Logo,
	NavActions,
	NavItems,
	NavItemsMobileMode,
	UserAvatar,
} from "./customs";

const RootNavbar: React.FC = () => {
	const isAuthenticated = useIsAuthenticated();

	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null; // or a loading state

	return (
		<header className="py-4 border">
			<div className="container">
				<nav className="flex items-center justify-between gap-6">
					<div className="flex items-center gap-3">
						<NavItemsMobileMode />
						<Logo />
					</div>

					{/* Nav Items */}
					<div className="hidden md:block">
						<NavItems />
					</div>

					<div className="flex items-center gap-4">
						{/* Nav Actions */}
						<NavActions />

						{isAuthenticated ? (
							<UserAvatar />
						) : (
							<Link href="/auth/sign-in">
								<Button>Login</Button>
							</Link>
						)}
					</div>
				</nav>
			</div>
		</header>
	);
};

export default RootNavbar;
