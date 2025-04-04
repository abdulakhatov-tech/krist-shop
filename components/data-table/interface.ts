import type { ColumnDef } from "@tanstack/react-table";

export interface DataTableProps<TData, TValue> {
	data: {
		data: TData[];
		pagination: PaginationType;
	};
	columns: ColumnDef<TData, TValue>[];
	loading: boolean;
	title: string;
	actions: {
		role?: boolean;
		searchable?: boolean;
		datePicker?: boolean;
	};
}
