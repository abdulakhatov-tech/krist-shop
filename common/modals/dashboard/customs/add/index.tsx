"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import UserActionForm from "@/views/dashboard/users/form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const AddModal = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const userId = searchParams.get("userId");
	const action = searchParams.get("action");
	const actionType = searchParams.get("action-type");

	const isUser =
		(userId && action === "edit") ||
		(actionType === "user" && action === "add");
	const open = isUser;

	const handleOpenChange = (state: boolean) => {
		if (!state) {
			const newParams = new URLSearchParams(searchParams.toString());
			newParams.delete("userId");
			newParams.delete("action");
			newParams.delete("action-type");
			router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
		}
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContent>
				<DialogTitle>
					{action === "edit" ? "Edit" : "Add"} {userId ? "User" : "Data"}
				</DialogTitle>

				{isUser && <UserActionForm />}
			</DialogContent>
		</Dialog>
	);
};

export default AddModal;
