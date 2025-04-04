"use client";

import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import type React from "react";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PropsI {
	pagination: PaginationType;
}
const rowsPerPageOptions = [10, 14, 20, 30, 50, 100];

const DataTableLimit: React.FC<PropsI> = ({ pagination }) => {
	const { perPage } = pagination;

	const router = useRouter();
	const searchParams = useSearchParams();

	const handlePageSizeChange = useCallback(
		(option: number) => {
			// Ensure that other query parameters are kept while changing the limit
			const newParams = new URLSearchParams(searchParams.toString());
			newParams.set("limit", option.toString());

			// Push the updated query parameters to the URL
			router.push(`?${newParams.toString()}`);
		},
		[searchParams, router],
	);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="sm">
					Per page: {perPage} <ChevronDown />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{rowsPerPageOptions.map((option) => (
					<DropdownMenuCheckboxItem
						key={option}
						checked={perPage === option}
						onClick={() => handlePageSizeChange(option)}
					>
						{option}
					</DropdownMenuCheckboxItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DataTableLimit;
