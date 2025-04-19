"use client";

import { useShopProducts } from "@/hooks/useQueryActions/useProducts";
import { debounce } from "lodash";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const useShopProductsFeatures = () => {
	const searchParams = useSearchParams();

	const currentPage = Number(searchParams.get("page")) || 1;
	const currentLimit = Number(searchParams.get("limit")) || 14;
	const currentMinPrice = searchParams.get("minPrice") || "0";
	const currentMaxPrice = searchParams.get("maxPrice") || "10000";
	const currentSortBy = searchParams.get("sortBy") || "";
	const currentSubcategoryIds = searchParams.getAll("subcategoryId") || [];

	const [debounceMinPrice, setDebouncedMinPrice] = useState(currentMinPrice);
	const [debounceMaxPrice, setDebouncedMaxPrice] = useState(currentMaxPrice);

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
			minPrice?: number;
			maxPrice?: number;
			sortBy?: string;
			subcategoryIds?: string[];
		} = {
			page: currentPage,
			limit: currentLimit,
		};

		if (currentSubcategoryIds) params.subcategoryIds = currentSubcategoryIds;
		if (debounceMinPrice) params.minPrice = Number(debounceMinPrice);
		if (debounceMaxPrice) params.maxPrice = Number(debounceMaxPrice);
		if (currentSortBy) params.sortBy = currentSortBy;

		return params;
	}, [
		currentPage,
		currentLimit,
		currentSubcategoryIds,
		debounceMaxPrice,
		debounceMinPrice,
		currentSortBy,
	]);

	const { data, isLoading } = useShopProducts(queryParams);

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
			debounceMinPriceRef.current.cancel();
			debounceMaxPriceRef.current.cancel();
		};
	}, []);

	return {
		formattedData,
		isLoading,
	};
};

export default useShopProductsFeatures;
