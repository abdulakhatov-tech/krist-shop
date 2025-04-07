"use client";

import { ChartColumnIncreasing, Edit2, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type React from "react";

import { Button } from "@/components/ui/button";

interface DataTableRowActionsProps {
	row: {
		original: {
			id: string;
		};
	};
	typeId: "productId" | "userId";
}

const DataTableRowAction: React.FC<DataTableRowActionsProps> = ({
	row,
	typeId,
}) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const type =
		typeId === "productId" ? "product" : typeId === "userId" ? "user" : "";

	// Function to generate a new URL with preserved query params
	const generateUrl = (action: string) => {
		const params = searchParams
			? new URLSearchParams(searchParams.toString())
			: new URLSearchParams(); // Clone to modify
		params.set("action", action);
		params.set(typeId, row.original.id);
		return `${pathname}?${params.toString()}`;
	};

	const actions = ["view", "edit", "delete"];
	if (typeId === "productId" || pathname === "/dashboard/products") {
		actions.splice(1, 0, "stock"); // Insert "stock" after "view"
	}

	const generateTitle = (action: string): string => {
		const item = type?.[0].toUpperCase() + type?.slice(1);

		switch (action) {
			case "view":
				return `View ${item} Details`;
			case "stock":
				return `Increase ${item} Stock`;
			case "edit":
				return `Edit ${item} Details`;
			case "delete":
				return `Delete ${item}`;
			default:
				return "Unknown Title";
		}
	};

	return (
		<div className="flex items-center justify-end gap-2">
			{actions.map((action) => (
				<Link key={action} href={generateUrl(action)}>
					<Button
						title={generateTitle(action)}
						size="sm"
						className={`hover:scale-95 ${
							action === "delete"
								? "bg-[crimson] hover:bg-[#DB4444] active:bg-red-600"
								: "bg-[#001529] hover:bg-blue-700 active:bg-blue-800"
						}`}
					>
						{action === "view" ? (
							<Eye />
						) : action === "stock" ? (
							<ChartColumnIncreasing />
						) : action === "edit" ? (
							<Edit2 />
						) : (
							<Trash2 />
						)}
					</Button>
				</Link>
			))}
		</div>
	);
};

export default DataTableRowAction;
