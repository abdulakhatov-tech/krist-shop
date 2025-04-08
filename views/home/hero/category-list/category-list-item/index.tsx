import Link from "next/link";
import type React from "react";

import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import type { ICategory } from "@/interfaces/category.interface";
import SubCategoryList from "./subcategory-list";

const CategoryListItem: React.FC<{ category: ICategory }> = ({ category }) => {
	const hasChildren = Boolean(category?.subcategories?.length);

	return (
		<AccordionItem value={category.id} className="border-b-0">
			{hasChildren ? (
				<>
					<AccordionTrigger className="hover:no-underline py-2 px-4 hover:bg-[#222] hover:text-white hover:scale-[0.97] transition duration-200 rounded data-[state=open]:bg-[#222] data-[state=open]:text-white">
						<div className="flex items-center justify-between w-full">
							<span className="text-lg font-normal">{category.name}</span>
						</div>
					</AccordionTrigger>
					<AccordionContent className="pl-3 pt-1 pb-2">
						{category?.subcategories && (
							<SubCategoryList subcategories={category?.subcategories} />
						)}
					</AccordionContent>
				</>
			) : (
				<Link
					href={`/shop?page=1&limit=24&category=${category.slug}`}
					className="flex justify-between items-center py-2 px-4 hover:bg-[#222] hover:text-white hover:scale-[0.94] transition-all duration-75 rounded w-full"
				>
					<span className="text-lg font-normal">{category.name}</span>
				</Link>
			)}
		</AccordionItem>
	);
};

export default CategoryListItem;
