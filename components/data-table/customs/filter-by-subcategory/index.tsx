"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
	useSubCategoriesByCategorySlug,
	useSubcategories,
} from "@/hooks/useQueryActions/useSubcategories";
import type { ISubcategory } from "@/interfaces/subcategory.interface";

const FilterBySubcategory = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const subcategorySlug = searchParams.get("subcategory") ?? "all";
	const categorySlug = searchParams.get("category") ?? "";

	const [selectedSubcategory, setSelectedSubcategory] =
		useState(subcategorySlug);

	const { data: allSubcategories, isLoading: isLoadingAll } = useSubcategories({
		enabled: !categorySlug,
	});

	const { data: categorySubcategories, isLoading: isLoadingByCategory } =
		useSubCategoriesByCategorySlug(categorySlug, { enabled: !!categorySlug });

	const isLoading = categorySlug ? isLoadingByCategory : isLoadingAll;
	const subcategories = categorySlug ? categorySubcategories : allSubcategories;

	// Sync selectedSubcategory with URL param on mount or change
	useEffect(() => {
		const params = new URLSearchParams(searchParams.toString());

		if (!subcategorySlug || subcategorySlug === "all") {
			setSelectedSubcategory("all");
			params.delete("subcategory");
			router.replace(`${pathname}?${params.toString()}`);
			return;
		}

		setSelectedSubcategory(subcategorySlug);
	}, [subcategorySlug, pathname, router, searchParams]);

	const handleValueChange = (subcategory: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (subcategory === "all") {
			params.delete("subcategory");
		} else {
			params.set("subcategory", subcategory);
		}

		setSelectedSubcategory(subcategory);
		router.replace(`${pathname}?${params.toString()}`);
	};

	if (isLoading) {
		return <Skeleton className="w-[150px] md:w-[180px] lg:w-[200px] h-9" />;
	}

	return (
		<Select value={selectedSubcategory} onValueChange={handleValueChange}>
			<SelectTrigger className="w-[150px] md:w-[180px] lg:w-[240px]">
				<SelectValue placeholder="Select a Subcategory" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="all" className="capitalize">
					All Subcategories {categorySlug ? "By Category" : ""}
				</SelectItem>
				{subcategories?.map((subcategory: ISubcategory) => (
					<SelectItem
						key={subcategory.id}
						value={subcategory.slug}
						className="capitalize"
					>
						{subcategory.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default FilterBySubcategory;
