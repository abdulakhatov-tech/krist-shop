import type { IProduct } from "@/interfaces/product.interface";
import { formatDate } from "@/utils/helper-fns/format-date";

interface PropsI<T> {
	row: {
		original: T;
	};
}

const DataTableCreatedAt = <T extends IProduct>({ row }: PropsI<T>) => {
	const createdAt = row.original.createdAt;

	if (!createdAt) {
		return <span>-</span>;
	}

	return <span>{formatDate(createdAt)}</span>;
};

export default DataTableCreatedAt;
