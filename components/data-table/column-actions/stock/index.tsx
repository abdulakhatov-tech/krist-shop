"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface PropsI {
	row: {
		original: {
			name: string;
			stock: {
				id: string;
				color: string;
				size: string;
				quantity: number;
			}[];
		};
	};
}

const DataTableStock = ({ row }: PropsI) => {
	const [isOpen, setIsOpen] = useState(false);
	const stock = row.original.stock;

	if (!stock?.length) {
		return <span className="text-muted-foreground">0</span>;
	}

	const quantitySum = stock.reduce((acc, item) => acc + item.quantity, 0);

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger className="flex items-center gap-1 border py-1 px-2 rounded-md bg-[#001529] text-white hover:bg-[#003060] transition w-full justify-between">
				{quantitySum}
				{isOpen ? (
					<ChevronUp className="w-4 h-4" />
				) : (
					<ChevronDown className="w-4 h-4" />
				)}
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-64">
				{stock.map((item) => (
					<DropdownMenuItem key={item.id} className="flex items-center gap-2">
						<div
							className="w-4 h-4 rounded-sm border"
							style={{ backgroundColor: item.color }}
							title={item.color}
						/>
						<span className="text-sm">
							{item.quantity} ×{" "}
							<span className="uppercase p-[1px] px-2 rounded-sm text-white bg-[#001529]">
								{item.size}
							</span>{" "}
							sized {row?.original?.name}
						</span>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DataTableStock;
