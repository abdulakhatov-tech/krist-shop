import type { ColumnDef } from "@tanstack/react-table";

import {
	DataTableRowActions,
	DataTableRowCopyableData,
	DataTableRowEditUserRole,
	DataTableRowSelection,
	DataTableRowSelectionHeader,
	DataTableRowUserInfo,
} from "@/components/data-table/column-actions";
import type { IUser } from "@/interfaces/user.interface";
import { formatDate } from "@/utils/helper-fns/format-date";

export const columns: ColumnDef<IUser>[] = [
	{
		id: "select",
		header: ({ table }) => <DataTableRowSelectionHeader table={table} />,
		cell: ({ row }) => <DataTableRowSelection row={row} />,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "info",
		header: "User Info",
		cell: ({ row }) => <DataTableRowUserInfo row={row} />,
	},
	{
		accessorKey: "phoneNumber",
		header: "Phone Number",
		cell: ({ row }) => (
			<DataTableRowCopyableData row={row} dataKey="phoneNumber" />
		),
	},
	{
		accessorKey: "email",
		header: "Email",
		cell: ({ row }) => <DataTableRowCopyableData row={row} dataKey="email" />,
	},
	{
		accessorKey: "role",
		header: "Role",
		cell: ({ row }) => <DataTableRowEditUserRole row={row} />,
	},
	{
		accessorKey: "createdAt",
		header: "Created At",
		cell: ({ row }) => formatDate(row.original.createdAt),
	},
	{
		accessorKey: "actions",
		header: () => <div className="text-right">Actions</div>,
		cell: ({ row }) => (
			<DataTableRowActions
				row={row}
				typeId="userId"
				actions={{
					view: true,
					edit: true,
					delete: true,
				}}
			/>
		),
	},
];
