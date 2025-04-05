"use client";

import debounce from "lodash/debounce";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { useUsers } from "@/hooks/useQueryActions/useUsers";
import type { UserType } from "@/types/user.type";

const useUsersFeatures = () => {
	const searchParams = useSearchParams();

	const currentPage = Number(searchParams.get("page")) || 1;
	const currentLimit = Number(searchParams.get("limit")) || 14;
	const currentRole = (searchParams.get("role") || "admin") as UserType;
	const currentSearch = searchParams.get("search") || "";
	const currentStartDate = searchParams.get("startDate") || undefined;
	const currentEndDate = searchParams.get("endDate") || undefined;

	const [debouncedSearch, setDebouncedSearch] = useState(currentSearch);

	// Setup the debounced function once using useRef
	const debounceRef = useRef(
		debounce((value: string) => {
			setDebouncedSearch(value);
		}, 500),
	);

	// Update debouncedSearch whenever currentSearch changes
	useEffect(() => {
		debounceRef.current(currentSearch);
	}, [currentSearch]);

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
			role: currentRole,
		};

		if (debouncedSearch) params.search = debouncedSearch;
		if (currentStartDate) params.startDate = currentStartDate;
		if (currentEndDate) params.endDate = currentEndDate;

		return params;
	}, [
		currentPage,
		currentLimit,
		currentRole,
		debouncedSearch,
		currentStartDate,
		currentEndDate,
	]);

	const { data, isLoading } = useUsers(queryParams);

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

	const role = searchParams.get("role");
	const title = role
		? `${role.charAt(0).toUpperCase()}${role.slice(1)}s`
		: "Users";

	// Cleanup debounce on unmount
	useEffect(() => {
		return () => {
			debounceRef.current.cancel();
		};
	}, []);

	return {
		formattedData,
		isLoading,
		title,
	};
};

export default useUsersFeatures;
