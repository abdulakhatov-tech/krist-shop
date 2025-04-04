import type { Table } from "@tanstack/react-table";

interface DataTableSelectedRowsCountProps<T> {
	table: Table<T>;
}

const DataTableSelectedRowsCount = <T,>({
	table,
}: DataTableSelectedRowsCountProps<T>) => {
	return (
		<div className="w-[130px]">
			{table.getFilteredSelectedRowModel().rows.length} of{" "}
			{table.getFilteredRowModel().rows.length} rows
		</div>
	);
};

export default DataTableSelectedRowsCount;
