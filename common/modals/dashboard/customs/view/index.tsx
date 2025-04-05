"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { UserInfo } from "./customs";
import UserInfoLoading from "./customs/user-info/loading";

const ViewModal = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const userId = searchParams.get("userId");
	const action = searchParams.get("action");

	const isUser = userId && action === "view";
	const open = !!isUser;

	const handleOpenChange = (state: boolean) => {
		if (!state) {
			const newParams = new URLSearchParams(searchParams.toString());
			newParams.delete("userId");
			newParams.delete("action");
			router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
		}
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContent className="!pt-10">
				{isUser && (
					<Suspense fallback={<UserInfoLoading />}>
						<UserInfo userId={userId} />
					</Suspense>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default ViewModal;
