import Image from "next/image";
import type React from "react";

import type { IUser } from "@/interfaces/user.interface";
import noUser from "@/public/no-user.svg";

interface DataTableRowUserInfoProps {
	row: {
		original: IUser;
	};
}

const DataTableRowUserInfo: React.FC<DataTableRowUserInfoProps> = ({ row }) => {
	const user = row.original;

	return (
		<div className="flex items-center gap-2">
			<div className="rounded-full bg-[#556080] w-8 h-8 center">
				<Image
					src={user?.profilePhoto || noUser}
					alt={user.firstName}
					width={40}
					height={40}
					className="object-cover rounded-full overflow-hidden"
				/>
			</div>
			{user.firstName} {user.lastName}
		</div>
	);
};

export default DataTableRowUserInfo;
