"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

const ProtectedLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const router = useRouter();
	const isAuthenticated = useIsAuthenticated();

	useEffect(() => {
		if (!isAuthenticated) {
			router.push("/auth/sign-in");
		}
	}, [isAuthenticated, router]);

	return <>{children}</>;
};

export default ProtectedLayout;
