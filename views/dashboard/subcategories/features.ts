"use client";

import { useSubcategoriesWithPagination } from "@/hooks/useQueryActions/useSubcategories";
import debounce from "lodash/debounce";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const useSubcategoriesFeatures = () => {
	const searchParams = useSearchParams();

	const currentPage = Number(searchParams.get("page")) || 1;
	const currentLimit = Number(searchParams.get("limit")) || 14;
	const currentCategory = searchParams.get("category") || "";
	const currentSearch = searchParams.get("search") || "";

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
			category?: string;
			search?: string;
		} = {
			page: currentPage,
			limit: currentLimit,
		};

		if (debouncedSearch) params.search = debouncedSearch;
		if (currentCategory) params.category = currentCategory;

		return params;
	}, [currentPage, currentLimit, currentCategory, debouncedSearch]);

	const { data, isLoading } = useSubcategoriesWithPagination(queryParams);

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

	// Cleanup debounce on unmount
	useEffect(() => {
		return () => {
			debounceRef.current.cancel();
		};
	}, []);

	return {
		formattedData,
		isLoading,
	};
};

export default useSubcategoriesFeatures;
