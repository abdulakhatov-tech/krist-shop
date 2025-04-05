import type { IProduct } from "@/interfaces/product.interface";
import type { IUser } from "@/interfaces/user.interface";
import { Copier } from "@/tools";

interface PropsI<T> {
	row: {
		original: T;
	};
	dataKey: keyof T;
}

const DataTableRowCopyableData = <T extends IUser | IProduct>({
	row,
	dataKey,
}: PropsI<T>) => {
	const value = row.original[dataKey];

	return value ? <Copier>{String(value)}</Copier> : <span>-</span>;
};

export default DataTableRowCopyableData;
