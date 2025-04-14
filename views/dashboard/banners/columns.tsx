"use client";

import type { ColumnDef } from "@tanstack/react-table";

import {
	DataTableCreatedAt,
	DataTableRowActions,
	DataTableRowInfo,
	DataTableRowSelection,
	DataTableRowSelectionHeader,
} from "@/components/data-table/column-actions";
import type { IBanner } from "@/interfaces/banner.interface";
const columns: ColumnDef<IBanner>[] = [
	{
		id: "select",
		header: ({ table }) => <DataTableRowSelectionHeader table={table} />,
		cell: ({ row }) => <DataTableRowSelection row={row} />,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "name",
		header: "Name",
		cell: ({ row }) => <DataTableRowInfo row={row} />,
	},
	{
		accessorKey: "slug",
		header: "Slug",
	},
	{
		accessorKey: "product",
		header: "Product",
		cell: ({ row }) => row.original?.product?.name,
	},
	{
		accessorKey: "isActive",
		header: "Status",
		cell: ({ row }) => {
			const isActive = row.original.isActive;
			return (
				<span
					className={`py-1 px-2 rounded-sm text-white ${isActive ? "bg-green-400 " : "bg-[#DB4444]"}`}
				>
					{isActive ? "Active" : "Inactive"}
				</span>
			);
		},
	},
	{
		accessorKey: "createdAt",
		header: "Created At",
		cell: ({ row }) => <DataTableCreatedAt row={row} />,
	},
	{
		accessorKey: "actions",
		header: () => <div className="text-right">Actions</div>,
		cell: ({ row }) => (
			<DataTableRowActions
				row={row}
				typeId="bannerId"
				actions={{
					view: false,
					edit: true,
					delete: true,
				}}
			/>
		),
	},
];

export default columns;
