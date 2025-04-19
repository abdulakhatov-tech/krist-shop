"use client";

import { SuspenseLoading } from "@/tools";
import BannersPageView from "@/views/dashboard/banners";

const Banners = () => {
	return (
		<SuspenseLoading mode="dashboard">
			<BannersPageView />
		</SuspenseLoading>
	);
};

export default Banners;
