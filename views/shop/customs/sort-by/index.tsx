"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const sortOptions = [
	{ value: "latest", label: "Sort by latest" },
	{ value: "asc", label: "Low to High" },
	{ value: "desc", label: "High to Low" },
];

const SortBy = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const currentSort = searchParams.get("sortBy") || "";

	const handleSortChange = (value: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (value) {
			params.set("sortBy", value);
		} else {
			params.delete("sortBy");
		}

		router.replace(`${pathname}?${params.toString()}`);
	};

	return (
		<Select value={currentSort} onValueChange={handleSortChange}>
			<SelectTrigger className="w-[150px] border-none outline-none">
				<SelectValue placeholder="Sort by" />
			</SelectTrigger>
			<SelectContent>
				{sortOptions.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default SortBy;
