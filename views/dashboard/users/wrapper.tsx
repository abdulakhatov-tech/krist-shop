import { SuspenseLoading } from "@/tools";
import UsersPageView from ".";

const UsersTableWrapper = () => {
	return (
		<SuspenseLoading mode="dashboard">
			<UsersPageView />
		</SuspenseLoading>
	);
};

export default UsersTableWrapper;
