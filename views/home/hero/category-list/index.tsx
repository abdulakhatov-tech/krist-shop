"use client";

import { Accordion } from "@/components/ui/accordion";
import { useCategories } from "@/hooks/useQueryActions/useCategories";
import type { ICategory } from "@/interfaces/category.interface";
import { cn } from "@/lib/utils";
import CategoryListItem from "./category-list-item";
import Loading from "./loading";

const CategoryList = () => {
	const { data: categories, isLoading } = useCategories();

	return (
		<aside className="max-h-[400px] overflow-y-auto bg-accent p-2 h-full">
			<Accordion
				type="multiple"
				className={cn(isLoading ? "gap-2" : "gap-0", "w-full flex flex-col")}
			>
				{isLoading ? (
					<Loading />
				) : (
					categories?.map((category: ICategory) => (
						<CategoryListItem key={category?.id} category={category} />
					))
				)}
			</Accordion>
		</aside>
	);
};

export default CategoryList;
