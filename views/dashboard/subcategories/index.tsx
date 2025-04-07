"use client";

import React from "react";

import { DataTable } from "@/components/data-table";
import columns from "./columns";
import useSubcategoriesFeatures from "./features";
import SubcategoryFormModal from "./form-modal";

const SubcategoriesPageView = () => {
	const { formattedData, isLoading } = useSubcategoriesFeatures();

	return (
		<>
			<DataTable
				title={"Subcategories"}
				columns={columns}
				data={formattedData}
				loading={isLoading}
				actions={{
					addable: true,
					searchable: true,
					filterByCategory: true,
				}}
			/>

			<SubcategoryFormModal />
		</>
	);
};

export default SubcategoriesPageView;
