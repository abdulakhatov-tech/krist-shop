"use client";

import type { ColumnDef } from "@tanstack/react-table";

import {
	DataTableCreatedAt,
	DataTableRowActions,
	DataTableRowSelection,
	DataTableRowSelectionHeader,
} from "@/components/data-table/column-actions";
import type { INewsletter } from "@/interfaces/newsletter.interface";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const columns: ColumnDef<INewsletter>[] = [
	{
		id: "select",
		header: ({ table }) => <DataTableRowSelectionHeader table={table} />,
		cell: ({ row }) => <DataTableRowSelection row={row} />,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "user",
		header: "User",
		cell: ({ row }) => {
			const pathname = usePathname();
			const searchParams = useSearchParams();
			const user = row.original?.user;

			if (!user) return "-";

			const params = new URLSearchParams(searchParams.toString());
			params.set("action", "view");
			params.set("userId", user.id);

			return (
				<Link
					href={`${pathname}?${params}`}
					className="text-blue-600 underline"
				>
					{user?.firstName} {user?.lastName}
				</Link>
			);
		},
	},
	{
		accessorKey: "createdAt",
		header: "Subscribed At",
		cell: ({ row }) => <DataTableCreatedAt row={row} />,
	},
	{
		accessorKey: "actions",
		header: () => <div className="text-right">Actions</div>,
		cell: ({ row }) => (
			<DataTableRowActions
				row={row}
				typeId="newsletterId"
				actions={{
					view: false,
					edit: false,
					delete: true,
				}}
			/>
		),
	},
];

export default columns;
