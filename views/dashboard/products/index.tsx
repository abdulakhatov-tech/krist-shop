"use client";

import { DataTable } from "@/components/data-table";
import columns from "./columns";
import useProductsFeatures from "./features";

const ProductsPageView = () => {
	const { formattedData, isLoading } = useProductsFeatures();

	return (
		<>
			<DataTable
				title={"Products"}
				columns={columns}
				data={formattedData}
				loading={isLoading}
				actions={{
					searchable: true,
					addable: true,
					filterByCategory: true,
					filterBySubcategory: true,
				}}
			/>
		</>
	);
};

export default ProductsPageView;
