"use client";

import { SuspenseLoading } from "@/tools";
import SubcategoriesPageView from "@/views/dashboard/subcategories";

const Subcategories = () => {
	return (
		<SuspenseLoading mode="dashboard">
			<SubcategoriesPageView />
		</SuspenseLoading>
	);
};

export default Subcategories;
