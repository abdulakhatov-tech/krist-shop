"use client";

import { SuspenseLoading } from "@/tools";
import NewslettersPageView from "@/views/dashboard/newsletters";

const Newsletter = () => {
	return (
		<SuspenseLoading mode="dashboard">
			<NewslettersPageView />
		</SuspenseLoading>
	);
};

export default Newsletter;
