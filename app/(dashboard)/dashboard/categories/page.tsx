"use client";

import { SuspenseLoading } from "@/tools";
import CategoriesPageView from "@/views/dashboard/categories";

const Categories = () => {
	return (
		<SuspenseLoading mode="dashboard">
			<CategoriesPageView />
		</SuspenseLoading>
	);
};

export default Categories;
