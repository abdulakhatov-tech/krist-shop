import type React from "react";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useEditUserRole } from "@/hooks/useQueryActions/useUsers";
import type { IUser } from "@/interfaces/user.interface";
import { userRoles } from "@/utils/mock-data/user-roles";

interface PropsI {
	row: {
		original: IUser;
	};
}

const DataTableRowEditUserRole: React.FC<PropsI> = ({ row }) => {
	const user = row.original;
	const { mutate: editUserRole } = useEditUserRole(user?.id);

	if (!user?.role) {
		return <span>-</span>;
	}

	return (
		<Select onValueChange={(newRole) => editUserRole({ role: newRole })}>
			<SelectTrigger className="w-[150px] md:w-[180px] lg:w-[200px]">
				<SelectValue placeholder={"Promoto role"} />
			</SelectTrigger>
			<SelectContent>
				{userRoles
					?.filter((item) => item !== user?.role)
					.map((item) => (
						<SelectItem key={item} value={item}>
							{item}
						</SelectItem>
					))}
			</SelectContent>
		</Select>
	);
};

export default DataTableRowEditUserRole;
