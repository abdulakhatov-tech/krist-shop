"use client";

import type { ColumnDef } from "@tanstack/react-table";

import {
	DataTableCreatedAt,
	DataTableProducts,
	DataTableRowActions,
	DataTableRowInfo,
	DataTableRowSelection,
	DataTableRowSelectionHeader,
} from "@/components/data-table/column-actions";
import type { ISubcategory } from "@/interfaces/subcategory.interface";

const columns: ColumnDef<ISubcategory>[] = [
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
		accessorKey: "category",
		header: "category",
		cell: ({ row }) => row.original.category?.name,
	},
	{
		accessorKey: "products",
		header: "Products",
		cell: ({ row }) => <DataTableProducts row={row} />,
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
				typeId="subcategoryId"
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
