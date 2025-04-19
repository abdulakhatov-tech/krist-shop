"use client";

import { SuspenseLoading } from "@/tools";
import ProductsPageView from "@/views/dashboard/products";

const Products = () => {
	return (
		<SuspenseLoading mode="dashboard">
			<ProductsPageView />
		</SuspenseLoading>
	);
};

export default Products;
