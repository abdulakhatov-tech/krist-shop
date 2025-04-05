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
	const currentMinPrice = searchParams.get("minPrice") || "0";
	const currentMaxPrice = searchParams.get("maxPrice") || "10000";

	const [debouncedSearch, setDebouncedSearch] = useState(currentSearch);
	const [debounceMinPrice, setDebouncedMinPrice] = useState(currentMinPrice);
	const [debounceMaxPrice, setDebouncedMaxPrice] = useState(currentMaxPrice);

	// Setup the debounced function once using useRef
	const debounceRef = useRef(
		debounce((value: string) => {
			setDebouncedSearch(value);
		}, 500),
	);

	const debounceMinPriceRef = useRef(
		debounce((value: string) => {
			setDebouncedMinPrice(value);
		}, 500),
	);

	const debounceMaxPriceRef = useRef(
		debounce((value: string) => {
			setDebouncedMaxPrice(value);
		}, 500),
	);

	// Update debouncedSearch whenever currentSearch changes
	useEffect(() => {
		debounceRef.current(currentSearch);
	}, [currentSearch]);

	useEffect(() => {
		debounceMinPriceRef.current(currentMinPrice);
	}, [currentMinPrice]);

	useEffect(() => {
		debounceMaxPriceRef.current(currentMaxPrice);
	}, [currentMaxPrice]);

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
		if (debounceMinPrice) params.minPrice = Number(debounceMinPrice);
		if (debounceMaxPrice) params.maxPrice = Number(debounceMaxPrice);

		return params;
	}, [
		currentPage,
		currentLimit,
		currentCategory,
		currentSubCategory,
		debouncedSearch,
		currentStartDate,
		currentEndDate,
		debounceMaxPrice,
		debounceMinPrice,
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
			debounceMinPriceRef.current.cancel();
			debounceMaxPriceRef.current.cancel();
		};
	}, []);

	return {
		formattedData,
		isLoading,
	};
};

export default useProductsFeatures;
