"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import {
	DataTableCreatedAt,
	DataTableCreatedBy,
	DataTablePrice,
	DataTableRowActions,
	DataTableRowCopyableData,
	DataTableRowInfo,
	DataTableRowSelection,
	DataTableRowSelectionHeader,
} from "@/components/data-table/column-actions";
import type { IProduct } from "@/interfaces/product.interface";

const columns: ColumnDef<IProduct>[] = [
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
		header: "Category",
		cell: ({ row }) => row.original?.category?.name,
	},
	{
		accessorKey: "subcategory",
		header: "Subcategory",
		cell: ({ row }) => row.original?.subcategory?.name,
	},
	{
		accessorKey: "currentPrice",
		header: "Current Price",
		cell: ({ row }) => <DataTablePrice dataKey="currentPrice" row={row} />,
	},
	{
		accessorKey: "originalPrice",
		header: "Original Price",
		cell: ({ row }) => <DataTablePrice dataKey="originalPrice" row={row} />,
	},
	{
		accessorKey: "createdBy",
		header: "Created By",
		cell: ({ row }) => <DataTableCreatedBy row={row} />,
	},
	{
		accessorKey: "createdAt",
		header: "Created At",
		cell: ({ row }) => <DataTableCreatedAt row={row} />,
	},
	{
		accessorKey: "actions",
		header: () => <div className="text-right">Actions</div>,
		cell: ({ row }) => <DataTableRowActions row={row} typeId="productId" />,
	},
];

export default columns;
