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
import { useCategories } from "@/hooks/useQueryActions/useCategories";
import type { ICategory } from "@/interfaces/category.interface";

const FilterByCategory = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [selectedCategory, setSelectedCategory] = useState<string>("all");

	const { data, isLoading } = useCategories();

	const categoryParam = searchParams.get("category") as string;

	// Sync with URL param on mount
	useEffect(() => {
		if (!categoryParam || categoryParam === "all") {
			const params = new URLSearchParams(searchParams.toString());

			setSelectedCategory("all");
			params.delete("category");
			router.replace(`${pathname}?${params.toString()}`);
		} else {
			setSelectedCategory(categoryParam);
		}
	}, [categoryParam, router, searchParams, pathname]);

	const handleValueChange = (category: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (category === "all") {
			params.delete("category");
		} else {
			params.set("category", category);
		}

		router.replace(`${pathname}?${params.toString()}`);
		setSelectedCategory(category);
	};

	if (isLoading) {
		return <Skeleton className="w-[150px] md:w-[180px] lg:w-[200px] h-9" />;
	}

	return (
		<Select value={selectedCategory} onValueChange={handleValueChange}>
			<SelectTrigger className="w-[150px] md:w-[180px] lg:w-[200px]">
				<SelectValue placeholder="Select a Category" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value={"all"} className="capitalize">
					All Categories
				</SelectItem>
				{data?.map((category: ICategory) => (
					<SelectItem
						key={category?.id}
						value={category?.slug}
						className="capitalize"
					>
						{category?.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default FilterByCategory;
