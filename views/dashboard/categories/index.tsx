"use client";

import { DataTable } from "@/components/data-table";
import React from "react";
import columns from "./columns";
import useCategoriesFeatures from "./features";
import CategoryFormModal from "./form-modal";

const CategoriesPageView = () => {
	const { formattedData, isLoading } = useCategoriesFeatures();

	return (
		<>
			<DataTable
				title={"Categories"}
				columns={columns}
				data={formattedData}
				loading={isLoading}
				actions={{
					addable: true,
					searchable: true,
				}}
			/>

			<CategoryFormModal />
		</>
	);
};

export default CategoriesPageView;
