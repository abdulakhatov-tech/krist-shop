"use client";

import type { IProduct } from "@/interfaces/product.interface";
import Link from "next/link";

interface PropsI<T> {
	row: {
		original: T;
	};
}

const DataTableCreatedBy = <T extends IProduct>({ row }: PropsI<T>) => {
	const user = row.original.createdBy;

	if (!user) {
		return <span>-</span>;
	}

	return (
		<Link
			href={`/dashboard/products?action=view&userId=${user?.id}`}
			className="text-blue-500 hover:underline capitalize"
		>
			{user?.lastName} {user?.firstName} ({user.role})
		</Link>
	);
};

export default DataTableCreatedBy;
