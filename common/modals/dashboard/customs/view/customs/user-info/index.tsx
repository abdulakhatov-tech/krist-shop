import Image from "next/image";

import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useGetUser } from "@/hooks/useQueryActions/useUsers";
import noUser from "@/public/no-user.svg";
import { Copier } from "@/tools";
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

			<DialogTitle className="text-center text-xl">
				{user?.firstName} {user?.lastName}
			</DialogTitle>

			<div className="grid grid-cols-1 gap-4">
				<DialogDescription className="flex items-center gap-1">
					<strong>Email:</strong>{" "}
					<span className="hover:text-blue-500">
						<Copier>{user?.email}</Copier>
					</span>
				</DialogDescription>
				<DialogDescription className="flex items-center gap-1">
					<strong>Phone:</strong>{" "}
					{user?.phoneNumber ? (
						<span className="hover:text-blue-500">
							<Copier>{user?.email}</Copier>
						</span>
					) : (
						"No Phone Number"
					)}
				</DialogDescription>
				<DialogDescription className="flex items-center gap-1">
					<strong>Region:</strong>{" "}
					{user?.region ? (
						<span className="hover:text-blue-500">
							<Copier>{user?.region}</Copier>
						</span>
					) : (
						"-"
					)}
				</DialogDescription>
				<DialogDescription className="flex items-center gap-1">
					<strong>District:</strong>{" "}
					{user?.district ? (
						<span className="hover:text-blue-500">
							<Copier>{user?.district}</Copier>
						</span>
					) : (
						"-"
					)}
				</DialogDescription>

				<DialogDescription className="flex items-center gap-1">
					<strong>Extra Address:</strong>{" "}
					{user?.extraAddress ? (
						<span className="hover:text-blue-500">
							<Copier>{user?.extraAddress}</Copier>
						</span>
					) : (
						"No Extra Address"
					)}
				</DialogDescription>
			</div>
		</>
	);
};

export default UserInfo;
