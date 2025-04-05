"use client";

import { DataTable } from "@/components/data-table";
import { Suspense } from "react";
import { columns } from "./columns";
import useUsersFeatures from "./features";

const UsersPageView = () => {
	const { formattedData, isLoading, title } = useUsersFeatures();

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<DataTable
				title={title}
				columns={columns}
				data={formattedData}
				loading={isLoading}
				actions={{ role: true, searchable: true, datePicker: true }}
			/>
		</Suspense>
	);
};

export default UsersPageView;
