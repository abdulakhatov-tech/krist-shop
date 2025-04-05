"use client";

import debounce from "lodash/debounce";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { useProducts } from "@/hooks/useQueryActions/useProducts";

const useProductsFeatures = () => {
	const searchParams = useSearchParams();

	const currentPage = Number(searchParams.get("page")) || 1;
	const currentLimit = Number(searchParams.get("limit")) || 14;
	const currentCategory = searchParams.get("category") || "";
	const currentSubCategory = searchParams.get("subcategory") || "";
	const currentSearch = searchParams.get("search") || "";
	const currentStartDate = searchParams.get("startDate") || undefined;
	const currentEndDate = searchParams.get("endDate") || undefined;
	const currentMinPrice = Number(searchParams.get("minPrice")) || 0;
	const currentMaxPrice = Number(searchParams.get("maxPrice")) || 10000;

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
			subcategory?: string;
			search?: string;
			startDate?: string;
			endDate?: string;
			minPrice?: number;
			maxPrice?: number;
		} = {
			page: currentPage,
			limit: currentLimit,
		};

		if (debouncedSearch) params.search = debouncedSearch;
		if (currentStartDate) params.startDate = currentStartDate;
		if (currentEndDate) params.endDate = currentEndDate;
		if (currentCategory) params.category = currentCategory;
		if (currentSubCategory) params.subcategory = currentSubCategory;
		if (currentMinPrice) params.minPrice = currentMinPrice;
		if (currentMaxPrice) params.maxPrice = currentMaxPrice;

		return params;
	}, [
		currentPage,
		currentLimit,
		currentCategory,
		currentSubCategory,
		debouncedSearch,
		currentStartDate,
		currentEndDate,
		currentMinPrice,
		currentMaxPrice,
	]);

	const { data, isLoading } = useProducts(queryParams);

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

export default useProductsFeatures;
