"use client";

import type { IProduct } from "@/interfaces/product.interface";
import { Copier } from "@/tools";

interface PropsI<T> {
	row: {
		original: T;
	};
	dataKey: "originalPrice" | "currentPrice";
}

const DataTablePrice = <T extends IProduct>({ row, dataKey }: PropsI<T>) => {
	const price = row.original[dataKey];

	if (!price) {
		return <span>-</span>;
	}

	return (
		<span>
			$<Copier>{price}</Copier>
		</span>
	);
};

export default DataTablePrice;
