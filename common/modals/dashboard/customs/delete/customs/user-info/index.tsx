import Image from "next/image";

import { DialogTitle } from "@/components/ui/dialog";
import { useGetUser } from "@/hooks/useQueryActions/useUsers";
import noUser from "@/public/no-user.svg";
import Loading from "./loading";

const UserInfo = ({ userId }: { userId: string }) => {
	const { data: user, isLoading } = useGetUser(userId);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<Image
				src={user?.profilePhoto || noUser}
				alt={user?.firstName as string}
				width={140}
				height={140}
				className="mx-auto rounded-full overflow-hidden"
			/>

			<DialogTitle className="text-xl text-center">
				{user?.firstName} {user?.lastName}
			</DialogTitle>
		</>
	);
};

export default UserInfo;
