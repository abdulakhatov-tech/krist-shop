"use client";

import {
	ChartColumnIncreasing,
	Edit2,
	Eye,
	TicketSlash,
	Trash2,
} from "lucide-react";
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
	typeId:
		| "productId"
		| "userId"
		| "categoryId"
		| "subcategoryId"
		| "newsletterId"
		| "bannerId";
	actions?: {
		view?: boolean;
		edit?: boolean;
		stock?: boolean;
		delete?: boolean;
		banner?: boolean;
	};
}

const DataTableRowAction: React.FC<DataTableRowActionsProps> = ({
	row,
	typeId,
	actions = {}, // Default empty object if no actions are passed
}) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const type =
		typeId === "productId"
			? "product"
			: typeId === "userId"
				? "user"
				: typeId === "newsletterId"
					? "newsletter"
					: typeId === "bannerId"
						? "banner"
						: "";

	// Function to generate a new URL with preserved query params
	const generateUrl = (action: string) => {
		const params = searchParams
			? new URLSearchParams(searchParams.toString())
			: new URLSearchParams(); // Clone to modify
		params.set("action", action);
		params.set(typeId, row.original.id);
		return `${pathname}?${params.toString()}`;
	};

	// Actions array based on the passed actions prop
	const availableActions = Object.keys(actions).filter(
		(action) => actions[action as keyof typeof actions],
	);

	// Function to generate the title for each action
	const generateTitle = (action: string): string => {
		const item = type?.[0]?.toUpperCase() + type?.slice(1);

		switch (action) {
			case "view":
				return `View ${item} Details`;
			case "stock":
				return `Increase ${item} Stock`;
			case "edit":
				return `Edit ${item} Details`;
			case "delete":
				return `Delete ${item}`;
			case "banner":
				return `Edit ${item} Banner`;
			default:
				return "Unknown Title";
		}
	};

	return (
		<div className="flex items-center justify-end gap-2">
			{availableActions.map((action) => (
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
						) : action === "banner" ? (
							<TicketSlash />
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
