"use client";

import type { ColumnDef } from "@tanstack/react-table";

import {
	DataTableCreatedAt,
	DataTableProducts,
	DataTableRowActions,
	DataTableRowInfo,
	DataTableRowSelection,
	DataTableRowSelectionHeader,
	DataTableSubcategories,
} from "@/components/data-table/column-actions";
import type { ICategory } from "@/interfaces/category.interface";

const columns: ColumnDef<ICategory>[] = [
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
		accessorKey: "subcategory",
		header: "Subcategory",
		cell: ({ row }) => <DataTableSubcategories row={row} />,
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
				typeId="categoryId"
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
