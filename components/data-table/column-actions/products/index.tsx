"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { IProduct } from "@/interfaces/product.interface";
import noImage from "@/public/no-image.svg";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface PropsI {
	row: {
		original: {
			products?: IProduct[];
		};
	};
}

const DataTableProducts = ({ row }: PropsI) => {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	const products = row.original.products;

	if (!products?.length) {
		return <span>-</span>;
	}

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger className="bg-[#001529] text-white py-1 px-4 rounded-sm flex items-center gap-1">
				View ({products?.length}){" "}
				{isOpen ? (
					<ChevronUp className="w-4 h-4" />
				) : (
					<ChevronDown className="w-4 h-4" />
				)}
			</DropdownMenuTrigger>
			<DropdownMenuContent className="max-h-[300px] md:max-h-[400px] overflow-y-auto">
				<DropdownMenuLabel>Products</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{products?.map((item) => (
					<DropdownMenuItem key={item.id}>
						<Link
							href={`${pathname}?action=view&productId=${item.id}`}
							className="underline flex items-center gap-1 text-blue-500"
						>
							<Image
								src={item?.imageUrl || noImage}
								width={20}
								height={20}
								alt={item.name}
								className="rounded-full max-w-[22px] max-h-[22px] overflow-hidden bg-[grey] p-[2px]"
							/>
							{item.name}
						</Link>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DataTableProducts;
