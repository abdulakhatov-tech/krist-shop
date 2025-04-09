"use client";

import type React from "react";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/useQueryActions/useCategories";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "./loading";

const Categories: React.FC = () => {
	const { data, isLoading } = useCategories();
	const searchParams = useSearchParams();
	const router = useRouter();

	if (isLoading) return <Loading />;
	if (!data || data?.length === 0) return <p>No categories available</p>;

	const filteredData = data?.filter(
		(category) => category?.subcategories?.length >= 2,
	);

	const onValueChange = (value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("category", value);

		router.push(`?${params.toString()}`);
	};

	return (
		<Select defaultValue={data[0]?.slug} onValueChange={onValueChange}>
			<SelectTrigger className="w-[200px]">
				<SelectValue placeholder="Select a category" />
			</SelectTrigger>
			<SelectContent className="max-h-[200px] md:max-h-[250px]">
				{filteredData?.map((category) => (
					<SelectItem key={category.slug} value={category.slug}>
						{category.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default Categories;
