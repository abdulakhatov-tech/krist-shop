"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { useUsers } from "@/hooks/useQueryActions/useUsers";
import type { UserType } from "@/types/user.type";

const useUsersFeatures = () => {
	const searchParams = useSearchParams();

	// Memoized pagination values to prevent unnecessary recalculations
	const {
		currentPage,
		currentLimit,
		currentRole,
		currentSearch,
		currentStartDate,
		currentEndDate,
	} = useMemo(() => {
		return {
			currentPage: Number(searchParams.get("page")) || 1,
			currentLimit: Number(searchParams.get("limit")) || 14,
			currentRole: searchParams?.get("role") || "admin",
			currentSearch: searchParams?.get("search") || undefined,
			currentStartDate: searchParams?.get("startDate") || undefined,
			currentEndDate: searchParams?.get("endDate") || undefined,
		};
	}, [searchParams]);

	const queryParams = useMemo(() => {
		const params: {
			page: number;
			limit: number;
			role: UserType;
			search?: string;
			startDate?: string;
			endDate?: string;
		} = {
			page: currentPage,
			limit: currentLimit,
			role: currentRole as UserType,
		};

		if (currentSearch) params.search = currentSearch;
		if (currentStartDate) params.startDate = currentStartDate;
		if (currentEndDate) params.endDate = currentEndDate;

		return params;
	}, [
		currentPage,
		currentLimit,
		currentRole,
		currentSearch,
		currentStartDate,
		currentEndDate,
	]);

	const { data, isLoading } = useUsers(queryParams);

	// Ensure correct formatting of the data
	const formattedData = useMemo(
		() => ({
			data: data?.data ?? [],
			pagination: data?.pagination ?? {
				currentPage: 1,
				hasNext: false,
				hasPrev: false,
				perPage: 10,
				total: 0,
				totalPages: 1,
			},
		}),
		[data],
	);

	// Proper role title formatting
	const role = searchParams.get("role");
	const title = role
		? `${role.charAt(0).toUpperCase()}${role.slice(1)}s`
		: "Users";

	return {
		formattedData,
		isLoading,
		title,
	};
};

export default useUsersFeatures;
