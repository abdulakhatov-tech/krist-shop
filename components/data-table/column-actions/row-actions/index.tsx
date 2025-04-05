"use client";

import { Edit2, Eye, Trash2 } from "lucide-react";
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

	// Function to generate a new URL with preserved query params
	const generateUrl = (action: string) => {
		const params = searchParams
			? new URLSearchParams(searchParams.toString())
			: new URLSearchParams(); // Clone to modify
		params.set("action", action);
		params.set(typeId, row.original.id);
		return `${pathname}?${params.toString()}`;
	};

	return (
		<div className="flex items-center justify-end gap-2">
			{["view", "edit", "delete"].map((action) => (
				<Link key={action} href={generateUrl(action)}>
					<Button
						size="sm"
						className={`hover:scale-95 ${
							action === "delete"
								? "bg-[crimson] hover:bg-[#DB4444] active:bg-red-600"
								: "bg-[#001529] hover:bg-blue-700 active:bg-blue-800"
						}`}
					>
						{action === "view" ? (
							<Eye />
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
