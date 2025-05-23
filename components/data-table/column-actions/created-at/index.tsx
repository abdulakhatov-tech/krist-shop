import type { IBanner } from "@/interfaces/banner.interface";
import type { ICategory } from "@/interfaces/category.interface";
import type { INewsletter } from "@/interfaces/newsletter.interface";
import type { IProduct } from "@/interfaces/product.interface";
import type { ISubcategory } from "@/interfaces/subcategory.interface";
import { formatDate } from "@/utils/helper-fns/format-date";

interface PropsI<T> {
	row: {
		original: T;
	};
}

const DataTableCreatedAt = <
	T extends IProduct | ICategory | ISubcategory | INewsletter | IBanner,
>({
	row,
}: PropsI<T>) => {
	const createdAt = row.original.createdAt;

	if (!createdAt) {
		return <span>-</span>;
	}

	return <span>{formatDate(createdAt)}</span>;
};

export default DataTableCreatedAt;
