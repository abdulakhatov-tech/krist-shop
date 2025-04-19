"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useCategories } from "@/hooks/useQueryActions/useCategories";
import { useSubCategoriesByCategoryId } from "@/hooks/useQueryActions/useSubcategories";
import type { ICategory } from "@/interfaces/category.interface";
import { CategoryLoading, SubcategoryLoading } from "./loading";

const FilterByCategory = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
	const selectedSubcategoryIds = useMemo(
		() => searchParams.getAll("subcategoryId"),
		[searchParams],
	);

	const { data: categories = [], isLoading: isCategoriesLoading } =
		useCategories();
	const { data: subcategories = [], isLoading: isSubcategoriesLoading } =
		useSubCategoriesByCategoryId(activeCategoryId ?? "");

	const subcategoriesByCategory = useMemo(() => {
		const map: Record<string, ICategory["subcategories"]> = {};

		for (const category of categories) {
			map[category.id] = category.subcategories || [];
		}
		return map;
	}, [categories]);

	const updateQueryParams = useCallback(
		(subcategoryId: string, categoryId: string) => {
			const updatedParams = new URLSearchParams(searchParams.toString());

			const nextSubcategoryIds = selectedSubcategoryIds.includes(subcategoryId)
				? selectedSubcategoryIds.filter((id) => id !== subcategoryId)
				: [...selectedSubcategoryIds, subcategoryId];

			updatedParams.delete("subcategoryId");
			for (const id of nextSubcategoryIds) {
				updatedParams.append("subcategoryId", id);
			}

			const relatedSubcategories = subcategoriesByCategory[categoryId] || [];
			const hasAnySubChecked = relatedSubcategories.some((sub) =>
				nextSubcategoryIds.includes(sub.id),
			);

			updatedParams.delete("categoryId");
			if (hasAnySubChecked) {
				updatedParams.append("categoryId", categoryId);
			}

			router.replace(`${pathname}?${updatedParams.toString()}`);
		},
		[
			router,
			pathname,
			searchParams,
			selectedSubcategoryIds,
			subcategoriesByCategory,
		],
	);

	const handleAccordionToggle = useCallback((categoryId: string) => {
		setActiveCategoryId((prevId) =>
			prevId === categoryId ? null : categoryId,
		);
	}, []);

	return (
		<div>
			<h3 className="text-xl font-semibold mb-3">Categories</h3>

			<Accordion
				type="single"
				collapsible
				className="max-h-[400px] overflow-y-auto shadow-sm"
			>
				{isCategoriesLoading ? (
					<CategoryLoading />
				) : (
					categories.map((category: ICategory) => (
						<AccordionItem key={category.id} value={category.id}>
							<AccordionTrigger
								onClick={() => handleAccordionToggle(category.id)}
								className="hover:no-underline py-2 px-4 transition duration-200 rounded hover:bg-[#222] hover:text-white hover:scale-[0.97] data-[state=open]:bg-[#222] data-[state=open]:text-white"
							>
								<div className="flex items-center gap-3">
									<Checkbox
										checked={
											subcategoriesByCategory[category.id]?.some((sub) =>
												selectedSubcategoryIds.includes(sub.id),
											) || false
										}
									/>
									<span className="text-lg font-medium">{category.name}</span>
								</div>
							</AccordionTrigger>
							<AccordionContent>
								{activeCategoryId === category.id &&
								subcategories.length > 0 &&
								isSubcategoriesLoading ? (
									<SubcategoryLoading />
								) : (
									<div className="space-y-1">
										{subcategories.map((sub) => (
											<label
												htmlFor="checkbox"
												key={sub.id}
												className="flex items-center gap-2 pl-6 py-1 cursor-pointer text-muted-foreground hover:text-foreground transition"
											>
												<Checkbox
													checked={selectedSubcategoryIds.includes(sub.id)}
													id="checkbox"
													onCheckedChange={() =>
														updateQueryParams(sub.id, category?.id)
													}
												/>
												<span className="text-base">{sub.name}</span>
											</label>
										))}
									</div>
								)}
							</AccordionContent>
						</AccordionItem>
					))
				)}
			</Accordion>
		</div>
	);
};

export default FilterByCategory;
