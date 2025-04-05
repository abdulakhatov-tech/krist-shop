import { Checkbox } from "@/components/ui/checkbox";
import type { Row } from "@tanstack/react-table";

interface DataTableRowSelectionProps<T> {
	row: Row<T>;
}

const DataTableRowSelection = <T extends { id: string }>({
	row,
}: DataTableRowSelectionProps<T>) => {
	return (
		<Checkbox
			checked={row.getIsSelected()}
			onCheckedChange={(value) => row.toggleSelected(!!value)}
			aria-label="Select row"
		/>
	);
};

export default DataTableRowSelection;
