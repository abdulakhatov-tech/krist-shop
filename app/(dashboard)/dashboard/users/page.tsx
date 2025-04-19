"use client";

import { SuspenseLoading } from "@/tools";
import UsersPageView from "@/views/dashboard/users";

const Users = () => {
	return (
		<SuspenseLoading mode="dashboard">
			<UsersPageView />
		</SuspenseLoading>
	);
};

export default Users;
