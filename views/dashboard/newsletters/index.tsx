"use client";

import { DataTable } from "@/components/data-table";
import columns from "./columns";
import useNewslettersFeatures from "./features";

const NewslettersPageView = () => {
	const { formattedData, isLoading } = useNewslettersFeatures();

	return (
		<DataTable
			title={"Newsletters"}
			columns={columns}
			data={formattedData}
			loading={isLoading}
			actions={{
				addable: false,
				searchable: true,
			}}
		/>
	);
};

export default NewslettersPageView;
