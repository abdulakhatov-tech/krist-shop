"use client";

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import useUsersFeatures from "./features";

const UsersPageView = () => {
	const { formattedData, isLoading, title } = useUsersFeatures();

	return (
		<DataTable
			title={title}
			columns={columns}
			data={formattedData}
			loading={isLoading}
			actions={{
				role: true,
				searchable: true,
				datePicker: true,
				addable: true,
			}}
		/>
	);
};

export default UsersPageView;
