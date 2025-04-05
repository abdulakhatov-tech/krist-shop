"use client";

import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DataTableAddData,
	DataTableFilterByCategory,
	DataTableFilterBySubcategory,
	DataTableLimit,
	DataTablePagination,
	DataTableSelectedRowsCount,
	RowActionsAll,
	SearchData,
	UserRoles,
} from "./customs";
import type { DataTableProps } from "./interface";
import {
	DataTableLimitLoading,
	DataTableLoading,
	DataTablePaginationLoading,
	DataTableSelectedRowsCountLoading,
} from "./loading";

export function DataTable<TData extends { id: string }, TValue>({
	data,
	title,
	columns,
	loading = false,
	actions = {
		role: false,
		searchable: false,
		datePicker: false,
		addable: false,
		filterByCategory: false,
		filterBySubcategory: false,
	},
}: DataTableProps<TData, TValue>) {
	const table = useReactTable<TData>({
		data: data?.data || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const initialPagination: PaginationType = {
		currentPage: 1,
		hasNext: true,
		hasPrev: false,
		perPage: 15,
		total: 60,
		totalPages: 23,
	};

	const { role, searchable, addable, filterByCategory, filterBySubcategory } =
		actions;

	return (
		<section id="user-table" className="w-full">
			<div className="flex items-center justify-between gap-4 pb-2">
				<h1 className="text-2xl font-semibold">{title}</h1>

				<div className="flex items-center gap-2">
					{searchable && <SearchData loading={loading} />}
					{role && <UserRoles loading={loading} />}
					{filterByCategory && <DataTableFilterByCategory />}
					{filterBySubcategory && <DataTableFilterBySubcategory />}
					{addable && <DataTableAddData loading={loading} />}
				</div>
			</div>

			<div className="border rounded-md flex flex-col justify-between min-w-[700px] min-h-[85vh]">
				{loading ? (
					<DataTableLoading columns={columns.length} />
				) : (
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<TableHead key={header.id}>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext(),
														)}
											</TableHead>
										);
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && "selected"}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center"
									>
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				)}

				<div className="flex justify-between items-center py-1 px-2">
					{loading ? (
						<DataTableSelectedRowsCountLoading />
					) : (
						<DataTableSelectedRowsCount table={table} />
					)}
					{loading ? (
						<DataTablePaginationLoading />
					) : (
						<DataTablePagination<TData>
							table={table}
							pagination={data?.pagination || initialPagination}
						/>
					)}

					<div className="flex items-center justify-end gap-2">
						{table.getFilteredSelectedRowModel()?.rows.length ? (
							<RowActionsAll table={table} />
						) : (
							""
						)}

						{loading ? (
							<DataTableLimitLoading />
						) : (
							<DataTableLimit
								pagination={data?.pagination || initialPagination}
							/>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
