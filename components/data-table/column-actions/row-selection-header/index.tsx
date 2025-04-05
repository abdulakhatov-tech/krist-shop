import { Checkbox } from "@/components/ui/checkbox";
import type { Table } from "@tanstack/react-table";

interface DataTableRowSelectionHeaderProps<T> {
	table: Table<T>;
}

const DataTableRowSelectionHeader = <T,>({
	table,
}: DataTableRowSelectionHeaderProps<T>) => {
	return (
		<div className="flex items-center w-fit text-sm text-muted-foreground">
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		</div>
	);
};

export default DataTableRowSelectionHeader;
