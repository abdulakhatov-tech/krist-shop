"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import type { UserType } from "@/types/user.type";
import { userRoles } from "@/utils/mock-data/user-roles";

const UserRoles = ({ loading = false }: { loading: boolean }) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [selectedRole, setSelectedRole] = useState<string>("admin");

	// Memoized function to handle role change and update the URL
	const handleValueChange = useCallback(
		(role: UserType) => {
			const updatedParams = new URLSearchParams();

			updatedParams.set("role", role);
			router.push(`?${updatedParams.toString()}`);
			setSelectedRole(role);
		},
		[router], // Dependencies to ensure handler updates when necessary
	);

	// Effect to check and set default role when the page loads
	useEffect(() => {
		const currentRole = searchParams.get("role");

		// If the role is not valid or missing, set it to "admin"
		if (!currentRole || !userRoles.includes(currentRole)) {
			const updatedParams = new URLSearchParams();
			updatedParams.set("role", "admin"); // Default to admin if invalid or missing
			router.push(`?${updatedParams.toString()}`);
			setSelectedRole("admin");
		} else {
			setSelectedRole(currentRole); // Set the role from the URL if valid
		}
	}, [searchParams, router]); // Dependencies to ensure effect runs on change

	if (loading) {
		return <Skeleton className="w-[150px] md:w-[180px] lg:w-[200px] h-9" />;
	}

	return (
		<Select value={selectedRole} onValueChange={handleValueChange}>
			<SelectTrigger className="w-[150px] md:w-[180px] lg:w-[200px]">
				<SelectValue placeholder="Select role" />
			</SelectTrigger>
			<SelectContent>
				{userRoles.map((role) => (
					<SelectItem key={role} value={role} className="capitalize">
						{`${role?.[0].toUpperCase()}${role?.slice(1)}s`}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default UserRoles;
