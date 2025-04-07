"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ISubcategory } from "@/interfaces/subcategory.interface";
import noImage from "@/public/no-image.svg";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface PropsI {
	row: {
		original: {
			subcategories: ISubcategory[];
		};
	};
}

const DataTableSubcategories = ({ row }: PropsI) => {
	const [isOpen, setIsOpen] = useState(false);
	const subcategories = row.original.subcategories;

	if (!subcategories?.length) {
		return <span>-</span>;
	}

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger className="bg-[#001529] text-white py-1 px-4 rounded-sm flex items-center gap-1">
				View ({subcategories?.length}){" "}
				{isOpen ? (
					<ChevronUp className="w-4 h-4" />
				) : (
					<ChevronDown className="w-4 h-4" />
				)}
			</DropdownMenuTrigger>
			<DropdownMenuContent className="max-h-[300px] md:max-h-[400px] overflow-y-auto">
				<DropdownMenuLabel>Subcategories</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{subcategories?.map((item) => (
					<DropdownMenuItem key={item.id} className="flex items-center gap-1">
						<Image
							src={item?.imageUrl || noImage}
							width={20}
							height={20}
							alt={item.name}
							className="rounded-full max-w-[22px] max-h-[22px] overflow-hidden bg-[grey] p-[2px]"
						/>
						{item.name}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DataTableSubcategories;
