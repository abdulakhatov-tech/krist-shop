"use client";

import { DataTable } from "@/components/data-table";
import columns from "./columns";
import useBannersFeatures from "./features";
import BannerFormModal from "./form-modal";

const BannersPageView = () => {
	const { formattedData, isLoading } = useBannersFeatures();

	return (
		<>
			<DataTable
				title={"Banners"}
				columns={columns}
				data={formattedData}
				loading={isLoading}
				actions={{
					addable: true,
					searchable: true,
				}}
			/>

			<BannerFormModal />
		</>
	);
};

export default BannersPageView;
